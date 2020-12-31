package io.dropDemo.resource;


import com.fasterxml.jackson.core.JsonProcessingException;
import io.dropDemo.POJO.InputData;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.jetty.util.ajax.JSON;
import org.json.*;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
//import java.awt.*;
import java.util.Scanner;
@Path("/calc")
public class MyCalculator
{

    @POST
        public  String Calculator(String data) throws JsonProcessingException {


        ObjectMapper objectMapper = new ObjectMapper();
        InputData inputData = new ObjectMapper().readValue(data, InputData.class);
        double first = inputData.getFirstNumber();
        double second = inputData.getSecondNumber();
        char operator = inputData.getOperator();

        double result;

            switch (operator) {
                case '+':
                    result = first + second;
                    break;

                case '-':
                    result = first - second;
                    break;

                case '*':
                    result = first * second;
                    break;

                case '/':
                    result = first / second;
                    break;

                // operator doesn't match any case constant (+, -, *, /)
                default:
                    System.out.printf("Error! operator is not correct");
                    return String.valueOf(first);
            }

            return String.valueOf(result);
        }
    }
