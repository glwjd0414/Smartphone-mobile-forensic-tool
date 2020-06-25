const {PythonShell}=require('python-shell');

var choosed_menu="";
var title_text="";
var label_text_1=[];
var label_text_2=[];
var label_data_text_1="";
var label_data_text_2="";
var label_data_1=[];
var label_data_2=[];

var paylist_date_start="";
var paylist_date_end="";
var date_start="";
var date_end="";
var payment_date_start="";
var payment_ate_end="";
var card_date_start="";
var card_date_end="";
var store_date_start="";
var store_date_end="";
var keyword_date_start="";
var keyword_date_end="";
var number=[];

var keyword_1_list=[];
var keyword_1_count=[];
var keyword_all_list=[];
var keyword_all_count=[];
var keyword_between_list=[];
var keyword_between_count=[];
var keyword_with_list=[];
var keyword_with_count=[];

var payment_1_list=[];
var payment_1_count=[];
var payment_2_list=[];
var payment_2_count=[];
var payment_3_list=[];
var payment_3_count=[];
var payment_4_list=[];
var payment_4_count=[];
var payment_5_list=[];
var payment_5_count=[];
var payment_6_list=[];
var payment_6_count=[];
var payment_7_list=[];
var payment_7_count=[];
var payment_8_list=[];
var payment_8_count=[];
var payment_9_list=[];
var payment_9_count=[];
var payment_10_list=[];
var payment_10_count=[];
var payment_11_list=[];
var payment_11_count=[];
var payment_12_list=[];
var payment_12_count=[];
var payment_13_list=[];
var payment_13_count=[];
var payment_14_list=[];
var payment_14_count=[];

const canvas = document.getElementById("myChart")
const ctx=canvas.getContext('2d');
const choicespace = document.getElementById("choice");
const chartspace = document.getElementById("chart");
const keywordspace = document.getElementById("keywordspace");
const keyword1space = document.getElementById("keyword1space");
const keyword2space = document.getElementById("keyword2space");
const keyword3space = document.getElementById("keyword3space");
const keyword4space = document.getElementById("keyword4space");
const payment6space = document.getElementById("payment6space");
const payment7space = document.getElementById("payment7space");
const payment8space = document.getElementById("payment8space");
const payment9space = document.getElementById("payment9space");
const between_submit = document.getElementById("between_date_submit");
const with_submit = document.getElementById("number_submit");
const paymentspace = document.getElementById("paymentspace");
const payment1space = document.getElementById("payment1space");
var keyword0 = document.getElementById('keyword');
var keyword1 = document.getElementById('keyword1');
var keyword2 = document.getElementById('keyword2');
var keyword3 = document.getElementById('keyword3');
var keyword4 = document.getElementById('keyword4');
var payment0 = document.getElementById('payment0');
var payment1 = document.getElementById('payment1');
var payment2 = document.getElementById('payment2');
var payment3 = document.getElementById('payment3');
var payment4 = document.getElementById('payment4');
var payment5 = document.getElementById('payment5');
var payment6 = document.getElementById('payment6');
var payment7 = document.getElementById('payment7');
var payment8 = document.getElementById('payment8');
var payment9 = document.getElementById('payment9');

var options_charts_1 = {
  responsive: false,
  title:{
    display:true,
    text:title_text
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
        stacked:true,
        ticks: {
                beginAtZero:true
        }
      }],
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  }
};

var options_charts_2 = {
  responsive: false,
  title:{
    display:true,
    text:title_text
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
        stacked:true,
        ticks: {
                beginAtZero:true
        }
      }],
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  }
};

var options_chart_1={
  type: 'bar',
  data: {
    labels: label_text_1,
    datasets:[{
      label:label_data_text_1,
      data:label_data_1,
      backgroundColor:'rgba(255, 206, 86, 0.2)',
      borderWidth: 1
    }]
  },
    options: options_charts_1
};

var options_chart_2={
  type: 'bar',
  data: {
    labels: label_text_2,
    datasets:[{
      label:label_data_text_2,
      data:label_data_2,
      backgroundColor:'rgba(75, 192, 192, 0.2)',
      borderWidth: 1
    }]
  },
    options: options_charts_2
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
    document.getElementById('between_paylist_date_start').min=(rows[0].min.toISOString().split("T")[0]);
    document.getElementById('between_paylist_date_start').max=(rows[0].max.toISOString().split("T")[0]);
    document.getElementById('between_paylist_date_end').min=(rows[0].min.toISOString().split("T")[0]);
    document.getElementById('between_paylist_date_end').max=(rows[0].max.toISOString().split("T")[0]);
    document.getElementById('between_amount_date_start').min=(rows[0].min.toISOString().split("T")[0]);
    document.getElementById('between_amount_date_start').max=(rows[0].max.toISOString().split("T")[0]);
    document.getElementById('between_amount_date_end').min=(rows[0].min.toISOString().split("T")[0]);
    document.getElementById('between_amount_date_end').max=(rows[0].max.toISOString().split("T")[0]);
    document.getElementById('between_payment_date_start').min=(rows[0].min.toISOString().split("T")[0]);
    document.getElementById('between_payment_date_start').max=(rows[0].max.toISOString().split("T")[0]);
    document.getElementById('between_payment_date_end').min=(rows[0].min.toISOString().split("T")[0]);
    document.getElementById('between_payment_date_end').max=(rows[0].max.toISOString().split("T")[0]);
    document.getElementById('between_card_date_start').min=(rows[0].min.toISOString().split("T")[0]);
    document.getElementById('between_card_date_start').max=(rows[0].max.toISOString().split("T")[0]);
    document.getElementById('between_card_date_end').min=(rows[0].min.toISOString().split("T")[0]);
    document.getElementById('between_card_date_end').max=(rows[0].max.toISOString().split("T")[0]);
    document.getElementById('between_store_date_start').min=(rows[0].min.toISOString().split("T")[0]);
    document.getElementById('between_store_date_start').max=(rows[0].max.toISOString().split("T")[0]);
    document.getElementById('between_store_date_end').min=(rows[0].min.toISOString().split("T")[0]);
    document.getElementById('between_store_date_end').max=(rows[0].max.toISOString().split("T")[0]);

  }
  else
    cc.innerHTML='Error-#0/minmax';
});

var options_list = {
  valueNames: [ 'type_cs', 'number', 'date','body', 'keyword' ],
  item: '<div class="col-xl-3 col-md-6 mb-4"><div class="card border-left-success shadow h-100 py-2"><div class="card-body"><div class="row no-gutters align-items-center"><div class="col mr-2"><li id="listrow"><div id="m2"><p id="listrow_number" class="number"></p><p id="listrow_date" class="date"></p></div><p id="listrow_body" class="body"></p><p id="listrow_keyword" class="keyword"></p></li></div></div></div></div></div>'
};


