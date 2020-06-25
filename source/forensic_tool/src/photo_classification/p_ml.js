const { ipcRenderer } = require("electron");
const { BrowserWindow } = require("electron").remote;
const content = document.getElementById('content');
const btn = document.getElementById('start');
const next = document.getElementById('next');
const Chart = require("chart.js");
const ctx = document.getElementById("chart").getContext('2d');;
var list_length = new Array();
let l_list = new Array();
let p_list = new Array();

var mysql = require('mysql');
var list;

//mysql 연동  
var connection = mysql.createConnection({
    user:'root',
    password:'1234',
    database : 'dataextraction'
})

connection.connect();

btn.addEventListener("click", ()=>{
    content.innerHTML = '<i class="fas fa-spinner fa-3x fa-spin" style="color:dimgray; position: absolute; bottom:45%; right:45%;"></i>';

     connection.query("SELECT * FROM photo" , function(error, results, fields){
        if(error){
        }
        else{
        list = results;
        //이미지 라벨링 요청
        ipcRenderer.send('image_labels', list );
        }

    });  
    
})

var label_name = Array();
var photo_list = Array();
var label_result = Array();
//라벨링 결과 획득 및 이미지 그룹화 시작
ipcRenderer.on("labels_result", (e, result) => {
    var myHTML = '';
    label_result = result;
    //print photo with labels
    result.forEach(element=>{
        myHTML +="<div class='photo'><div class='p_title'><p>"+element.name+"</p></div>"
        myHTML += '<div class="image"><img src="'+element.path+'"></div><div class ="labels">';
        element.labels.forEach(label=>{
            myHTML+='<p> #'+label.description+'</p>';   
            find_labellist(label.description, element.path);
        });
        myHTML+='</div></div>';
    })
    content.innerHTML = myHTML;
    sort_labellist();
});
//이미지 그룹화 
function find_labellist(label, path){
  var idx = label_name.indexOf(label);
  if(idx == -1){
    label_name.push(label);
    photo_list.push([path.toString()]);
  }
  else{
    photo_list[idx].push(path.toString());
  }
}
//라벨 리스트 정렬 (라벨 순위)
function sort_labellist(){
  for(var i =0; i< photo_list.length; i++){
    for(var j = i+1; j <photo_list.length; j++){
        if(photo_list[j].length > photo_list[i].length){
            var tmp =  Array();
            tmp = photo_list[i];
            photo_list[i] = photo_list[j];
            photo_list[j] = tmp;
            var str = String();
            str = label_name[i];
            label_name[i] = label_name[j];
            label_name[j] = str;
        }
    }
  }
  l_list = label_name;
  p_list = photo_list;
  myHTML = String();
  photo_list.forEach(element => {
      list_length.push(element.length);
  });
  //차트 생성
  var mychart = new Chart(ctx,{
      type: 'horizontalBar',
      data :{
          labels : label_name.slice(0, 20),
          datasets:[{
              label : "nums of images",
              data : list_length.slice(0, 20),
              borderSkipped:'top',
              borderWidth :1,
              borderColor : '#4e73df',
              backgroundColor:'#4e73df',
              hoverBorderWidth: 2,
              barPercentage: 0.8,
              categoryPercentage:1,
          }],
      },
      options:{
        maintainAspectRatio: false,
          title: {
            display: true,
            text: 'PHOTO KEYWORD'
          },
          scales: {
              xAxes: [{
                  stacked: true,
                  gridLines:{
                      offsetGridLines :true,
                  },
                  ticks:{
                    beginAtZero :true
                  }
              }],
              yAxes: [{
                  ticks :{ 
                    fontSize : 10
                  },
                  stacked: true,
              }]
          },
          tooltips: {
            callbacks: {
                labelColor: function(tooltipItem, chart) {
                    return {
                      borderColor : '#4e73df',
                      backgroundColor:'#4e73df',
                    };
                },
                labelTextColor: function(tooltipItem, chart) {
                    return '#FFFFFF';
                }
            }
          },
          onClick : function(e){
            //라벨 차트에서 라벨 클릭 시 해장 라벨을 가진 사진 모두 출력
              var activePoints = mychart.getElementsAtEvent(e);
              var idx= activePoints[0]._index;
              var myHTML = '<div class="keyword"><h1>#'+label_name[idx]+'</h1></div><div class="k_content">';
              photo_list[idx].forEach(photo=>{
                myHTML += '<div class="keyword_photo"><img src="'+photo+'"></div>';
              });
              myHTML+="</div>"
              document.getElementById("next").style.visibility = "visible";
              content.style.overflowY = "hidden";
              content.innerHTML = myHTML;
          },
          layout:{
              padding:{
                  left:0,
                  right:0,
                  top:10,
                  bottom:0,
              }
          }
      }
      
  })
}
//print all photos with labels
next.addEventListener("click", ()=>{
  var myHTML = '';
  label_result.forEach(element=>{
    myHTML +="<div class='photo'><div class='p_title'><p>"+element.name+"</p></div>"
    myHTML += '<div class="image"><img src="'+element.path+'"></div><div class ="labels">';
    element.labels.forEach(label=>{
        myHTML+='<p> #'+label.description+'</p>';   
    });
    myHTML+='</div></div>';
})
content.innerHTML = myHTML;
document.getElementById("next").style.visibility = "hidden";
content.style.overflowY = "auto";
});
