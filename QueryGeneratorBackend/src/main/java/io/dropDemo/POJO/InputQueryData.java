package io.dropDemo.POJO;

import org.json.JSONObject;

import java.util.ArrayList;

public class InputQueryData {
    private  String tableName;
    private ArrayList<String> selectedColumns;
    private  ArrayList<String> whereConditionSelectedColumns;
    private ArrayList<String> whereConditionSelectedValues;
    private ArrayList<String> groupByColumns;


    public void setGroupByColumns(ArrayList<String> groupByColumns) {
        this.groupByColumns = groupByColumns;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public void setSelectedColumns(ArrayList<String> selectedColumns) {
        this.selectedColumns = selectedColumns;
    }

    public void setWhereConditionSelectedValues(ArrayList<String> whereConditionSelectedValues) {
        this.whereConditionSelectedValues = whereConditionSelectedValues;
    }

    public void setWhereConditionSelectedColumns(ArrayList<String> whereConditionSelectedColumns) {
        this.whereConditionSelectedColumns = whereConditionSelectedColumns;
    }

    public ArrayList<String> getGroupByColumns() {
        return groupByColumns;
    }

    public ArrayList<String> getSelectedColumns() {
        return selectedColumns;
    }

    public String getTableName() {
        return tableName;
    }

    public ArrayList<String> getWhereConditionSelectedValues() {
        return whereConditionSelectedValues;
    }

    public ArrayList<String> getWhereConditionSelectedColumns() {
        return whereConditionSelectedColumns;
    }
}
