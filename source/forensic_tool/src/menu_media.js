const { ipcRenderer } = require("electron");
const log = require('electron-log')
const sqlite3 = require('sqlite3').verbose();
const offset = new Date().getTimezoneOffset() * 60000;
var exec = require('child_process').exec, child;
var mypiechart = null;




function el(selector) {
    return document.getElementById(selector);
}
function cl(selector) {
    return document.getElementsByClassName(selector);
}


const videoanalysis = document.getElementById("temp_post");

videoanalysis.addEventListener("click", ()=>{
    Promise.all([check()]).then(function(value){
        ipcRenderer.send(
            "video-analysis",
            value[0]
          );
      });
    // check().then(copy).then(result => {
    //     ipcRenderer.send(
    //         "video-analysis",
    //         result
    //         );
    // })
});

var check = function checkboxcheck(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            var checkedValue = []; 
            var inputElements = document.querySelectorAll('#blankCheckbox');
            for(var i=0; i < inputElements.length; i++){
                if(inputElements[i].checked){
                    checkedValue.push(inputElements[i].value);
                    log.info(inputElements[i].value);
                }
            }
            resolve(checkedValue);           
        }, 1000)
    })
}

var copy = function copyfiles(values){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            values.forEach((value)=>{
            cmd_pull = exec('adb pull '+value,function(error, stdout, stderr){
                if(error){
                  console.log(error);
                }
              });
            });
            resolve(values);           
        }, 1000)
    })
}


ipcRenderer.on("getvideodetail", (e, arg) => {
    log.info(arg + " from main");
    Promise.all([popvideoanalysis(arg)]).then(function(value){
        log.info(value);
        value[0].forEach((pie) => {
            log.info("hello")
            var ctx = document.getElementById(pie[0]).getContext("2d");
            log.info("hello")
            new Chart(ctx, pie[1]);
            log.info(pie[0] +" dect pie chart create");
        })
      });
});

document.addEventListener("DOMContentLoaded", function(){
    getMediaChart();
    getStorageStructure('photo');
    video_list();
  });


