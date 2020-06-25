const {remote, ipcRenderer} = require("electron");

const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", () => {
  let window = remote.getCurrentWindow();
  window.close();
});

  var mysql = require('mysql');

  //mysql 연동
  var connection = mysql.createConnection({
      user:'root',
      password:'1234',
      database : 'dataextraction'
  })

  connection.connect();

  //최대 선택 가능 날짜 설정
  var today = new Date();
  document.getElementById("start_date").max = today.toISOString().substring(0, 10);
  document.getElementById("end_date").max = today.toISOString().substring(0, 10);

  const btn = document.getElementById("submit");
 

  btn.addEventListener("click", () => {
      var start_date = new String(document.getElementById("start_date").value);
      var end_date = new String(document.getElementById("end_date").value);


      var st = new Date(start_date);
      var et = new Date(end_date);

      st.setHours(st.getHours());
      et.setHours(et.getHours() + 24);
      et.setMilliseconds(et.getMilliseconds() -1);

      var sTimestamp =st.getTime();
      var eTimestamp =et.getTime();
      
      connection.query('SELECT * FROM photo WHERE date_added > "'+sTimestamp+'" AND date_added <= "'+eTimestamp+'" ORDER BY date_added', function(error, results, fields){
          if(error){
          }
          else{
            var arg={
                result : results,
                start : start_date,
                end : end_date
            }
            ipcRenderer.send(
                "photo",
                arg
              );
              let window = remote.getCurrentWindow();
              window.close();
          }

      } )  
      
  });
  