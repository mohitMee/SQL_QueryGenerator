package io.dropDemo.resource;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.*;
import io.dropDemo.Application.ManageFact;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
//import java.awt.*;
import java.util.ArrayList;

@Path("/getlist")
public class SendData {
    @POST
    public String SendAllTables(String data) throws JsonProcessingException {
        ManageFact manageFact = new ManageFact();
        ArrayList<String> array= manageFact.allTables();
        System.out.println(array);
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(array);
    }
}
