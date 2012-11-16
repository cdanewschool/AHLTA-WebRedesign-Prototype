package edu.newschool.piim.service;

import java.util.*;
import java.util.Map.Entry;

import javax.ws.rs.core.MediaType;

import com.sun.jersey.api.client.*;
import com.sun.jersey.api.client.config.*;

import com.google.gson.*;
import flexjson.*;


public class JsonDeserializer {
    private static class AnAddr {
        @Override
        public String toString() {
            return "AnAddr [city=" + city + ", postalCode=" + postalCode + ", state=" + state
                    + ", streetAddress=" + streetAddress + "]";
        }
        String streetAddress;
        String city;
        String state;
        int postalCode;
    }

    
    private static class MyFoo {
        @Override
        public String toString() {
            return "MyFoo [address=" + address + ", firstName=" + firstName
                    + ", lastName=" + lastName + ", phoneNumbers=" + phoneNumbers + "]";
        }
        String firstName;
        String lastName;
        AnAddr address; 
        List<String> phoneNumbers;
        
    }

    private static final String t = 
        "{ \"firstName\": \"John\", \"lastName\": \"Smith\", \"address\": { \"stre" 
        + "etAddress\": \"21 2nd Street\", \"city\": \"New York\", \"state\": \"NY\", \"post" 
        + "alCode\": 10021}, \"phoneNumbers\": [ \"212 543-1234\", \"646 123-4567\"] }";
    
    private String tryJersey() {
        Client jerseyClient = Client.create();
        WebResource resource = jerseyClient.resource("http://caprica.piim.newschool.edu/jsonTest.html");
        resource.accept(MediaType.TEXT_HTML);
        resource.accept(MediaType.APPLICATION_JSON);
        String resp = resource.get(String.class);
        
        return resp;
    }
    
    public void go(){
        System.out.println(t);
        MyFoo tryGson = tryGson(t);
        System.out.println("gson: " + tryGson);
        String tryJersey = tryJersey();
        System.out.println("jersey: " + tryJersey);
        MyFoo jerseyGson = tryGson(tryJersey);
        System.out.println("jersey+gson: " + jerseyGson);
        
        
        
//        GsonBuilder g = new GsonBuilder();
//        
//        JsonObject jobj = new Gson().fromJson(t, JsonObject.class);
//        String string = jobj.toString();
//        System.out.println("my " + string);
//
//        Set<Entry<String, JsonElement>> entrySet = jobj.entrySet();
//        for (Entry<String, JsonElement> e : entrySet) {
//            String k = e.getKey();
//            JsonElement v = e.getValue();
//            String s = v.toString();
//            Class<? extends JsonElement> c = v.getClass();
//            System.out.println("k:" + k + "|v:" + v + "|s:" + s + "|c:" + c);
//        }
//        
//        System.out.println("------------------");
//        System.out.println("de1:" + (new JSONDeserializer<MyFoo>().deserialize(t)));
//        
//        MyFoo de = new JSONDeserializer<MyFoo>().deserialize(t, MyFoo.class);
//        System.out.println("de2:" + de);
        
    }

    //        String t2 = t;
    private MyFoo tryGson(String json) {
        Gson gson = new Gson();
        MyFoo fromJson = gson.fromJson(json, MyFoo.class);
//        System.out.println(fromJson);
        return fromJson;
    }
    public static void main(final String[] args) {
        JsonDeserializer f = new JsonDeserializer();
        f.go();
    }
    
    
    
    
}
