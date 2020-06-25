const {remote, ipcRenderer} = require("electron");
const {exec} = require("child_process");

const connect_btn = document.getElementById("connect_btn");
var result;
var ary = new Array();

connect_btn.addEventListener("click", () => {
  exec("adb devices", (error, stdout, stderr)=>{
    result = stdout;
    ary = result.split("\n");
    ary = ary.slice(1, -1);
    ary.pop();
  });
  if(ary.length==0){
    document.getElementById("status").innerHTML = "None";
    document.getElementById("status").style.visibility = "visible";
  }
  else{
    document.querySelector(".container").style.visibility = "visible";
    document.getElementById("status").innerHTML = ary.length.toString().concat(" device(s) connected!");
    document.getElementById("status").style.visibility = "visible";
    for (let index = 0; index < ary.length; index++) {
      var name = "connectDevice".concat((index+1).toString());
      document.getElementById(name).innerHTML = ary[index].toString();
      document.getElementById(name).style.visibility = "visible";
    }
  }
  
  
});

const connectDevice1 = document.getElementById("connectDevice1");
const connectDevice2 = document.getElementById("connectDevice2");
const connectDevice3 = document.getElementById("connectDevice3");

const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", () => {
  let window = remote.getCurrentWindow();
  window.close();
});

connectDevice1.addEventListener("click", ()=>{
  var new_ary = new Array();
  new_ary = ary[0].split("\t");
  ipcRenderer.send(
    "device-name",
    new_ary[0]
  );
  let window = remote.getCurrentWindow();
  window.close();
})
connectDevice2.addEventListener("click", ()=>{
  var new_ary = new Array();
  new_ary = ary[1].split("\t");
  ipcRenderer.send(
    "device-name",
    new_ary[0]
  );
  let window = remote.getCurrentWindow();
  window.close();
})
connectDevice3.addEventListener("click", ()=>{
  var new_ary = new Array();
  new_ary = ary[2].split("\t");
  ipcRenderer.send(
    "device-name",
    new_ary[0]
  );
  let window = remote.getCurrentWindow();
  window.close();
})