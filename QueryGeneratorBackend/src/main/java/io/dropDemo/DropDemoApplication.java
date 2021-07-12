package  io.dropDemo;
import io.dropDemo.DropDemoConfiguration;

import io.dropDemo.resource.*;
import io.dropwizard.Application;
import io.dropwizard.setup.Environment;

public class DropDemoApplication extends Application<DropDemoConfiguration> {



    public static void main(String[] args) throws Exception {
        new DropDemoApplication().run(args);
    }




    @Override
    public void run(DropDemoConfiguration dropDemoConfiguration, Environment environment) throws Exception {
        environment.jersey().register(new Hello());
        environment.jersey().register(new Dhaka());
        environment.jersey().register(new MyCalculator());
        environment.jersey().register(new SendData());
        environment.jersey().register(new SendTableSchema());
        environment.jersey().register(new SendQueryResult());
    }
//    @Override
//    public void

}