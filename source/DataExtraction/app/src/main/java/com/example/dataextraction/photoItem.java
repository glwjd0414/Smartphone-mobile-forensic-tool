package com.example.dataextraction;

import android.graphics.Bitmap;
import android.os.Parcel;
import android.os.Parcelable;

public class photoItem implements Parcelable {
    private int id;
    private String latitude, longitude,title,displayName,type,date,path;
    private byte bytes[];
    private Bitmap bitmap;

    public photoItem() {
        latitude = null;
        longitude = null;
    }
    public photoItem(Parcel in) {
        this.id = in.readInt();
        this.latitude = in.readString();
        this.longitude = in.readString();
        this.title = in.readString();
        this.displayName = in.readString();
        this.type = in.readString();
        this.date = in.readString();
        this.path = in.readString();
        //this.bytes = in.createByteArray();
    }
    public String getLatitude(){
        return latitude;
    }
    public String getLongitude(){
        return longitude;
    }
    public String getTitle(){
        return title;
    }
    public int getId(){
        return id;
    }
    public String getDisplayName(){
        return displayName;
    }
    public String getType(){
        return type;
    }
    public String getDate(){
        return date;
    }
    public String getPath() {
        return path;
    }
    public byte[] getBytes(){
        return bytes;
    }
    public Bitmap getBitmap(){
        return bitmap;
    }

    public void setLatitude(String lat){
        latitude = lat;
    }
    public void setLongitude(String longt){
        longitude = longt;
    }
    public void setTitle(String _t){
        title = _t;
    }
    public void setId(int _id){
        id = _id;
    }
    public void setDisplayName(String name){
        displayName = name;
    }
    public void setType(String _type){
        type = _type;
    }
    public void setDate(String d){
        date = d;
    }
    public void setPath(String p){
        path = p;
    }
    public void setBytes(byte[] b){
        bytes = b;
    }
    public void setBitmap(Bitmap b){
        bitmap = b;
    }



    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(this.id);
        dest.writeString(this.latitude);
        dest.writeString(this.longitude);
        dest.writeString(this.title);
        dest.writeString(this.displayName);
        dest.writeString(this.type);
        dest.writeString(this.date);
        dest.writeString(this.path);
        //dest.writeByteArray(this.bytes);
    }

    @SuppressWarnings("rawtypes")
    public static final Creator CREATOR = new Creator() {

        @Override
        public photoItem createFromParcel(Parcel in) {
            return new photoItem(in);
        }

        @Override
        public photoItem[] newArray(int size) {
            // TODO Auto-generated method stub
            return new photoItem[size];
        }

    };

}
