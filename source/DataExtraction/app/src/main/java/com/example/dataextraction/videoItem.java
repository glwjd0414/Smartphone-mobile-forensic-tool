package com.example.dataextraction;

import android.os.Parcel;
import android.os.Parcelable;

public class videoItem implements Parcelable {
   String album, artist, bookmark, category, description, language
            , latitude, longitude, resolution, tags, path, date_added
            ,display_Name, MIME_type,title;

   public videoItem(){}
   public videoItem(Parcel in) {
       this.album = in.readString();
       this.artist = in.readString();
       this.bookmark = in.readString();
       this.category = in.readString();
       this.description = in.readString();
       this.latitude = in.readString();
       this.longitude = in.readString();
       this.resolution = in.readString();
       this.tags = in.readString();
       this.path = in.readString();
       this.date_added = in.readString();
       this.display_Name = in.readString();
       this.MIME_type = in.readString();
   }
    public String getAlbum() {
        return album;
    }

    public String getArtist() {
        return artist;
    }

    public String getBookmark() {
        return bookmark;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public String getLanguage(){
        return language;
    }

    public String getLongitude(){
        return longitude;
    }

    public String getResolution() {
        return resolution;
    }

    public String getPath() {
        return path;
    }

    public String getTags() {
        return tags;
    }

    public String getLatitude() {
        return latitude;
    }

    public String getDate_added() {
        return date_added;
    }

    public String getDisplay_Name() {
        return display_Name;
    }

    public String getMIME_type() {
        return MIME_type;
    }

    public String getTitle() {
        return title;
    }

    public void setAlbum(String album) {
       this.album = album;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public void setBookmark(String bookmark) {
        this.bookmark = bookmark;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public void setDate_added(String date_added) {
        this.date_added = date_added;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public void setDisplay_Name(String display_Name) {
        this.display_Name = display_Name;
    }

    public void setMIME_type(String MIME_type) {
        this.MIME_type = MIME_type;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(this.album);
        dest.writeString(this.artist);
        dest.writeString(this.bookmark);
        dest.writeString(this.category);
        dest.writeString(this.description);
        dest.writeString(this.language);
        dest.writeString(this.latitude);
        dest.writeString(this.longitude);
        dest.writeString(this.resolution);
        dest.writeString(this.tags);
        dest.writeString(this.path);
        dest.writeString(this.date_added);
        dest.writeString(this.display_Name);
        dest.writeString(this.MIME_type);
    }

    @SuppressWarnings("rawtypes")
    public static final Creator CREATOR = new Creator() {

        @Override
        public videoItem createFromParcel(Parcel in) {
            return new videoItem(in);
        }

        @Override
        public videoItem[] newArray(int size) {
            // TODO Auto-generated method stub
            return new videoItem[size];
        }
    };
}
