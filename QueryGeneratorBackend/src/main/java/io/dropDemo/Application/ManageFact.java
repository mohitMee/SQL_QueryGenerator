package io.dropDemo.Application;
import java.util.List;
import java.util.Date;
import java.util.Iterator;
import java.util.*;

import io.dropDemo.POJO.FactData;
import io.dropDemo.POJO.TableList;
import io.dropDemo.POJO.TableSchema;
import org.hibernate.*;
import org.hibernate.cfg.Configuration;

public class ManageFact {
    private static SessionFactory factory;

    static {
        try{
            factory = new Configuration().configure().buildSessionFactory();
        }
        catch(Throwable ex){
            System.out.println("Session has not created "+ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    /* Method to Create an record int the database*/
    public Integer addRecord(int id, int age,String name){
        Session session = factory.openSession();
        Transaction tx=null;
        Integer ID = null;
        try{
            tx = session.beginTransaction();
            FactData factData = new FactData();
            factData.setAGE(age);
            factData.setID(id);
            factData.setNAME(name);
            ID = (Integer) session.save(factData);

        } catch (HibernateException e){
            if(tx!=null) tx.rollback();
            e.printStackTrace();;
        }finally {
            session.close();
        }
        return ID;

    }

    /*method to show all records*/
    public void listRecord( ){
        Session session = factory.openSession();
        Transaction tx=null;
        try {
            tx=session.beginTransaction();
            List records = session.createQuery("FROM FactData").list();
            for(Iterator it = records.iterator();it.hasNext();){
                FactData record = (FactData) it.next();
                System.out.print("ID: "+record.getID());
                System.out.print("Name: "+record.getNAME());
                System.out.print("Age: "+record.getAGE()+"/n");
            }
            tx.commit();
        } catch (HibernateException e){
            if(tx!=null) tx.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
    }


    public ArrayList<String> allTables(){
        Session session = factory.openSession();
        Transaction tx = null;

        ArrayList<String> tableList = new ArrayList<>();
        try{
            tx= session.beginTransaction();
            String hql = "SELECT E.NAME FROM TableList E";
            Query query = session.createQuery(hql);
            List records = query.list();
            for(Iterator it = records.iterator();it.hasNext();){
                String record = (String) it.next();
               // System.out.println(record);
                tableList.add(record);
            }
            tx.commit();
        }catch (HibernateException e){
            if(tx!=null) tx.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }

        return tableList;
    }

    public ArrayList<TableSchema> tableSchema(String Tname){
        Session session = factory.openSession();
        Transaction tx = null;

        ArrayList<TableSchema> tableschema = new ArrayList<>();

        try{
            tx= session.beginTransaction();
            String hql = "SELECT E.ID,E.columnName,E.dataType FROM TableSchema E WHERE E.ID = (SELECT ID FROM TableList WHERE NAME = :Tname)";

            Query query = session.createQuery(hql);
            query.setParameter("Tname", Tname);
            List records = query.list();
            for(Iterator it = records.iterator();it.hasNext();){
//                TableSchema record = (TableSchema) it.next();
//                String pt= record.getColumnName();
//                System.out.println(pt);
////                it.next();
//                tableschema.add(record);

                Object[] obj = (Object[]) it.next();
                //now you have one array of Object for each row
                String cName = String.valueOf(obj[1]); // don't know the type of column CLIENT assuming String
                Integer ID = Integer.parseInt(String.valueOf(obj[0]));
                String dType = String.valueOf(obj[2]);
                TableSchema record = new TableSchema(ID,cName,dType);
                tableschema.add(record);
             //   System.out.println(record.getColumnName());
            }
            tx.commit();
        }catch (HibernateException e){
            if(tx!=null) tx.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }

        return tableschema;
    }


    public String QueryGenerator(String tableName,ArrayList<String> selectedColumns,ArrayList<String> whereSelectedColumnName,ArrayList<String> whereSelectedColumnValue,ArrayList<String> groupByColumns){
//        Session session = factory.openSession();
//        Transaction tx = null;

        ArrayList<String> queryResult = new ArrayList<>();
       // try{
        //    tx= session.beginTransaction();
            StringBuilder hql = new StringBuilder();
            hql.append("SELECT ");
            for(Iterator it = selectedColumns.iterator();it.hasNext();){
                String record = (String) it.next();
                // System.out.println(record);
                hql.append(record);
                if(it.hasNext()){
                    hql.append(",");
                }
            }

             hql.append(" ");

            hql.append("FROM ");
            hql.append(tableName);

            if(whereSelectedColumnName.isEmpty()==false){
                hql.append(" ");
                hql.append("WHERE");


                    Iterator itValue = whereSelectedColumnValue.iterator();
                for(Iterator itName = whereSelectedColumnName.iterator();itName.hasNext();){
                    String cName = (String) itName.next();
                    String cValue = (String) itValue.next();
                    // System.out.println(record);
                    hql.append(" ");
                    hql.append(cName);
                    hql.append(" = ");

                    hql.append(cValue);
                    hql.append(" ");
                    if(itName.hasNext()){
                        hql.append("AND");
                    }
                }
            }

        if(groupByColumns.isEmpty()==false){
            hql.append(" ");
            hql.append("GROUP BY");



            for(Iterator itName = groupByColumns.iterator();itName.hasNext();){
                String cName = (String) itName.next();


                hql.append(" ");
                hql.append(cName);

                if(itName.hasNext()){
                    hql.append(",");
                }
            }
        }





            hql.append(";");
           String hq =  hql.toString();
            System.out.println(hq);
//            Query query = session.createQuery(hq);
//            List records = query.list();
////            System.out.println(records);
//            for(Iterator it = records.iterator();it.hasNext();){
//                String record = (String) it.next();
//                // System.out.println(record);
//                queryResult.add(record);
//            }
//            System.out.println(queryResult);
//            tx.commit();
//        }catch (HibernateException e){
//            if(tx!=null) tx.rollback();
//            e.printStackTrace();
//        }finally {
//            session.close();
//        }

        return hq;
    }



//    public ArrayList<String> tableSchema(){
//
//    }


//    public static void main(String[] args) {
//        ManageFact m = new ManageFact();
////        m.allTables();
//        m.tableSchema(1);
//    }




}
