package com.example.dataextraction;

import android.provider.BaseColumns;

public class ContactDataBase {
    public static final class CreateDB implements BaseColumns {
        public static final String NUMBER = "number";
        public static final String NAME = "name";
        public static final String PHOTO_ID = "photo_id";
        public static final String PERSON_ID = "person_id";
        public static final String _TABLENAME0 = "contact";
        public static final String _CREATE0 = "create table if not exists "+_TABLENAME0+"("
                +NUMBER+" text not null primary key, "
                +NAME+" text,"
                +PHOTO_ID + " integer,"
                +PERSON_ID + " integer);";
    }
}
