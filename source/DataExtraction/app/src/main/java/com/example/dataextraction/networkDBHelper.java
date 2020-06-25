package com.example.dataextraction;

import android.content.ContentValues;
import android.content.Context;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import androidx.annotation.Nullable;

public class networkDBHelper {
    private static final String DATABASE_NAME = "networkDatabase.db";
    private static final int DATABASE_VERSION = 1;
    public static SQLiteDatabase mDB;
    private networkDBHelper.DatabaseHelper mDBHelper;
    private Context mCtx;

    private class DatabaseHelper extends SQLiteOpenHelper {
        public DatabaseHelper(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version) {
            super(context, name, factory, version);
        }

        @Override
        public void onCreate(SQLiteDatabase db) {
            db.execSQL(MobileNetworkDataBase.CreateDB._CREATE0);
            db.execSQL(MobileNetworkDataBase.CreateDB._CREATE1);
            db.execSQL(MobileNetworkDataBase.CreateDB._CREATE2);
            db.execSQL(MobileNetworkDataBase.CreateDB._CREATE3);
        }

        @Override
        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
            db.execSQL("DROP TABLE IF EXISTS " + MobileNetworkDataBase.CreateDB._TABLENAME0);
            db.execSQL("DROP TABLE IF EXISTS " + MobileNetworkDataBase.CreateDB._TABLENAME1);
            db.execSQL("DROP TABLE IF EXISTS " + MobileNetworkDataBase.CreateDB._TABLENAME2);
            db.execSQL("DROP TABLE IF EXISTS " + MobileNetworkDataBase.CreateDB._TABLENAME3);
            onCreate(db);
        }
    }
    public networkDBHelper(Context context){
        this.mCtx = context;
    }

    public networkDBHelper open() throws SQLException {
        mDBHelper = new networkDBHelper.DatabaseHelper(mCtx, DATABASE_NAME, null, DATABASE_VERSION);
        mDB = mDBHelper.getWritableDatabase();
        return this;
    }

    public void close(){
        mDB.close();
    }

    public long insertColumn0(String id, String domain, String interface_name){
        ContentValues values = new ContentValues();
        values.put(MobileNetworkDataBase.CreateDB.NET_ID, id);
        values.put(MobileNetworkDataBase.CreateDB.DOMAIN, domain);
        values.put(MobileNetworkDataBase.CreateDB.INTERFACE_NAME, interface_name);
        return mDB.insert(MobileNetworkDataBase.CreateDB._TABLENAME0, null, values);
    }

    public long insertColumn1(String id, String address){
        ContentValues values = new ContentValues();
        values.put(MobileNetworkDataBase.CreateDB.NET_ID, id);
        values.put(MobileNetworkDataBase.CreateDB.HOST_ADDRESS, address);
        return mDB.insert(MobileNetworkDataBase.CreateDB._TABLENAME1, null, values);
    }

    public long insertColumn2(String id, String address, int prefix){
        ContentValues values = new ContentValues();
        values.put(MobileNetworkDataBase.CreateDB.NET_ID, id);
        values.put(MobileNetworkDataBase.CreateDB.HOST_ADDRESS, address);
        values.put(MobileNetworkDataBase.CreateDB.PREFIX_LENGTH, prefix);
        return mDB.insert(MobileNetworkDataBase.CreateDB._TABLENAME2, null, values);
    }

    public long insertColumn3(String id, String dest, int prefix, String gateway, String interface_name){
        ContentValues values = new ContentValues();
        values.put(MobileNetworkDataBase.CreateDB.NET_ID, id);
        values.put(MobileNetworkDataBase.CreateDB.DESTINATION, dest);
        values.put(MobileNetworkDataBase.CreateDB.D_PREFIX, prefix);
        values.put(MobileNetworkDataBase.CreateDB.GATEWAY, gateway);
        values.put(MobileNetworkDataBase.CreateDB.INTERFACE_NAME, interface_name);
        return mDB.insert(MobileNetworkDataBase.CreateDB._TABLENAME3, null, values);
    }

    public void deleteAllRows(){
        mDB.delete(MobileNetworkDataBase.CreateDB._TABLENAME0, null, null);
        mDB.delete(MobileNetworkDataBase.CreateDB._TABLENAME1, null, null);
        mDB.delete(MobileNetworkDataBase.CreateDB._TABLENAME2, null, null);
        mDB.delete(MobileNetworkDataBase.CreateDB._TABLENAME3, null, null);
    }


}
