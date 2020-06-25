package com.example.dataextraction;

import android.content.ContentValues;
import android.content.Context;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import androidx.annotation.Nullable;

public class DBHelper {

    private static final String DATABASE_NAME = "InnerDatabase.db";
    private static final int DATABASE_VERSION = 1;
    public static SQLiteDatabase mDB;
    private DatabaseHelper mDBHelper;
    private Context mCtx;

    private class DatabaseHelper extends SQLiteOpenHelper {
        public DatabaseHelper(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version) {
            super(context, name, factory, version);
        }

        @Override
        public void onCreate(SQLiteDatabase db) {
            db.execSQL(PhotoDataBase.CreateDB._CREATE0);
            db.execSQL(VideoDataBase.CreateDB._CREATE0);
            db.execSQL(AudioDataBase.CreateDB._CREATE0);
            db.execSQL(CalendarDataBase.CreateDB._CREATE0);

            db.execSQL(Databases.CreateDB_App._CREATE_AppInfo);
            db.execSQL(Databases.CreateDB_AccountInfo._CREATE_AccountInfo);
            db.execSQL(Databases.CreateDB_AppUsage_YEAR._CREATE_AppUsage_YEAR);
            db.execSQL(Databases.CreateDB_AppUsage_MONTH._CREATE_AppUsage_MONTH);
            db.execSQL(Databases.CreateDB_AppUsage_WEEK._CREATE_AppUsage_WEEK);
            db.execSQL(Databases.CreateDB_AppUsage_DAY._CREATE_AppUsage_DAY);
            db.execSQL(Databases.CreateDB_PhoneInfo._CREATE_PhoneInfo);
            db.execSQL(Databases.CreateDB_Document._CREATE_Document);

            db.execSQL(CallLogDataBase.CreateDB._CREATE0);
            db.execSQL(ContactDataBase.CreateDB._CREATE0);
            db.execSQL(SMSDataBase.CreateDB._CREATE0);
            db.execSQL(WifiDataBase.CreateDB._CREATE0);
        }

        @Override
        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
            db.execSQL("DROP TABLE IF EXISTS " + PhotoDataBase.CreateDB._TABLENAME0);
            db.execSQL("DROP TABLE IF EXISTS " + VideoDataBase.CreateDB._TABLENAME0);
            db.execSQL("DROP TABLE IF EXISTS " + AudioDataBase.CreateDB._TABLENAME0);
            db.execSQL("DROP TABLE IF EXISTS " + CalendarDataBase.CreateDB._TABLENAME0);

            db.execSQL("DROP TABLE IF EXISTS " + Databases.CreateDB_App.TABLE_NAME);
            db.execSQL("DROP TABLE IF EXISTS " + Databases.CreateDB_AccountInfo.TABLE_NAME);
            db.execSQL("DROP TABLE IF EXISTS " + Databases.CreateDB_AppUsage_YEAR.TABLE_NAME);
            db.execSQL("DROP TABLE IF EXISTS " + Databases.CreateDB_AppUsage_MONTH.TABLE_NAME);
            db.execSQL("DROP TABLE IF EXISTS " + Databases.CreateDB_AppUsage_WEEK.TABLE_NAME);
            db.execSQL("DROP TABLE IF EXISTS " + Databases.CreateDB_AppUsage_DAY.TABLE_NAME);
            db.execSQL("DROP TABLE IF EXISTS " + Databases.CreateDB_PhoneInfo.TABLE_NAME);
            db.execSQL("DROP TABLE IF EXISTS " + Databases.CreateDB_Document.TABLE_NAME);

            db.execSQL("DROP TABLE IF EXISTS " + CallLogDataBase.CreateDB._TABLENAME0);
            db.execSQL("DROP TABLE IF EXISTS " + ContactDataBase.CreateDB._TABLENAME0);
            db.execSQL("DROP TABLE IF EXISTS " + SMSDataBase.CreateDB._TABLENAME0);
            db.execSQL("DROP TABLE IF EXISTS " + WifiDataBase.CreateDB._TABLENAME0);