var options_list_pay = {
  valueNames: [ 'bname','payment','payment_','price', 'amount', 'sname', 'date' ],
  item: '<div class="col-xl-3 col-md-6 mb-4"><div class="card border-left-success shadow h-100 py-2"><div class="card-body"><div class="row no-gutters align-items-center"><div class="col mr-2"><li id="listrow"><p id="listrow_bname" class="bname"></p><div id="m2"><p id="listrow_price" class="price"></p><p id="listrow_sname" class="sname"></p></div><div id="m2"><p id="listrow_payment" class="payment"></p><p id="listrow_date" class="date"></p></div></li></div></div></div></div></div>'
};

var values_list = [];
var values_list_1 = [];
var values_list_all = [];
var values_list_between = [];
var values_list_with = [];
var values_payment_list_all = [];
var values_payment_list_between = [];
var values_list_card_rank=[];
var values_list_card_rank_between=[];
var values_list_store_rank=[];
var values_list_store_rank_between=[];

var myList;
var myList1 = new List("keyword1space", options_list, values_list_1);
var myList2 = new List("keyword2space", options_list, values_list_all);
var myList3 = new List("keyword3space", options_list, values_list_between);
var myList4 = new List("keyword4space", options_list, values_list_with);
var myList5;
var myList5_1 = new List("payment1space", options_list_pay, values_payment_list_between);
var myList6 = new List("payment6space", options_list, values_list_card_rank);
var myList7 = new List("payment7space", options_list, values_list_card_rank_between);
var myList8 = new List("payment8space", options_list, values_list_store_rank);
var myList9 = new List("payment9space", options_list, values_list_store_rank_between);

connection.query('update contact set number=replace(number,"-","");', function(err, rows, fields){
  if(err)
    cc.innerHTML='Error-#1.0-contact replace';
});

let option = {
  mode: 'text',
  pythonPath: 'py',
  pythonOptions: ['-3.6'],
  scriptPath: '',
  args: [],
  encoding: 'utf8'
};

PythonShell.run('src/analysis_message.py', option, function(err, result){
  if(err)
    console.log(err);
  else{
    for(var i=0;i<result.length;i++){
      let data = result[i].replace(`b\'`, '').replace(`\'`, '');
      let buff = Buffer.from(data,'base64');
      let text=buff.toString('utf-8');
      var data_temp=text.split('|');
      values_list.push({type_cs:data_temp[0], number:data_temp[1], date:data_temp[2], body:data_temp[3], keyword:data_temp[4]});
    }
    myList = new List("keywordspace", options_list, values_list);
    //cc.innerHTML="[done] All List Keyword";
    keyword0.style="text-decoration:none";
  }
});

PythonShell.run('src/analysis_message_rank_recent.py', option, function(err, result){
  if(err)
    console.log(err);
  else{
    for(var i=0;i<result.length;i++){
      let data = result[i].replace(`b\'`, '').replace(`\'`, '');
      let buff = Buffer.from(data,'base64');
      let text=buff.toString('utf-8');
      var data_temp=text.split('|');
      keyword_1_list.push(data_temp[0]);
      keyword_1_count.push(data_temp[1]);
    }
    //cc.innerHTML="[done] recent Keyword";
    keyword1.style="text-decoration:none";
  }
});

PythonShell.run('src/analysis_message_rank_all.py', option, function(err, result){
  if(err)
    console.log(err);
  else{
    for(var i=0;i<result.length;i++){
      let data = result[i].replace(`b\'`, '').replace(`\'`, '');
      let buff = Buffer.from(data,'base64');
      let text=buff.toString('utf-8');
      var data_temp=text.split('|');
      keyword_all_list.push(data_temp[0]);
      keyword_all_count.push(data_temp[1]);
    }
    //cc.innerHTML="[done] recent Keyword";
    keyword2.style="text-decoration:none";
  }
});

PythonShell.run('src/analysis_message_bank.py', option, function(err, result){
  if(err)
    cc.innerHTML="Error-analysis_message_bank.py";
  else{
    connection.query('select * from sms_bank;', function(err, rows, fields){
      if(err)
        cc.innerHTML='Error-#2.0-payment select';
      else{
        for(var i=0;i<rows.length;i++){
          var date_temp=rows[i].date.toISOString().split("T")[0]+" "+rows[i].date.toISOString().split("T")[1].slice(0,8);
          var price_temp=rows[i].price;
          var amount_temp=""
          var bname_temp=rows[i].bname;
          var sname_temp=rows[i].sname;
          var payplan_temp=rows[i].paymentplan;
          var payplan__temp=rows[i].paymentplan;
          if (payplan__temp != "체크"&&payplan__temp!="일시불"){
            payplan__temp="할부";
          }
          if (price_temp < 50000){amount_temp="less5";}
          else if (price_temp >=50000 && price_temp <100000){amount_temp="5to10";}
          else{amount_temp="more10";}
          values_payment_list_all.push({bname:bname_temp, payment:payplan_temp ,payment_:payplan__temp ,price:numberWithCommas(price_temp)+"원",amount:amount_temp,sname:sname_temp, date:date_temp});
        }
        myList5 = new List("paymentspace", options_list_pay, values_payment_list_all);
      }
    });

    connection.query('SELECT date_format(date, "%Y-%m-02 00:00:00") "date", sum(price) "sum" FROM sms_bank group by date_format(date, "%Y-%m-02 00:00:00") order by date_format(date, "%Y-%m-02 00:00:00");', function(err, rows, fields){
      if(!err){
        for(var i=0;i<rows.length;i++){
          var date=rows[i].date.slice(0,7);
          var sum=rows[i].sum;
          payment_1_list.push(date)
          payment_1_count.push(sum)
        }
      }
      else
        cc.innerHTML='Error-query-#payment_1';
    });

    connection.query('SELECT s1.date "date", sum(s2.sum) "sum" FROM (SELECT date_format(date, "%Y-%m-02 00:00:00") "date", sum(price) "sum" FROM sms_bank group by date_format(date, "%Y-%m-02 00:00:00") order by date_format(date, "%Y-%m-02 00:00:00")) s1, (SELECT date_format(date, "%Y-%m-02 00:00:00") "date", sum(price) "sum" FROM sms_bank group by date_format(date, "%Y-%m-02 00:00:00") order by date_format(date, "%Y-%m-02 00:00:00")) s2 where s1.date>=s2.date group by s1.date order by s1.date;', function(err, rows, fields){
      if(!err){
        for(var i=0;i<rows.length;i++){
          var date=rows[i].date.slice(0,7);
          var sum=rows[i].sum;
          payment_2_list.push(date)
          payment_2_count.push(sum)
        }
      }
      else
        cc.innerHTML='Error-query-#payment_2';
    });

    connection.query('drop table if exists sms_bank_hour; create table sms_bank_hour(hour int not null, smscount int, primary key(hour)); set @hour:=-1; insert into sms_bank_hour(hour, smscount) (select (@hour:=@hour+1) "hour", (select count(*) from sms_bank where hour(date)=@hour) "count" from sms where @hour<23);', function(err, rows, fields){
      if(!err){
        connection.query('select * from sms_bank_hour order by hour;', function(err, rows, fields){
          for(var i=0;i<rows.length;i++){
            var hour=rows[i].hour;
            var count=rows[i].smscount;
            payment_5_list.push(hour)
            payment_5_count.push(count)
          }
        });
      }
      else
        cc.innerHTML='Error-query-#payment_5';
    });

    connection.query('select bname, count(*) "count" from sms_bank group by bname order by count(*) desc;', function(err, rows, fields){
      if(!err){
        for(var i=0;i<rows.length;i++){
          var bname=rows[i].bname;
          var count=rows[i].count;
          payment_7_list.push(bname)
          payment_7_count.push(count)
        }
      }
      else
        cc.innerHTML='Error-query-#payment_7';
    });

    connection.query('select bname, sum(price) "sum" from sms_bank group by bname order by sum(price) desc;', function(err, rows, fields){
      if(!err){
        for(var i=0;i<rows.length;i++){
          var bname=rows[i].bname;
          var sum=rows[i].sum;
          payment_8_list.push(bname)
          payment_8_count.push(sum)
        }
      }
      else
        cc.innerHTML='Error-query-#payment_8';
    });

    connection.query('select sname, count(*) "count" from sms_bank group by sname order by count(*) desc;', function(err, rows, fields){
      if(!err){
        for(var i=0;i<rows.length;i++){
          var sname=rows[i].sname;
          var count=rows[i].count;
          payment_11_list.push(sname)
          payment_11_count.push(count)
        }
      }
      else
        cc.innerHTML='Error-query-#payment_11';
    });

    connection.query('select sname, sum(price) "sum" from sms_bank group by sname order by sum(price) desc;', function(err, rows, fields){
      if(!err){
        for(var i=0;i<rows.length;i++){
          var sname=rows[i].sname;
          var sum=rows[i].sum;
          payment_12_list.push(sname)
          payment_12_count.push(sum)
        }
      }
      else
        cc.innerHTML='Error-query-#payment_12';
    });
  }
});

