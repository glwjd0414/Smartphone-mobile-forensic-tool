var choosed_menu="analysis1";

var title_text="통계";
var label_text=[];
var label_data1_text="수";
var label_data1=[];
var label_data2_text="수";
var label_data2=[];
var label_data3_text="수";
var label_data3=[];
var label_data4_text="수";
var label_data4=[];
var label_text_nu=[];
var label_data1_text_nu="수";
var label_data1_nu=[];
var label_data2_text_nu="수";
var label_data2_nu=[];
var label_data3_text_nu="수";
var label_data3_nu=[];
var label_data4_text_nu="수";
var label_data4_nu=[];

var date_start="";
var date_end="";
var number=[];
var list_date_start="";
var list_date_end="";
var list_number=[];
var rank_date_start="";
var rank_date_end="";
var timeline_date_start="";
var timeline_date_end="";
var timeline_number=[];
var restime_number=[];

var month_6=[];
var logcount_6=[];
var callcount_6=[];
var smscount_6=[];
var durationsum_6=[];
var logcount_6nu=[];
var callcount_6nu=[];
var smscount_6nu=[];
var durationsum_6nu=[];

var month=[];
var logcount=[];
var callcount=[];
var smscount=[];
var durationsum=[];
var logcount_nu=[];
var callcount_nu=[];
var smscount_nu=[];
var durationsum_nu=[];

var month_b=[];
var logcount_b=[];
var callcount_b=[];
var smscount_b=[];
var durationsum_b=[];
var logcount_bnu=[];
var callcount_bnu=[];
var smscount_bnu=[];
var durationsum_bnu=[];

var month_w=[];
var logcount_w=[];
var callcount_w=[];
var smscount_w=[];
var durationsum_w=[];
var logcount_wnu=[];
var callcount_wnu=[];
var smscount_wnu=[];
var durationsum_wnu=[];

var ranking_rnu=[];
var logcount_rnu=[];
var callcount_rnu=[];
var smscount_rnu=[];
var ranking_rnuc=[];
var callcount_rnuc=[];
var ranking_rnus=[];
var smscount_rnus=[];
var ranking_rnud=[];
var durationsum_rnud=[];

var ranking_brnu=[];
var logcount_brnu=[];
var callcount_brnu=[];
var smscount_brnu=[];
var ranking_brnuc=[];
var callcount_brnuc=[];
var ranking_brnus=[];
var smscount_brnus=[];
var ranking_brnud=[];
var durationsum_brnud=[];

var timeline=[];
var logcount_t=[];
var callcount_t=[];
var smscount_t=[];
var logcount_tb=[];
var callcount_tb=[];
var smscount_tb=[];
var logcount_tw=[];
var callcount_tw=[];
var smscount_tw=[];

var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'1234',
  database:'dataextraction',
  multipleStatements: true
});

connection.connect();

connection.query('select MIN(date) "min", MAX(date) "max" from calllog;', function(err, rows,fields){
	if(!err){
		document.getElementById('between_date_start').min=(rows[0].min.toISOString().split("T")[0]);
		document.getElementById('between_date_start').max=(rows[0].max.toISOString().split("T")[0]);
		document.getElementById('between_date_end').min=(rows[0].min.toISOString().split("T")[0]);
		document.getElementById('between_date_end').max=(rows[0].max.toISOString().split("T")[0]);
		document.getElementById('between_list_date_start').min=(rows[0].min.toISOString().split("T")[0]);
		document.getElementById('between_list_date_start').max=(rows[0].max.toISOString().split("T")[0]);
		document.getElementById('between_list_date_end').min=(rows[0].min.toISOString().split("T")[0]);
		document.getElementById('between_list_date_end').max=(rows[0].max.toISOString().split("T")[0]);
		document.getElementById('between_rank_date_start').min=(rows[0].min.toISOString().split("T")[0]);
		document.getElementById('between_rank_date_start').max=(rows[0].max.toISOString().split("T")[0]);
		document.getElementById('between_rank_date_end').min=(rows[0].min.toISOString().split("T")[0]);
		document.getElementById('between_rank_date_end').max=(rows[0].max.toISOString().split("T")[0]);
		document.getElementById('between_timeline_date_start').min=(rows[0].min.toISOString().split("T")[0]);
		document.getElementById('between_timeline_date_start').max=(rows[0].max.toISOString().split("T")[0]);
		document.getElementById('between_timeline_date_end').min=(rows[0].min.toISOString().split("T")[0]);
		document.getElementById('between_timeline_date_end').max=(rows[0].max.toISOString().split("T")[0]);

	}
	else
		cc.innerHTML='Error-#0/minmax';
})

connection.query('drop table if exists calllog_month; create table calllog_month(date datetime not null, logcount int, callcount int, smscount int, durationsum int, primary key(date)); insert into calllog_month(date, callcount, durationsum)  (select date_format(date, "%Y-%m-02 00:00:00"), count(*), sum(duration) from calllog where type in (1,2,3) group by date_format(date, "%Y-%m-02 00:00:00")); update calllog_month cm left join (select date_format(date, "%Y-%m-02 00:00:00") "date", count(*) "count" from calllog group by date_format(date, "%Y-%m-02 00:00:00")) temp on cm.date=temp.date set cm.logcount=temp.count, cm.smscount=cm.logcount-cm.callcount;', function(err, rows, fields){
	if(err)
		cc.innerHTML='Error-#1';
	else{
		connection.query('select * from calllog_month order by date DESC limit 6;', function(err, rows, fields){
			if(!err){
				for(var i=0;i<rows.length;i++){
					month_6.unshift(rows[i].date.toISOString().slice(0,7));
					logcount_6.unshift(rows[i].logcount);
					callcount_6.unshift(rows[i].callcount);
					smscount_6.unshift(rows[i].smscount);
					durationsum_6.unshift(rows[i].durationsum);
				}
			}
			else
				cc.innerHTML='Error-#2';
		});

		connection.query('select a.date, sum(b.logcount) "logcount", sum(b.callcount) "callcount", sum(b.smscount) "smscount", sum(b.durationsum) "durationsum" from (select * from calllog_month order by date DESC limit 6) a, (select * from calllog_month order by date DESC limit 6) b where a.date>=b.date group by date order by a.date;', function(err, rows, fields){
			if(!err){
				for(var i=0;i<rows.length;i++){
					logcount_6nu.push(rows[i].logcount);
					callcount_6nu.push(rows[i].callcount);
					smscount_6nu.push(rows[i].smscount);
					durationsum_6nu.push(rows[i].durationsum);
				}
			}
			else
				cc.innerHTML='Error-#3';
		});

		connection.query('select * from calllog_month order by date;', function(err, rows, fields){
			if(!err){
				for(var i=0;i<rows.length;i++){
					month.push(rows[i].date.toISOString().slice(0,7));
					logcount.push(rows[i].logcount);
					callcount.push(rows[i].callcount);
					smscount.push(rows[i].smscount);
					durationsum.push(rows[i].durationsum);
				}
			}
			else
				cc.innerHTML='Error-#4';
		});

		connection.query('select a.date, sum(b.logcount) "logcount", sum(b.callcount) "callcount", sum(b.smscount) "smscount", sum(b.durationsum) "durationsum" from calllog_month a, calllog_month b where a.date>=b.date group by date order by a.date;', function(err, rows, fields){
			if(!err){
				for(var i=0;i<rows.length;i++){
					logcount_nu.push(rows[i].logcount);
					callcount_nu.push(rows[i].callcount);
					smscount_nu.push(rows[i].smscount);
					durationsum_nu.push(rows[i].durationsum);
				}
			}
			else
				cc.innerHTML='Error-#5';
		});
	}
});

