const log = require('electron-log')
const sqlite3 = require('sqlite3').verbose();
const offset = new Date().getTimezoneOffset() * 60000;
var mychart = null;
function el(selector) {
    return document.getElementById(selector);
}
function cl(selector) {
    return document.getElementsByClassName(selector);
}

// window.onload=function(){
//     getAppInfoList();
//     getDeletedAppList();
// }
document.addEventListener("DOMContentLoaded", function(){
    getAppInfoList('totaltime');
    getDeletedAppList();
    getRecentUsage();
  });

function openTap(tabName) {
  var i;
  var x = document.getElementsByClassName("menu");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"
  }
  document.getElementById(tabName).style.display = "block";
}

function testClick(tabName) {
  log.info("testclick")
}


function getAppInfoList(sort_column){
    const db = new sqlite3.Database('InnerDatabase.db');
    var html = ''
    let sql = `select Appinfo.name, Appinfo.packagename, Appinfo.wifiusage, Appinfo.cellularusage, sum(AppUsageYear.totaltimeforeground) totaltime from AppInfo, AppUsageYear\
    where Appinfo.packagename = AppUsageYear.packagename\
    GROUP BY AppUsageYear.packagename\
    ORDER BY ${sort_column} desc;`
    log.info("Query start");
    db.all(sql, [], (err, rows) => {
        if (err) {
          log.err(err);
          throw err;
        }
        const offset = new Date().getTimezoneOffset() * 60000;
        var wifi;
        var cell;
        var totaltime;
        rows.forEach((row) => {
          if(row.wifiusage){
            wifi = (row.wifiusage/1073741824).toFixed(2) + "GB";
          }
          else if(row.wifiusage > 1048576){
            wifi = (row.wifiusage/1048576).toFixed(2) + "MB";
          }
          else if(row.wifiusage > 1024){
            wifi = (row.wifiusage/1024).toFixed(2) + "KB";
          }

          if(row.cellularusage> 1073741824){
            cell = (row.cellularusage/1073741824).toFixed(2) + "GB";
          }
          else if(row.cellularusage > 1048576){
            cell = (row.cellularusage/1048576).toFixed(2) + "MB";
          }
          else if(row.cellularusage > 1024){
            cell = (row.cellularusage/1024).toFixed(2) + "KB";
          }

          if(row.totaltime> 3600000){
            totaltime = (row.totaltime/3600000).toFixed(2) + "Hour";
          }
          else if(row.totaltime > 60000){
            totaltime = (row.totaltime/60000).toFixed(2) + "Minute";
          }
          else if(row.totaltime > 1000){
            totaltime = (row.totaltime/1000).toFixed(2) + "Seconds";
          }

          html += `<div class="media pt-3 font-nanum rounded" onclick="getAppDetail('${row.packagename}');">
          <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <a class="d-block font-weight-bolder">${row.name}</a>
            <a class="d-block">${row.packagename}</a>
            <a class="font-weight-bold">wifi usage</a>
            <a>${wifi}</a><br>
            <a class="font-weight-bold">cellular usage</a>
            <a>${cell}</a><br>
            <a>total time in foreground</a>
            <a>${totaltime}</a><br>
            </p>
        </div>`
          });
        document.querySelector('#applist').innerHTML = html;
        log.info("Query succesfully executed");
      });
      var i;
      var x = document.getElementsByClassName("sort");
      for (i = 0; i < x.length; i++) {
        x[i].style.fontWeight = "normal";
      }
      document.getElementById(sort_column).style.fontWeight = "bold";
      
      db.close();
  }

