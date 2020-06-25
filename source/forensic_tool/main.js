const { app, BrowserWindow, ipcMain, dialog  } = require('electron')
const path = require('path')
const url = require('url')
const vision = require('@google-cloud/vision');
var exec = require('child_process').exec, child;

// Imports the Google Cloud Video Intelligence library + Node's fs library
const video = require('@google-cloud/video-intelligence').v1;
const fs = require('fs');
const util = require('util');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow(){
  //브라우저 창 생성
  win = new BrowserWindow({
    width: 1080,
    minWidth: 680,
    height: 840,
    webPreferences :{
      nodeIntegration : true
    }
  })

  win.loadURL(url.format({
      pathname: path.join(__dirname, 'src/index.html'),
      protocol: 'file:',
      slashes : true
    })
  )

  //win.webContents.openDevTools()

  win.on('closed', ()=>{
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', ()=>{
  if(process.platform !== 'darwin'){
    app.quit();
  }
});

app.on('activate', ()=>{
    if(win == null){
        createWindow();
    }

})

ipcMain.on("device-name", (e, arg) => {
    win.webContents.send("device", arg);
  });

//photos taken in selected dates
  ipcMain.on("photo", (e, arg) => {
    win.webContents.send("select_result", arg);
  });
  
  //open-file-dialog
  ipcMain.on('open-file-dialog', async (event) => {
  
    const result = await dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory']
    })
      win.webContents.send('selected-directory',result);
  })
 
  //console 출력
  ipcMain.on('print', (e, arg)=>{
    console.log(arg);
  })
  
  //이미지 라벨 
  var label_result = new Array();

  //이미지 라벨 분석
  ipcMain.on('image_labels', async (event, list) =>{
    label_result = [];
    await Promise.all(list.map(async (element)=>{
      var path = new String();
      path = element.path;
      var num = path.indexOf("DCIM");
      var folder_path = new String();
      folder_path = "./photos/" + path.substring(num);
      await quickstart(folder_path, element.display_name);
    }))

    //라벨 검출 결과 전송
    win.webContents.send('labels_result',label_result);
    console.log(label_result.length);
  })
  
  //google vision api image analysis
  async function quickstart(path, name) {
    
      const client = new vision.ImageAnnotatorClient();
    
      // Performs label detection on the image file
      const [result] = await client.labelDetection(path);
      const labels = result.labelAnnotations;
  
      path = '../.'+path;
      var content = {path : path, name : name, labels : labels}
      label_result.push(content);
    }
var video_label_result = new Array();
var video_detect_result = new Array();

ipcMain.on("video-analysis", async (e, arg) => {
    console.log(arg + "from menu_media");
    video_label_result = [];
    video_detect_result = [];

    await Promise.all(arg.map(async (value)=>{
      // await copy_file(value);
      // setTimeout(function() { }, 10000);
      await get_content_detection(value);
      // await get_videolabels(value);
    }))
    await Promise.all(arg.map(async (value)=>{
      // await copy_file(value);
      // setTimeout(function() { }, 10000);
      //await get_content_detection(value);
      await get_videolabels(value);
    }))
    var video_analysis_result = [video_label_result,video_detect_result];
    console.log(video_analysis_result);
    win.webContents.send("getvideodetail", video_analysis_result);

    //win.webContents.send("getvideodetail", [temp_label,temp_detect]);


});

function checkandcopy(arg){
  return new Promise(function(resolve, reject){
      setTimeout(function(){
          for(var i=0; i < arg.length; i++){
            cmd_pull = exec('adb pull '+arg[i]);
          }
          resolve(true);           
      }, 1000)
  })
}

async function copy_file(path){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      cmd_pull = exec('adb pull '+path,function(error, stdout, stderr){
        if(error){
          console.log(error);
        }
      });
        resolve(true);           
    }, 1000)
  })
}



function send_labels_to_menu_media(event){
  win.webContents.send("getvideodetail", 'response message');
}

async function get_videolabels(path){
  var video_name = path.split('/');
  video_name = video_name[video_name.length-1];

  // Creates a client
  const client = new video.VideoIntelligenceServiceClient();

  var video_path = __dirname+'\\' + video_name;
  var temp = video_path.split('\\');
  var beforeslice = '';
  for(var i = 0; i < temp.length; i++){
    beforeslice += temp[i] + '/';
  }

  const vpath = beforeslice.slice(0,-1);
  console.log(vpath);
  // Reads a local video file and converts it to base64
  const readFile = util.promisify(fs.readFile);
  const file = await readFile(vpath);
  const inputContent = file.toString('base64');
  console.log("video convert");

  // Constructs request
  const request = {
  inputContent: inputContent,
  features: ['LABEL_DETECTION'],
  };

  // Detects labels in a video
  const [operation] = await client.annotateVideo(request);
  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();
  // Gets annotations for video
  const annotations = operationResult.annotationResults[0];

  
  const labels = annotations.segmentLabelAnnotations;
  console.log(labels);
  var content = {video : video_name,labels : []}
  labels.forEach(label => {
      console.log(`Label ${label.entity.description} occurs at:`);
      content['labels'].push(label.entity.description);
      content[label.entity.description] = [];
      label.segments.forEach(segment => {
          const time = segment.segment;
          if (time.startTimeOffset.seconds === undefined) {
          time.startTimeOffset.seconds = 0;
          }
          if (time.startTimeOffset.nanos === undefined) {
          time.startTimeOffset.nanos = 0;
          }
          if (time.endTimeOffset.seconds === undefined) {
          time.endTimeOffset.seconds = 0;
          }
          if (time.endTimeOffset.nanos === undefined) {
          time.endTimeOffset.nanos = 0;
          }
          console.log(
          `\tStart: ${time.startTimeOffset.seconds}` +
              `.${(time.startTimeOffset.nanos / 1e6).toFixed(0)}s`
          );
          console.log(
          `\tEnd: ${time.endTimeOffset.seconds}.` +
              `${(time.endTimeOffset.nanos / 1e6).toFixed(0)}s`
          );
          console.log(`\tConfidence: ${segment.confidence}`);
          var temp = [time.startTimeOffset.seconds + '.' + (time.startTimeOffset.nanos / 1e6).toFixed(0),
                      time.endTimeOffset.seconds + '.' + (time.endTimeOffset.nanos / 1e6).toFixed(0),
                      segment.confidence];
          content[label.entity.description].push(temp);
      });
  });
  console.log(content);
  video_label_result.push(content);
}