function chartspaceview(){
  keywordspace.style="display:none";
  choicespace.style="display:none";
  chartspace.style="display:inline";
  keyword1space.style="display:none";
  keyword2space.style="display:none";
  keyword3space.style="display:none";
  keyword4space.style="display:none";
  payment6space.style="display:none";
  payment7space.style="display:none";
  payment8space.style="display:none";
  payment9space.style="display:none";
  paymentspace.style="display:none";
  payment1space.style="display:none";
}

function changeLabelText(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){

  options_chart_1.type="bar";
  options_chart_1.data.labels=a;
  options_chart_1.data.datasets[0].label=b;
  options_chart_1.data.datasets[0].data=c;

  options_chart_2.type="bar";
  options_chart_2.data.labels=d;
  options_chart_2.data.datasets[0].label=e;
  options_chart_2.data.datasets[0].data=f;

  box_name.innerHTML=i;
  menu_name.innerHTML=h;
  options_charts_1.title.text=g;
  options_charts_2.title.text=g;

  options_chart_1.options=options_charts_1;
  options_chart_2.options=options_charts_2;
}

function changeLabelText_hor(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){

  options_chart_1.type="horizontalBar";
  options_chart_1.data.labels=a;
  options_chart_1.data.datasets[0].label=b;
  options_chart_1.data.datasets[0].data=c;

  options_chart_2.type="horizontalBar";
  options_chart_2.data.labels=d;
  options_chart_2.data.datasets[0].label=e;
  options_chart_2.data.datasets[0].data=f;

  box_name.innerHTML=i;
  menu_name.innerHTML=h;
  options_charts_1.title.text=g;
  options_charts_2.title.text=g;

  options_chart_1.options=options_charts_1;
  options_chart_2.options=options_charts_2;
}

keyword0.addEventListener('click', function(){
  keywordspace.style="display:inline";
  choicespace.style="display:none";
  chartspace.style="display:none";
  keyword1space.style="display:none";
  keyword2space.style="display:none";
  keyword3space.style="display:none";
  keyword4space.style="display:none";
  payment6space.style="display:none";
  payment7space.style="display:none";
  payment8space.style="display:none";
  payment9space.style="display:none";
  paymentspace.style="display:none";
  payment1space.style="display:none";
  menu_name.innerHTML="전체 기간의 문자의 키워드 목록";
});

keyword1.addEventListener('click', function(){
  choosed_menu="keyword1";
  chartspaceview();

  changeLabelText(keyword_1_list,"언급 횟수",keyword_1_count,[],"",[],"최근 1개월의 문자 키워드","최근 1개월의 문자 키워드 순위","# 언급 횟수");

  window.myChart.destroy();
  document.getElementById("myChart").height="350";
  document.getElementById("chart-area").style="height:380px;";
  window.myChart = new Chart(ctx, options_chart_1);
});

keyword2.addEventListener('click', function(){
  choosed_menu="keyword2";
  chartspaceview();

  changeLabelText(keyword_all_list,"언급 횟수",keyword_all_count,[],"",[],"전체 기간의 문자 키워드","전체 기간의 문자 키워드 순위","# 언급 횟수");

  window.myChart.destroy();
  document.getElementById("myChart").height="350";
  document.getElementById("chart-area").style="height:380px;";
  window.myChart = new Chart(ctx, options_chart_1);
});

keyword3.addEventListener('click', function(){
  choosed_menu="keyword3";
  chartspaceview();

  changeLabelText(keyword_between_list,"언급 횟수",keyword_between_count,[],"",[],"특정 기간의 문자 키워드","특정 기간의 문자 키워드 순위 / "+keyword_date_start.split(' ')[0]+" ~ "+keyword_date_end.split(' ')[0],"# 언급 횟수");

  window.myChart.destroy();
  document.getElementById("myChart").height="350";
  document.getElementById("chart-area").style="height:380px;";
  window.myChart = new Chart(ctx, options_chart_1);
});

keyword4.addEventListener('click', function(){
  choosed_menu="keyword4";
  chartspaceview();

  changeLabelText(keyword_with_list,"언급 횟수",keyword_with_count,[],"",[],"특정 연락처와의 문자 키워드","특정 연락처와의 문자 키워드 순위","# 언급 횟수");

  window.myChart.destroy();
  document.getElementById("myChart").height="350";
  document.getElementById("chart-area").style="height:380px;";
  window.myChart = new Chart(ctx, options_chart_1);
});

