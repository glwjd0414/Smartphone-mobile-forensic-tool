package com.example.dataextraction;

import android.provider.BaseColumns;

import java.lang.reflect.Field;

//데이터베이스 클래스
public final class Databases {

    private Databases() {}
    public static final class CreateDB_Document implements BaseColumns {
        public static final String TABLE_NAME = "DocumentInfo";
        public static final String NAME = "name";
        public static final String TITLE = "title";
        public static final String DATE_ADDED = "date_added";
        public static final String DATE_MODIFIED = "date_modified";
        public static final String MIME_TYPE = "mime_type";
        public static final String PATH = "path";
        public static final String SIZE = "size";
        public static final String _CREATE_Document = "create table if not exists "+TABLE_NAME+"("
                +NAME+" text not null primary key, "
                +TITLE+" text not null , "
                +MIME_TYPE+" text not null , "
                +DATE_ADDED+" timestamp not null , "
                +DATE_MODIFIED+" timestamp not null , "
                +PATH+" text not null , "
                +SIZE+" text not null);";
    }

    public static final class CreateDB_App implements BaseColumns {
        public static final String TABLE_NAME = "AppInfo";
        public static final String PACKAGENAME = "packagename";
        public static final String VERSION = "version";
        public static final String NAME = "name";
        public static final String FIRSTINSTALL = "firstinstall";
        public static final String LASTUPDATE = "lastupdate";
        public static final String WIFIUSAGE = "wifiusage";
        public static final String CELLULARUSAGE = "cellularusage";
        public static final String USAGETIME = "usagetime";
        public static final String _CREATE_AppInfo = "create table if not exists "+TABLE_NAME+"("
                +PACKAGENAME+" text not null primary key, "
                +VERSION+" text not null , "
                +NAME+" text not null , "
                +FIRSTINSTALL+" timestamp not null , "
                +LASTUPDATE+" timestamp not null , "
                +WIFIUSAGE+" bigint not null , "
                +CELLULARUSAGE+" bigint not null);";
    }

    public static final class CreateDB_AppUsage_YEAR implements BaseColumns {
        public static final String TABLE_NAME = "AppUsageYear";
        public static final String PACKAGENAME = "packagename";
        public static final String FIRSTTIMESTAMP = "firsttimestamp";
        public static final String LASTIMESTAMP = "lasttimestamp";
        public static final String LASTTIMEUSED = "lasttimeused";
        public static final String TOTALTIMEFOREGROUND = "totaltimeforeground";
        public static final String _CREATE_AppUsage_YEAR = "create table if not exists "+TABLE_NAME+"("
                +PACKAGENAME+" text not null , "
                +FIRSTTIMESTAMP+" timestamp not null , "
                +LASTIMESTAMP+" timestamp not null , "
                +LASTTIMEUSED+" timestamp not null , "
                +TOTALTIMEFOREGROUND+" bigint not null default 0, primary key(" +PACKAGENAME +"," + FIRSTTIMESTAMP+ "));";
    }

    public static final class CreateDB_AppUsage_MONTH implements BaseColumns {
        public static final String TABLE_NAME = "AppUsageMonth";
        public static final String PACKAGENAME = "packagename";
        public static final String FIRSTTIMESTAMP = "firsttimestamp";
        public static final String LASTIMESTAMP = "lasttimestamp";
        public static final String LASTTIMEUSED = "lasttimeused";
        public static final String TOTALTIMEFOREGROUND = "totaltimeforeground";
        public static final String _CREATE_AppUsage_MONTH = "create table if not exists "+TABLE_NAME+"("
                +PACKAGENAME+" text not null , "
                +FIRSTTIMESTAMP+" timestamp not null , "
                +LASTIMESTAMP+" timestamp not null , "
                +LASTTIMEUSED+" timestamp not null , "
                +TOTALTIMEFOREGROUND+" bigint not null default 0, primary key(" +PACKAGENAME +"," + FIRSTTIMESTAMP+ "));";
    }