function getDeletedAppList(){
    const db = new sqlite3.Database('InnerDatabase.db');
    var html = ''
    let sql = `SELECT AppUsageYear.lasttimeused, AppUsageYear.packagename, SUM(AppUsageYear.totaltimeforeground) as totaltime FROM AppUsageYear
    WHERE AppUsageYear.packagename NOT in (select Appinfo.packagename from AppInfo)
    GROUP BY AppUsageYear.packagename
    ORDER BY totaltime desc;`
    log.info("Query start");
    db.all(sql, [], (err, rows) => {
        if (err) {
          log.err(err);
          throw err;
        }
        rows.forEach((row) => {
          var totaltime;
          if(row.totaltime> 3600000){
            totaltime = (row.totaltime/3600000).toFixed(2) + "Hour";
          }
          else if(row.totaltime > 60000){
            totaltime = (row.totaltime/60000).toFixed(2) + "Minute";
          }
          else if(row.totaltime > 1000){
            totaltime = (row.totaltime/1000).toFixed(2) + "Seconds";
          }
          html += `<div class="media pt-3">
          <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong class="d-block">${row.packagename}</strong>
            <a class="font-weight-bold">총 사용 시간</a>
            <a>${totaltime}</a><br>
            <a class="font-weight-bold">마지막 사용 시간</a>
            <a>${new Date(row.lasttimeused-offset).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</a><br>
            <a href="https://play.google.com/store/apps/details?id=${row.packagename}" onclick="window.open(this.href); return false">Follow</a>
            </p>
        </div>
        `
          });
        document.querySelector('#deletedapplist').innerHTML = html;
        log.info("Query succesfully executed");
      });
     db.close();
  }

function getRecentUsage(){
  Promise.all([draw_recent_piechart(),listtop10(),get_recent_dataset()]).then(function(value){
    log.info("getRecentUsage finished")
  });
}

function getAppDetail(packagename){
  Promise.all([drawpiechart(packagename),drawbarchart(packagename)]).then(function(value){
    log.info("getAppDetail finished")
  });
}
//Recent Usage 차트그리기
var draw_recent_piechart = function drawRecentPieChart(){
  return new Promise(function(resolve, reject){
      setTimeout( function(){
        log.info("pie10 draw start");
        Promise.all([top10_day(),totaltimeday()]).then(function(value){
          log.info("pie10 draw start");
          var recent_labels = [];
          var recent_datasets = [];
          var except = 0;
          value[0].forEach((row) => {
            recent_labels.push(row.name);
            recent_datasets.push(row.totaltime);
            except += row.totaltime;
          });
          recent_labels.push("그 외");
          recent_datasets.push(value[1]-except);
          var ctxP = document.getElementById("pieChart10").getContext('2d');
          var myPieChart10 = new Chart(ctxP, {
            type: 'pie',
            data: {
                labels: recent_labels,
                datasets: [{
                data: recent_datasets,
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#9B59B6", "#2471A3", "#3498DB", "#F39C12","#16A085","#E91E63","#949FB1", "#4D5360"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#AF7AC5 ", "#2980B9","#5DADE2", "#F5B041","#45B39D","#EC407A","#A8B3C5", "#616774"]
                }]
            },
            options: {
                responsive: false
            }
          });
          log.info("pie10 chart draw draw draw")
        });
        resolve(true);
      }, 1000)
  })
}

var listtop10 = function listTop10(){
  return new Promise(function(resolve, reject){
      setTimeout( function(){
        log.info("listtop10 draw start");
        Promise.all([top10_day()]).then(function(value){
          log.info("listtop10 draw start");
          var html = `<a class="border-bottom border-gray pb-2 mb-0 font-nanum">사용 시간 Top10</a><br>`;
          var index = 1;
          value[0].forEach((row) => {
            html += `<div class="pl-1 pt-1"><a class="pb-1" style="font-size: 15px">${index}. ${row.name}</a><br></div>`;
            index++;
          });
          document.querySelector('#top10list').innerHTML = html;
          log.info("listtop10 chart draw draw draw")
        });
        resolve(true);
      }, 1000)
  })
}