payment0.addEventListener('click', function(){
  keywordspace.style="display:none";
  choicespace.style="display:none";
  chartspace.style="display:none";
  keyword1space.style="display:none";
  keyword2space.style="display:none";
  keyword3space.style="display:none";
  keyword4space.style="display:none";
  payment6space.style="display:none";
  payment7space.style="display:none";
  payment8space.style="display:none";
  payment9space.style="display:none";
  paymentspace.style="display:inline";
  payment1space.style="display:none";
  menu_name.innerHTML="결제문자 목록";
});

payment1.addEventListener('click', function(){
  keywordspace.style="display:none";
  choicespace.style="display:none";
  chartspace.style="display:none";
  keyword1space.style="display:none";
  keyword2space.style="display:none";
  keyword3space.style="display:none";
  keyword4space.style="display:none";
  payment6space.style="display:none";
  payment7space.style="display:none";
  payment8space.style="display:none";
  payment9space.style="display:none";
  paymentspace.style="display:none";
  payment1space.style="display:inline";
  menu_name.innerHTML="특정 기간의 결제문자 목록 / "+paylist_date_start.split(' ')[0]+" ~ "+paylist_date_end.split(' ')[0];
});

payment2.addEventListener('click', function(){
  chartspaceview();
  type1.innerHTML="# 결제 금액";
  type2.innerHTML="# 누적 결제 금액";
  choicespace.style="display:inline";
  choosed_menu="payment2";

  changeLabelText(payment_1_list,"결제 금액",payment_1_count,payment_2_list,"누적 결제 금액",payment_2_count, "전체 기간의 결제 금액 통계","전체 기간의 결제 금액 통계","# 결제 금액");

  window.myChart.destroy();
  document.getElementById("myChart").height="350";
  document.getElementById("chart-area").style="height:380px;";
  window.myChart = new Chart(ctx, options_chart_1);
});

payment3.addEventListener('click', function(){
  chartspaceview();
  type1.innerHTML="# 결제 금액";
  type2.innerHTML="# 누적 결제 금액";
  choicespace.style="display:inline";
  choosed_menu="payment3";

  changeLabelText(payment_3_list,"결제 금액",payment_3_count,payment_4_list,"누적 결제 금액",payment_4_count,"특정 기간의 결제 금액 통계","특정 기간의 결제 금액 통계 / "+date_start.split(' ')[0]+" ~ "+date_end.split(' ')[0],"# 결제 금액");

  window.myChart.destroy();
  document.getElementById("myChart").height="350";
  document.getElementById("chart-area").style="height:380px;";
  window.myChart = new Chart(ctx, options_chart_1);
});

payment4.addEventListener('click', function(){
  chartspaceview();
  choosed_menu="payment4";

  changeLabelText(payment_5_list,"결제 횟수",payment_5_count,[],"",[],"전체 기간의 결제 시간대","전체 기간의 결제 시간대","# 결제 횟수");

  window.myChart.destroy();
  document.getElementById("myChart").height="350";
  document.getElementById("chart-area").style="height:380px;";
  window.myChart = new Chart(ctx, options_chart_1);
});

payment5.addEventListener('click', function(){
  chartspaceview();
  choosed_menu="payment5";

  changeLabelText(payment_6_list,"결제 횟수",payment_6_count,[],"",[],"특정 기간의 결제 시간대","특정 기간의 결제 시간대 / "+payment_date_start.split(' ')[0]+" ~ "+payment_date_end.split(' ')[0],"# 결제 횟수");

  window.myChart.destroy();
  document.getElementById("myChart").height="350";
  document.getElementById("chart-area").style="height:380px;";
  window.myChart = new Chart(ctx, options_chart_1);
});

payment6.addEventListener('click', function(){
  chartspaceview();
  choosed_menu="payment6";
  type1.innerHTML="# 결제 횟수 기준";
  type2.innerHTML="# 결제 금액 기준";
  choicespace.style="display:inline";
  
  changeLabelText_hor(payment_7_list,"결제 횟수",payment_7_count,payment_8_list,"결제 금액",payment_8_count,"전체 기간의 카드 이용 순위", "전체 기간의 카드 이용 순위", "# 결제 횟수 기준");
  
  window.myChart.destroy();
  document.getElementById("myChart").height="1000";
  document.getElementById("chart-area").style="height:1030px;";
  window.myChart = new Chart(ctx, options_chart_1);
});

payment7.addEventListener('click', function(){
  chartspaceview();
  choosed_menu="payment7";
  type1.innerHTML="# 결제 횟수 기준";
  type2.innerHTML="# 결제 금액 기준";
  choicespace.style="display:inline";

  changeLabelText_hor(payment_9_list,"결제 횟수",payment_9_count,payment_10_list,"결제 금액",payment_10_count,"특정 기간의 카드 이용 순위","특정 기간의 카드 이용 순위 / "+card_date_start.split(' ')[0]+" ~ "+card_date_end.split(' ')[0],"# 결제 횟수 기준");

  window.myChart.destroy();
  document.getElementById("myChart").height="1000";
  document.getElementById("chart-area").style="height:1030px;";
  window.myChart = new Chart(ctx, options_chart_1);
});

payment8.addEventListener('click', function(){
  chartspaceview();
  choosed_menu="payment8";
  type1.innerHTML="# 결제 횟수 기준";
  type2.innerHTML="# 결제 금액 기준";
  choicespace.style="display:inline";

  changeLabelText_hor(payment_11_list,"결제 횟수",payment_11_count,payment_12_list,"결제 금액",payment_12_count,"전체 기간의 사용처 순위","전체 기간의 사용처 순위","# 결제 횟수 기준");

  window.myChart.destroy();
  document.getElementById("myChart").height="1000";
  document.getElementById("chart-area").style="height:1030px;";
  window.myChart = new Chart(ctx, options_chart_1);
});

payment9.addEventListener('click', function(){
  chartspaceview();
  choosed_menu="payment9";
  type1.innerHTML="# 결제 횟수 기준";
  type2.innerHTML="# 결제 금액 기준";
  choicespace.style="display:inline";

  changeLabelText_hor(payment_13_list,"결제 횟수",payment_13_count,payment_14_list,"결제 금액",payment_14_count,"특정 기간의 사용처 순위","특정 기간의 사용처 순위 / "+store_date_start.split(' ')[0]+" ~ "+store_date_end.split(' ')[0],"# 결제 횟수 기준");

  window.myChart.destroy();
  document.getElementById("myChart").height="1000";
  document.getElementById("chart-area").style="height:1030px;";
  window.myChart = new Chart(ctx, options_chart_1);
});

var type1 = document.getElementById('type1');
type1.addEventListener('click', function(){
  switch(choosed_menu){
    case 'payment2':
    case 'payment3':
      box_name.innerHTML="# 결제 금액";
      break;
    case 'payment6':
    case 'payment7':
    case 'payment8':
    case 'payment9':
      box_name.innerHTML="# 결제 횟수 기준";
      break;
  }
  window.myChart.destroy();
  window.myChart = new Chart(ctx, options_chart_1);
});

