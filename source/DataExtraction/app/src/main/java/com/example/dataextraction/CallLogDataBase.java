package com.example.dataextraction;

import android.provider.BaseColumns;

public class CallLogDataBase {
    public static final class CreateDB implements BaseColumns {
        public static final String ID = "id";
        public static final String TYPE = "type";
        public static final String NAME = "name";
        public static final String NUMBER = "number";
        public static final String DURATION = "duration";
        public static final String DATE = "date";
        public static final String _TABLENAME0 = "calllog";
        public static final String _CREATE0 = "create table if not exists "+_TABLENAME0+"("
                +ID+" INTEGER PRIMARY KEY autoincrement, "
                +TYPE+" integer,"
                +NAME + " text,"
                +NUMBER + " text,"
                +DURATION + " integer,"
                +DATE + " text);";
    }
}
