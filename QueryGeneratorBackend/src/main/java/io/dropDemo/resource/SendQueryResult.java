package io.dropDemo.resource;
//package io.dropDemo.resource;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.dropDemo.POJO.InputData;
import io.dropDemo.POJO.InputQueryData;
import io.dropDemo.POJO.TableSchema;
import org.json.*;
import io.dropDemo.Application.ManageFact;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
//import java.awt.*;
import java.util.ArrayList;
import java.util.Iterator;

@Path("/resultquery")
public class SendQueryResult {

    @POST
    public String SendQueryResult(String data) throws JsonProcessingException {
//        ObjectMapper objectMapper = new ObjectMapper();
//        InputQueryData inputQueryData = new ObjectMapper().readValue(data, InputQueryData.class);
//        System.out.println(inputQueryData.getTableName());
        //System.out.println(data);

//        JSONObject jsonObject = new JSONObject(data);
        ObjectMapper objectMapper = new ObjectMapper();
        InputQueryData inputQueryData = new ObjectMapper().readValue(data, InputQueryData.class);
//        System.out.println(inputQueryData.getTableName());
//        System.out.println(inputQueryData.getSelectedColumns());
//        System.out.println(inputQueryData.getWhereConditionSelectedColumns());
//        System.out.println(inputQueryData.getWhereConditionSelectedValues());


        ManageFact manageFact = new ManageFact();

        String resultQuery = manageFact.QueryGenerator(inputQueryData.getTableName(), inputQueryData.getSelectedColumns(), inputQueryData.getWhereConditionSelectedColumns(), inputQueryData.getWhereConditionSelectedValues(),inputQueryData.getGroupByColumns());




        return  objectMapper.writeValueAsString(resultQuery);
    }

}
