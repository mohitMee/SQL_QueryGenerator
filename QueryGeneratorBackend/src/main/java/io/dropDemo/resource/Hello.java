package io.dropDemo.resource;

import javax.ws.rs.GET;
import javax.ws.rs.Path;



@Path("/greet")
public class Hello {

    @Path("/a1")
    @GET
    public String greet(){
//        System.out.println("Hello world");
        return "this is a1";
    }
    @Path("/a2")
    @GET
    public String Greet2(){
        return "This is a2";
    }

}