            onCreate(db);
        }
    }
    public DBHelper(Context context){
        this.mCtx = context;
    }

    public DBHelper open() throws SQLException {
        mDBHelper = new DatabaseHelper(mCtx, DATABASE_NAME, null, DATABASE_VERSION);
        mDB = mDBHelper.getWritableDatabase();
        return this;
    }

    public void close(){
        mDB.close();
    }

    public long insertPColumn(String title, int id, String date_added, String display_name
            , String mime_type, String path, String latitude, String longitude, String size){
        ContentValues values = new ContentValues();
        values.put(PhotoDataBase.CreateDB.TITLE, title);
        values.put(PhotoDataBase.CreateDB.ID, id);
        values.put(PhotoDataBase.CreateDB.DATE_ADDED, date_added);
        values.put(PhotoDataBase.CreateDB.DISPLAY_NAME, display_name);
        values.put(PhotoDataBase.CreateDB.MIME_TYPE, mime_type);
        values.put(PhotoDataBase.CreateDB.PATH, path);
        values.put(PhotoDataBase.CreateDB.LATITUDE, latitude);
        values.put(PhotoDataBase.CreateDB.LONGITUDE, longitude);
        values.put(PhotoDataBase.CreateDB.SIZE, size);
        return mDB.insert(PhotoDataBase.CreateDB._TABLENAME0, null, values);
    }

    public long insertVColumn(String title, String date_added, String display_name, String mime_type
            , String path, String latitude, String longitude, String album, String artist, String bookmark
            ,String category, String description, String language, String resolution, String tags, String size){
        ContentValues values = new ContentValues();
        values.put(VideoDataBase.CreateDB.TITLE, title);
        values.put(VideoDataBase.CreateDB.DATE_ADDED, date_added);
        values.put(VideoDataBase.CreateDB.DISPLAY_NAME, display_name);
        values.put(VideoDataBase.CreateDB.MIME_TYPE, mime_type);
        values.put(VideoDataBase.CreateDB.PATH, path);
        values.put(VideoDataBase.CreateDB.LATITUDE, latitude);
        values.put(VideoDataBase.CreateDB.LONGITUDE, longitude);
        values.put(VideoDataBase.CreateDB.ALBUM, album);
        values.put(VideoDataBase.CreateDB.ARTIST, artist);
        values.put(VideoDataBase.CreateDB.BOOKMARK, bookmark);
        values.put(VideoDataBase.CreateDB.CATEGORY, category);
        values.put(VideoDataBase.CreateDB.DESCRIPTION, description);
        values.put(VideoDataBase.CreateDB.LANGUAGE, language);
        values.put(VideoDataBase.CreateDB.RESOLUTION, resolution);
        values.put(VideoDataBase.CreateDB.TAGS, tags);
        values.put(VideoDataBase.CreateDB.SIZE, size);
        return mDB.insert(VideoDataBase.CreateDB._TABLENAME0, null, values);
    }

    public long insertAColumn(String title, String date_added, String mime_type, String path
            ,String album, String artist, String composer, String year, String size){
        ContentValues values = new ContentValues();
        values.put(AudioDataBase.CreateDB.TITLE, title);
        values.put(AudioDataBase.CreateDB.DATE_ADDED, date_added);
        values.put(AudioDataBase.CreateDB.MIME_TYPE, mime_type);
        values.put(AudioDataBase.CreateDB.PATH, path);
        values.put(AudioDataBase.CreateDB.ALBUM, album);
        values.put(AudioDataBase.CreateDB.ARTIST, artist);
        values.put(AudioDataBase.CreateDB.COMPOSER, composer);
        values.put(AudioDataBase.CreateDB.YEAR, year);
        values.put(AudioDataBase.CreateDB.SIZE, size);
        return mDB.insert(AudioDataBase.CreateDB._TABLENAME0, null, values);
    }

    public long insertCColumn(String calendar_id, String title, String event_location, String description
            , String dtstart, String dtend, String duration, String all_day, String display_name
            , String account_name, String owner_name, String r_rule, String r_date){
        ContentValues values = new ContentValues();
        values.put(CalendarDataBase.CreateDB.TITLE, title);
        values.put(CalendarDataBase.CreateDB.CALENDAR_ID, calendar_id);
        values.put(CalendarDataBase.CreateDB.EVENT_LOCATION, event_location);
        values.put(CalendarDataBase.CreateDB.DESCRIPTION, description);
        values.put(CalendarDataBase.CreateDB.DTSTART, dtstart);
        values.put(CalendarDataBase.CreateDB.DTEND, dtend);
        values.put(CalendarDataBase.CreateDB.DURATION, duration);
        values.put(CalendarDataBase.CreateDB.ALL_DAY, all_day);
        values.put(CalendarDataBase.CreateDB.DISPLAY_NAME, display_name);
        values.put(CalendarDataBase.CreateDB.ACCOUNT_NAME, account_name);
        values.put(CalendarDataBase.CreateDB.OWNER_NAME, owner_name);
        values.put(CalendarDataBase.CreateDB.RRULE, r_rule);
        values.put(CalendarDataBase.CreateDB.RDATE, r_date);
        return mDB.insert(CalendarDataBase.CreateDB._TABLENAME0, null, values);
    }

    //Package 정보에 Network 사용량 추가
    public void addAppInfo(String packageName, String versionName, String applicationName
            , long firstInstallTime, long lastUpdateTime, long wifibytes, long cellularbytes) {
        SQLiteDatabase db = mDBHelper.getWritableDatabase();
        String wifi = String.valueOf(wifibytes);
        String cellular = String.valueOf(cellularbytes);
        ContentValues values = new ContentValues();
        values.put(Databases.CreateDB_App.PACKAGENAME, packageName);
        values.put(Databases.CreateDB_App.VERSION, versionName);
        values.put(Databases.CreateDB_App.NAME, applicationName);
        values.put(Databases.CreateDB_App.FIRSTINSTALL, firstInstallTime);
        values.put(Databases.CreateDB_App.LASTUPDATE, lastUpdateTime);
        values.put(Databases.CreateDB_App.WIFIUSAGE, wifibytes);
        values.put(Databases.CreateDB_App.CELLULARUSAGE, cellularbytes);
        db.insert(Databases.CreateDB_App.TABLE_NAME, null, values);

        //Log.d("LogTest","addAppUsage");

        //Log.d("LogTest", String.valueOf(cellularbytes));
    }
    public void addAccountInfo(String accountname, String accounttype) {
        SQLiteDatabase db = mDBHelper.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(Databases.CreateDB_AccountInfo.ACCOUNTNAME, accountname);
        values.put(Databases.CreateDB_AccountInfo.ACCOUNTTYPE, accounttype);
        db.insert(Databases.CreateDB_AccountInfo.TABLE_NAME, null, values);
        //Log.d("LogTest","addAccountInfo");
    }

    public void addDocumentInfo(String name, String title, long date_added, long date_modified, String mime_type, String path, String size) {
        SQLiteDatabase db = mDBHelper.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(Databases.CreateDB_Document.NAME, name);
        values.put(Databases.CreateDB_Document.TITLE, title);
        values.put(Databases.CreateDB_Document.DATE_ADDED, date_added);
        values.put(Databases.CreateDB_Document.DATE_MODIFIED, date_modified);
        values.put(Databases.CreateDB_Document.MIME_TYPE, mime_type);
        values.put(Databases.CreateDB_Document.PATH, path);
        values.put(Databases.CreateDB_Document.SIZE, size);
        db.insert(Databases.CreateDB_Document.TABLE_NAME, null, values);
        //Log.d("LogTest","addAccountInfo");
    }

    public void addAppUsage_YEAR(String packageName, long firsttimestamp, long lasttimestamp,
                                 long lasttimeused, long totaltimeforeground) {
        SQLiteDatabase db = mDBHelper.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(Databases.CreateDB_AppUsage_YEAR.PACKAGENAME, packageName);
        values.put(Databases.CreateDB_AppUsage_YEAR.FIRSTTIMESTAMP, firsttimestamp);
        values.put(Databases.CreateDB_AppUsage_YEAR.LASTIMESTAMP, lasttimestamp);
        values.put(Databases.CreateDB_AppUsage_YEAR.LASTTIMEUSED, lasttimeused);
        values.put(Databases.CreateDB_AppUsage_YEAR.TOTALTIMEFOREGROUND, totaltimeforeground);
        db.insert(Databases.CreateDB_AppUsage_YEAR.TABLE_NAME, null, values);
        //Log.d("LogTest","addAppUsageYear");
    }

    public void addAppUsage_MONTH(String packageName, long firsttimestamp, long lasttimestamp,
                                  long lasttimeused, long totaltimeforeground) {
        SQLiteDatabase db = mDBHelper.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(Databases.CreateDB_AppUsage_MONTH.PACKAGENAME, packageName);
        values.put(Databases.CreateDB_AppUsage_MONTH.FIRSTTIMESTAMP, firsttimestamp);
        values.put(Databases.CreateDB_AppUsage_MONTH.LASTIMESTAMP, lasttimestamp);
        values.put(Databases.CreateDB_AppUsage_MONTH.LASTTIMEUSED, lasttimeused);
        values.put(Databases.CreateDB_AppUsage_MONTH.TOTALTIMEFOREGROUND, totaltimeforeground);
        db.insert(Databases.CreateDB_AppUsage_MONTH.TABLE_NAME, null, values);
        //Log.d("LogTest","addAppUsageMonth");
    }

    public void addAppUsage_WEEK(String packageName, long firsttimestamp, long lasttimestamp,
                                 long lasttimeused, long totaltimeforeground) {
        SQLiteDatabase db = mDBHelper.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(Databases.CreateDB_AppUsage_WEEK.PACKAGENAME, packageName);
        values.put(Databases.CreateDB_AppUsage_WEEK.FIRSTTIMESTAMP, firsttimestamp);
        values.put(Databases.CreateDB_AppUsage_WEEK.LASTIMESTAMP, lasttimestamp);
        values.put(Databases.CreateDB_AppUsage_WEEK.LASTTIMEUSED, lasttimeused);
        values.put(Databases.CreateDB_AppUsage_WEEK.TOTALTIMEFOREGROUND, totaltimeforeground);
        db.insert(Databases.CreateDB_AppUsage_WEEK.TABLE_NAME, null, values);
        //Log.d("LogTest","addAppUsageWeek");
    }

    public void addAppUsage_DAY(String packageName, long firsttimestamp, long lasttimestamp,
                                long lasttimeused, long totaltimeforeground) {
        SQLiteDatabase db = mDBHelper.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(Databases.CreateDB_AppUsage_DAY.PACKAGENAME, packageName);
        values.put(Databases.CreateDB_AppUsage_DAY.FIRSTTIMESTAMP, firsttimestamp);
        values.put(Databases.CreateDB_AppUsage_DAY.LASTIMESTAMP, lasttimestamp);
        values.put(Databases.CreateDB_AppUsage_DAY.LASTTIMEUSED, lasttimeused);
        values.put(Databases.CreateDB_AppUsage_DAY.TOTALTIMEFOREGROUND, totaltimeforeground);
        db.insert(Databases.CreateDB_AppUsage_DAY.TABLE_NAME, null, values);
        Log.d("LogTest","addAppUsageDay");
    }
    public void addPhoneInfo(int phonetype, String softwarenumber, String phonenumber, String subscriberid,
                             String adid, int callstate, int datastate,
                             int networktype, String networkcountryiso, String simcountryiso,
                             String networkoperater, String simoperator, String networkoperatorname,
                             String simoperatorname, String simserialnumber, int simstate,
                             boolean isnetworkroming) {
        SQLiteDatabase db = mDBHelper.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(Databases.CreateDB_PhoneInfo.PHONETYPE, phonetype);
        values.put(Databases.CreateDB_PhoneInfo.SOFTWARENUMBER, softwarenumber);
        values.put(Databases.CreateDB_PhoneInfo.PHONENUMBER, phonenumber);
        values.put(Databases.CreateDB_PhoneInfo.SUBSCRIBERID, subscriberid);
        values.put(Databases.CreateDB_PhoneInfo.ADID, adid);
        values.put(Databases.CreateDB_PhoneInfo.CALLSTATE, callstate);
        values.put(Databases.CreateDB_PhoneInfo.DATASTATE, datastate);
        values.put(Databases.CreateDB_PhoneInfo.NETWORKTYPE, networktype);
        values.put(Databases.CreateDB_PhoneInfo.NETWORKCOUNTRYISO, networkcountryiso);
        values.put(Databases.CreateDB_PhoneInfo.SIMCOUNTRYISO, simcountryiso);
        values.put(Databases.CreateDB_PhoneInfo.NETWORKOPERATER, networkoperater);
        values.put(Databases.CreateDB_PhoneInfo.SIMOPERATOR, simoperator);
        values.put(Databases.CreateDB_PhoneInfo.NETWORKOPERATORNAME, networkoperatorname);
        values.put(Databases.CreateDB_PhoneInfo.SIMOPERATORNAME, simoperatorname);
        values.put(Databases.CreateDB_PhoneInfo.SIMSERIALNUMBER, simserialnumber);
        values.put(Databases.CreateDB_PhoneInfo.SIMSTATE, simstate);
        values.put(Databases.CreateDB_PhoneInfo.ISNETWORKROMING, isnetworkroming);
        db.insert(Databases.CreateDB_PhoneInfo.TABLE_NAME, null, values);
        Log.d("LogTest", "addPhoneInfo");
    }

    public long insertCallLogColumn(String type, String name, String number, String duration
            , String date){
        ContentValues values = new ContentValues();
        values.put(CallLogDataBase.CreateDB.TYPE, type);
        values.put(CallLogDataBase.CreateDB.NAME, name);
        values.put(CallLogDataBase.CreateDB.NUMBER, number);
        values.put(CallLogDataBase.CreateDB.DURATION, duration);
        values.put(CallLogDataBase.CreateDB.DATE, date);
        return mDB.insert(CallLogDataBase.CreateDB._TABLENAME0, null, values);
    }

    public long insertContactColumn(String number, String name, String photo_id, String person_id){
        ContentValues values = new ContentValues();
        values.put(ContactDataBase.CreateDB.NUMBER, number);
        values.put(ContactDataBase.CreateDB.NAME, name);
        values.put(ContactDataBase.CreateDB.PHOTO_ID, photo_id);
        values.put(ContactDataBase.CreateDB.PERSON_ID, person_id);
        return mDB.insert(ContactDataBase.CreateDB._TABLENAME0, null, values);
    }

    public long insertSMSColumn(String mid, String tid, String type, String address, String person
            , String creator, String date, String body, String read){
        ContentValues values = new ContentValues();
        values.put(SMSDataBase.CreateDB.MID, mid);
        values.put(SMSDataBase.CreateDB.TID, tid);
        values.put(SMSDataBase.CreateDB.TYPE, type);
        values.put(SMSDataBase.CreateDB.ADDRESS, address);
        values.put(SMSDataBase.CreateDB.PERSON, person);
        values.put(SMSDataBase.CreateDB.CREATOR, creator);
        values.put(SMSDataBase.CreateDB.DATE, date);
        values.put(SMSDataBase.CreateDB.BODY, body);
        values.put(SMSDataBase.CreateDB.READ_C, read);
        return mDB.insert(SMSDataBase.CreateDB._TABLENAME0, null, values);
    }

    public long insertWifiColumn(String id, String ssid, String bssid, String wepkeys){
        ContentValues values = new ContentValues();
        values.put(WifiDataBase.CreateDB.ID, id);
        values.put(WifiDataBase.CreateDB.SSID, ssid);
        values.put(WifiDataBase.CreateDB.BSSID, bssid);
        values.put(WifiDataBase.CreateDB.WEPKEYS, wepkeys);
        return mDB.insert(WifiDataBase.CreateDB._TABLENAME0, null, values);
    }
}
