package io.dropDemo.Application;
import java.util.List;
import java.util.Date;
import java.util.Iterator;
import java.util.*;

import io.dropDemo.POJO.FactData;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class ManageFact {
    private static SessionFactory factory;

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



   public static void main(String[] args)  {
        try{
            factory = new Configuration().configure().buildSessionFactory();
        }
        catch(Throwable ex){
            System.out.println("Session has not created "+ex);
            throw new ExceptionInInitializerError(ex);
        }

        ManageFact MF = new ManageFact();

        Integer recordID1 = MF.addRecord(1,20,"Mohit");
        MF.listRecord();
    }



}
