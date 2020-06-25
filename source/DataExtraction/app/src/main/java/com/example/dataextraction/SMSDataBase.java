package com.example.dataextraction;

import android.provider.BaseColumns;

public class SMSDataBase {
    public static final class CreateDB implements BaseColumns {
        public static final String MID = "mid";
        public static final String TID = "tid";
        public static final String TYPE = "type";
        public static final String ADDRESS = "address";
        public static final String PERSON = "person";
        public static final String CREATOR = "creator";
        public static final String DATE = "date";
        public static final String BODY = "body";
        public static final String READ_C = "read_c";
        public static final String _TABLENAME0 = "sms";
        public static final String _CREATE0 = "create table if not exists "+_TABLENAME0+"("
                +MID+" integer not null primary key, "
                +TID+" integer,"
                +TYPE + " integer,"
                +ADDRESS+" text,"
                +PERSON + " text,"
                +CREATOR+" text,"
                +DATE + " text,"
                +BODY + " text,"
                +READ_C + " integer);";
    }
}