connection.query('drop table if exists calllog_user; create table calllog_user(name varchar(255), number varchar(20) not null, callcount int, smscount int, durationsum int, primary key(number)); insert into calllog_user(name, number, callcount, durationsum) (select name, number, count(*), sum(duration) from calllog where type in (1,2,3) group by number); update calllog_user cu left join (select number, count(*) "count" from calllog where type not in (1,2,3) group by number) calllog on cu.number=calllog.number set cu.smscount=ifnull(calllog.count,0);', function(err, rows, fields){
	if(err)
		cc.innerHTML='Error-#6';
	else{
		connection.query('select name, number, callcount, smscount from calllog_user order by callcount+smscount desc', function(err, rows, fields){
			if(!err){
				for(var i=0;i<rows.length;i++){
					var name=rows[i].name;
					if(!name)
						ranking_rnu.push(rows[i].number+" ( - )");
					else
						ranking_rnu.push(rows[i].number+" ("+name+")");
					logcount_rnu.push(rows[i].callcount+rows[i].smscount);
					callcount_rnu.push(rows[i].callcount);
					smscount_rnu.push(rows[i].smscount);
				}
			}
			else
				cc.innerHTML='Error-#7';
		});

		connection.query('select name, number, callcount from calllog_user order by callcount desc', function(err, rows, fields){
			if(!err){
				for(var i=0;i<rows.length;i++){
					var name=rows[i].name;
					if(!name)
						ranking_rnuc.push(rows[i].number);
					else
						ranking_rnuc.push(rows[i].number+" ("+name+")");
					callcount_rnuc.push(rows[i].callcount);
				}
			}
			else
				cc.innerHTML='Error-#8';
		});

		connection.query('select name, number, smscount from calllog_user order by smscount desc', function(err, rows, fields){
			if(!err){
				for(var i=0;i<rows.length;i++){
					var name=rows[i].name;
					if(!name)
						ranking_rnus.push(rows[i].number);
					else
						ranking_rnus.push(rows[i].number+" ("+name+")");
					smscount_rnus.push(rows[i].smscount);
				}
			}
			else
				cc.innerHTML='Error-#9';
		});

		connection.query('select name, number, durationsum from calllog_user order by durationsum desc', function(err, rows, fields){
			if(!err){
				for(var i=0;i<rows.length;i++){
					var name=rows[i].name;
					if(!name)
						ranking_rnud.push(rows[i].number);
					else
						ranking_rnud.push(rows[i].number+" ("+name+")");
					durationsum_rnud.push(rows[i].durationsum);
				}
			}
			else
				cc.innerHTML='Error-#10';
		});
	}
})

		

connection.query('drop table if exists calllog_hour; create table calllog_hour(hour int not null, callcount int, smscount int, primary key(hour)); set @hour:=-1; insert into calllog_hour(hour, callcount) (select (@hour:=@hour+1) "hour", (select count(*) from calllog where type in (1,2,3) and hour(date)=@hour) "count" from calllog where @hour<23); update calllog_hour ch left join (select hour(date) "hour", count(*) "count" from calllog where type not in (1,2,3) group by hour(date)) calllog on ch.hour=calllog.hour set ch.smscount=ifnull(calllog.count,0);', function(err, rows, fields){
	if(err)
		cc.innerHTML='Error-#11';
	else{
		connection.query('select * from calllog_hour order by hour;', function(err, rows, fields){
			if(!err){
				for(var i=0;i<rows.length;i++){
					timeline.push(rows[i].hour);
					callcount_t.push(rows[i].callcount);
					smscount_t.push(rows[i].smscount);
					logcount_t.push(rows[i].callcount+rows[i].smscount);
				}
			}
			else
				cc.innerHTML='Error-#12'+err;
		});
	}
})

var options = {
	responsive: false,
	title:{
		display:true,
		text:title_text
	},
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
};

var options_stacked = {
	responsive: false,
	title:{
		display:true,
		text:title_text
	},
    maintainAspectRatio: false,
	Legend:{display:false},
    scales: {
    	xAxes: [{
    		stacked:true,
    		ticks: {
                beginAtZero:true
    		}
    	}],
        yAxes: [{
            stacked:true,
            ticks: {
                beginAtZero:true
            }
        }]
    }
};

var options_main_2={
	type: 'bar',
	data: {
		labels: label_text,
		datasets:[{
			label:label_data2_text,
			data:label_data2,
			backgroundColor:'rgba(255, 206, 86, 0.2)',
            borderWidth: 1
		}]
	},
   	options: options
};

var options_main_3={
	type: 'bar',
	data: {
		labels: label_text,
		datasets:[{
			label:label_data3_text,
			data:label_data3,
			backgroundColor:'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
		}]
	},
   	options: options
};

var options_main_4={
	type: 'bar',
	data: {
		labels: label_text,
		datasets:[{
			label:label_data4_text,
			data:label_data4,
			backgroundColor:'rgba(255, 206, 86, 0.2)',
            borderWidth: 1
		}]
	},
   	options: options
};

var options_main_stacked={
	type: 'bar',
	data: {
		labels: label_text,
		datasets:[{
			label:label_data1_text,
			data:label_data1,
			backgroundColor:'rgba(255, 127, 80, 1)',
			borderColor:'rgba(255, 127, 80, 1)',
            type:"line",
            fill: false
		},
		{
			label:label_data2_text,
			data:label_data2,
			backgroundColor:'rgba(255, 206, 86, 0.2)',
		},
		{
			label:label_data3_text,
			data:label_data3,
			backgroundColor:'rgba(75, 192, 192, 0.2)',
		}]
	},
   	options: options_stacked
};

var options_main_nu_2={
	type: 'bar',
	data: {
		labels: label_text_nu,
		datasets:[{
			label:label_data2_text_nu,
			data:label_data2_nu,
			backgroundColor:'rgba(255, 206, 86, 0.2)',
            borderWidth: 1
		}]
	},
   	options: options
};

var options_main_nu_3={
	type: 'bar',
	data: {
		labels: label_text_nu,
		datasets:[{
			label:label_data3_text_nu,
			data:label_data3_nu,
			backgroundColor:'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
		}]
	},
   	options: options
};

var options_main_nu_4={
	type: 'bar',
	data: {
		labels: label_text_nu,
		datasets:[{
			label:label_data4_text_nu,
			data:label_data4_nu,
			backgroundColor:'rgba(255, 206, 86, 0.2)',
            borderWidth: 1
		}]
	},
   	options: options
};

var options_main_nu_stacked={
	type: 'bar',
	data: {
		labels: label_text_nu,
		datasets:[{
			label:label_data1_text_nu,
			data:label_data1_nu,
			backgroundColor:'rgba(255, 127, 80, 1)',
			borderColor:'rgba(255, 127, 80, 1)',
            type:"line",
            fill: false
		},
		{
			label:label_data2_text_nu,
			data:label_data2_nu,
			backgroundColor:'rgba(255, 206, 86, 0.2)'
		},
		{
			label:label_data3_text_nu,
			data:label_data3_nu,
			backgroundColor:'rgba(75, 192, 192, 0.2)'
		}]
	},
   	options: options_stacked
};

function change_type_title(type_number){
	switch(type_number){
		case 1:
			type1.innerHTML="# 연락 수";
			type2.innerHTML="# 통화 수";
			type3.innerHTML="# 문자 수";
			type4.innerHTML="# 통화 시간";
			type5.innerHTML="# 누적 연락 수";
			type6.innerHTML="# 누적 통화 수";
			type7.innerHTML="# 누적 문자 수";
			type8.innerHTML="# 누적 통화 시간";
			break;
		case 4:
			type1.innerHTML="# 연락 수";
			type2.innerHTML="# 통화 수";
			type3.innerHTML="# 문자 수";
			type4.innerHTML="# 통화 시간";
			type5.innerHTML="";
			type6.innerHTML="";
			type7.innerHTML="";
			type8.innerHTML="";
			break;
		case 5:
			type1.innerHTML="# 연락 수";
			type2.innerHTML="# 통화 수";
			type3.innerHTML="# 문자 수";
			type4.innerHTML="";
			type5.innerHTML="";
			type6.innerHTML="";
			type7.innerHTML="";
			type8.innerHTML="";
			break;
	}
}