var type2 = document.getElementById('type2');
type2.addEventListener('click', function(){
  switch(choosed_menu){
    case 'payment2':
    case 'payment3':
      box_name.innerHTML="# 누적 결제 금액";
      break;
    case 'payment6':
    case 'payment7':
    case 'payment8':
    case 'payment9':
      box_name.innerHTML="# 결제 금액 기준";
      break;
  }
  window.myChart.destroy();
  window.myChart = new Chart(ctx, options_chart_2);
});

function get_date_keyword(){
  menu_name.innerHTML="특정 기간의 문자 키워드 추출 중...";
  keyword3.style="text-decoration:line-through";
  choosed_menu="keyword3";
  keywordspace.style="display:none";
  choicespace.style="display:none";
  chartspace.style="display:none";
  keyword1space.style="display:none";
  keyword2space.style="display:none";
  keyword3space.style="display:none";
  between_submit.disabled=true;
  keyword4space.style="display:none";
  payment6space.style="display:none";
  payment7space.style="display:none";
  payment8space.style="display:none";
  payment9space.style="display:none";
  paymentspace.style="display:none";
  payment1space.style="display:none";

  myList3.clear();
  keyword_between_list.length=0;
  keyword_between_count.length=0;

  keyword_date_start=document.getElementById('between_date_start').value+' 00:00:00';
  keyword_date_end=document.getElementById('between_date_end').value+' 23:59:59';

  let option_between = {
    mode: 'text',
    pythonPath: 'py',
    pythonOptions: ['-3.6'],
    scriptPath: '',
    args: [keyword_date_start, keyword_date_end],
    encoding: 'utf8'
  };

  PythonShell.run('src/analysis_message_rank_between.py', option_between, function(err, result){
    for(var i=0;i<result.length;i++){
      let data = result[i].replace(`b\'`, '').replace(`\'`, '');
      let buff = Buffer.from(data,'base64');
      let text=buff.toString('utf-8');
      var data_temp=text.split('|');
      keyword_between_list.push(data_temp[0]);
      keyword_between_count.push(data_temp[1]);
    }
    changeLabelText(keyword_between_list,"언급 횟수",keyword_between_count,[],"",[],"특정 기간의 문자 키워드","특정 기간의 문자 키워드 순위 / "+keyword_date_start.split(' ')[0]+" ~ "+keyword_date_end.split(' ')[0],"# 언급 횟수");

    window.myChart.destroy();
    document.getElementById("myChart").height="350";
    document.getElementById("chart-area").style="height:380px;";
    window.myChart = new Chart(ctx, options_chart_1);
    chartspace.style="display:inline";
    //cc.innerHTML="[done] recent Keyword";
    keyword3.style="text-decoration:none";
    between_submit.disabled=false;
  });
  //connection.end();
}

function get_number_push(){
  number.push(document.getElementById('number').value);
  keyword4_list.innerHTML=number.join('<br>');
}
function get_number_pop(){
  number.splice(number.indexOf(document.getElementById('number').value),1);
  keyword4_list.innerHTML=number.join('<br>');
}
function get_number_keyword(){
  menu_name.innerHTML="특정 연락처와의 문자 키워드 추출 중...";
  keyword4.style="text-decoration:line-through";
  choosed_menu="keyword4";
  keywordspace.style="display:none";
  choicespace.style="display:none";
  chartspace.style="display:none";
  keyword1space.style="display:none";
  keyword2space.style="display:none";
  keyword3space.style="display:none";
  keyword4space.style="display:none";
  payment6space.style="display:none";
  payment7space.style="display:none";
  payment8space.style="display:none";
  payment9space.style="display:none";
  with_submit.disabled=true;
  paymentspace.style="display:none";
  payment1space.style="display:none";

  myList4.clear();
  keyword_with_list.length=0;
  keyword_with_count.length=0;
  
  let option_between = {
    mode: 'text',
    pythonPath: 'py',
    pythonOptions: ['-3.6'],
    scriptPath: '',
    args: [number],
    encoding: 'utf8'
  };

  PythonShell.run('src/analysis_message_rank_with.py', option_between, function(err, result){
    for(var i=0;i<result.length;i++){
      let data = result[i].replace(`b\'`, '').replace(`\'`, '');
      let buff = Buffer.from(data,'base64');
      let text=buff.toString('utf-8');
      var data_temp=text.split('|');
      keyword_with_list.push(data_temp[0]);
      keyword_with_count.push(data_temp[1]);
    }
    changeLabelText(keyword_with_list,"언급 횟수",keyword_with_count,[],"",[],"특정 연락처와의 문자 키워드","특정 연락처와의 문자 키워드 순위", "# 언급 횟수");

    window.myChart.destroy();
    document.getElementById("myChart").height="350";
    document.getElementById("chart-area").style="height:380px;";
    window.myChart = new Chart(ctx, options_chart_1);
    chartspace.style="display:inline";
    //cc.innerHTML="[done] recent Keyword";
    keyword4.style="text-decoration:none";
    with_submit.disabled=false;
  });
  //connection.end();
}


function get_paylist_date_payment(){
  keywordspace.style="display:none";
  choicespace.style="display:none";
  chartspace.style="display:none";
  keyword1space.style="display:none";
  keyword2space.style="display:none";
  keyword3space.style="display:none";
  keyword4space.style="display:none";
  payment6space.style="display:none";
  payment7space.style="display:none";
  payment8space.style="display:none";
  payment9space.style="display:none";
  paymentspace.style="display:none";
  payment1space.style="display:inline";

  myList5_1.clear();
  values_payment_list_between.length=0;

  paylist_date_start=document.getElementById('between_paylist_date_start').value+' 00:00:00';
  paylist_date_end=document.getElementById('between_paylist_date_end').value+' 23:59:59';

  for(var i=0;i<values_payment_list_all.length;i++){
    if(values_payment_list_all[i].date>paylist_date_end||values_payment_list_all[i].date<paylist_date_start)
      continue;
    else{
      var data_temp=[];
      data_temp.push(values_payment_list_all[i].bname);
      data_temp.push(values_payment_list_all[i].price);
      data_temp.push(values_payment_list_all[i].sname);
      data_temp.push(values_payment_list_all[i].payment);
      data_temp.push(values_payment_list_all[i].payment_);
      data_temp.push(values_payment_list_all[i].amount);
      data_temp.push(values_payment_list_all[i].date);
      values_payment_list_between.push({bname:data_temp[0], price:data_temp[1], sname:data_temp[2], payment:data_temp[3], payment_:data_temp[4], amount:data_temp[5], date:data_temp[6]});
    }
  }
  menu_name.innerHTML="특정 기간의 결제문자 목록 / "+paylist_date_start.split(' ')[0]+" ~ "+paylist_date_end.split(' ')[0];
  myList5_1 = new List("payment1space", options_list_pay, values_payment_list_between);
}

