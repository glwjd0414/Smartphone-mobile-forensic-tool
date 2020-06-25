package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.google.gson.JsonObject;

import org.json.JSONException;
import org.json.JSONObject;

import io.socket.client.IO;
import io.socket.client.Socket;

public class MainActivity extends AppCompatActivity {

    private Socket socket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        alert();
    }

    public void alert(){

        try {
            //socket = IO.socket("http://192.168.0.3:3000/");
            socket = IO.socket("http://172.30.1.40:3000/");
            socket.connect();

        }catch(Exception e){
            e.printStackTrace();
        }

        JsonObject alertJsonObject = new JsonObject();
        alertJsonObject.addProperty("comment", "insert done");
        JSONObject jsonObject = null;

        try{
            jsonObject = new JSONObject(alertJsonObject.toString());
        }catch(JSONException e){
            e.printStackTrace();
        }

        socket.emit("alert", jsonObject);
    }
}