function changeLabelText(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){
	options_main_stacked.type="bar";
	options_main_stacked.data.labels=a;
	options_main_stacked.data.datasets[0].type="line";
	options_main_stacked.data.datasets[0].label=b;
	options_main_stacked.data.datasets[0].data=c;
	options_main_stacked.data.datasets[1].label=d;
	options_main_stacked.data.datasets[1].data=e;
	options_main_stacked.data.datasets[2].label=f;
	options_main_stacked.data.datasets[2].data=g;

	options_main_2.type="bar";
	options_main_2.data.labels=a;
	options_main_2.data.datasets[0].label=d;
	options_main_2.data.datasets[0].data=e
	options_main_3.type="bar";
	options_main_3.data.labels=a;
	options_main_3.data.datasets[0].label=f;
	options_main_3.data.datasets[0].data=g;
	options_main_4.type="bar";
	options_main_4.data.labels=a;
	options_main_4.data.datasets[0].label=h;
	options_main_4.data.datasets[0].data=i;

	options_main_nu_stacked.data.labels=a;
	options_main_nu_stacked.data.datasets[0].label=j;
	options_main_nu_stacked.data.datasets[0].data=k;
	options_main_nu_stacked.data.datasets[1].label=l;
	options_main_nu_stacked.data.datasets[1].data=m;
	options_main_nu_stacked.data.datasets[2].label=n;
	options_main_nu_stacked.data.datasets[2].data=o;

	options_main_nu_2.data.labels=a;
	options_main_nu_2.data.datasets[0].label=l;
	options_main_nu_2.data.datasets[0].data=m;
	options_main_nu_3.data.labels=a;
	options_main_nu_3.data.datasets[0].label=n;
	options_main_nu_3.data.datasets[0].data=o;
	options_main_nu_4.data.labels=a;
	options_main_nu_4.data.datasets[0].label=p;
	options_main_nu_4.data.datasets[0].data=q;

	menu_name.innerHTML=r;
	box_name.innerHTML=s;
	options.title.text=r;
	options_stacked.title.text=r;
	options_main_2.options=options;
	options_main_3.options=options;
	options_main_4.options=options;
	options_main_stacked.options=options_stacked;
	options_main_nu_2.options=options;
	options_main_nu_3.options=options;
	options_main_nu_4.options=options;
	options_main_nu_stacked.options=options_stacked;
}

function changeLabelText_hor(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){
	options_main_stacked.type="horizontalBar";
	options_main_stacked.data.labels=a;
	options_main_stacked.data.datasets[0].type="horizontalBar";
	options_main_stacked.data.datasets[0].label=b;
	options_main_stacked.data.datasets[0].data=c;
	options_main_stacked.data.datasets[1].label=d;
	options_main_stacked.data.datasets[1].data=e;
	options_main_stacked.data.datasets[2].label=f;
	options_main_stacked.data.datasets[2].data=g;

	options_main_2.type="horizontalBar";
	options_main_2.data.labels=h;
	options_main_2.data.datasets[0].label=i;
	options_main_2.data.datasets[0].data=j;
	options_main_3.type="horizontalBar";
	options_main_3.data.labels=k;
	options_main_3.data.datasets[0].label=l;
	options_main_3.data.datasets[0].data=m;
	options_main_4.type="horizontalBar";
	options_main_4.data.labels=n;
	options_main_4.data.datasets[0].label=o;
	options_main_4.data.datasets[0].data=p;

	box_name.innerHTML=s;
	menu_name.innerHTML=r;
	options.title.text=r;
	options_stacked.title.text=r;
	options_main_2.options=options;
	options_main_3.options=options;
	options_main_4.options=options;
	options_main_stacked.options=options_stacked;
}

const ctx = document.getElementById("myChart").getContext('2d');
const listspace = document.getElementById("listspace");
const listspace2 = document.getElementById("listspace2");
const listspace3 = document.getElementById("listspace3");
const listspace4 = document.getElementById("listspace4");
const listspace5 = document.getElementById("listspace5");
const chartspace = document.getElementById("chart");
const choicespace = document.getElementById("choice");

function chartView(){
	listspace.style="display:none";
	listspace2.style="display:none";
	listspace3.style="display:none";
	listspace4.style="display:none";
	listspace5.style="display:none";
	chartspace.style="display:inline";
	choicespace.style="display:inline";
}
var analysis1 = document.getElementById('analysis1');
analysis1.addEventListener('click', function(){
	chartView();
	change_type_title(1);
	changeLabelText(month_6, "연락 수", logcount_6, "통화 수", callcount_6, "문자 수", smscount_6, "통화 시간", durationsum_6, "누적 연락 수", logcount_6nu, "누적 통화 수", callcount_6nu, "누적 문자 수",smscount_6nu, "누적 통화 시간", durationsum_6nu,"최근 6개월의 통계","# 연락 수");
	choosed_menu="analysis1";
	window.myChart.destroy();
	document.getElementById("myChart").height="350";
	document.getElementById("chart-area").style="height:380px;";
	window.myChart = new Chart(ctx, options_main_stacked);
});

var analysis2 = document.getElementById('analysis2');
analysis2.addEventListener('click', function(){
	chartView();
	change_type_title(1);
	changeLabelText(month, "연락 수", logcount, "통화 수", callcount, "문자 수", smscount, "통화 시간", durationsum, "누적 연락 수", logcount_nu, "누적 통화 수", callcount_nu, "누적 문자 수",smscount_nu, "누적 통화 시간", durationsum_nu,"전체 기간의 통계","# 연락 수");
	choosed_menu="analysis2";
	window.myChart.destroy();
	document.getElementById("myChart").height="350";
	document.getElementById("chart-area").style="height:380px;";
	window.myChart = new Chart(ctx, options_main_stacked);
});

var analysis3 = document.getElementById('analysis3');
analysis3.addEventListener('click', function(){
	chartView();
	change_type_title(1);
	changeLabelText(month_b, "연락 수", logcount_b, "통화 수", callcount_b, "문자 수", smscount_b, "통화 시간", durationsum_b, "누적 연락 수", logcount_bnu, "누적 통화 수", callcount_bnu, "누적 문자 수",smscount_bnu, "누적 통화 시간", durationsum_bnu,"특정 기간의 통계 / "+date_start.split(' ')[0]+" ~ "+date_end.split(' ')[0],"# 연락 수");
	choosed_menu="analysis3";
	window.myChart.destroy();
	document.getElementById("myChart").height="350";
	document.getElementById("chart-area").style="height:380px;";
	window.myChart = new Chart(ctx, options_main_stacked);
});

var analysis4 = document.getElementById('analysis4');
analysis4.addEventListener('click', function(){
	chartView();
	change_type_title(1);
	changeLabelText(month_w, "연락 수", logcount_w, "통화 수", callcount_w, "문자 수", smscount_w, "통화 시간", durationsum_w, "누적 연락 수", logcount_wnu, "누적 통화 수", callcount_wnu, "누적 문자 수",smscount_wnu, "누적 통화 시간", durationsum_wnu,"특정 연락처와의 통계","# 연락 수");
	choosed_menu="analysis4";
	window.myChart.destroy();
	document.getElementById("myChart").height="350";
	document.getElementById("chart-area").style="height:380px;";
	window.myChart = new Chart(ctx, options_main_stacked);
});

var list1 = document.getElementById('list1');
list1.addEventListener('click', function(){
	listspace.style="display:inline";
	listspace2.style="display:none";
	listspace3.style="display:none";
	listspace4.style="display:none";
	listspace5.style="display:none";
	chartspace.style="display:none";
	choicespace.style="display:none";
	choosed_menu="list1";
	menu_name.innerHTML="최근 1개월 목록";
	window.myChart.destroy();
});

var list2 = document.getElementById('list2');
list2.addEventListener('click', function(){
	listspace.style="display:none";
	listspace2.style="display:inline";
	listspace3.style="display:none";
	listspace4.style="display:none";
	listspace5.style="display:none";
	chartspace.style="display:none";
	choicespace.style="display:none";
	choosed_menu="list2";
	menu_name.innerHTML="전체 목록";
	window.myChart.destroy();
});

var list4 = document.getElementById('list4');
list4.addEventListener('click', function(){
	listspace.style="display:none";
	listspace2.style="display:none";
	listspace3.style="display:inline";
	listspace4.style="display:none";
	listspace5.style="display:none";
	chartspace.style="display:none";
	choicespace.style="display:none";
	choosed_menu="list4";
	menu_name.innerHTML="특정 기간의 목록 / "+list_date_start.split(' ')[0]+" ~ "+list_date_end.split(' ')[0];
	window.myChart.destroy();
});

var more1 = document.getElementById('more1');
more1.addEventListener('click', function(){
	chartView();
	change_type_title(4);
	changeLabelText_hor(ranking_rnu, "누적 연락 수", logcount_rnu, "누적 통화 수", callcount_rnu, "누적 문자 수", smscount_rnu, ranking_rnuc, "누적 통화 수", callcount_rnuc, ranking_rnus, "누적 문자 수", smscount_rnus, ranking_rnud, "누적 통화 시간", durationsum_rnud, [],"전체 기간의 연락 순위","# 연락 수");
	choosed_menu="more1";
	window.myChart.destroy();
	document.getElementById("myChart").height="1000";
	document.getElementById("chart-area").style="height:1030px;";
	window.myChart = new Chart(ctx, options_main_stacked);
});