//AppList 차트그리기
var drawpiechart = function drawPieChart(packagename){
  return new Promise(function(resolve, reject){
      setTimeout( function(){
        var html = ''
        Promise.all([alltime(),totaltime(packagename),packagedetail(packagename),usedtime(packagename)]).then(function(value){
          document.querySelector('#pieChartdiv').innerHTML = '<a class="border-bottom border-gray pb-2 mb-0" style="font-family: \'나눔바른고딕\'">사용 시간 비율</a><canvas id="pieChart" style="max-width: 500px;"></canvas>'  
          var wifi;
            var cell;
            var totaltime;
            document.querySelector('#appdetail_title').innerHTML = value[2].name;
            if(value[2].wifiusage){
              wifi = (value[2].wifiusage/1073741824).toFixed(2) + "GB";
            }
            else if(value[2].wifiusage > 1048576){
              wifi = (value[2].wifiusage/1048576).toFixed(2) + "MB";
            }
            else if(value[2].wifiusage > 1024){
              wifi = (value[2].wifiusage/1024).toFixed(2) + "KB";
            }
  
            if(value[2].cellularusage > 1073741824){
              cell = (value[2].cellularusage/1073741824).toFixed(2) + "GB";
            }
            else if(value[2].cellularusage > 1048576){
              cell = (value[2].cellularusage/1048576).toFixed(2) + "MB";
            }
            else if(value[2].cellularusage > 1024){
              cell = (value[2].cellularusage/1024).toFixed(2) + "KB";
            }
  
            if(value[2].totaltime> 3600000){
              totaltime = (value[2].totaltime/3600000).toFixed(2) + "Hour";
            }
            else if(value[2].totaltime > 60000){
              totaltime = (value[2].totaltime/60000).toFixed(2) + "Minute";
            }
            else if(row.totaltime > 1000){
              totaltime = (value[2].totaltime/1000).toFixed(2) + "Seconds";
            }
            html += `
            <a class="d-block text-muted" style="font-size: 13px; float: right">${value[2].packagename}</a>
            <a class="d-block text-muted" style="font-size: 13px">${value[2].version} ver</a>
            <a class="font-weight-bold" style="font-size: 13px">First Install</a>
            <a style="font-size: 13px">${new Date(value[2].firstinstall-offset).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</a><br>
            <a class="font-weight-bold" style="font-size: 13px">Last Update</a>
            <a style="font-size: 13px">${new Date(value[2].lastupdate-offset).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</a><br>
            <a class="font-weight-bold" style="font-size: 13px">Wifi Usage</a>
            <a style="font-size: 13px">${wifi}</a><br>
            <a class="font-weight-bold" style="font-size: 13px">Cellular Usage</a>
            <a style="font-size: 13px">${cell}</a><br>
            <a class="font-weight-bold" style="font-size: 13px">Total Time in Foreground</a>
            <a style="font-size: 13px">${totaltime}</a><br>`
            document.querySelector('#appdetails').innerHTML = html;
            var ctxP = document.getElementById("pieChart").getContext('2d');
            var myPieChart = new Chart(ctxP, {
              type: 'pie',
              data: {
                  labels: [value[2].name,"그외 어플"],
                  datasets: [{
                  data: [value[1], value[0]-value[1]],
                  backgroundColor: ["#F7464A","#949FB1"],
                  hoverBackgroundColor: ["#FF5A5E","#A8B3C5"]
                  }]
              },
              options: {
                  responsive: true
              }
            });
            log.info("pie chart draw draw draw")
        });
        resolve(true);
      }, 1000)
  })
}