async function get_content_detection(path){
  var video_name = path.split('/');
  video_name = video_name[video_name.length-1];

  // Creates a client
  const client = new video.VideoIntelligenceServiceClient();

  var video_path = __dirname+'\\' + video_name;
  var temp = video_path.split('\\');
  var beforeslice = '';
  for(var i = 0; i < temp.length; i++){
    beforeslice += temp[i] + '/';
  }

  const vpath = beforeslice.slice(0,-1);
  console.log(vpath);
  // Reads a local video file and converts it to base64
  const readFile = util.promisify(fs.readFile);
  const file = await readFile(vpath);
  const inputContent = file.toString('base64');
  console.log("video convert");

  const request = {
    inputContent: inputContent,
    features: ['EXPLICIT_CONTENT_DETECTION'],
    };

    // Human-readable likelihoods
    const likelihoods = [
    'UNKNOWN',
    'VERY_UNLIKELY',
    'UNLIKELY',
    'POSSIBLE',
    'LIKELY',
    'VERY_LIKELY',
    ];

    // Detects unsafe content
    const [opertaion] = await client.annotateVideo(request);
    console.log('Waiting for operation to complete...');
    const [operationResult] = await opertaion.promise();
    // Gets unsafe content
    const explicitContentResults =
    operationResult.annotationResults[0].explicitAnnotation;
    console.log('Explicit annotation results:');
    var content = {video : video_name, likelihood : []}
    explicitContentResults.frames.forEach(result => {
        if (result.timeOffset === undefined) {
            result.timeOffset = {};
        }
        if (result.timeOffset.seconds === undefined) {
            result.timeOffset.seconds = 0;
        }
        if (result.timeOffset.nanos === undefined) {
            result.timeOffset.nanos = 0;
        }
        console.log(
            `\tTime: ${result.timeOffset.seconds}` +
            `.${(result.timeOffset.nanos / 1e6).toFixed(0)}s`
        );
        console.log(
            `\t\tPornography likelihood: ${likelihoods[result.pornographyLikelihood]}`
        );
        var temp = [result.timeOffset.seconds + '.' + (result.timeOffset.nanos / 1e6).toFixed(0),
                      likelihoods[result.pornographyLikelihood]];
        content['likelihood'].push(temp);
    });
  console.log(content);
  video_detect_result.push(content);
}

  //detect unsafe image
  let detect_result = new Array();
  
    ipcMain.on("detect", async (e, result)=>{
      detect_result = [];
      await Promise.all(result.map(async (element)=>{
        var path = new String();
        path = element.path;
        var num = path.indexOf("DCIM");
        var folder_path = new String();
        folder_path = "./photos/" + path.substring(num);
        await detect(folder_path, element.display_name);
      }))
      win.webContents.send('detect_result', detect_result);
      console.log("detect_success");
    });
  
    //google vision api detect unsafe content
    async function detect(path, name){
      //const vision = require('@google-cloud/vision');

      // Creates a client
      const client = new vision.ImageAnnotatorClient();
      // Performs safe search detection on the local file
      const [result] = await client.safeSearchDetection(path);
      const detections = result.safeSearchAnnotation;
  
      var adult_sum = 0;
      var racy_sum = 0;
  
      if(detections.adult == "VERY_LIKELY"){
        adult_sum = 100;
      }
      else if(detections.adult == "LIKELY"){
        adult_sum = 80;
      }
      else if(detections.adult == "POSSIBLE"){
        adult_sum = 60;
      }
      else if(detections.adult == "UNLIKELY"){
        adult_sum = 40;
      }
      else if(detections.adult == "VERY_UNLIKELY"){
        adult_sum = 20;
      }
      else{
        adult_sum = 0;
      }
  
      if(detections.racy == "VERY_LIKELY"){
        racy_sum = 100;
      }
      else if(detections.racy == "LIKELY"){
        racy_sum = 80;
      }
      else if(detections.racy == "POSSIBLE"){
        racy_sum = 60;
      }
      else if(detections.racy == "UNLIKELY"){
        racy_sum = 40;
      }
      else if(detections.racy == "VERY_UNLIKELY"){
        racy_sum = 20;
      }
      else{
        racy_sum = 0;
      }
  
      var score = (adult_sum + racy_sum) / 2;
  
      path = '../.'+path;
  
      if(score>=60){
        var content = {path : path, name : name, score : score};
        detect_result.push(content);
      }
  
    }

  //error dialog
    ipcMain.on('open-error-dialog', (event) => {
      dialog.showErrorBox('detected unsafe contents', '당신의 휴대폰에서 유해한 콘텐츠를 발견했습니다!')
    })

//이전에 사용한 photos 폴더 삭제
var rimraf = require("rimraf");
rimraf("./photos", function(){console.log("")});