var more2 = document.getElementById('more2');
more2.addEventListener('click', function(){
	chartView();
	change_type_title(4);
	changeLabelText_hor(ranking_brnu, "누적 연락 수", logcount_brnu, "누적 통화 수", callcount_brnu, "누적 문자 수", smscount_brnu, ranking_brnuc, "누적 통화 수", callcount_brnuc, ranking_brnus, "누적 문자 수", smscount_brnus, ranking_brnud, "누적 통화 시간", durationsum_brnud, [],"특정 기간의 연락 순위 / "+rank_date_start.split(' ')[0]+" ~ "+rank_date_end.split(' ')[0],"# 연락 수");
	choosed_menu="more2";
	window.myChart.destroy();
	document.getElementById("myChart").height="1000";
	document.getElementById("chart-area").style="height:1030px;";
	window.myChart = new Chart(ctx, options_main_stacked);
});

var more3 = document.getElementById('more3');
more3.addEventListener('click', function(){
	chartView();
	change_type_title(5);
	changeLabelText(timeline, "누적 연락 수", logcount_t, "누적 통화 수", callcount_t, "누적 문자 수", smscount_t, "수", [], "수", [], "수",[] , "수",[], "수", [],"전체 기간의 선호 연락 시간대","# 연락 수");
	choosed_menu="more3";
	window.myChart.destroy();
	document.getElementById("myChart").height="350";
	document.getElementById("chart-area").style="height:380px;";
	window.myChart = new Chart(ctx, options_main_stacked);
});

var more4 = document.getElementById('more4');
more4.addEventListener('click', function(){
	chartView();
	change_type_title(5);
	changeLabelText(timeline, "누적 연락 수", logcount_tb, "누적 통화 수", callcount_tb, "누적 문자 수", smscount_tb, "수", [], "수", [], "수",[] , "수",[], "수", [],"특정 기간의 선호 연락 시간대 / "+timeline_date_start.split(' ')[0]+" ~ "+timeline_date_end.split(' ')[0],"# 연락 수");
	choosed_menu="more4";
	window.myChart.destroy();
	document.getElementById("myChart").height="350";
	document.getElementById("chart-area").style="height:380px;";
	window.myChart = new Chart(ctx, options_main_stacked);
});

var more5 = document.getElementById('more5');
more5.addEventListener('click', function(){
	chartView();
	change_type_title(5);
	changeLabelText(timeline, "누적 연락 수", logcount_tw, "누적 통화 수", callcount_tw, "누적 문자 수", smscount_tw, "수", [], "수", [], "수",[] , "수",[], "수", [],"특정 연락처와의 선호 연락 시간대","# 연락 수");
	choosed_menu="more5";
	window.myChart.destroy();
	document.getElementById("myChart").height="350";
	document.getElementById("chart-area").style="height:380px;";
	window.myChart = new Chart(ctx, options_main_stacked);
});

var type1 = document.getElementById('type1');
type1.addEventListener('click', function(){
	switch(choosed_menu){
		case 'analysis1':
		case 'analysis2':
		case 'analysis3':
		case 'analysis4':
		case 'more1':
		case 'more2':
		case 'more3':
		case 'more4':
		case 'more5':
			box_name.innerHTML="# 연락 수"
			window.myChart.destroy();
			window.myChart = new Chart(ctx, options_main_stacked);
			break;
	};
});

var type2 = document.getElementById('type2');
type2.addEventListener('click', function(){
	switch(choosed_menu){
		case 'analysis1':
		case 'analysis2':
		case 'analysis3':
		case 'analysis4':
		case 'more1':
		case 'more2':
		case 'more3':
		case 'more4':
		case 'more5':
			box_name.innerHTML="# 통화 수";
			window.myChart.destroy();
			window.myChart = new Chart(ctx, options_main_2);
			break;
	};
});

var type3 = document.getElementById('type3');
type3.addEventListener('click', function(){
	switch(choosed_menu){
		case 'analysis1':
		case 'analysis2':
		case 'analysis3':
		case 'analysis4':
		case 'more1':
		case 'more2':
		case 'more3':
		case 'more4':
		case 'more5':
			box_name.innerHTML="# 문자 수";
			window.myChart.destroy();
			window.myChart = new Chart(ctx, options_main_3);
			break;
	};
});

var type4 = document.getElementById('type4');
type4.addEventListener('click', function(){
	switch(choosed_menu){
		case 'analysis1':
		case 'analysis2':
		case 'analysis3':
		case 'analysis4':
		case 'more1':
		case 'more2':
			box_name.innerHTML="# 통화 시간";
			window.myChart.destroy();
			window.myChart = new Chart(ctx, options_main_4);
			break;
	};
});

var type5 = document.getElementById('type5');
type5.addEventListener('click', function(){
	switch(choosed_menu){
		case 'analysis1':
		case 'analysis2':
		case 'analysis3':
		case 'analysis4':
			box_name.innerHTML="# 누적 연락 수";
			window.myChart.destroy();
			window.myChart = new Chart(ctx, options_main_nu_stacked);
			break;
	};
});

var type6 = document.getElementById('type6');
type6.addEventListener('click', function(){
	switch(choosed_menu){
		case 'analysis1':
		case 'analysis2':
		case 'analysis3':
		case 'analysis4':
			box_name.innerHTML="# 누적 통화 수";
			window.myChart.destroy();
			window.myChart = new Chart(ctx, options_main_nu_2);
			break;
	};
});

var type7 = document.getElementById('type7');
type7.addEventListener('click', function(){
	switch(choosed_menu){
		case 'analysis1':
		case 'analysis2':
		case 'analysis3':
		case 'analysis4':
			box_name.innerHTML="# 누적 문자 수";
			window.myChart.destroy();
			window.myChart = new Chart(ctx, options_main_nu_3);
			break;
	};
});

var type8 = document.getElementById('type8');
type8.addEventListener('click', function(){
	switch(choosed_menu){
		case 'analysis1':
		case 'analysis2':
		case 'analysis3':
		case 'analysis4':
			box_name.innerHTML="# 누적 통화 시간";
			window.myChart.destroy();
			window.myChart = new Chart(ctx, options_main_nu_4);
			break;
	};
});


function get_date_analysis(){

	date_start=document.getElementById('between_date_start').value+' 00:00:00';
	date_end=document.getElementById('between_date_end').value+' 23:59:59';

	chartView();
	change_type_title(1);
	choosed_menu="analysis3";

	connection.query('drop table IF EXISTS calllog_between; create table calllog_between(date datetime not null, logcount int, callcount int, smscount int, durationsum int, primary key(date)); insert into calllog_between(date, callcount, durationsum)  (select date_format(date, "%Y-%m-02 00:00:00"), count(*), sum(duration) from calllog where type in (1,2,3) and date between ? and ? group by date_format(date, "%Y-%m-02 00:00:00")); update calllog_between cb left join (select date_format(date, "%Y-%m-02 00:00:00") "date", count(*) "count" from calllog where date between ? and ? group by date_format(date, "%Y-%m-02 00:00:00")) temp on cb.date=temp.date set cb.logcount=temp.count, cb.smscount=cb.logcount-cb.callcount;',[date_start, date_end,date_start, date_end], function(err, rows){
		if(!err){
			connection.query('select * from calllog_between order by date;', function(err, rows, fields){
				if(!err){
					month_b.length = 0;
					logcount_b.length = 0;
					callcount_b.length = 0;
					smscount_b.length = 0;
					durationsum_b.length = 0;

					for(var i=0;i<rows.length;i++){
						month_b.push(rows[i].date.toISOString().slice(0,7));
						logcount_b.push(rows[i].logcount);
						callcount_b.push(rows[i].callcount);
						smscount_b.push(rows[i].smscount);
						durationsum_b.push(rows[i].durationsum);
					}
				}
				else
					cc.innerHTML='Error-#14'+err;
			});
			connection.query('select a.date, sum(b.logcount) "logcount", sum(b.callcount) "callcount", sum(b.smscount) "smscount", sum(b.durationsum) "durationsum" from calllog_between a, calllog_between b where a.date>=b.date group by date order by a.date;', function(err, rows, fields){
				if(!err){
					logcount_bnu.length = 0;
					callcount_bnu.length = 0;
					smscount_bnu.length = 0;
					durationsum_bnu.length = 0;

					for(var i=0;i<rows.length;i++){
						logcount_bnu.push(rows[i].logcount);
						callcount_bnu.push(rows[i].callcount);
						smscount_bnu.push(rows[i].smscount);
						durationsum_bnu.push(rows[i].durationsum);
					}

					changeLabelText(month_b, "연락 수", logcount_b, "통화 수", callcount_b, "문자 수", smscount_b, "통화 시간", durationsum_b, "누적 연락 수", logcount_bnu, "누적 통화 수", callcount_bnu, "누적 문자 수",smscount_bnu, "누적 통화 시간", durationsum_bnu,"특정 기간의 통계 / "+date_start.split(' ')[0]+" ~ "+date_end.split(' ')[0],"# 연락 수");
					window.myChart.destroy();
					document.getElementById("myChart").height="350";
					document.getElementById("chart-area").style="height:380px;";
					window.myChart = new Chart(ctx, options_main_stacked);
				}
				else
					cc.innerHTML='Error-#15';
			});
		}
		else
			cc.innerHTML='Error-#13'+err;
	});
	//connection.end();
}

