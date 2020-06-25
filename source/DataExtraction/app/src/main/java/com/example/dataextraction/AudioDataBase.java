package com.example.dataextraction;

import android.provider.BaseColumns;

public final class AudioDataBase {
    public static final class CreateDB implements BaseColumns {
        public static final String TITLE = "title";
        public static final String DATE_ADDED = "date_added";
        public static final String MIME_TYPE = "mime_type";
        public static final String PATH = "path";
        public static final String ALBUM = "album";
        public static final String ARTIST = "artist";
        public static final String COMPOSER = "composer";
        public static final String YEAR = "year";
;        public static final String SIZE = "size";
        public static final String _TABLENAME0 = "audio";
        public static final String _CREATE0 = "create table if not exists "+_TABLENAME0+"("
                +TITLE+" text not null primary key , "
                +DATE_ADDED + " text not null ,"
                +MIME_TYPE + " text not null ,"
                +PATH + " text not null ,"
                +ALBUM + " text, "
                +ARTIST+ " text, "
                +COMPOSER+" text, "
                +YEAR+" text, "
                +SIZE+" text);";

    }
}
