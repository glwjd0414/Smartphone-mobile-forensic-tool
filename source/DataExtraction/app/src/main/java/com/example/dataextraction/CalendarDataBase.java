package com.example.dataextraction;

import android.provider.BaseColumns;

public final class CalendarDataBase {
    public static final class CreateDB implements BaseColumns {
        public static final String CALENDAR_ID = "calendar_id";
        public static final String TITLE = "title";
        public static final String EVENT_LOCATION = "event_location";
        public static final String DESCRIPTION = "description";
        public static final String DTSTART = "dtstart";
        public static final String DTEND = "dtend";
        public static final String DURATION = "duration";
        public static final String ALL_DAY = "all_day";
        public static final String DISPLAY_NAME = "display_name";
        public static final String ACCOUNT_NAME = "account_name";
        public static final String OWNER_NAME = "owner_name";
        public static final String RRULE = "rrlue";
        public static final String RDATE = "rdate";
        public static final String _TABLENAME0 = "calendar";
        public static final String _CREATE0 = "create table if not exists "+_TABLENAME0+"("
                + " id integer primary key autoincrement, "
                +TITLE+" text not null , "
                +CALENDAR_ID + " text not null, "
                +EVENT_LOCATION + " text , "
                +DESCRIPTION + " text, "
                +DTSTART + " text not null, "
                +DTEND + " text not null, "
                +DURATION+ " text , "
                +ALL_DAY + " text, "
                +DISPLAY_NAME + " text not null, "
                +ACCOUNT_NAME + " text not null, "
                +OWNER_NAME+ " text not null, "
                +RRULE + " text, "
                +RDATE + " text );";

    }
}
