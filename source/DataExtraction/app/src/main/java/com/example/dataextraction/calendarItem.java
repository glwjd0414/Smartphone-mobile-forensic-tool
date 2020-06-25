package com.example.dataextraction;

import android.os.Parcel;
import android.os.Parcelable;

public class calendarItem implements Parcelable {
    String calID, displayName, accountName, ownerName, title, loc, desc, dtstart,
            dtend, duration, allday, rrule, rdate;

    public calendarItem(){}
    public calendarItem(Parcel in){
        this.calID=in.readString();
        this.displayName=in.readString();
        this.accountName=in.readString();
        this.ownerName=in.readString();
        this.title=in.readString();
        this.loc=in.readString();
        this.desc=in.readString();
        this.dtstart=in.readString();
        this.dtend=in.readString();
        this.duration=in.readString();
        this.allday=in.readString();
        this.rrule=in.readString();
        this.rdate=in.readString();
    }

    public String getCalID() {
        return calID;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getAccountName() {
        return accountName;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public String getTitle() {
        return title;
    }

    public String getLoc() {
        return loc;
    }

    public String getDesc() {
        return desc;
    }

    public String getDtstart() {
        return dtstart;
    }

    public String getDtend() {
        return dtend;
    }

    public String getDuration() {
        return duration;
    }

    public String getAllday() {
        return allday;
    }

    public String getRrule() {
        return rrule;
    }

    public String getRdate() {
        return rdate;
    }

    public void setCalID(String calID) {
        this.calID = calID;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public void setDtend(String dtend) {
        this.dtend = dtend;
    }

    public void setDtstart(String dtstart) {
        this.dtstart = dtstart;
    }

    public void setAllday(String allday) {
        this.allday = allday;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public void setLoc(String loc) {
        this.loc = loc;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setRdate(String rdate) {
        this.rdate = rdate;
    }

    public void setRrule(String rrule) {
        this.rrule = rrule;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(this.calID);
        dest.writeString(this.displayName);
        dest.writeString(this.accountName);
        dest.writeString(this.ownerName);
        dest.writeString(this.title);
        dest.writeString(this.loc);
        dest.writeString(this.desc);
        dest.writeString(this.dtstart);
        dest.writeString(this.dtend);
        dest.writeString(this.duration);
        dest.writeString(this.allday);
        dest.writeString(this.rrule);
        dest.writeString(this.rdate);
    }

    @SuppressWarnings("rawtypes")
    public static final Creator CREATOR = new Creator() {

        @Override
        public calendarItem createFromParcel(Parcel in) {
            return new calendarItem(in);
        }

        @Override
        public calendarItem[] newArray(int size) {
            // TODO Auto-generated method stub
            return new calendarItem[size];
        }
    };
}
