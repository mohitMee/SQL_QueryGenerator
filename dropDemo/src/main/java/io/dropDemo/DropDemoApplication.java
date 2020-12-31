package  io.dropDemo;
import io.dropDemo.DropDemoConfiguration;

import io.dropDemo.resource.Hello;
import io.dropDemo.resource.MyCalculator;
import io.dropwizard.Application;
import io.dropwizard.setup.Environment;
import io.dropDemo.resource.Dhaka;



public class DropDemoApplication extends Application<DropDemoConfiguration> {



    public static void main(String[] args) throws Exception {
        new DropDemoApplication().run(args);
    }




    @Override
    public void run(DropDemoConfiguration dropDemoConfiguration, Environment environment) throws Exception {
        environment.jersey().register(new Hello());
        environment.jersey().register(new Dhaka());
        environment.jersey().register(new MyCalculator());
    }
//    @Override
//    public void

}