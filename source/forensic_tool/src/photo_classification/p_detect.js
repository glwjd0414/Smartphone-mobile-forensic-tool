var exec = require('child_process').exec, child;
const { ipcRenderer } = require("electron");

const dd = document.getElementById('detect');
const r = document.getElementById('r');
 var mysql = require('mysql');

  var connection = mysql.createConnection({
      user:'root',
      password:'1234',
      database : 'dataextraction'
  })

dd.addEventListener("click", ()=>{
    
    connection.connect();
    connection.query('SELECT * FROM photo', function(error, results, fields){
    if(error){
    }
    else{
        r.innerHTML = '<i class="fas fa-spinner fa-3x fa-spin" style="color:dimgray; position: absolute; bottom:47%; right:47%;"></i>';
        ipcRenderer.send("detect", results);
    }
  });
});

ipcRenderer.on('detect_result', (e, detect_result)=>{
    if(detect_result.length >0){
        r.style.border ="2px solid red";
        var myhtml = "<h1 style='font-size:1.5em'>유해 컨텐츠 "+detect_result.length+" 개 발견</h1>";
        detect_result.forEach(element => {
            myhtml+="<img src='"+element.path+"' id='image' onclick='showImage()' title='"+element.path+"'width=300px height=300px>";
        });
        r.innerHTML = myhtml;
        ipcRenderer.send('open-error-dialog')
    }
    else{
        r.innerHTML = "<h1 style='margin-top:300px; color:dimgray'>유해 컨텐츠 없음</h1>";
    }
});

function showImage(){
    var image = document.getElementById('image');
    var url=image.getAttribute('src');
    var imgWin = window.open(url,url, "width=500px, height=500px");
};

 
