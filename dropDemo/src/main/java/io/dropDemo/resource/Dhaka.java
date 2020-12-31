package io.dropDemo.resource;

import javax.ws.rs.GET;
import javax.ws.rs.Path;



@Path("/groot")
public class Dhaka {
    @GET
    public String greet(){
//        System.out.println("Hello world");
        return "Im Groot";
    }
}
