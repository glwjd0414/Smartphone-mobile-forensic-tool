const { ipcRenderer } = require("electron");
const { BrowserWindow } = require("electron").remote;
const path = require('path')
const fs = require('fs')
var io = require('socket.io').listen(3000);
var exec = require('child_process').exec, child;
//var mysql = require('mysql');


const connect_btn = document.getElementById("connect_btn");

connect_btn.addEventListener("click", () => {

    win = new BrowserWindow({
        width: 600,
        height: 450,
        frame: false,
        alwaysOnTop: true,
        webPreferences: {
			nodeIntegration: true
        }
    });

    //win.webContents.openDevTools();
    win.on("close", () => {
    	win = null;
    });
    win.loadFile("./src/connect.html");
    win.show();
    
});
/*
var connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: '1234'
});

connection.connect();
*/

var mysql = {
	user: 'root',
	password: '1234'
};

function apkInstall(){
	cmd_install = exec('adb -s '+device+' install -r app-release.apk',function(error, stdout, stderr){
		cc.innerHTML="install apk";
		cmd_exec = exec('adb -s '+device+' shell am start -n com.example.dataextraction/com.example.dataextraction.MainActivity',function(error, stdout, stderr){
			cc.innerHTML="start app";
		})
	});
	//cmd_install();
}

function convertToMysql(){
	cmd_sqlIdb = exec('sqlite3 InnerDatabase.db .dump | python SQLiteToMysql.py > InnerDatabase.sql',function(error, stdout, stderr){
		cc.innerHTML="make InnerDB SQL";
		cmd_sqlNdb = exec('sqlite3 networkDatabase.db .dump | python SQLiteToMysql_network.py > networkDatabase.sql', function(error, stdout, stderr){
			cc.innerHTML="make NetworkDB SQL";
			cmd_makeIdb = exec('mysql -u'+mysql.user+' -p'+mysql.password+' -e "DROP DATABASE IF EXISTS DATAEXTRACTION;CREATE DATABASE DATAEXTRACTION CHARACTER SET utf8 COLLATE utf8_unicode_ci;USE DATAEXTRACTION;"',function(error, stdout, stderr){
				cc.innerHTML="create InnerDB";
				cmd_insertIdb = exec('mysql -u'+mysql.user+' -p'+mysql.password+' DATAEXTRACTION < InnerDatabase.sql',function(error, stdout, stderr){
					cc.innerHTML="insert Data ; InnerDB";
					cmd_makeNdb = exec('mysql -u'+mysql.user+' -p'+mysql.password+' -e "DROP DATABASE IF EXISTS DATAEXTRACTION_network;CREATE DATABASE DATAEXTRACTION_network;USE DATAEXTRACTION_network;"',function(error, stdout, stderr){
						cc.innerHTML="create NetworkDB";
						cmd_insertNdb = exec('mysql -u'+mysql.user+' -p'+mysql.password+' DATAEXTRACTION_network < networkDatabase.sql',function(error, stdout, stderr){
							cc.innerHTML="insert Data ; NetworkDB";
							cc.innerHTML="Data Extraction Complete !";
							cc.innerHTML="Click 'NEXT' Button";
						})
					})
				})
			})
		})
	})
}

// function extractDB () {
// 	cmd_backup = exec('adb -s '+device+' backup com.example.dataextraction -f backup.dataextraction.ad', function(error, stdout, stderr){
// 		cc.innerHTML="backup app";
// 		setTimeout(function(){
// 			cmd_unpack = exec('java -jar abe.jar unpack backup.dataextraction.ad dataextraction.tar',function(error, stdout, stderr){
// 				cc.innerHTML="unpack backup";
// 				cmd_unzip = exec('tar xvf dataextraction.tar', function(error, stdout, stderr){
// 					cc.innerHTML="unzip tar";
// 					cmd_moveIdb = fs.rename('apps/com.example.dataextraction/db/InnerDatabase.db', 'InnerDatabase.db', function(){
// 						cc.innerHTML="move InnerDB File";
//             			cmd_moveNdb = fs.rename('apps/com.example.dataextraction/db/networkDatabase.db', 'networkDatabase.db',function(){
//             				cc.innerHTML="move NetworkDB File";
//             				cmd_sqlIdb = exec('sqlite3 InnerDatabase.db .dump | python SQLiteToMysql.py > InnerDatabase.sql',function(error, stdout, stderr){
//             					cc.innerHTML="make InnerDB SQL";
//                 				cmd_sqlNdb = exec('sqlite3 networkDatabase.db .dump | python SQLiteToMysql_network.py > networkDatabase.sql', function(error, stdout, stderr){
//                   					cc.innerHTML="make NetworkDB SQL";
// 									cmd_makeIdb = exec('mysql -u'+mysql.user+' -p'+mysql.password+' -e "DROP DATABASE IF EXISTS DATAEXTRACTION;CREATE DATABASE DATAEXTRACTION CHARACTER SET utf8 COLLATE utf8_unicode_ci;USE DATAEXTRACTION;"',function(error, stdout, stderr){
//     									cc.innerHTML="create InnerDB";
//     									cmd_insertIdb = exec('mysql -u'+mysql.user+' -p'+mysql.password+' DATAEXTRACTION < InnerDatabase.sql',function(error, stdout, stderr){
//       										cc.innerHTML="insert Data ; InnerDB";
//       										cmd_makeNdb = exec('mysql -u'+mysql.user+' -p'+mysql.password+' -e "DROP DATABASE IF EXISTS DATAEXTRACTION_network;CREATE DATABASE DATAEXTRACTION_network;USE DATAEXTRACTION_network;"',function(error, stdout, stderr){
//     											cc.innerHTML="create NetworkDB";
//     											cmd_insertNdb = exec('mysql -u'+mysql.user+' -p'+mysql.password+' DATAEXTRACTION_network < networkDatabase.sql',function(error, stdout, stderr){
//       												cc.innerHTML="insert Data ; NetworkDB";
//       												cc.innerHTML="Data Extraction Complete !";
//       												cc.innerHTML="Click 'NEXT' Button";
//     											})
//   											})
//     									})
//   									})
//                 				})
//               				})
//             			})
//           			})
//         		})
//       		})
//     	},7000);
//   	});
//   	//cmd_backup();
// }

