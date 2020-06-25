package com.example.dataextraction;

import android.provider.BaseColumns;

public final class MobileNetworkDataBase {
    public static final class CreateDB implements BaseColumns{
        public static final String NET_ID = "net_id";
        public static final String DOMAIN = "domain";
        public static final String INTERFACE_NAME = "interface_name";
        public static final String HOST_ADDRESS = "host_address";
        public static final String PREFIX_LENGTH = "prefix_length";
        public static final String DESTINATION = "destination";
        public static final String D_PREFIX = "d_prefix";
        public static final String GATEWAY = "gateway";
        public static final String _TABLENAME0 = "network_info";
        public static final String _TABLENAME1 = "inetAddress";
        public static final String _TABLENAME2 = "linkAddress";
        public static final String _TABLENAME3 = "routeinfo";
        public static final String _CREATE0 = "create table if not exists "
                +_TABLENAME0 + " ( "
                +NET_ID + " text not null, "
                +DOMAIN + " text, "
                +INTERFACE_NAME+ " text); ";
        public static final String _CREATE1 = "create table if not exists "
                +_TABLENAME1 + " ( "
                +NET_ID + " text not null, "
                +HOST_ADDRESS + " text not null, "
                +" constraint net_id_fk foreign key(net_id) references network_info);";
        public static final String _CREATE2 = "create table if not exists "
                +_TABLENAME2 + " ( "
                +NET_ID + " text not null, "
                +HOST_ADDRESS + " text not null, "
                +PREFIX_LENGTH+ " integer not null, "
                +" constraint net_id_fk foreign key(net_id) references network_info);";
        public static final String _CREATE3 = "create table if not exists "
                +_TABLENAME3+ " ( "
                +NET_ID+ " text not null, "
                +DESTINATION + " text not null, "
                +D_PREFIX + " integer not null, "
                +GATEWAY+ " text not null, "
                +INTERFACE_NAME + " text , "
                +" constraint net_id_fk foreign key(net_id) references network_info);";

    }
}