var drawbarchart = function drawBarChart(packagename){
  return new Promise(function(resolve, reject){
      setTimeout( function(){
        var timedataset = [0,0,0,0,0,0,0,0,0,0,0,0];
        var html1 = '<a class="pb-2 mb-0 font-nanum border-bottom border-gray">기간별 마지막 사용시간 리스트</a><br>';
        Promise.all([usedtime(packagename)]).then(function(value){
          log.info("bar chart draw draw draw")
          value[0].forEach((time) => {
            var hour = new Date(time-offset).getHours()
            switch(true){
              case (hour < 2) :
                timedataset[0] += 1;
                break;
              case (hour < 4) :
                timedataset[1] += 1;
                break;
              case (hour < 6) :
                timedataset[2] += 1;
                break;                          
              case (hour < 8) :
                timedataset[3] += 1;
                break;
              case (hour < 10) :
                timedataset[4] += 1;
                break;
              case (hour < 12) :
                timedataset[5] += 1;
                break;
              case (hour < 14) :
                timedataset[6] += 1;
                break;
              case (hour < 16) :
                timedataset[7] += 1;
                break;
              case (hour < 18) :
                timedataset[8] += 1;
                break;                          
              case (hour < 20) :
                timedataset[9] += 1;
                break;
              case (hour < 22) :
                timedataset[10] += 1;
                break;
              case (hour < 24) :
                timedataset[11] += 1;
                break;
            }
          });
          var ctx = document.getElementById("barChart").getContext('2d');
          var config = {
            type: 'bar',
            data: {
              labels: ["00-02","02-04","04-06","06-08","08-10","10-12","12-14","14-16","16-18","18-20","20-22","22-24"],
              datasets: [{
                label: '# of Last used time',
                data: timedataset,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)',
                  'rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true,
                          stepSize:1
                      }
                  }]
              }
            }
          }
          if (mychart == null) {
            mychart = new Chart(ctx, config);
            log.info("bar chart create")
          } else {
              mychart.config = config;
              mychart.update();
              log.info("bar chart update")
          }
          value[0].forEach((time) => {
            html1 += `<a class="pl-1" style="font-size: 13px">${new Date(time-offset).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</a><br>`;
          });
          document.querySelector('#apptimelist').innerHTML = html1;
          document.getElementById('barchart_title').style.display = "block";
        });
        resolve(true);
      }, 1000)
  })
}

var getbyte = function getB(byte){
  return new Promise(resolve => 
    setTimeout(() => {
      if(byte > 1073741824){
        resolve((byte/1073741824).toFixed(2) + "GB");
        log.info((byte/1073741824).toFixed(2) + "GB");
      }
      else if(byte > 1048576){
        resolve((byte/1048576).toFixed(2) + "MB");
      }
      else if(byte > 1024){
        resolve((byte/1024).toFixed(2) + "KB");
      }
    }, 1000)
  );
}

var alltime = function getAllTime(){
    return new Promise(function(resolve, reject){
        setTimeout( function(){
            const db = new sqlite3.Database('InnerDatabase.db');
            let sql = `select sum(AppUsageYear.totaltimeforeground) as alltime from AppUsageYear;`
            log.info("alltime Query start");
            db.get(sql, [], (err, row) => {
                if (err) {
                  log.err(err);
                  reject(err);
                  throw err;
                }
                else{
                    log.info("alltime Query succesfully executed");
                    log.info(row.alltime);
                    db.close();
                    resolve(row.alltime);
                }
              });            
        }, 1000)
    })
}

var totaltime = function getTotaltime(packagename){
    return new Promise(function(resolve, reject){
        setTimeout( function(){
            const db = new sqlite3.Database('InnerDatabase.db');
            log.info(packagename);
            let sql = `select sum(AppUsageYear.totaltimeforeground) as totaltime from AppUsageYear
            where packagename = "${packagename}";`
            log.info("totaltime Query start");
            db.get(sql, [], (err, row) => {
                if (err) {
                  log.err(err);
                  reject(err);
                  throw err;
                }
                else{
                    log.info("totaltime Query succesfully executed");
                    log.info(row.totaltime);
                    db.close();
                    resolve(row.totaltime);
                }
              });            
        }, 1000)
    })
}