// //db insert done
// io.on('connection', function(socket){
// 	var instanceId = socket.id;

// 	socket.on('alert', function(data){
// 		cc.innerHTML = data.comment+" db created";
// 	})
// 	socket.on('end', function(data){
// 		cc.innerHTML="all databases created !";
// 		extractDB();
//   	})
// })

function convertToMysql(){
	cmd_sqlIdb = exec('sqlite3 InnerDatabase.db .dump | python SQLiteToMysql.py > InnerDatabase.sql',function(error, stdout, stderr){
    cc.innerHTML="make InnerDB SQL";
    cmd_sqlNdb = exec('sqlite3 networkDatabase.db .dump | python SQLiteToMysql_network.py > networkDatabase.sql', function(error, stdout, stderr){
      cc.innerHTML="make NetworkDB SQL";
      cmd_makeIdb = exec('mysql -u'+mysql.user+' -p'+mysql.password+' -e "DROP DATABASE IF EXISTS DATAEXTRACTION;CREATE DATABASE DATAEXTRACTION CHARACTER SET utf8 COLLATE utf8_unicode_ci;USE DATAEXTRACTION;"',function(error, stdout, stderr){
        cc.innerHTML="create InnerDB";
        cmd_insertIdb = exec('mysql -u'+mysql.user+' -p'+mysql.password+' DATAEXTRACTION < InnerDatabase.sql',function(error, stdout, stderr){
          cc.innerHTML="insert Data ; InnerDB";
          cmd_makeNdb = exec('mysql -u'+mysql.user+' -p'+mysql.password+' -e "DROP DATABASE IF EXISTS DATAEXTRACTION_network;CREATE DATABASE DATAEXTRACTION_network;USE DATAEXTRACTION_network;"',function(error, stdout, stderr){
            cc.innerHTML="create NetworkDB";
            cmd_insertNdb = exec('mysql -u'+mysql.user+' -p'+mysql.password+' DATAEXTRACTION_network < networkDatabase.sql',function(error, stdout, stderr){
              cc.innerHTML="insert Data ; NetworkDB";
              cc.innerHTML="Data Extraction Complete !";
              cc.innerHTML="Click 'NEXT' Button";
            })
          })
        })
      })
    })
  })
}
function extractDB () {
	cmd_backup = exec('adb -s '+device+' backup com.example.dataextraction -f backup.dataextraction.ad', function(error, stdout, stderr){
		cc.innerHTML="backup app";
		setTimeout(function(){
			cmd_unpack = exec('java -jar abe.jar unpack backup.dataextraction.ad dataextraction.tar',function(error, stdout, stderr){
				cc.innerHTML="unpack backup";
				cmd_unzip = exec('tar xvf dataextraction.tar', function(error, stdout, stderr){
					cc.innerHTML="unzip tar";
					cmd_moveIdb = fs.rename('apps/com.example.dataextraction/db/InnerDatabase.db', 'InnerDatabase.db', function(){
						cc.innerHTML="move InnerDB File";
						cmd_moveNdb = fs.rename('apps/com.example.dataextraction/db/networkDatabase.db', 'networkDatabase.db',function(){
							cc.innerHTML="move NetworkDB File";
							convertToMysql();
						})
					})
				})
			})
		},7000);
	});
  //cmd_backup();
}

//db insert done
io.on('connection', function(socket){
	var instanceId = socket.id;

	socket.on('alert', function(data){
		cc.innerHTML = data.comment+" db created";
	})
	socket.on('end', function(data){
		cc.innerHTML="all databases created !";
		extractDB();
  	})
})

var device = new String();
ipcRenderer.on("device", (e, arg) => {
    device = arg;
    connect_btn.innerHTML = "Connected : ".concat(device);
    //device.innerHTML = arg.toString();

    cc.innerHTML="DATA EXTRACTION START !";
	// apkInstall();
	extractDB();

});
