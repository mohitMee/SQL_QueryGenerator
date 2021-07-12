package io.dropDemo.resource;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.dropDemo.POJO.TableSchema;
import org.json.*;
import io.dropDemo.Application.ManageFact;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
//import java.awt.*;
import java.util.ArrayList;
import java.util.Iterator;
//import org.json.simple.JSONObject;

@Path("/getschema")
public class SendTableSchema {
    @POST
    public String SendTableSchema(String data) throws JsonProcessingException {
        ManageFact manageFact = new ManageFact();
//        ArrayList<String> array= manageFact.allTables();
//        ObjectMapper objectMapper = new ObjectMapper();
//        return objectMapper.writeValueAsString(array);
      //  System.out.println(data);
        JSONObject json = new JSONObject(data);
        String input = json.getString("table");
        ArrayList<TableSchema> array = manageFact.tableSchema(input);
//        System.out.println(array.get());
        ObjectMapper objectMapper = new ObjectMapper();
        ArrayList<String> schemaTOString = new ArrayList<>();
        for(Iterator it = array.iterator();it.hasNext();){
            schemaTOString.add(objectMapper.writeValueAsString(it.next()));
        }

        return objectMapper.writeValueAsString(schemaTOString);
    }
}

