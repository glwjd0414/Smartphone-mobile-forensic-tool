package com.example.dataextraction;

public class audioItem {
    String album, artist,composer,contentType, year, path, date_added,
    MIME_TYPE,size,title;

    public String getAlbum() {
        return album;
    }
    public String getArtist(){
        return artist;
    }
    public String getComposer(){
        return composer;
    }
    public String getContentType(){
        return contentType;
    }
    public String getYear(){
        return year;
    }
    public String getPath(){
        return path;
    }
    public String getDate_added(){
        return date_added;
    }
    public String getMIME_TYPE(){
        return MIME_TYPE;
    }
    public String getSize(){
        return size;
    }

    public String getTitle() {
        return title;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public void setDate_added(String date_added) {
        this.date_added = date_added;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public void setComposer(String composer) {
        this.composer = composer;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public void setMIME_TYPE(String MIME_TYPE) {
        this.MIME_TYPE = MIME_TYPE;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