var popvideoanalysis = function popVideoAnalysis(arg){
    return new Promise(function(resolve, reject){
        setTimeout( function(){
            log.info("start popVideoAnalysis");
            document.querySelector('#va_list').innerHTML = '';
            var mydectpiechart = [];
            var x = document.getElementsByClassName("menu");
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none"
            }
            document.getElementById('Analysis-Detail').style.display = "block";
            for(var k =0; k < arg[0].length; k++)
            {
                var lb_dict = arg[0][k];
                var dt_dict = arg[1][k];
        
                var html_taglist = ``;
                var i,j;
                for(i=0; i < lb_dict['labels'].length; i++){
                    var label_name = lb_dict['labels'][i];
                    html_taglist += `<div class="font-nanum pb-1 pt-1" style="font-size: 14px;"><a style="font-weight: bold;">${label_name}<a><br>`;
                    for(j=0; j<lb_dict[label_name].length; j++){
                        var label_detail = lb_dict[label_name][j];
                        html_taglist += `<p style="text-align: right;"><a class="pb-1s">${label_detail[0]}s ~ ${label_detail[1]} for ${label_detail[2].toFixed(2)} confidence</a><p>`;
                    }
                    html_taglist += '</div>'
                }
                var likelihood_index = {'UNKNOWN': 0,'VERY_UNLIKELY': 1,'UNLIKELY': 2,'POSSIBLE': 3,'LIKELY': 4,'VERY_LIKELY': 5};
                var det_dataset = [0,0,0,0,0,0]
                
                var html_detlist = ``;
                var i,j;
                for(i=0; i < dt_dict['likelihood'].length; i++){
                    html_detlist += `<div class="font-nanum pb-2 pt-2" style="font-size: 14px; text-align: right;"><a>~ ${dt_dict['likelihood'][i][0]}s , ${dt_dict['likelihood'][i][1]}</a><div>`;
                    det_dataset[likelihood_index[dt_dict['likelihood'][i][1]]] +=1;
                }
        
                log.info(det_dataset);
                var html = `<div class="bg-white rounded shadow-sm">
                <h6 class="border-bottom border-gray pl-2 pb-2 mb-0">${lb_dict['video']}</h6>
                <div class="row">
                    <div class="col">
                        <div class="my-3 p-3  bg-white rounded shadow-sm">
                            <h6 class="border-bottom border-gray pb-2 mb-0">Tag</h6>
                            <div id="taglist_${lb_dict['video']}" class="pt-2">
                            ${html_taglist}
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="my-3 p-3  bg-white rounded shadow-sm">
                            <h6 class="border-bottom border-gray pb-2 mb-0">Content Detection</h6>
                            <div>
                                <canvas id="det_piechart_${lb_dict['video']}"></canvas>
                            </div>
                            <div id="detectionlist_${lb_dict['video']}" class="pt-2">
                                ${html_detlist}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
                document.querySelector('#va_list').innerHTML += html;
                // var ctx = document.getElementById('det_piechart_'+lb_dict['video']).getContext("2d");
                var config = {
                            type: 'pie',
                            data: {
                                labels: ["UNKNOWN","VERY_UNLIKELY", "UNLIKELY","POSSIBLE", "LIKELY","VERY_LIKELY"],
                                datasets: [{
                                data: det_dataset,
                                backgroundColor: ["#D3D3D3", "#C0C0C0", "#A9A9A9", "#FF3333","#FF0000","#CC0000"],
                                hoverBackgroundColor: ["#D3D3D3", "#C0C0C0", "#A9A9A9", "#FF3333","#FF0000","#CC0000"]
                                }]
                            },
                            options: {
                                responsive: true,
                            },
                        }
                mydectpiechart.push(['det_piechart_'+lb_dict['video'],config]);
                // mydectpiechart[k] = new Chart(ctx, config);
                // log.info('det_piechart_'+lb_dict['video'] +" dect pie chart create");
            }
          resolve(mydectpiechart);
        }, 1000)
    })

}

function openTap(tabName) {
    var i;
    var x = document.getElementsByClassName("menu");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"
    }
    document.getElementById(tabName).style.display = "block";
  }

function getMediaChart(){
    Promise.all([drawpiechart()]).then(function(value){
        log.info("getMediaChart finished")
      });
}

function getStorageStructure(filetype){
    document.querySelector('#mediafile_struct > div').innerHTML = '';
    document.querySelector('#filetable > tbody').innerHTML = '';
    document.getElementById('filelist_for_folder').style.display = "none";
    log.info("getStorageStructure start")
    Promise.all([file_struct(filetype)]).then(function(value){
        value[0].forEach((row) => {
            getByte(row.dirsize).then(function(bytedata) {
                document.querySelector('#mediafile_struct > div').innerHTML += `<div class="d-flex justify-content-between p-1"><a href="#" clase="folder_name" onclick="getFilelistinFolder('${row.dir}','${filetype}');" id="${row.dir}">${row.dir} </a><a></a>${bytedata}<br></div>`
            });
        });
      });
    var i;
    var x = document.getElementsByClassName("filetype");
    for (i = 0; i < x.length; i++) {
    x[i].style.fontWeight = "normal";
    }
    document.getElementById(filetype).style.fontWeight = "bold";
    switch(filetype){
        case 'photo':
            document.getElementById('struct_title').innerText = "Image";
            break;
        case 'video':
            document.getElementById('struct_title').innerText = "Video";
            break;
        case 'audio':
            document.getElementById('struct_title').innerText = "Audio";
            break;
        case 'documentinfo':
            document.getElementById('struct_title').innerText = "Document";
            break;
    }
}

function getFilelistinFolder(foldername,filetype){
    log.info("getFilelistinFolder start")
    document.querySelector('#filetable > tbody').innerHTML = `<tr><th>name</th>\
                                                            <th>date_added</th>\
                                                            <th>size</th>\
                                                        </tr>`;

    Promise.all([fileinfolder(foldername, filetype)]).then(function(value){
        value[0].forEach((row) => {
            getByte(row.size).then(function(bytedata) {
                document.querySelector('#filetable > tbody').innerHTML += `<tr><td>${row.name}</td><td>${new Date(row.date_added*1000-offset).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td><td>${bytedata}</td></tr>`
            });
        });
      });
    document.getElementById('filelist_for_folder').style.display = "block";
}

var drawpiechart = function drawPieChart(){
    return new Promise(function(resolve, reject){
        setTimeout( function(){
          var html = ''
          Promise.all([filetype_all_size('photo'),filetype_all_size('video'),filetype_all_size('audio'),filetype_all_size('documentinfo')]).then(function(value){
            var ctx = document.getElementById("pieChart").getContext('2d');
            var config = {
                        type: 'pie',
                        data: {
                            labels: ["Image", "Video", "Audio", "Documents"],
                            datasets: [{
                            data: [value[0], value[1], value[2], value[3]],
                            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
                            hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5"]
                            }]
                        },
                        options: {
                            responsive: true
                        }
                    }
            if (mypiechart == null) {
              mypiechart = new Chart(ctx, config);
              log.info("pie chart create")
            } else {
                mypiechart.config = config;
                mypiechart.update();
                log.info("pie chart update")
            }
            Promise.all([getByte(value[0]),getByte(value[1]),getByte(value[2]),getByte(value[3])]).then(function(b){
                var html = `<div class="d-flex justify-content-between pt-1 pb-1"><a style="font-weight: bold;">Image </a><a>${b[0]}</a></div>
                            <div class="d-flex justify-content-between pt-1 pb-1"><a style="font-weight: bold;">Video </a><a>${b[1]}</a></div>
                            <div class="d-flex justify-content-between pt-1 pb-1"><a style="font-weight: bold;">Audio </a><a>${b[2]}</a></div>
                            <div class="d-flex justify-content-between pt-1 pb-1"><a style="font-weight: bold;">Document </a><a>${b[3]}</a></div>`         
                document.querySelector('#pie_datalist').innerHTML = html;  
            });
        });
          resolve(true);
        }, 1000)
    })
  }

var getByte = function getB(byte){
    return new Promise(function(resolve, reject){
        setTimeout( function(){
            if(byte > 1073741824){
                resolve((byte/1073741824).toFixed(2) + "GB");
            }
            else if(byte > 1048576){
                resolve((byte/1048576).toFixed(2) + "MB");
            }
            else if(byte > 1024){
                resolve((byte/1024).toFixed(2) + "KB");
            }          
        }, 1000)
    })
}

var filetype_all_size = function getAllAudioSize(filetype){
    return new Promise(function(resolve, reject){
        setTimeout( function(){
            const db = new sqlite3.Database('InnerDatabase.db');
            let sql = `select SUM(size) as totalsize from ${filetype};`
            log.info("filetype_all_size Query start");
            db.get(sql, [], (err, row) => {
                if (err) {
                  log.err(err);
                  reject(err);
                  throw err;
                }
                else{
                    log.info("filetype_all_size Query succesfully executed");
                    db.close();
                    resolve(row.totalsize);
                }
              });            
        }, 1000)
    })
}

var file_struct = function getStruct(filetype){
    return new Promise(function(resolve, reject){
        setTimeout( function(){
            const db = new sqlite3.Database('InnerDatabase.db');
            let sql = `select replace(SUBSTR(rtrim(path, replace(path, '/', '')),1,LENGTH(rtrim(path, replace(path, '/', '')))-1), rtrim(SUBSTR(rtrim(path, replace(path, '/', '')),1,LENGTH(rtrim(path, replace(path, '/', '')))-1), replace(SUBSTR(rtrim(path, replace(path, '/', '')),1,LENGTH(rtrim(path, replace(path, '/', '')))-1), '/', '')), '') as dir, sum(size) as dirsize
                        from ${filetype}
                        group by dir;`
            log.info("file_struct Query start");
            db.all(sql, [], (err, rows) => {
                if (err) {
                  log.err(err);
                  reject(err);
                  throw err;
                }
                else{
                    log.info("file_struct Query succesfully executed");
                    db.close();
                    resolve(rows);
                }
              });             
        }, 1000)
    })
}

var fileinfolder = function getFileinFolder(foldername,filetype){
    return new Promise(function(resolve, reject){
        setTimeout( function(){
            const db = new sqlite3.Database('InnerDatabase.db');
            let sql = '';
            switch(filetype){
                case 'photo':
                    sql += `select display_name as name, date_added, path, size from ${filetype}
                        where path LIKE '%${foldername}%';`
                    document.querySelector('#infilelist').innerText = `Images in ${foldername}`;
                    break;
                case 'video':
                    sql += `select display_name as name, date_added, path, size from ${filetype}
                        where path LIKE '%${foldername}%';`
                    document.querySelector('#infilelist').innerText = `Videos in ${foldername}`;
                    break;
                case 'audio':
                    sql += `select title as name, date_added, path, size from ${filetype}
                        where path LIKE '%${foldername}%';`
                    document.querySelector('#infilelist').innerText = `Audios in ${foldername}`;
                    break;
                case 'documentinfo':
                    sql += `select name, date_added, path, size from ${filetype}
                        where path LIKE '%${foldername}%';`
                    document.querySelector('#infilelist').innerText = `Documents in ${foldername}`;
                    break;
            }
            log.info("fileinfolder Query start");
            db.all(sql, [], (err, rows) => {
                if (err) {
                  log.err(err);
                  reject(err);
                  throw err;
                }
                else{
                    log.info("fileinfolder Query succesfully executed");
                    db.close();
                    resolve(rows);
                }
              });             
        }, 1000)
    })
}

var video_list = function getVideolist(filetype){
    return new Promise(function(resolve, reject){
        setTimeout( function(){
            document.querySelector('#videotable > tbody').innerHTML = `<tr><th></th>
                                                                        <th>name</th>\
                                                                        <th>date_added</th>\
                                                                        <th>resolution</th>\
                                                                        <th>size</th>\
                                                                    </tr>`;
            const db = new sqlite3.Database('InnerDatabase.db');
            let sql = `select display_name as name, date_added, path, resolution, size
                        from video;`
            log.info("video_list Query start");
            db.all(sql, [], (err, rows) => {
                if (err) {
                  log.err(err);
                  reject(err);
                  throw err;
                }
                else{
                    log.info("video_list Query succesfully executed");
                    rows.forEach((row) => {
                        getByte(row.size).then(function(bytedata) {
                            document.querySelector('#videotable > tbody').innerHTML += `<tr><td><div class="form-check">
                            <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="${row.path}">
                          </div></td>
                            <td>${row.name}</td><td>${new Date(row.date_added*1000-offset).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td><td>${row.resolution}</td><td>${bytedata}</td></tr>`
                        });
                    });
                    db.close();
                    resolve(true);
                }
              });             
        }, 1000)
    })
}