function get_amount_date_payment(){
  chartspaceview();

  type1.innerHTML="# 결제 금액";
  type2.innerHTML="# 누적 결제 금액";
  choicespace.style="display:inline";
  choosed_menu="payment3";

  date_start=document.getElementById('between_amount_date_start').value+' 00:00:00';
  date_end=document.getElementById('between_amount_date_end').value+' 23:59:59';

  payment_3_list.length=0;
  payment_3_count.length=0;
  payment_4_list.length=0;
  payment_4_count.length=0;

  connection.query("SELECT date_format(date, '%Y-%m-02 00:00:00') 'date', sum(price) 'sum' FROM sms_bank where date between ? and ? group by date_format(date, '%Y-%m-02 00:00:00') order by date_format(date, '%Y-%m-02 00:00:00');",[date_start, date_end], function(err, rows, fields){
    if(!err){
      for(var i=0;i<rows.length;i++){
        var date=rows[i].date.slice(0,7);
        var sum=rows[i].sum;
        payment_3_list.push(date);
        payment_3_count.push(sum);
      }
    }
    else
      cc.innerHTML='Error-query-#payment_3-1'+err;
  })

  connection.query("SELECT s1.date 'date', sum(s2.sum) 'sum' FROM (SELECT date_format(date, '%Y-%m-02 00:00:00') 'date', sum(price) 'sum' FROM sms_bank where date between ? and ? group by date_format(date, '%Y-%m-02 00:00:00') order by date_format(date, '%Y-%m-02 00:00:00')) s1, (SELECT date_format(date, '%Y-%m-02 00:00:00') 'date', sum(price) 'sum' FROM sms_bank where date between ? and ? group by date_format(date, '%Y-%m-02 00:00:00') order by date_format(date, '%Y-%m-02 00:00:00')) s2 where s1.date>=s2.date group by s1.date order by s1.date;",[date_start, date_end, date_start, date_end], function(err, rows, fields){
    if(!err){
      for(var i=0;i<rows.length;i++){
        var date=rows[i].date.slice(0,7);
        var sum=rows[i].sum;
        payment_4_list.push(date);
        payment_4_count.push(sum);
      }

      changeLabelText(payment_3_list,"결제 금액",payment_3_count,payment_4_list,"누적 결제 금액",payment_4_count,"특정 기간의 결제 금액 통계","특정 기간의 결제 금액 통계 / "+date_start.split(' ')[0]+" ~ "+date_end.split(' ')[0],"# 결제 금액");

      window.myChart.destroy();
      document.getElementById("myChart").height="350";
      document.getElementById("chart-area").style="height:380px;";
      window.myChart = new Chart(ctx, options_chart_1);
    }
    else
      cc.innerHTML='Error-query-#payment_3-2'+err;
  })
}

function get_payment_date_payment(){
  chartspaceview();
  choosed_menu="payment5";

  payment_date_start=document.getElementById('between_payment_date_start').value+' 00:00:00';
  payment_date_end=document.getElementById('between_payment_date_end').value+' 23:59:59';

  payment_6_list.length=0;
  payment_6_count.length=0;

  connection.query("drop table if exists sms_bank_hour; create table sms_bank_hour(hour int not null, smscount int, primary key(hour)); set @hour:=-1; insert into sms_bank_hour(hour, smscount) (select (@hour:=@hour+1) 'hour', (select count(*) 'smscount' from sms_bank where date between ? and ? and hour(date)=@hour) 'count' from sms where @hour<23);",[payment_date_start, payment_date_end], function(err, rows, fields){
    if(!err){
      connection.query("select * from sms_bank_hour order by hour;",function(err, rows, fields){
        if(!err){
          for(var i=0;i<rows.length;i++){
            var hour=rows[i].hour;
            var count=rows[i].smscount;
            payment_6_list.push(hour);
            payment_6_count.push(count);
          }

          changeLabelText(payment_6_list,"결제 횟수",payment_6_count,[],"",[],"특정 기간의 결제 시간대","특정 기간의 결제 시간대 / "+payment_date_start.split(' ')[0]+" ~ "+payment_date_end.split(' ')[0],"# 결제 횟수");

          window.myChart.destroy();
          document.getElementById("myChart").height="350";
          document.getElementById("chart-area").style="height:380px;";
          window.myChart = new Chart(ctx, options_chart_1);
        }
        else
          cc.innerHTML='Error-quert-#payment_5-1';
      });
    }
    else
      cc.innerHTML='Error-query-#payment_5';
  })
}

function get_card_date_payment(){
  chartspaceview();
  choosed_menu="payment7";

  type1.innerHTML="# 결제 횟수 기준";
  type2.innerHTML="# 결제 금액 기준";
  choicespace.style="display:inline";
  choosed_menu="payment7";

  card_date_start=document.getElementById('between_card_date_start').value+' 00:00:00';
  card_date_end=document.getElementById('between_card_date_end').value+' 23:59:59';

  payment_9_list.length=0;
  payment_9_count.length=0;
  payment_10_list.length=0;
  payment_10_count.length=0;

  connection.query("select bname, count(*) 'count' from sms_bank where date between ? and ? group by bname order by count(*) desc;",[card_date_start, card_date_end], function(err, rows, fields){
    if(!err){
      for(var i=0;i<rows.length;i++){
        var bname=rows[i].bname;
        var count=rows[i].count;
        payment_9_list.push(bname);
        payment_9_count.push(count);
      }
    }
    else
      cc.innerHTML='Error-query-#payment_7-1';
  })

  connection.query("select bname, sum(price) 'sum' from sms_bank where date between ? and ? group by bname order by sum(price) desc;",[card_date_start, card_date_end], function(err, rows, fields){
    if(!err){
      for(var i=0;i<rows.length;i++){
        var bname=rows[i].bname;
        var sum=rows[i].sum;
        payment_10_list.push(bname);
        payment_10_count.push(sum);
      }

      changeLabelText_hor(payment_9_list,"결제 횟수",payment_9_count,payment_10_list,"결제 금액",payment_10_count,"특정 기간의 카드 이용 순위","특정 기간의 카드 이용 순위 / "+card_date_start.split(' ')[0]+" ~ "+card_date_end.split(' ')[0],"# 결제 횟수 기준");

      window.myChart.destroy();
      document.getElementById("myChart").height="1000";
      document.getElementById("chart-area").style="height:1030px;";
      window.myChart = new Chart(ctx, options_chart_1);
    }
    else
      cc.innerHTML='Error-query-#payment_7-2';
  })
}

