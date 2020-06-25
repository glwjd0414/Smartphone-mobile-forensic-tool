package com.example.dataextraction;

import android.provider.BaseColumns;

public class WifiDataBase {
    public static final class CreateDB implements BaseColumns {
        public static final String ID = "id";
        public static final String SSID = "ssid";
        public static final String BSSID = "bssid";
        public static final String WEPKEYS = "wepkeys";
        public static final String _TABLENAME0 = "wifi";
        public static final String _CREATE0 = "create table if not exists "+_TABLENAME0+"("
                +ID+" integer not null primary key, "
                +SSID+" text,"
                +BSSID + " text,"
                +WEPKEYS + " text);";
    }
}
