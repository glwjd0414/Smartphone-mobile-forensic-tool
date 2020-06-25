package com.example.dataextraction;

import android.provider.BaseColumns;

public final class VideoDataBase {
    public static final class CreateDB implements BaseColumns {
        public static final String ALBUM = "album";
        public static final String ARTIST = "artist";
        public static final String BOOKMARK = "bookmark";
        public static final String CATEGORY = "category";
        public static final String DESCRIPTION = "description";
        public static final String LANGUAGE = "language";
        public static final String LATITUDE = "latitude";
        public static final String LONGITUDE = "longitude";
        public static final String RESOLUTION = "resolution";
        public static final String PATH = "path";
        public static final String TAGS = "tags";
        public static final String DATE_ADDED = "date_added";
        public static final String DISPLAY_NAME = "display_name";
        public static final String MIME_TYPE = "mime_type";
        public static final String TITLE = "title";
        public static final String SIZE = "size";
        public static final String _TABLENAME0 = "video";
        public static final String _CREATE0 = "create table if not exists "+_TABLENAME0+"("
                +TITLE+" text not null primary key, "
                +DATE_ADDED + " text not null ,"
                +DISPLAY_NAME + " text not null ,"
                +MIME_TYPE + " text not null ,"
                +PATH + " text not null ,"
                +LATITUDE + " text ,"
                +LONGITUDE + " text,"
                +ALBUM+ " text, "
                +ARTIST+ " text, "
                +BOOKMARK+ " text, "
                +CATEGORY + " text, "
                +DESCRIPTION + " text, "
                +LANGUAGE +" text, "
                +RESOLUTION + " text, "
                +TAGS + " text, "
                +SIZE+" text);";
    }
}