function get_store_date_payment(){
  chartspaceview();
  choosed_menu="payment9";

  type1.innerHTML="# 결제 횟수 기준";
  type2.innerHTML="# 결제 금액 기준";
  choicespace.style="display:inline";
  choosed_menu="payment9";

  store_date_start=document.getElementById('between_store_date_start').value+' 00:00:00';
  store_date_end=document.getElementById('between_store_date_end').value+' 23:59:59';

  payment_13_list.length=0;
  payment_13_count.length=0;
  payment_14_list.length=0;
  payment_14_count.length=0;

  connection.query("select sname, count(*) 'count' from sms_bank where date between ? and ? group by sname order by count(*) desc;",[store_date_start, store_date_end], function(err, rows, fields){
    if(!err){
      for(var i=0;i<rows.length;i++){
        var sname=rows[i].sname;
        var count=rows[i].count;
        payment_13_list.push(sname);
        payment_13_count.push(count);
      }
    }
    else
      cc.innerHTML='Error-query-#payment_9-1';
  })

  connection.query("select sname, sum(price) 'sum' from sms_bank where date between ? and ? group by sname order by sum(price) desc;",[store_date_start, store_date_end], function(err, rows, fields){
    if(!err){
      for(var i=0;i<rows.length;i++){
        var sname=rows[i].sname;
        var sum=rows[i].sum;
        payment_14_list.push(sname);
        payment_14_count.push(sum);
      }

      changeLabelText_hor(payment_13_list,"결제 횟수",payment_13_count,payment_14_list,"결제 금액",payment_14_count,"특정 기간의 사용처 순위","특정 기간의 사용처 순위 / "+store_date_start.split(' ')[0]+" ~ "+store_date_end.split(' ')[0],"# 결제 횟수 기준");

      window.myChart.destroy();
      document.getElementById("myChart").height="1000";
      document.getElementById("chart-area").style="height:1030px;";
      window.myChart = new Chart(ctx, options_chart_1);
    }
    else
      cc.innerHTML='Error-query-#payment_9-2';
  })
}

/*
connection.query('', function(err, rows, fields){
  if(!err){
    for(var i=0;i<rows.length;i++){
      var date=rows[i].date.toISOString().slice(0,7);
      var sum=rows[i].sum;
      payment_2_list.push(date)
      payment_2_count.push(sum)
    }
  }
  else
    cc.innerHTML='Error-query-#payment_1';
});
*/

canvas.onclick=function(event){
  var activePoints = myChart.getElementsAtEvent(event);
  var chartData = activePoints[0]['_chart'].config.data;
  var idx=activePoints[0]['_index'];
  var label=chartData.labels[idx];
  var value=chartData.datasets[0].data[idx];

  if(choosed_menu=="keyword1"){
    chartspace.style="display:none";
    keyword1space.style="display:inline";
    myList1.clear();
    values_list_1.length=0;

    for(var i=0;i<values_list.length;i++){
      var keyword_str=values_list[i].keyword;
      if(!keyword_str)
        continue;
      else{
        if(keyword_str.includes(label)){
          var data_temp=[];
          data_temp.push(values_list[i].type_cs);
          data_temp.push(values_list[i].number);
          data_temp.push(values_list[i].date);
          data_temp.push(values_list[i].body);
          data_temp.push(values_list[i].keyword);
          values_list_1.push({type_cs:data_temp[0], number:data_temp[1], date:data_temp[2], body:data_temp[3], keyword:data_temp[4]});
        }
      }
    }
    menu_name.innerHTML="최근 1개월의 문자 키워드 순위 / "+label;
    myList1 = new List("keyword1space", options_list, values_list_1);
  }
  else if(choosed_menu=="keyword2"){
    chartspace.style="display:none";
    keyword2space.style="display:inline";
    myList2.clear();
    values_list_all.length=0;

    for(var i=0;i<values_list.length;i++){
      var keyword_str=values_list[i].keyword;
      if(!keyword_str)
        continue;
      else{
        if(keyword_str.includes(label)){
          var data_temp=[];
          data_temp.push(values_list[i].type_cs);
          data_temp.push(values_list[i].number);
          data_temp.push(values_list[i].date);
          data_temp.push(values_list[i].body);
          data_temp.push(values_list[i].keyword);
          values_list_all.push({type_cs:data_temp[0], number:data_temp[1], date:data_temp[2], body:data_temp[3], keyword:data_temp[4]});
        }
      }
    }
    menu_name.innerHTML="전체 기간의 문자 키워드 순위 / "+label;
    myList2 = new List("keyword2space", options_list, values_list_all);
  }
  else if(choosed_menu=="keyword3"){
    chartspace.style="display:none";
    keyword3space.style="display:inline";
    myList3.clear();
    values_list_between.length=0;

    for(var i=0;i<values_list.length;i++){
      var keyword_str=values_list[i].keyword;
      if(!keyword_str||values_list[i].date>keyword_date_end||values_list[i].date<keyword_date_start)
        continue;
      else{
        if(keyword_str.includes(label)){
          var data_temp=[];
          data_temp.push(values_list[i].type_cs);
          data_temp.push(values_list[i].number);
          data_temp.push(values_list[i].date);
          data_temp.push(values_list[i].body);
          data_temp.push(values_list[i].keyword);
          values_list_between.push({type_cs:data_temp[0], number:data_temp[1], date:data_temp[2], body:data_temp[3], keyword:data_temp[4]});
        }
      }
    }
    menu_name.innerHTML="특정 기간의 문자 키워드 순위 / "+label;
    myList3 = new List("keyword3space", options_list, values_list_between);
  }
  else if(choosed_menu=="keyword4"){
    chartspace.style="display:none";
    keyword4space.style="display:inline";

    myList4.clear();
    values_list_with.length=0;

    for(var i=0;i<values_list.length;i++){
      var keyword_str=values_list[i].keyword;
      if(!values_list[i].number)
        continue;
      if(!keyword_str||!number.includes(values_list[i].number.split(" ")[0]))
        continue;
      else{
        if(keyword_str.includes(label)){
          var data_temp=[];
          data_temp.push(values_list[i].type_cs);
          data_temp.push(values_list[i].number);
          data_temp.push(values_list[i].date);
          data_temp.push(values_list[i].body);
          data_temp.push(values_list[i].keyword);
          values_list_with.push({type_cs:data_temp[0], number:data_temp[1], date:data_temp[2], body:data_temp[3], keyword:data_temp[4]});
        }
      }
    }
    menu_name.innerHTML="특정 연락처와의 문자 키워드 순위 / "+label;
    myList4 = new List("keyword4space", options_list, values_list_with);
  }
  else if(choosed_menu=="payment6"){
    choicespace.style="display:none";
    chartspace.style="display:none";
    payment6space.style="display:inline";

    myList6.clear();
    values_list_card_rank.length=0;

    for(var i=0;i<values_payment_list_all.length;i++){
      var card_str=values_payment_list_all[i].bname.replace(" ","");
      if(!card_str)
        continue;
      else{
        if(card_str==label){
          var data_temp=[];
          data_temp.push(values_payment_list_all[i].bname);
          data_temp.push(values_payment_list_all[i].price);
          data_temp.push(values_payment_list_all[i].sname);
          data_temp.push(values_payment_list_all[i].payment);
          data_temp.push(values_payment_list_all[i].date);
          values_list_card_rank.push({bname:data_temp[0], price:data_temp[1], sname:data_temp[2], payment:data_temp[3], date:data_temp[4]});
        }
      }
    }
    menu_name.innerHTML="전체 기간의 카드 이용 순위 / "+label;
    myList6 = new List("payment6space", options_list_pay, values_list_card_rank);
  }
  else if(choosed_menu=="payment7"){
    choicespace.style="display:none";
    chartspace.style="display:none";
    payment7space.style="display:inline";

    myList7.clear();
    values_list_card_rank_between.length=0;

    for(var i=0;i<values_payment_list_all.length;i++){
      var card_str=values_payment_list_all[i].bname.replace(" ","");
      if(!card_str||values_payment_list_all[i].date>card_date_end||values_payment_list_all[i].date<card_date_start)
        continue;
      else{
        if(card_str==label){
          var data_temp=[];
          data_temp.push(values_payment_list_all[i].bname);
          data_temp.push(values_payment_list_all[i].price);
          data_temp.push(values_payment_list_all[i].sname);
          data_temp.push(values_payment_list_all[i].payment);
          data_temp.push(values_payment_list_all[i].date);
          values_list_card_rank_between.push({bname:data_temp[0], price:data_temp[1], sname:data_temp[2], payment:data_temp[3], date:data_temp[4]});
        }
      }
    }
    menu_name.innerHTML="특정 기간의 카드 이용 순위 / "+label;
    myList7 = new List("payment7space", options_list_pay, values_list_card_rank_between);
  }
  else if(choosed_menu=="payment8"){
    choicespace.style="display:none";
    chartspace.style="display:none";
    payment8space.style="display:inline";

    myList8.clear();
    values_list_store_rank.length=0;

    for(var i=0;i<values_payment_list_all.length;i++){
      var store_str=values_payment_list_all[i].sname.replace(" ","");
      if(!store_str)
        continue;
      else{
        if(store_str==label.replace(" ","")){
          var data_temp=[];
          data_temp.push(values_payment_list_all[i].bname);
          data_temp.push(values_payment_list_all[i].price);
          data_temp.push(values_payment_list_all[i].sname);
          data_temp.push(values_payment_list_all[i].payment);
          data_temp.push(values_payment_list_all[i].date);
          values_list_store_rank.push({bname:data_temp[0], price:data_temp[1], sname:data_temp[2], payment:data_temp[3], date:data_temp[4]});
        }
      }
    }
    menu_name.innerHTML="전체 기간의 사용처 순위 / "+label;
    myList8 = new List("payment8space", options_list_pay, values_list_store_rank);
  }
  else if(choosed_menu=="payment9"){
    choicespace.style="display:none";
    chartspace.style="display:none";
    payment9space.style="display:inline";

    myList9.clear();
    values_list_store_rank_between.length=0;

    for(var i=0;i<values_payment_list_all.length;i++){
      var store_str=values_payment_list_all[i].sname.replace(" ","");
      if(!store_str||values_payment_list_all[i].date>store_date_end||values_payment_list_all[i].date<store_date_start)
        continue;
      else{
        if(store_str==label.replace(" ","")){
          var data_temp=[];
          data_temp.push(values_payment_list_all[i].bname);
          data_temp.push(values_payment_list_all[i].price);
          data_temp.push(values_payment_list_all[i].sname);
          data_temp.push(values_payment_list_all[i].payment);
          data_temp.push(values_payment_list_all[i].date);
          values_list_store_rank_between.push({bname:data_temp[0], price:data_temp[1], sname:data_temp[2], payment:data_temp[3], date:data_temp[4]});
        }
      }
    }
    menu_name.innerHTML="특정 기간의 사용처 순위 / "+label;
    myList9 = new List("payment9space", options_list_pay, values_list_store_rank_between);
  }
};