function get_number_push(){
	number.push(document.getElementById('number').value);
	analysis4_list.innerHTML=number.join('<br>');
}
function get_number_pop(){
	number.splice(number.indexOf(document.getElementById('number').value),1);
	analysis4_list.innerHTML=number.join('<br>');
}
function get_number_analysis(){
	chartView();
	change_type_title(1);
	choosed_menu="analysis4";

	connection.query('drop table IF EXISTS calllog_with; create table calllog_with(date datetime not null, logcount int, callcount int, smscount int, durationsum int, primary key(date)); insert into calllog_with(date, callcount, durationsum)  (select date_format(date, "%Y-%m-02 00:00:00"), count(*), sum(duration) from calllog where type in (1,2,3) and number in (?) group by date_format(date, "%Y-%m-02 00:00:00")); update calllog_with cw left join (select date_format(date, "%Y-%m-02 00:00:00") "date", count(*) "count" from calllog where number in (?) group by date_format(date, "%Y-%m-02 00:00:00")) temp on cw.date=temp.date set cw.logcount=temp.count, cw.smscount=cw.logcount-cw.callcount;',[number, number], function(err, rows){
		if(!err){
			connection.query('select * from calllog_with order by date;', function(err, rows, fields){
				if(!err){
					month_w.length = 0;
					logcount_w.length = 0;
					callcount_w.length = 0;
					smscount_w.length = 0;
					durationsum_w.length = 0;

					for(var i=0;i<rows.length;i++){
						month_w.push(rows[i].date.toISOString().slice(0,7));
						logcount_w.push(rows[i].logcount);
						callcount_w.push(rows[i].callcount);
						smscount_w.push(rows[i].smscount);
						durationsum_w.push(rows[i].durationsum);
					}
				}
				else
					cc.innerHTML='Error-#17'+err;
			});
			connection.query('select a.date, sum(b.logcount) "logcount", sum(b.callcount) "callcount", sum(b.smscount) "smscount", sum(b.durationsum) "durationsum" from calllog_with a, calllog_with b where a.date>=b.date group by date order by a.date;', function(err, rows, fields){
				if(!err){
					logcount_wnu.length = 0;
					callcount_wnu.length = 0;
					smscount_wnu.length = 0;
					durationsum_wnu.length = 0;

					for(var i=0;i<rows.length;i++){
						logcount_wnu.push(rows[i].logcount);
						callcount_wnu.push(rows[i].callcount);
						smscount_wnu.push(rows[i].smscount);
						durationsum_wnu.push(rows[i].durationsum);
					}
					changeLabelText(month_w, "연락 수", logcount_w, "통화 수", callcount_w, "문자 수", smscount_w, "통화 시간", durationsum_w, "누적 연락 수", logcount_wnu, "누적 통화 수", callcount_wnu, "누적 문자 수",smscount_wnu, "누적 통화 시간", durationsum_wnu,"특정 연락처와의 통계","# 연락 수");
					window.myChart.destroy();
					document.getElementById("myChart").height="350";
					document.getElementById("chart-area").style="height:380px;";
					window.myChart = new Chart(ctx, options_main_stacked);
				}
				else
					cc.innerHTML='Error-#18';
			});
		}
		else
			cc.innerHTML='Error-#16'+err;
	});
	//connection.end();
}

function get_date_rank(){
	chartView();
	change_type_title(4);
	choosed_menu="more2";

	rank_date_start=document.getElementById('between_rank_date_start').value+' 00:00:00';
	rank_date_end=document.getElementById('between_rank_date_end').value+' 23:59:59';

	connection.query('drop table IF EXISTS calllog_user_between; create table calllog_user_between(name varchar(255), number varchar(20) not null, callcount int, smscount int, durationsum int, primary key(number)); insert into calllog_user_between(name, number, callcount, durationsum) (select name, number, count(*), sum(duration) from calllog where type in (1,2,3) and date between ? and ? group by number); update calllog_user_between cu left join (select number, count(*) "count" from calllog where type not in (1,2,3) and date between ? and ? group by number) calllog on cu.number=calllog.number set cu.smscount=ifnull(calllog.count,0);', [rank_date_start,rank_date_end,rank_date_start,rank_date_end], function(err, rows, fields){
		if(err)
			cc.innerHTML='Error-#19';
		else{
			connection.query('select name, number, callcount, smscount from calllog_user_between order by callcount+smscount desc', function(err, rows, fields){
			if(!err){
				ranking_brnu.length=0;
				logcount_brnu.length=0;
				callcount_brnu.length=0;
				smscount_brnu.length=0;

				for(var i=0;i<rows.length;i++){
					var name=rows[i].name;
					if(!name)
						ranking_brnu.push(rows[i].number+" ( - )");
					else
						ranking_brnu.push(rows[i].number+" ("+name+")");
					logcount_brnu.push(rows[i].callcount+rows[i].smscount);
					callcount_brnu.push(rows[i].callcount);
					smscount_brnu.push(rows[i].smscount);
				}
			}
			else
				cc.innerHTML='Error-#20';
		});

		connection.query('select name, number, callcount from calllog_user_between order by callcount desc', function(err, rows, fields){
			if(!err){
				ranking_brnuc.length=0;
				callcount_brnuc.length=0;

				for(var i=0;i<rows.length;i++){
					var name=rows[i].name;
					if(!name)
						ranking_brnuc.push(rows[i].number);
					else
						ranking_brnuc.push(rows[i].number+" ("+name+")");
					callcount_brnuc.push(rows[i].callcount);
				}
			}
			else
				cc.innerHTML='Error-#21';
		});

		connection.query('select name, number, smscount from calllog_user_between order by smscount desc', function(err, rows, fields){
			if(!err){
				ranking_brnus.length=0;
				smscount_brnus.length=0;

				for(var i=0;i<rows.length;i++){
					var name=rows[i].name;
					if(!name)
						ranking_brnus.push(rows[i].number);
					else
						ranking_brnus.push(rows[i].number+" ("+name+")");
					smscount_brnus.push(rows[i].smscount);
				}
			}
			else
				cc.innerHTML='Error-#22';
		});

		connection.query('select name, number, durationsum from calllog_user_between order by durationsum desc', function(err, rows, fields){
			if(!err){
				ranking_brnud.length=0;
				durationsum_brnud.length=0;

				for(var i=0;i<rows.length;i++){
					var name=rows[i].name;
					if(!name)
						ranking_brnud.push(rows[i].number);
					else
						ranking_brnud.push(rows[i].number+" ("+name+")");
					durationsum_brnud.push(rows[i].durationsum);
				}
				changeLabelText_hor(ranking_brnu, "누적 연락 수", logcount_brnu, "누적 통화 수", callcount_brnu, "누적 문자 수", smscount_brnu, ranking_brnuc, "누적 통화 수", callcount_brnuc, ranking_brnus, "누적 문자 수", smscount_brnus, ranking_brnud, "누적 통화 시간", durationsum_brnud, [],"특정 기간의 연락 순위 / "+rank_date_start.split(' ')[0]+" ~ "+rank_date_end.split(' ')[0],"# 연락 수");
				window.myChart.destroy();
				document.getElementById("myChart").height="1000";
				document.getElementById("chart-area").style="height:1030px;";
				window.myChart = new Chart(ctx, options_main_stacked);
			}
			else
				cc.innerHTML='Error-#23';
		});
		}
	})
	//connection.end();
}