var totaltimeday = function getTotaltimeDay(){
  return new Promise(function(resolve, reject){
      setTimeout( function(){
          const db = new sqlite3.Database('InnerDatabase.db');
          let sql = `select sum(AppUsageDay.totaltimeforeground) as totaltime from AppUsageDay;`
          log.info("totaltime Query start");
          db.get(sql, [], (err, row) => {
              if (err) {
                log.err(err);
                reject(err);
                throw err;
              }
              else{
                  log.info("totaltime Query succesfully executed");
                  log.info(row.totaltime);
                  db.close();
                  resolve(row.totaltime);
              }
            });            
      }, 1000)
  })
}

var packagedetail = function getPackageDetail(packagename){
    return new Promise(function(resolve, reject){
        setTimeout( function(){
            const db = new sqlite3.Database('InnerDatabase.db');
            log.info(packagename);
            var sql = `select Appinfo.name, Appinfo.packagename, Appinfo.version, Appinfo.firstinstall, Appinfo.lastupdate, Appinfo.wifiusage, Appinfo.cellularusage, sum(AppUsageYear.totaltimeforeground) totaltime\
            from AppInfo left join AppUsageYear on AppInfo.packagename = AppUsageYear.packagename\
            WHERE Appinfo.packagename = "${packagename}"\
            GROUP BY AppUsageYear.packagename;`
            log.info("packagedetail Query start");
            db.get(sql, [], (err, row) => {
                if (err) {
                  log.err(err);
                  reject(err);
                  throw err;
                }
                else{
                    log.info("packagedetail Query succesfully executed");
                    db.close();
                    resolve(row);
                }
              });                   
        }, 1000)
    })
}

var usedtime = function getLasttimeused(packagename){
    return new Promise(function(resolve, reject){
        setTimeout( function(){
            const db = new sqlite3.Database('InnerDatabase.db');
            log.info(packagename);
            var timelist = [];
            var sql = `select lasttimeused from AppUsageYear\
            where packagename = "${packagename}" and lasttimeused != firsttimestamp\
            union\
            select lasttimeused from  AppUsageMonth
            where packagename = "${packagename}" and lasttimeused != firsttimestamp\
            union\ 
            select lasttimeused from AppUsageWeek
            where packagename = "${packagename}" and lasttimeused != firsttimestamp\
            union\
            select lasttimeused from AppUsageDay\
            where packagename = "${packagename}" and lasttimeused != firsttimestamp;`
            log.info("usedtime Query start");
            db.all(sql, [], (err, rows) => {
                if (err) {
                  log.err(err);
                  reject(err);
                  throw err;
                }
                rows.forEach((row) => {
                        if(row.lasttimeused>1000000000000){
                            timelist.push(row.lasttimeused);
                        }
                    });
                log.info("usedtime Query succesfully executed");
                log.info(timelist.length);
                resolve(timelist);
              });   
        }, 1000)
    })
}

