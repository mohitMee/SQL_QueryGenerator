package io.dropDemo.POJO;

import java.io.Serializable;

public class TableSchema implements Serializable {
    private int ID ;
    private String columnName;
    private String dataType;
    TableSchema(){

    }
    public TableSchema(int id,String cn,String dt){
        this.columnName=cn;
        this.ID=id;
        this.dataType=dt;
    }



    public int getID() {
        return ID;
    }

    public String getColumnName() {
        return columnName;
    }

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public void setID(int ID) {
        this.ID = ID;
    }
}