function get_date_timeline(){
	chartView();
	change_type_title(5);
	choosed_menu="more4";

	timeline_date_start=document.getElementById('between_timeline_date_start').value+' 00:00:00';
	timeline_date_end=document.getElementById('between_timeline_date_end').value+' 23:59:59';

	connection.query('drop table if exists calllog_hour_between; create table calllog_hour_between(hour int not null, callcount int, smscount int, primary key(hour)); set @hour:=-1; insert into calllog_hour_between(hour, callcount) (select (@hour:=@hour+1) "hour", (select count(*) from calllog where type in (1,2,3) and date between ? and ? and hour(date)=@hour) "count" from calllog where @hour<23); update calllog_hour_between ch left join (select hour(date) "hour", count(*) "count" from calllog where type not in (1,2,3) and date between ? and ? group by hour(date)) calllog on ch.hour=calllog.hour set ch.smscount=ifnull(calllog.count,0);',[timeline_date_start, timeline_date_end,timeline_date_start, timeline_date_end], function(err, rows){
		if(!err){
			connection.query('select * from calllog_hour_between order by hour',function(err, rows){
				if(!err){
					logcount_tb.length=0;
					callcount_tb.length=0;
					smscount_tb.length=0;

					for(var i=0;i<rows.length;i++){
						callcount_tb.push(rows[i].callcount);
						smscount_tb.push(rows[i].smscount);
						logcount_tb.push(rows[i].callcount+rows[i].smscount);
					}
					changeLabelText(timeline, "누적 연락 수", logcount_tb, "누적 통화 수", callcount_tb, "누적 문자 수", smscount_tb, "수", [], "수", [], "수",[] , "수",[], "수", [],"특정 기간의 선호 연락 시간대 / "+timeline_date_start.split(' ')[0]+" ~ "+timeline_date_end.split(' ')[0],"# 연락 수");
					window.myChart.destroy();
					document.getElementById("myChart").height="350";
					document.getElementById("chart-area").style="height:380px;";
					window.myChart = new Chart(ctx, options_main_stacked);
				}
				else
					cc.innerHTML='Error-#25';
			});
		}
		else
			cc.innerHTML='Error-#24'+err;
	});
	//connection.end();
}

function get_number_timeline_push(){
	timeline_number.push(document.getElementById('timeline_number').value);
	more5_list.innerHTML=timeline_number.join('<br>');
}
function get_number_timeline_pop(){
	timeline_number.splice(timeline_number.indexOf(document.getElementById('timeline_number').value),1);
	more5_list.innerHTML=timeline_number.join('<br>');
}
function get_number_timeline(){
	chartView();
	change_type_title(5);
	choosed_menu="more5";

	connection.query('drop table if exists calllog_hour_with; create table calllog_hour_with(hour int not null, callcount int, smscount int, primary key(hour)); set @hour:=-1; insert into calllog_hour_with(hour, callcount) (select (@hour:=@hour+1) "hour", (select count(*) from calllog where type in (1,2,3) and number in (?) and hour(date)=@hour) "count" from calllog where @hour<23); update calllog_hour_with ch left join (select hour(date) "hour", count(*) "count" from calllog where type not in (1,2,3) and number in (?) group by hour(date)) calllog on ch.hour=calllog.hour set ch.smscount=ifnull(calllog.count,0);',[timeline_number,timeline_number], function(err, rows){
		if(!err){
			connection.query('select * from calllog_hour_with order by hour',function(err, rows){
				if(!err){
					logcount_tw.length=0;
					callcount_tw.length=0;
					smscount_tw.length=0;

					for(var i=0;i<rows.length;i++){
						callcount_tw.push(rows[i].callcount);
						smscount_tw.push(rows[i].smscount);
						logcount_tw.push(rows[i].callcount+rows[i].smscount);
					}
					changeLabelText(timeline, "누적 연락 수", logcount_tw, "누적 통화 수", callcount_tw, "누적 문자 수", smscount_tw, "수", [], "수", [], "수",[] , "수",[], "수", [],"특정 연락처와의 선호 연락 시간대","# 연락 수");
					window.myChart.destroy();
					document.getElementById("myChart").height="350";
					document.getElementById("chart-area").style="height:380px;";
					window.myChart = new Chart(ctx, options_main_stacked);
				}
				else
					cc.innerHTML='Error-#27';
			});
		}
		else
			cc.innerHTML='Error-#26'+err;
	});
	//connection.end();
}

var options_list = {
  valueNames: [ 'type','type_cs','type_gs', 'number', 'date','body', 'duration', 'delete' ],
  item: '<div class="col-xl-3 col-md-6 mb-4"><div class="card border-left-success shadow h-100 py-2"><div class="card-body"><div class="row no-gutters align-items-center"><div class="col mr-2"><li id="listrow"><h3 id="listrow_type" class="type"></h3><div id=m2><p id="listrow_number" class="number"></p><p id="listrow_date" class="date"></p></div><p id="listrow_body" class="body"></p></li></div></div></div></div></div>'
};

var options_list_res = {
  valueNames: [ 'number','get_body','get_date', 'send_body', 'send_date','timediff', 'ttttt' ],
  item: '<div class="col-xl-3 col-md-6 mb-4"><div class="card border-left-success shadow h-100 py-2"><div class="card-body"><div class="row no-gutters align-items-center"><div class="col mr-2"><li id="listrow"><h3 id="listrow_number" class="number"></h3><div id=m3><p id="listrow_get_body" class="get_body"></p><p id="listrow_get_date" class="get_date"></p></div><div id=m3><p id="listrow_send_body" class="send_body"></p><p id="listrow_send_date" class="send_date"></p></div><p id="listrow_timediff" class="timediff"></p></li></div></div></div></div></div>'
};

var values_list_6 = [];
var values_list_all = [];
var values_list_between=[];
var values_list_res=[];
var values_list_res_with=[];
var myList;
var myList2;
var myList3=new List('listspace3', options_list, values_list_between);
var myList4;
var myList5=new List('listspace5', options_list_res, values_list_res_with);

connection.query('select calllog.type, calllog.number, calllog.name, calllog.date, calllog.duration, sms.body, sms.read_c from calllog left join sms on calllog.number=sms.address and timestampdiff(second,calllog.date, sms.date) between -5 and 0 where timestampdiff(month,now(),calllog.date)>-1;',function(err, rows){
	if(!err){
		for(var i=0;i<rows.length;i++){
			var number_temp="";
			var duration_temp="";
			var body_temp="";
			var type_temp=""
			var type_cs_temp="";
			var type_gs_temp="";
			var delete_temp="false";
			if(!rows[i].name)
				number_temp=rows[i].number+" ( - )";
			else
				number_temp=rows[i].number+" ("+rows[i].name+")";

			var date_temp=rows[i].date.toISOString().split("T")[0]+" "+rows[i].date.toISOString().split("T")[1].slice(0,8);
			switch(rows[i].type){
				case 1:
					type_temp="수신 통화";
					type_cs_temp="call";
					type_gs_temp="get";
					var tttt=rows[i].duration;
					if(tttt>=3600){
						body_temp=Math.floor(tttt/3600)+"시간 "+Math.floor((tttt%3600)/60)+"분 "+(tttt%60)+"초";
						duration_temp="more60";
					}
					else if(tttt>=60){
						body_temp=Math.floor(tttt/60)+"분 "+(tttt%60)+"초";
						if(tttt<=600)
							duration_temp="less10";
					}
					else{
						body_temp=tttt+"초";
						duration_temp="less10";
					}
					break;
				case 2:
					type_temp="발신 통화";
					type_cs_temp="call";
					type_gs_temp="send";
					var tttt=rows[i].duration;
					if(tttt>=3600){
						body_temp=Math.floor(tttt/3600)+"시간 "+Math.floor((tttt%3600)/60)+"분 "+(tttt%60)+"초";
						duration_temp="more60";
					}
					else if(tttt>=60){
						body_temp=Math.floor(tttt/60)+"분 "+(tttt%60)+"초";
						if(tttt<=600)
							duration_temp="less10";
					}
					else{
						body_temp=tttt+"초";
						duration_temp="less10";
					}
					break;
				case 3:
					type_temp="부재중 통화";
					type_cs_temp="call";
					type_gs_temp="missed";
					body_temp="-";
					duration_temp="";
					break;
				case 813:
					body_temp=rows[i].body;
					if(!body_temp)
						delete_temp="true";
					type_temp="발신 문자";
					type_cs_temp="sms";
					type_gs_temp="send";
					break;
				case 820:
					body_temp="[mms]";
					type_temp="수신 문자";
					type_cs_temp="sms";
					type_gs_temp="get";
					break;
				case 814:
					body_temp=rows[i].body;
					if(!body_temp)
						delete_temp="true";
					type_temp="수신 문자";
					type_cs_temp="sms";
					type_gs_temp="get";
					break;
				case 825:
					body_temp="[안전안내문자]";
					type_temp="수신 문자";
					type_cs_temp="sms";
					type_gs_temp="get";
					break;
			}
			values_list_6.push({type:type_temp, type_cs:type_cs_temp ,type_gs:type_gs_temp,number:number_temp,date:date_temp, body:body_temp, duration:duration_temp, delete:delete_temp});
		}
		myList = new List('listspace', options_list, values_list_6);
	}
	else
		cc.innerHTML='Error-#list1'+err;
});

