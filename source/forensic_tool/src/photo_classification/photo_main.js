const {exec} = require('child_process');
const { ipcRenderer } = require("electron");
var fs = require('fs');
var mysql = require('mysql');

  //mysql 연동
  var connection = mysql.createConnection({
      user:'root',
      password:'1234',
      database : 'dataextraction'
  })

var testFolder = './';

fs.readdir(testFolder, function(error, filelist){
  const index = filelist.indexOf("photos");
  if(index == -1){
      photo_extract();
    }
    else{
        ipcRenderer.send("print", "already pulled");
    }
  })
//photo pull (폴더 명 또는 사진 명 한글 인식 X)
function photo_extract(){
    connection.connect();
    connection.query('SELECT path FROM photo', function(error, results, fields){
    if(error){
    }
    if(results.length>0){
        var path = new String();
        path = results[0].path;
        var num = path.indexOf("DCIM");
        folder_path = path.substring(0, num+4);
        //var folder_path = "/storage/emulated/0/DCIM"; //test용 path

        exec("adb pull "+folder_path+" ./photos", (error, stdout, stderr)=>{
            if(error){
                ipcRenderer.send("print", "please connect the smartphone with PC");
            }
            else{
                ipcRenderer.send("print", "succes");
            }
            });
        }   
    }); 
}
