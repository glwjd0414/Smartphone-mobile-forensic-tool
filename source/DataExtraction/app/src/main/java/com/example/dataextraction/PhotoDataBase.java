package com.example.dataextraction;

import android.provider.BaseColumns;

public final class PhotoDataBase {
    public static final class CreateDB implements BaseColumns {
        public static final String TITLE = "title";
        public static final String ID = "id";
        public static final String DATE_ADDED = "date_added";
        public static final String DISPLAY_NAME = "display_name";
        public static final String MIME_TYPE = "mime_type";
        public static final String PATH = "path";
        public static final String LATITUDE = "latitude";
        public static final String LONGITUDE = "longitude";
        public static final String SIZE = "size";
        public static final String _TABLENAME0 = "photo";
        public static final String _CREATE0 = "create table if not exists "+_TABLENAME0+"("
                +TITLE+" text not null primary key, "
                +ID+" integer not null , "
                +DATE_ADDED + " text not null,"
                +DISPLAY_NAME + " text not null,"
                +MIME_TYPE + " text not null,"
                +PATH + " text not null,"
                +LATITUDE + " text,"
                +LONGITUDE + " text,"
                +SIZE + " text);";
    }
}