var filter0List=[];
var filter1List=[];
var filter2List=[];
var filter3List=[];
var filter4List=[];
var filter5List=[];
var filter6List=[];
var filter0_element=document.getElementsByClassName("filter0");
var filter1_element=document.getElementsByClassName("filter1");
var filter2_element=document.getElementsByClassName("filter2");
var filter3_element=document.getElementsByClassName("filter3");
var filter4_element=document.getElementsByClassName("filter4");
var filter5_element=document.getElementsByClassName("filter5");
var filter6_element=document.getElementsByClassName("filter6");

function filter_listener(event){
  var data_value_temp=event.target.getAttribute('data_value');
  var data_filter_temp="type_cs";
  var icon_temp=event.target.getAttribute('icon');
  var checked_temp=event.target.checked;

  switch(event.target.id.slice(0,7)){
    case "filter0":
      filter_action(filter0List, checked_temp, data_filter_temp, data_value_temp, icon_temp, myList);
      break;
    case "filter1":
      filter_action(filter1List, checked_temp, data_filter_temp, data_value_temp, icon_temp, myList1);
      break;
    case "filter2":
      filter_action(filter2List, checked_temp, data_filter_temp, data_value_temp, icon_temp, myList2);
      break;
    case "filter3":
      filter_action(filter3List, checked_temp, data_filter_temp, data_value_temp, icon_temp, myList3);
      break;
    case "filter4":
      filter_action(filter4List, checked_temp, data_filter_temp, data_value_temp, icon_temp, myList4);
      break;
    case "filter5":
      data_filter_temp=event.target.getAttribute('data_filter');
      filter_action(filter5List, checked_temp, data_filter_temp, data_value_temp, icon_temp, myList5);
      break;
    case "filter6":
      data_filter_temp=event.target.getAttribute('data_filter');
      filter_action(filter6List, checked_temp, data_filter_temp, data_value_temp, icon_temp, myList5_1);
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

for (var i = 0; i < filter0_element.length; i++) {
    filter0_element[i].addEventListener('click', filter_listener, false);
}
for (var i = 0; i < filter1_element.length; i++) {
    filter1_element[i].addEventListener('click', filter_listener, false);
}
for (var i = 0; i < filter2_element.length; i++) {
    filter2_element[i].addEventListener('click', filter_listener, false);
}
for (var i = 0; i < filter3_element.length; i++) {
    filter3_element[i].addEventListener('click', filter_listener, false);
}
for (var i = 0; i < filter4_element.length; i++) {
    filter4_element[i].addEventListener('click', filter_listener, false);
}
for (var i = 0; i < filter5_element.length; i++) {
    filter5_element[i].addEventListener('click', filter_listener, false);
}
for (var i = 0; i < filter6_element.length; i++) {
    filter6_element[i].addEventListener('click', filter_listener, false);
}