var top10_day = function getTop10(){
  return new Promise(function(resolve, reject){
      setTimeout( function(){
          const db = new sqlite3.Database('InnerDatabase.db');
          var timelist = [];
          var sql = `select Appinfo.name, Appinfo.packagename, sum(AppUsageDay.totaltimeforeground) totaltime from AppInfo, AppUsageDay
          where Appinfo.packagename = AppUsageDay.packagename
          GROUP BY AppUsageDay.packagename
          ORDER BY totaltime desc
          LIMIT 10;`
          log.info("getTop10 Query start");
          db.all(sql, [], (err, rows) => {
              if (err) {
                log.err(err);
                reject(err);
                throw err;
              }
              else{
                log.info("getTop10 Query succesfully executed");
                db.close();
                resolve(rows)
              }
            });   
      }, 1000)
  })
}
function getdayusedapp(day){
  var date = (day > 9)? day : "0"+day;
  const db = new sqlite3.Database('InnerDatabase.db');
  var html =  `<tr class="pb-2" style="font-size: 13px"><th>name</th><th>last time used</th><th>time</th></tr>`;
  var sql = `SELECT AppUsageDay.packagename,AppInfo.name, lasttimeused,totaltimeforeground,strftime('%d',datetime(firsttimestamp/1000, 'unixepoch', 'localtime')) as day FROM AppUsageDay, AppInfo
  where day = '${date}' and totaltimeforeground > 0 and AppInfo.packagename = AppUsageDay.packagename
  order by lasttimeused;`;
  log.info("getdayusedapp Query start");
  db.all(sql, [], (err, rows) => {
      if (err) {
        log.err(err);
        reject(err);
        throw err;
      }
      rows.forEach((row) => {
        var totaltime;
          if(row.totaltimeforeground> 3600000){
            totaltime = (row.totaltimeforeground/3600000).toFixed(2) + "h";
          }
          else if(row.totaltimeforeground > 60000){
            totaltime = (row.totaltimeforeground/60000).toFixed(2) + "m";
          }
          else if(row.totaltimeforeground > 1000){
            totaltime = (row.totaltimeforeground/1000).toFixed(2) + "s";
          }
        html += `<tr style="font-size: 13px"><td class="pr-4">${row.name}</td><td class="pr-4">${new Date(row.lasttimeused-offset).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td><td class="pr-1">${totaltime}</td></tr>`
    });
    document.querySelector('#day_use_list > tbody').innerHTML = html;
    }); 
  var i;
  var x = document.getElementsByClassName("sort");
  for (i = 0; i < x.length; i++) {
    x[i].style.fontWeight = "normal";
  }
  document.getElementById('day_'+day).style.fontWeight = "bold";
}
var get_recent_dataset = function getRecentDataset(){
  return new Promise(function(resolve, reject){
    setTimeout( function(){
      const db = new sqlite3.Database('InnerDatabase.db');
      var sql = `select firsttimestamp,lasttimestamp,sum(totaltimeforeground) as totaltime from AppUsageDay
      group by firsttimestamp;`
      db.all(sql, [], (err, rows) => {
          if (err) {
            log.err(err);
            reject(err);
            throw err;
          }
          var label_array = [];
          var bardataset = [];
          rows.forEach((row) => {
            var date = new Date(row.firsttimestamp-offset);
            label_array.push(date.getDate());
            bardataset.push(row.totaltime/3600000);
            document.getElementById('selectday').innerHTML += `<a id="day_${date.getDate()}" class="sort p-2 text-muted" onclick="getdayusedapp('${date.getDate()}');">${date.getDate()}</a>`;
          });
          db.close();
          var ctx = document.getElementById("recent_bar").getContext('2d');
          var config = {
            type: 'bar',
            data: {
              labels: label_array,
              datasets: [{
                label: 'Hour',
                data: bardataset,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)',
                  'rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true,
                      }
                  }]
              },
              responsive: false
            }
          }
          var myChart = new Chart(ctx, config);
          getdayusedapp(label_array[0]);
        });   
    }, 1000)
  })
}

//   var ctxP = document.getElementById("pieChart").getContext('2d');
//         var myPieChart = new Chart(ctxP, {
//         type: 'pie',
//         data: {
//             labels: ["Red", "Green", "Yellow", 보라  "Grey", "Dark Grey"],
//             datasets: [{
//             data: [300, 50, 100, 40, 120],
//             backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
//             hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
//             }]
//         },
//         options: {
//             responsive: true
//         }
//         });
//         db.close();


// var options_main_stacked={
// 	type: 'bar',
// 	data: {
// 		labels: label_text,
// 		datasets:[{
// 			label:label_data1_text,
// 			data:label_data1,
// 			backgroundColor:'rgba(255, 127, 80, 1)',
// 			borderColor:'rgba(255, 127, 80, 1)',
//             type:"line",
//             fill: false
// 		},
// 		{
// 			label:label_data2_text,
// 			data:label_data2,
// 			backgroundColor:'rgba(255, 206, 86, 0.2)',
// 		},
// 		{
// 			label:label_data3_text,
// 			data:label_data3,
// 			backgroundColor:'rgba(75, 192, 192, 0.2)',
// 		}]
// 	},
//    	options: options_stacked
// };