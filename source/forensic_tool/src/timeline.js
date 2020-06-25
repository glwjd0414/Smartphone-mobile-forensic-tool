const {remote, ipcRenderer} = require("electron");
//const html2canvas = require("html2canvas");
//const jsPDF = require("jspdf");

const main = document.getElementById("main");
const btn = document.getElementById("start");

var today = new Date();
document.getElementById("date").max = today.toISOString().substring(0, 10);
var mysql = require('mysql');
//mysql 연동

var connection = mysql.createConnection({
    user:'root',
    password:'1234',
    database : 'dataextraction'
})

var photolist = new Array();
var callloglist = new Array();
var smslist = new Array();
var usagelist = new Array(); 
var callist = new Array();

var img_src = [
    ["com.everytime.v2", "../assets/img/everytime.png"],
    ["kr.co.aladin.ebook", "../assets/img/aladin_ebook.png"],
    ["com.google.android.gm", "../assets/img/gmail.png"],
    ["kr.co.aladin.third_shop", "../assets/img/aladin.png"],
    ["com.google.android.talk", "../assets/img/hangout.png"],
    ["com.iloen.melon","../assets/img/melon.png"],
    ["com.instagram.android", "../assets/img/instagram.png"],
    ["com.twitter.android", "../assets/img/twitter.png"],
    ["com.kakao.talk", "../assets/img/kakaotalk.png"],
    ["com.google.android.youtube", "../assets/img/youtube.png"],
    ["com.snowcorp.soda.android", "../assets/img/soda.png"],
    ["com.nhn.android.blog", "../assets/img/nhnblog.png"],
    ["com.nhn.android.webtoon", "../assets/img/nhnwebtoon.png"]
];

connection.connect();

btn.addEventListener("click", () => {
    var date = new String(document.getElementById("date").value);
    var datetype = new Date(date);
    datetype.setHours(datetype.getHours()-9);
    var day_start = datetype.getTime();
    datetype.setHours(datetype.getHours()+24);
    datetype.setSeconds(datetype.getMilliseconds()-1);
    var day_end = datetype.getTime();
    var s_date = date + " 00:00:00";
    var e_date = date + " 23:59:59";

    
    connection.query('SELECT * FROM calllog where date_format(date, "%Y-%m-%d %T") between ? and ?',[s_date, e_date], async function(error, results, fields){
        if(error){
            ipcRenderer.send("print", err);
        }
        else{
            callloglist = await results;
        }
    } ) ;
    connection.query('SELECT * FROM sms where date_format(date, "%Y-%m-%d %T") between ? and ?',[s_date, e_date], async function(error, results, fields){
        if(error){
            ipcRenderer.send("print", err);
        }
        else{
            smslist = await results;
        }
    } ) ;
    connection.query('SELECT * FROM calendar where date_format(dtstart, "%Y-%m-%d %T") between ? and ? and account_name <> "대한민국의 휴일" and account_name <> "Holiday Calendar"',[s_date, e_date], async function(error, results, fields){
        if(error){
            ipcRenderer.send("print", err);
        }
        else{
            callist = await results;
        }
    } ) ;
    connection.query("SELECT A.*, B.name as name FROM AppUsageDay A, AppInfo B  WHERE A.lasttimeused between ? and ? and A.totaltimeforeground <> 0 and (A.packagename = B.packagename) order by totaltimeforeground desc",[day_start, day_end], async function(error, results, fields){
        if(error){
            ipcRenderer.send("print", err.msg);
        }
        else{
            usagelist = await results;
        }
    } ) ;
    day_start = day_start.toString().substring(0, 10);
    day_end = day_end.toString().substring(0, 10);
    connection.query('SELECT * FROM photo WHERE date_added between ? and ?',[day_start, day_end], async function(error, results, fields){
        if(error){
            ipcRenderer.send("print", err);
        }
        else{
            photolist = await results;
            makeTimeline();
            create.style.visibility = "visible";
        }
    } ) ;
});