connection.query('select calllog.type, calllog.number, calllog.name, calllog.date, calllog.duration, sms.body, sms.read_c from calllog left join sms on calllog.number=sms.address and timestampdiff(second,calllog.date, sms.date) between -5 and 0 ;',function(err, rows){
	if(!err){
		for(var i=0;i<rows.length;i++){
			var number_temp="";
			var duration_temp="";
			var body_temp="";
			var type_temp="";
			var type_cs_temp="";
			var type_gs_temp="";
			var delete_temp="false";
			if(!rows[i].name)
				number_temp=rows[i].number+" ( - )";
			else
				number_temp=rows[i].number+" ("+rows[i].name+")";

			var date_temp=rows[i].date.toISOString().split("T")[0]+" "+rows[i].date.toISOString().split("T")[1].slice(0,8);
			switch(rows[i].type){
				case 1:
					type_temp="수신 통화";
					type_cs_temp="call";
					type_gs_temp="get";
					var tttt=rows[i].duration;
					if(tttt>=3600){
						body_temp=Math.floor(tttt/3600)+"시간 "+Math.floor((tttt%3600)/60)+"분 "+(tttt%60)+"초";
						duration_temp="more60";
					}
					else if(tttt>=60){
						body_temp=Math.floor(tttt/60)+"분 "+(tttt%60)+"초";
						if(tttt<=600)
							duration_temp="less10";
					}
					else{
						body_temp=tttt+"초";
						duration_temp="less10";
					}
					break;
				case 2:
					type_temp="발신 통화";
					type_cs_temp="call";
					type_gs_temp="send";
					var tttt=rows[i].duration;
					if(tttt>=3600){
						body_temp=Math.floor(tttt/3600)+"시간 "+Math.floor((tttt%3600)/60)+"분 "+(tttt%60)+"초";
						duration_temp="more60";
					}
					else if(tttt>=60){
						body_temp=Math.floor(tttt/60)+"분 "+(tttt%60)+"초";
						if(tttt<=600)
							duration_temp="less10";
					}
					else{
						body_temp=tttt+"초";
						duration_temp="less10";
					}
					break;
				case 3:
					type_temp="부재중 통화";
					type_cs_temp="call";
					type_gs_temp="missed";
					body_temp="-";
					duration_temp="";
					break;
				case 813:
					body_temp=rows[i].body;
					if(!body_temp)
						delete_temp="true";
					type_temp="발신 문자";
					type_cs_temp="sms";
					type_gs_temp="send";
					break;
				case 820:
					body_temp="[mms]";
					type_temp="수신 문자";
					type_cs_temp="sms";
					type_gs_temp="get";
					break;
				case 814:
					body_temp=rows[i].body;
					if(!body_temp)
						delete_temp="true";
					type_temp="수신 문자";
					type_cs_temp="sms";
					type_gs_temp="get";
					break;
				case 825:
					body_temp="[안전안내문자]";
					type_temp="수신 문자";
					type_cs_temp="sms";
					type_gs_temp="get";
					break;
			}
			values_list_all.push({type:type_temp, type_cs:type_cs_temp ,type_gs:type_gs_temp,number:number_temp,date:date_temp, body:body_temp, duration:duration_temp, delete:delete_temp});
		}
		myList2 = new List('listspace2', options_list, values_list_all);
	}
	else
		cc.innerHTML='Error-#list2'+err;
});

function get_date_list(){
	listspace.style="display:none";
	listspace2.style="display:none";
	listspace3.style="display:inline";
	listspace4.style="display:none";
	listspace5.style="display:none";
	chartspace.style="display:none";
	choicespace.style="display:none";

	list_date_start=document.getElementById('between_list_date_start').value+' 00:00:00';
	list_date_end=document.getElementById('between_list_date_end').value+' 23:59:59';

	connection.query('select calllog.type, calllog.number, calllog.name, calllog.date, calllog.duration, sms.body, sms.read_c from calllog left join sms on calllog.number=sms.address and timestampdiff(second,calllog.date, sms.date) between -5 and 0 where calllog.date between ? and ?;',[list_date_start, list_date_end],function(err, rows){
		if(!err){
			myList3.clear();
			values_list_between.length=0;
			for(var i=0;i<rows.length;i++){
				var number_temp="";
				var duration_temp="";
				var body_temp="";
				var type_temp='';
				var type_cs_temp='';
				var type_gs_temp='';
				var delete_temp="false";
				if(!rows[i].name)
					number_temp=rows[i].number+" ( - )";
				else
					number_temp=rows[i].number+" ("+rows[i].name+")";

				var date_temp=rows[i].date.toISOString().split("T")[0]+" "+rows[i].date.toISOString().split("T")[1].slice(0,8);
				switch(rows[i].type){
					case 1:
						type_temp="수신 통화";
						type_cs_temp="call";
						type_gs_temp="get";
						var tttt=rows[i].duration;
						if(tttt>=3600){
							body_temp=Math.floor(tttt/3600)+"시간 "+Math.floor((tttt%3600)/60)+"분 "+(tttt%60)+"초";
							duration_temp="more60";
						}
						else if(tttt>=60){
							body_temp=Math.floor(tttt/60)+"분 "+(tttt%60)+"초";
							if(tttt<=600)
								duration_temp="less10";
						}
						else{
							body_temp=tttt+"초";
							duration_temp="less10";
						}
						break;
					case 2:
						type_temp="발신 통화";
						type_cs_temp="call";
						type_gs_temp="send";
						var tttt=rows[i].duration;
						if(tttt>=3600){
							body_temp=Math.floor(tttt/3600)+"시간 "+Math.floor((tttt%3600)/60)+"분 "+(tttt%60)+"초";
							duration_temp="more60";
						}
						else if(tttt>=60){
							body_temp=Math.floor(tttt/60)+"분 "+(tttt%60)+"초";
							if(tttt<=600)
								duration_temp="less10";
						}
						else{
							body_temp=tttt+"초";
							duration_temp="less10";
						}
						break;
					case 3:
						type_temp="부재중 통화";
						type_cs_temp="call";
						type_gs_temp="missed";
						body_temp="-";
						duration_temp="";
						break;
					case 813:
						body_temp=rows[i].body;
						if(!body_temp)
							delete_temp="true";
						type_temp="발신 문자";
						type_cs_temp="sms";
						type_gs_temp="send";
						break;
					case 820:
						body_temp="[mms]";
						type_temp="수신 문자";
						type_cs_temp="sms";
						type_gs_temp="get";
						break;
					case 814:
						body_temp=rows[i].body;
						if(!body_temp)
							delete_temp="true";
						type_temp="수신 문자";
						type_cs_temp="sms";
						type_gs_temp="get";
						break;
					case 825:
						body_temp="[안전안내문자]";
						type_temp="수신 문자";
						type_cs_temp="sms";
						type_gs_temp="get";
						break;
				}
				values_list_between.push({type:type_temp, type_cs:type_cs_temp ,type_gs:type_gs_temp,number:number_temp,date:date_temp, body:body_temp, duration:duration_temp, delete:delete_temp});
			}
			menu_name.innerHTML="특정 기간의 목록 / "+list_date_start.split(' ')[0]+" ~ "+list_date_end.split(' ')[0];
			myList3 = new List('listspace3', options_list, values_list_between);
		}
		else
			cc.innerHTML='Error-#list1'+err;
	});
	//connection.end();
}

var filter1List=[];
var filter2List=[];
var filter3List=[];
var filter1_element=document.getElementsByClassName("filter1");
var filter2_element=document.getElementsByClassName("filter2");
var filter3_element=document.getElementsByClassName("filter3");