    public static final class CreateDB_AppUsage_WEEK implements BaseColumns {
        public static final String TABLE_NAME = "AppUsageWeek";
        public static final String PACKAGENAME = "packagename";
        public static final String FIRSTTIMESTAMP = "firsttimestamp";
        public static final String LASTIMESTAMP = "lasttimestamp";
        public static final String LASTTIMEUSED = "lasttimeused";
        public static final String TOTALTIMEFOREGROUND = "totaltimeforeground";
        public static final String _CREATE_AppUsage_WEEK = "create table if not exists "+TABLE_NAME+"("
                +PACKAGENAME+" text not null , "
                +FIRSTTIMESTAMP+" timestamp not null , "
                +LASTIMESTAMP+" timestamp not null , "
                +LASTTIMEUSED+" timestamp not null , "
                +TOTALTIMEFOREGROUND+" bigint not null default 0, primary key(" +PACKAGENAME +"," + FIRSTTIMESTAMP+ "));";
    }

    public static final class CreateDB_AppUsage_DAY implements BaseColumns {
        public static final String TABLE_NAME = "AppUsageDay";
        public static final String PACKAGENAME = "packagename";
        public static final String FIRSTTIMESTAMP = "firsttimestamp";
        public static final String LASTIMESTAMP = "lasttimestamp";
        public static final String LASTTIMEUSED = "lasttimeused";
        public static final String TOTALTIMEFOREGROUND = "totaltimeforeground";
        public static final String _CREATE_AppUsage_DAY = "create table if not exists "+TABLE_NAME+"("
                +PACKAGENAME+" text not null , "
                +FIRSTTIMESTAMP+" timestamp not null , "
                +LASTIMESTAMP+" timestamp not null , "
                +LASTTIMEUSED+" timestamp not null , "
                +TOTALTIMEFOREGROUND+" bigint not null default 0, primary key(" +PACKAGENAME +"," + FIRSTTIMESTAMP+ "));";
    }

    public static final class CreateDB_AccountInfo implements BaseColumns {
        public static final String TABLE_NAME = "AccountInfo";
        public static final String ACCOUNTNAME = "accountname";
        public static final String ACCOUNTTYPE = "accounttype";
        public static final String _CREATE_AccountInfo = "create table if not exists "+TABLE_NAME+"("
                +ACCOUNTNAME+" text not null , "
                +ACCOUNTTYPE+" text not null , primary key(" + ACCOUNTNAME + "," + ACCOUNTTYPE + ")) ";
    }

    public static final class CreateDB_PhoneInfo implements BaseColumns {
        public static final String TABLE_NAME = "PhoneInfo";
        public static final String PHONETYPE = "phonetype";
        public static final String SOFTWARENUMBER = "softwarenumber";
        public static final String PHONENUMBER = "phonenumber";
        public static final String SUBSCRIBERID = "subscriberid";
        public static final String ADID = "adid";
        public static final String CALLSTATE = "callstate";
        public static final String DATASTATE = "datastate";
        public static final String NETWORKTYPE = "networktype";
        public static final String NETWORKCOUNTRYISO = "networkcountryiso";
        public static final String SIMCOUNTRYISO = "simcountryiso";
        public static final String NETWORKOPERATER = "networkoperater";
        public static final String SIMOPERATOR = "simoperator";
        public static final String NETWORKOPERATORNAME = "networkoperatorname";
        public static final String SIMOPERATORNAME = "simoperatorname";
        public static final String SIMSERIALNUMBER = "simserialnumber";
        public static final String SIMSTATE = "simstate";
        public static final String ISNETWORKROMING = "isnetworkroming";

        public static final String _CREATE_PhoneInfo = "create table if not exists "+TABLE_NAME+"("
                +PHONETYPE+" int not null primary key, "
                +SOFTWARENUMBER+" text  , "
                +PHONENUMBER+" text  , "
                +SUBSCRIBERID+" text  , "
                +ADID+" text  , "
                +CALLSTATE+" int  , "
                +DATASTATE+" int  , "
                +NETWORKTYPE+" int  , "
                +NETWORKCOUNTRYISO+" text  , "
                +SIMCOUNTRYISO+" text  , "
                +NETWORKOPERATER+" text  , "
                +SIMOPERATOR+" text  , "
                +NETWORKOPERATORNAME+" text  , "
                +SIMOPERATORNAME+" text  , "
                +SIMSERIALNUMBER+" text  , "
                +SIMSTATE+" int  , "
                +ISNETWORKROMING +" bool ) ";
    }
}