function makeTimeline(){
    var timeline = new Array();
    photolist.forEach(element => {
        var time = new Date(Number(element.date_added)*1000).getTime();
        var latlng = {lat : Number(element.latitude), lng : Number(element.longitude)};
        var address = new String();
        /*geocoder.geocode({'location' : latlng}, async function(results, status){
            if(status == 'OK'){
                if(results[0]){
                    address = await results[0].formatted_address;
                }
            }
        });
        */
        timeline.push([time, 0, element.display_name]);
    });
    callloglist.forEach(element =>{
        var time = new Date(element.date).getTime();
        timeline.push([time, 1, element.id]);
    });
    smslist.forEach(element=>{
        var time = new Date(element.date).getTime();
        timeline.push([time, 2, element.mid]);
    });
    callist.forEach(element=>{
        var time = new Date(element.dtstart).getTime();
        timeline.push([time, 3, element.id]);
    })
    usagelist.forEach(element=>{
        var time = new Date(Number(element.lasttimeused)- Number(element.totaltimeforeground)).getTime();
        timeline.push([time, 4, element.packagename, element.totaltimeforeground, element.name]);
    });

    for(var i = 0; i< timeline.length-1; i++){
        for(var j =i+1; j<timeline.length; j++){
            if(timeline[j][0] < timeline[i][0]){
                var tmp =timeline[i];
                timeline[i] = timeline[j];
                timeline[j] = tmp;
            }
        }
    }

    var myHTML = '';
    timeline.forEach(async function(element, idx){
        var time = new Date(element[0]);
        //time.setHours(time.getHours());
        var hour = time.getHours() % 12 || 12;
        var day_time = "AM";
        if(time.getHours() >= 12){
            day_time = "PM"
        }
        var t_str = hour.toString().padStart(2, '0') + ":" + time.getMinutes().toString().padStart(2,'0') + " " + day_time;
        if(element[1] == 0){
            //photo
            var photo =  photolist.filter(function(photo){return photo.display_name == element[2]});
            var path = photo[0].path;
            var num = path.indexOf("DCIM");
            var folder_path = new String();
            folder_path = "../photos/"+ path.substring(num);
            myHTML += '<div class="timeline" >'
                +'<a href="#" class="timeline-content" id="photo'+idx.toString()+'">'
                    +'<div class="timeline-icon">'
                        +'<i class="fas fa-camera-retro"></i>'
                    +'</div>'
                    +'<h3 class="title">['+t_str+'] '+element[2]+'</h3>'
                    +'<p class="description">'
                        +'<img src="'+folder_path+'" style="width :300px;">'
                    +'</p>'
                    +'<p class="description">'
                    +'<div class="form-group shadow-textarea">'
                    +'<label for="exampleFormControlTextarea6"></label>'
                    +'<textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Write something about this photo..."></textarea>'
                    +'</div>'
                +'</a>'
                //+'<p class="float_right"><button class="p_btn" id="create'+idx.toString()+'" onclick="getPDF(this.id)">C</button></p>'
                +'</div>'

        }
        else if(element[1] == 1){
            //calllog
            var calllog = callloglist.filter(function(log){return log.id == element[2]});
            var type = '';
            if(calllog[0].type == 1){
                type = "수신"
            }
            else if(calllog[0].type == 2){
                type = "발신"
            }
            else if(calllog[0].type == 3){
                type = "부재 중"
            }
            else{
                return;
            }
            myHTML += '<div class="timeline">'
                +'<a href="#" class="timeline-content">'
                    +'<div class="timeline-icon">'
                        +'<i class="fas fa-phone-alt"></i>'
                    +'</div>'
                    +'<h3 class="title">['+t_str+'] '+calllog[0].number+'</h3>'
                    +'<p class="description"><b>'
                        +type+'</b>  '+ calllog[0].duration+'초'
                    +'</p>'
                +'</a>'
                +'</div>'
        }
        else if(element[1] == 2){
            //sms
            var sms = smslist.filter(function(msg){return msg.mid == element[2]});
            var type = '';
            if(sms[0].type == 1){
                type = "수신"
            }
            else if(sms[0].type == 2){
                type = "발신"
            }
            else if(sms[0].type == 3){
                type = "부재 중"
            }
            else{
                type = "스팸"
            }
            myHTML += '<div class="timeline">'
                +'<a href="#" class="timeline-content">'
                    +'<div class="timeline-icon">'
                        +'<i class="fas fa-comments"></i>'
                    +'</div>'
                    +'<h3 class="title">['+t_str+'] '+sms[0].address+'</h3>'
                    +'<p class="description"><b>'
                        +type+'</b><br>'+ sms[0].body
                    +'</p>'
                +'</a>'
                +'</div>'
        }
        else if(element[1] == 3){
            //calendar
            var cal = callist.filter(function(cal){return cal.id == element[2]});
            myHTML += '<div class="timeline">'
                +'<a href="#" class="timeline-content">'
                    +'<div class="timeline-icon">'
                        +'<i class="fas fa-calendar-check"></i>'
                    +'</div>'
                    +'<h3 class="title">['+t_str+'] '+cal[0].calendar_id+'</h3>'
                    +'<p class="description">'
                        +cal[0].event_location+'<br>  '+ cal[0].description
                    +'</p>'
                +'</a>'
                +'</div>'
        }
        else{
            //app usage
            var name = element[2].toString();
            if(name.indexOf("com.android") == -1 && name.indexOf("com.lge") == -1){
                var src = img_src.filter(function(app){return app[0] == name});
                var m = (Number(element[3])/60000).toFixed(2);
                if(src.length == 0){
                    myHTML += '<div class="timeline">'
                    +'<a href="#" class="timeline-content">'
                        +'<div class="timeline-icon">'
                            +'<i class="fas fa-mobile-alt"></i>'
                        +'</div>'
                        +'<h3 class="title">['+t_str+'] '+element[4]+'</h3>'
                        +'<p class="description">'
                            +'<br>사용 시간 : ' +m + '분'
                            +'<img src="../assets/img/app.png" style="width :50px;position:absolute; right:10%; bottom:15%">'
                        +'</p>'
                        +'<p class="description">'
                        +'</p>'
                    +'</a>'
                    +'</div>'
                    
                }
                else{
                    myHTML += '<div class="timeline">'
                    +'<a href="#" class="timeline-content">'
                        +'<div class="timeline-icon">'
                            +'<i class="fas fa-mobile-alt"></i>'
                        +'</div>'
                        +'<h3 class="title">['+t_str+'] '+element[4]+'</h3>'
                        +'<p class="description">'
                            +'<br>사용 시간 : ' +m + '분'
                            +'<img src="'+src[0][1]+'" style="width :50px;position:absolute; right:10%; bottom:15%">'
                        +'</p>'
                    +'</a>'
                    +'</div>'
                }   
            }
        }
    });
    main.innerHTML = myHTML;
    
}
/**
 * function getPDF(id){
    var index = id.substring(6);
    const pdf_wrap = document.getElementById('photo'+index);
    html2canvas(pdf_wrap).then(function(canvas){
        var doc = new jsPDF('p', 'mm', 'a4');
        var imgData = canvas.toDataURL('image/png');
        window.open(imgData, "test");
        doc.addImage(imgData, 'PNG', 0, 0);
        doc.save('photo'+index+'.pdf');
    });
};
 */