function filter_listener(event){
	var data_filter_temp=event.target.getAttribute('data_filter');
	var data_value_temp=event.target.getAttribute('data_value');
	var icon_temp=event.target.getAttribute('icon');
	var checked_temp=event.target.checked;

	switch(event.target.id.slice(0,7)){
		case "filter1":
			filter_action(filter1List, checked_temp, data_filter_temp, data_value_temp, icon_temp, myList);
			break;
		case "filter2":
			filter_action(filter2List, checked_temp, data_filter_temp, data_value_temp, icon_temp, myList2);
			break;
		case "filter3":
			filter_action(filter3List, checked_temp, data_filter_temp, data_value_temp, icon_temp, myList3);
			break;
	}
}
function filter_action(paramlist, checked_temp, filter_temp, value_temp, icon_temp, myList_temp){
	if (checked_temp){
		document.getElementById(icon_temp).style="display:inline";

    	paramlist.push(filter_temp);
    	paramlist.push(value_temp);

    	myList_temp.filter(function (item) {
    		var check_all=true;
    		for(var i=0;i<paramlist.length;i=i+2){
    			if(item.values()[paramlist[i]] !== paramlist[i+1])
    				check_all=false;
    		}
        	if(check_all)
        		return true;
        	else 
            	return false;
    	});
	}
	else{
		document.getElementById(icon_temp).style="display:none";

    	paramlist.splice(paramlist.indexOf(value_temp)-1,2);

    	myList_temp.filter(function (item) {
    		var check_all=true;
    		for(var i=0;i<paramlist.length;i=i+2){
    			if(item.values()[paramlist[i]] !== paramlist[i+1])
    				check_all=false;
    		}
        	if(check_all)
        		return true;
        	else 
            	return false;
    	});
	}
};
for (var i = 0; i < filter1_element.length; i++) {
    filter1_element[i].addEventListener('click', filter_listener, false);
}
for (var i = 0; i < filter2_element.length; i++) {
    filter2_element[i].addEventListener('click', filter_listener, false);
}
for (var i = 0; i < filter3_element.length; i++) {
    filter3_element[i].addEventListener('click', filter_listener, false);
}

var more6 = document.getElementById('more6');
more6.addEventListener('click', function(){
	listspace.style="display:none";
	listspace2.style="display:none";
	listspace3.style="display:none";
	listspace4.style="display:inline";
	listspace5.style="display:none";
	chartspace.style="display:none";
	choicespace.style="display:none";
	choosed_menu="more6";
	menu_name.innerHTML="전체 기간의 평균 답장 시간";
	window.myChart.destroy();
});

var more7 = document.getElementById('more7');
more7.addEventListener('click', function(){
	listspace.style="display:none";
	listspace2.style="display:none";
	listspace3.style="display:none";
	listspace4.style="display:none";
	listspace5.style="display:inline";
	chartspace.style="display:none";
	choicespace.style="display:none";
	choosed_menu="more7";
	menu_name.innerHTML="특정 연락처와의 평균 답장 시간";
	window.myChart.destroy();
});


connection.query('drop table if exists sms_response; create table sms_response (number text, got_date datetime, got_body text, send_date datetime, send_body text, time int); insert into sms_response SELECT sms1.address, sms1.date,sms1.body, sms2.date, sms2.body,timestampdiff(second, sms1.date, sms2.date) FROM sms sms1, sms sms2 where sms1.tid=sms2.tid and sms1.type=1 and sms2.type=2 and timestampdiff(second, sms1.date, sms2.date) >0 and timestampdiff(day,sms2.date, sms1.date)< 2; delete sms1 from sms_response sms1, sms_response sms2 where sms1.send_date=sms2.send_date and timestampdiff(second, sms2.got_date,sms1.got_date)<0; delete sms1 from sms_response sms1, sms_response sms2 where sms1.got_date=sms2.got_date and timestampdiff(second, sms2.send_date,sms1.send_date)>0;', function(err, rows, fields){
	if(err)
		cc.innerHTML='Error-#27';
	else{
		connection.query('select avg(time) "avg" from sms_response;', function(err, rows, fields){
			if(!err){
				var tttt=rows[0].avg;
				var avg_temp="";
				if(tttt>=3600)
					avg_temp=Math.floor(tttt/3600)+"시간 "+Math.floor((tttt%3600)/60)+"분 "+Math.floor(tttt%60)+"초";
				else if(tttt>=60)
					avg_temp=Math.floor(tttt/60)+"분 "+Math.floor(tttt%60)+"초";
				else
					avg_temp=tttt+"초";
				values_list_res.push({get_body:"해당 기간의 평균 답장 시간", send_body:avg_temp, ttttt:tttt});
			}
			else
				cc.innerHTML='Error-#28'+err;
		});

		connection.query('select * from sms_response;', function(err, rows, fields){
			if(!err){
				for(var i=0;i<rows.length;i++){
					var number_temp=rows[i].number;
					var get_body_temp=rows[i].got_body;
					var get_date_temp=rows[i].got_date.toISOString().split("T")[0]+" "+rows[i].got_date.toISOString().split("T")[1].slice(0,8);
					var send_body_temp=rows[i].send_body;
					var send_date_temp=rows[i].send_date.toISOString().split("T")[0]+" "+rows[i].send_date.toISOString().split("T")[1].slice(0,8);
					var tttt=rows[i].time;
					var timediff_temp="";
					if(tttt>=3600)
						timediff_temp=Math.floor(tttt/3600)+"시간 "+Math.floor((tttt%3600)/60)+"분 "+(tttt%60)+"초";
					else if(tttt>=60)
						timediff_temp=Math.floor(tttt/60)+"분 "+(tttt%60)+"초";
					else
						timediff_temp=tttt+"초";

					values_list_res.push({number:number_temp, get_body:get_body_temp, get_date:get_date_temp, send_body:send_body_temp, send_date:send_date_temp, timediff:timediff_temp, ttttt:tttt});
				}
				myList4 = new List('listspace4', options_list_res, values_list_res);
			}
			else
				cc.innerHTML='Error-#29'+err;
		});
	}
})

		


function get_number_restime_push(){
	restime_number.push(document.getElementById('restime_number').value);
	more7_list.innerHTML=restime_number.join('<br>');
}
function get_number_restime_pop(){
	restime_number.splice(restime_number.indexOf(document.getElementById('restime_number').value),1);
	more7_list.innerHTML=restime_number.join('<br>');
}
function get_number_restime(){
	listspace.style="display:none";
	listspace2.style="display:none";
	listspace3.style="display:none";
	listspace4.style="display:none";
	listspace5.style="display:inline";
	chartspace.style="display:none";
	choicespace.style="display:none";

	myList5.clear();
	values_list_res_with.length=0;

	connection.query('select avg(time) "avg" from sms_response where number in (?);',[restime_number], function(err, rows, fields){
		if(!err){
			var tttt=rows[0].avg;
			var avg_temp="";
			if(tttt>=3600)
				avg_temp=Math.floor(tttt/3600)+"시간 "+Math.floor((tttt%3600)/60)+"분 "+Math.floor(tttt%60)+"초";
			else if(tttt>=60)
				avg_temp=Math.floor(tttt/60)+"분 "+Math.floor(tttt%60)+"초";
			else
				avg_temp=tttt+"초";
			values_list_res_with.push({get_body:"해당 연락처와의 평균 답장 시간", send_body:avg_temp, ttttt:tttt});
		}
		else
			cc.innerHTML='Error-#30'+err;
	});

	connection.query('select * from sms_response where number in (?);',[restime_number], function(err, rows, fields){
		if(!err){
			for(var i=0;i<rows.length;i++){
				var number_temp=rows[i].number;
				var get_body_temp=rows[i].got_body;
				var get_date_temp=rows[i].got_date.toISOString().split("T")[0]+" "+rows[i].got_date.toISOString().split("T")[1].slice(0,8);
				var send_body_temp=rows[i].send_body;
				var send_date_temp=rows[i].send_date.toISOString().split("T")[0]+" "+rows[i].send_date.toISOString().split("T")[1].slice(0,8);
				var tttt=rows[i].time;
				var timediff_temp="";
				if(tttt>=3600)
					timediff_temp=Math.floor(tttt/3600)+"시간 "+Math.floor((tttt%3600)/60)+"분 "+(tttt%60)+"초";
				else if(tttt>=60)
					timediff_temp=Math.floor(tttt/60)+"분 "+(tttt%60)+"초";
				else
					timediff_temp=tttt+"초";

				values_list_res_with.push({number:number_temp, get_body:get_body_temp, get_date:get_date_temp, send_body:send_body_temp, send_date:send_date_temp, timediff:timediff_temp, ttttt:tttt});
			}
			menu_name.innerHTML="특정 연락처와의 평균 답장 시간";
			myList5 = new List('listspace5', options_list_res, values_list_res_with);
		}
		else
			cc.innerHTML='Error-#31'+err;
	});
	//connection.end();
}
