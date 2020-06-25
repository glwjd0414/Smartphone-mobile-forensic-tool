const log = require('electron-log')
const sqlite3 = require('sqlite3').verbose();

document.addEventListener("DOMContentLoaded", function(){
  getInfoRows();
});

function el(selector) {
    return document.getElementById(selector);
}
el('menu-info').addEventListener('click', function(){
  // Get the mysql service
  getInfoRows();
},false);

el('menu-calling').addEventListener('click', function(){
  // Get the mysql service
  getCallingRows();
},false);

el('menu-photo').addEventListener('click', function(){
  // Get the mysql service
  getPhotoRows();
},false);

el('menu-contact').addEventListener('click', function(){
  // Get the mysql service
  getContactRows();
},false);

el('menu-video').addEventListener('click', function(){
  // Get the mysql service
  getVideoRows();
},false);

el('menu-sms').addEventListener('click', function(){
  // Get the mysql service
  getSmsRows();
},false);

el('menu-audio').addEventListener('click', function(){
  // Get the mysql service
  getAudioRows();
},false);


el('menu-document').addEventListener('click', function(){
  // Get the mysql service
  getDocumentRows();
},false);

el('menu-calendar').addEventListener('click', function(){
  // Get the mysql service
  getCalendarRows();
},false);

el('menu-network').addEventListener('click', function(){
  // Get the mysql service
  getNetworkRows();
},false);

el('menu-appinfo').addEventListener('click', function(){
  // Get the mysql service
  getAppinfoRows();
},false);

el('menu-wifi').addEventListener('click', function(){
  // Get the mysql service
  getWifiRows();
},false);

el('menu-usagestats').addEventListener('click', function(){
  // Get the mysql service
  getAppUsageRows();
},false);


function getInfoRows(){
  Promise.all([getphoneinfo(),getaccountinfo()]).then(function(value){
      log.info(value);
      var html = value[0] + value[1];
      document.querySelector('#table > tbody').innerHTML = html;
  });
}

function getCallingRows(){
  const db = new sqlite3.Database('InnerDatabase.db');
  var html = "<tr><th>Id</th>\
                  <th>Type</th>\
                  <th>Name</th>\
                  <th>Number</th>\
                  <th>Duration</th>\
                  <th>Date</th>\
              </tr>"
  let sql = "SELECT *  FROM calllog"
  db.all(sql, [], (err, rows) => {
      if (err) {
        log.err(err);
        throw err;
      }
      
      rows.forEach((row) => {
          html += `<tr>
          <td>${row.id}</td>
          <td>${row.type}</td>
          <td>${row.name}</td>
          <td>${row.number}</td>
          <td>${row.duration}</td>
          <td>${row.date}</td>
          </tr>`;
        });
      document.querySelector('#table > tbody').innerHTML = html;
      db.close();
      log.info("Query succesfully executed");
    });
}

function getPhotoRows(){
  const db = new sqlite3.Database('InnerDatabase.db');
  var html = "<tr><th>Title</th>\
                  <th>Id</th>\
                  <th>Date Added</th>\
                  <th>Display Name</th>\
                  <th>Mime type</th>\
                  <th>Path</th>\
                  <th>Latitude</th>\
                  <th>Longitude</th>\
                  <th>Size</th>\
              </tr>"
  let sql = "SELECT *  FROM photo"
  db.all(sql, [], (err, rows) => {
      if (err) {
        log.err(err);
        throw err;
      }
      
      rows.forEach((row) => {
          html += `<tr>
          <td>${row.title}</td>
          <td>${row.id}</td>
          <td>${row.date_added}</td>
          <td>${row.display_name}</td>
          <td>${row.mime_type}</td>
          <td>${row.path}</td>
          <td>${row.latitude}</td>
          <td>${row.longitude}</td>
          <td>${row.size}</td>
          </tr>`;
        });
      document.querySelector('#table > tbody').innerHTML = html;
      db.close();
      log.info("Query succesfully executed");
    });
}

function getContactRows(){
  const db = new sqlite3.Database('InnerDatabase.db');
  var html = "<tr><th>Number</th>\
                  <th>Name</th>\
                  <th>Photo_id</th>\
                  <th>Person_id</th>\
              </tr>"
  let sql = "SELECT *  FROM contact"
  db.all(sql, [], (err, rows) => {
      if (err) {
        log.err(err);
        throw err;
      }
      
      rows.forEach((row) => {
          html += `<tr>
          <td>${row.number}</td>
          <td>${row.name}</td>
          <td>${row.photo_id}</td>
          <td>${row.person_id}</td>
          </tr>`;
        });
      document.querySelector('#table > tbody').innerHTML = html;
      db.close();
      log.info("Query succesfully executed");
    });
}

function getVideoRows(){
  const db = new sqlite3.Database('InnerDatabase.db');
  var html = "<tr><th>Title</th>\
                  <th>Date Added</th>\
                  <th>Display Name</th>\
                  <th>Mime type</th>\
                  <th>Path</th>\
                  <th>Latitude</th>\
                  <th>Longitude</th>\
                  <th>Album</th>\
                  <th>Artist</th>\
                  <th>Bookmark</th>\
                  <th>Category</th>\
                  <th>Description</th>\
                  <th>Language</th>\
                  <th>Resolution</th>\
                  <th>Tags</th>\
                  <th>Size</th>\
              </tr>"
  let sql = "SELECT *  FROM video"
  db.all(sql, [], (err, rows) => {
      if (err) {
        log.err(err);
        throw err;
      }
      
      rows.forEach((row) => {
          html += `<tr>
          <td>${row.title}</td>
          <td>${row.date_added}</td>
          <td>${row.display_name}</td>
          <td>${row.mime_type}</td>
          <td>${row.path}</td>
          <td>${row.latitude}</td>
          <td>${row.longitude}</td>
          <td>${row.album}</td>
          <td>${row.artist}</td>
          <td>${row.bookmark}</td>
          <td>${row.category}</td>
          <td>${row.description}</td>
          <td>${row.language}</td>
          <td>${row.resolution}</td>
          <td>${row.tags}</td>
          <td>${row.size}</td>
          </tr>`;
        });
      document.querySelector('#table > tbody').innerHTML = html;
      db.close();
      log.info("Query succesfully executed");
    });
}

function getSmsRows(){
  const db = new sqlite3.Database('InnerDatabase.db');
  var html = "<tr><th>Mid</th>\
                  <th>Tid</th>\
                  <th>Type</th>\
                  <th>Address</th>\
                  <th>Person</th>\
                  <th>Creator</th>\
                  <th>Date</th>\
                  <th>Body</th>\
                  <th>Read_c</th>\
              </tr>"
  let sql = "SELECT *  FROM sms"
  db.all(sql, [], (err, rows) => {
      if (err) {
        log.err(err);
        throw err;
      }
      
      rows.forEach((row) => {
          html += `<tr>
          <td>${row.mid}</td>
          <td>${row.tid}</td>
          <td>${row.type}</td>
          <td>${row.address}</td>
          <td>${row.person}</td>
          <td>${row.creator}</td>
          <td>${row.date}</td>
          <td>${row.body}</td>
          <td>${row.read_c}</td>
          </tr>`;
        });
      document.querySelector('#table > tbody').innerHTML = html;
      db.close();
      log.info("Query succesfully executed");
    });
}

function getAudioRows(){
  const db = new sqlite3.Database('InnerDatabase.db');
  var html = "<tr><th>Title</th>\
                  <th>Date Added</th>\
                  <th>Mime type</th>\
                  <th>Path</th>\
                  <th>Album</th>\
                  <th>Artist</th>\
                  <th>Composer</th>\
                  <th>Year</th>\
                  <th>Size</th>\
              </tr>"
  let sql = "SELECT *  FROM audio"
  db.all(sql, [], (err, rows) => {
      if (err) {
        log.err(err);
        throw err;
      }
      
      rows.forEach((row) => {
          html += `<tr>
          <td>${row.title}</td>
          <td>${row.date_added}</td>
          <td>${row.mime_type}</td>
          <td>${row.path}</td>
          <td>${row.album}</td>
          <td>${row.artist}</td>
          <td>${row.composer}</td>
          <td>${row.year}</td>
          <td>${row.size}</td>
          </tr>`;
        });
      document.querySelector('#table > tbody').innerHTML = html;
      db.close();
      log.info("Query succesfully executed");
    });
}

function getDocumentRows(){
  const db = new sqlite3.Database('InnerDatabase.db');
  var html = "<tr><th>Name</th>\
                  <th>Title</th>\
                  <th>Mime type</th>\
                  <th>Date Added</th>\
                  <th>Date Modified</th>\
                  <th>Path</th>\
                  <th>Size</th>\
              </tr>"
  let sql = "SELECT *  FROM documentinfo"
  db.all(sql, [], (err, rows) => {
      if (err) {
        log.err(err);
        throw err;
      }
      
      rows.forEach((row) => {
          html += `<tr>
          <td>${row.name}</td>
          <td>${row.title}</td>
          <td>${row.mime_type}</td>
          <td>${row.date_added}</td>
          <td>${row.date_modified}</td>
          <td>${row.path}</td>
          <td>${row.size}</td>
          </tr>`;
        });
      document.querySelector('#table > tbody').innerHTML = html;
      db.close();
      log.info("Query succesfully executed");
    });
}

function getCalendarRows(){
  const db = new sqlite3.Database('InnerDatabase.db');
  var html = "<tr><th>Id</th>\
                  <th>Title</th>\
                  <th>Calendar Id</th>\
                  <th>Event Location</th>\
                  <th>Description</th>\
                  <th>Dstart</th>\
                  <th>Dend</th>\
                  <th>Duration</th>\
                  <th>All day</th>\
                  <th>Display name</th>\
                  <th>Account name</th>\
                  <th>Owner name</th>\
                  <th>Rrlue</th>\
                  <th>Rdate</th>\
              </tr>"
  let sql = "SELECT *  FROM calendar"
  db.all(sql, [], (err, rows) => {
      if (err) {
        log.err(err);
        throw err;
      }
      
      rows.forEach((row) => {
          html += `<tr>
          <td>${row.id}</td>
          <td>${row.title}</td>
          <td>${row.calendar_id}</td>
          <td>${row.event_location}</td>
          <td>${row.description}</td>
          <td>${row.dtstart}</td>
          <td>${row.dtend}</td>
          <td>${row.duration}</td>
          <td>${row.all_day}</td>
          <td>${row.display_name}</td>
          <td>${row.account_name}</td>
          <td>${row.owner_name}</td>
          <td>${row.rrlue}</td>
          <td>${row.rdate}</td>
          </tr>`;
        });
      document.querySelector('#table > tbody').innerHTML = html;
      db.close();
      log.info("Query succesfully executed");
    });
}

function getNetworkRows(){
  Promise.all([getandroidmetadata(),getinetAddress(),getlinkAddress(),getnetworkInfo(),getrouteInfo()]).then(function(value){
      log.info(value);
      var html = value[0] + value[1] + value[2] + value[3] + value[4];
      document.querySelector('#table > tbody').innerHTML = html;
  });
}

function getAppinfoRows(){
  const db = new sqlite3.Database('InnerDatabase.db');
  var html = "<tr><th>Packagename</th>\
                  <th>Version</th>\
                  <th>Name</th>\
                  <th>First insatll</th>\
                  <th>Last update</th>\
                  <th>Wifi Usage</th>\
                  <th>Cellular Usage</th>\
              </tr>"
  let sql = "SELECT *  FROM appinfo"
  db.all(sql, [], (err, rows) => {
      if (err) {
        log.err(err);
        throw err;
      }
      
      rows.forEach((row) => {
          html += `<tr>
          <td>${row.packagename}</td>
          <td>${row.version}</td>
          <td>${row.name}</td>
          <td>${row.firstinstall}</td>
          <td>${row.lastupdate}</td>
          <td>${row.wifiusage}</td>
          <td>${row.cellularusage}</td>
          </tr>`;
        });
      document.querySelector('#table > tbody').innerHTML = html;
      db.close();
      log.info("Query succesfully executed");
    });
}

function getWifiRows(){
  const db = new sqlite3.Database('InnerDatabase.db');
  var html = "<tr><th>ID</th>\
                  <th>Ssid</th>\
                  <th>Bssid</th>\
                  <th>Wepkeys</th>\
              </tr>"
  let sql = "SELECT *  FROM wifi"
  db.all(sql, [], (err, rows) => {
      if (err) {
        log.err(err);
        throw err;
      }
      
      rows.forEach((row) => {
          html += `<tr>
          <td>${row.id}</td>
          <td>${row.ssid}</td>
          <td>${row.bssid}</td>
          <td>${row.wepkeys}</td>
          </tr>`;
        });
      document.querySelector('#table > tbody').innerHTML = html;
      db.close();
      log.info("Query succesfully executed");
    });
}

function getAppUsageRows(){
    const db = new sqlite3.Database('InnerDatabase.db');
    var html = "<tr><th>packagename</th>\
                    <th>firsttimestamp</th>\
                    <th>lasttimestamp</th>\
                    <th>lasttimeused</th>\
                    <th>totaltimeforeground</th>\
                </tr>"
    let sql =  `select * from AppUsageDay
                union
                select * from AppUsageMonth
                union
                select * from AppUsageWeek
                union
                select * from AppUsageYear;`
    db.all(sql, [], (err, rows) => {
        if (err) {
          log.err(err);
          throw err;
        }
        const offset = new Date().getTimezoneOffset() * 60000;
        rows.forEach((row) => {
            html += `<tr>
            <td>${row.packagename}</td>
            <td>${row.firsttimestamp}</td>
            <td>${row.lasttimestamp}</td>
            <td>${row.lasttimeused}</td>
            <td>${row.totaltimeforeground}</td>
            </tr>`
          });
          db.close();
        document.querySelector('#table > tbody').innerHTML = html;
        log.info("Query succesfully executed");
      });
}

var getphoneinfo = function getPhoneinfo(){
  return new Promise(function(resolve, reject){
      setTimeout( function(){
        // var html = `<tr><th>Phone type</th><th>Software Number</th><th>Phone number</th>
        //             <th>Subscribe id</th><th>Adid</th><th>Call state</th>
        //             <th>Data state</th><th>Network type</th><th>Etwork countryis</th>
        //             <th>Simcountryiso</th><th>Network operator</th><th>Sim operator</th>
        //             <th>Network operator name</th><th>Sim operator name</th><th>Sim serial number</th>
        //             <th>Simstate</th><th>Is networking Roming</th>
        //           </tr>`;
        var html = `<tr><th>Phone type</th><th>Software Number</th><th>Phone number</th></tr>`;
        const db = new sqlite3.Database('InnerDatabase.db');
        let sql = "SELECT *  FROM android_metadata";
        db.get(sql, [], (err, row) => {
            if (err) {
              log.err(err);
              throw err;
            }
            html +=  `<tr><td>${row.phonetype}</td><td>${row.softwarenumber}</td><td>${row.phonenumber}</td></tr>`

            html += `<tr><th>Subscribe id</th><th>Adid</th><th>Call state</th></tr>`
            html +=  `<tr><td>${row.subscriberid}</td><td>${row.adid}</td><td>${row.callstate}</td></tr>`

            html += `<tr><th>Data state</th><th>Network type</th><th>Etwork countryis</th></tr>`
            html +=  `<tr><td>${row.datastate}</td><td>${row.networktype}</td><td>${row.networkcountryiso}</td></tr>`

            html += `<tr><th>Simcountryiso</th><th>Network operator</th><th>Sim operator</th></tr>`
            html +=  `<tr><td>${row.simcountryiso}</td><td>${row.networkoperater}</td><td>${row.simoperator}</td></tr>`

            html += `<tr><th>Network operator name</th><th>Sim operator name</th><th>Sim serial number</th></tr>`
            html +=  `<tr><td>${row.networkoperatorname}</td><td>${row.simoperatorname}</td><td>${row.simserialnumber}</td></tr>`

            html += `<tr><th>Simstate</th><th>Is networking Roming</th></tr>`
            html +=  `<tr><td>${row.simstate}</td><td>${row.isnetworkroming}</td></tr>`

            db.close();
            resolve(html);
          });  
      }, 1000)
  })
}

var getaccountinfo = function getAccountinfo(){
  return new Promise(function(resolve, reject){
      setTimeout( function(){
        var html = `<tr><th>Account name</th><th>Accounttype</th></tr>`;
        const db = new sqlite3.Database('InnerDatabase.db');
        let sql = "SELECT *  FROM accountinfo";
        db.all(sql, [], (err, rows) => {
            if (err) {
              log.err(err);
              throw err;
            }
            rows.forEach((row) => {
              html +=  `<tr><td>${row.accountname}</td><td>${row.accounttype}</td></tr>`
            });
            db.close();
            resolve(html);
          });  
      }, 1000)
  })
}

var getandroidmetadata = function getAM(){
  return new Promise(function(resolve, reject){
      setTimeout( function(){
        var html = `<tr><th>locale</th></tr>`;
        const db = new sqlite3.Database('networkDatabase.db');
        let sql = "SELECT *  FROM android_metadata";
        db.get(sql, [], (err, row) => {
            if (err) {
              log.err(err);
              throw err;
            }
            html +=  `<tr><td>${row.locale}</td></tr>`
            db.close();
            resolve(html);
          });  
      }, 1000)
  })
}

var getinetAddress = function getIA(){
  return new Promise(function(resolve, reject){
      setTimeout( function(){
        var html = `<tr><th>net_id</th><th>host_address</th></tr>`;
        const db = new sqlite3.Database('networkDatabase.db');
        let sql = "SELECT *  FROM inetAddress";
        db.all(sql, [], (err, rows) => {
            if (err) {
              log.err(err);
              throw err;
            }
            rows.forEach((row) => {
              html +=  `<tr><td>${row.net_id}</td><td>${row.host_address}</td></tr>`
            });
            db.close();
            resolve(html);
          });  
      }, 1000)
  })
}

var getlinkAddress = function getLA(){
  return new Promise(function(resolve, reject){
      setTimeout( function(){
        var html = `<tr><th>net_id</th><th>host_address</th><th>prefix_length</th></tr>`;
        const db = new sqlite3.Database('networkDatabase.db');
        let sql = "SELECT *  FROM linkAddress";
        db.all(sql, [], (err, rows) => {
            if (err) {
              log.err(err);
              throw err;
            }
            rows.forEach((row) => {
              html +=  `<tr><td>${row.net_id}</td><td>${row.host_address}</td><td>${row.prefix_length}</td></tr>`
            });
            db.close();
            resolve(html);
          });  
      }, 1000)
  })
}

var getnetworkInfo = function getNI(){
  return new Promise(function(resolve, reject){
      setTimeout( function(){
        var html = `<tr><th>net_id</th><th>domain</th><th>interface_name</th></tr>`;
        const db = new sqlite3.Database('networkDatabase.db');
        let sql = "SELECT *  FROM network_info";
        db.all(sql, [], (err, rows) => {
            if (err) {
              log.err(err);
              throw err;
            }
            rows.forEach((row) => {
              html +=  `<tr><td>${row.net_id}</td><td>${row.domain}</td><td>${row.interface_name}</td></tr>`
            });
            db.close();
            resolve(html);
          });  
      }, 1000)
  })
}

var getrouteInfo = function getRI(){
  return new Promise(function(resolve, reject){
      setTimeout( function(){
        var html = `<tr><th>net_id</th><th>destination</th><th>d_prefix</th><th>gateway</th><th>interface_name</th></tr>`;
        const db = new sqlite3.Database('networkDatabase.db');
        let sql = "SELECT *  FROM routeinfo";
        db.all(sql, [], (err, rows) => {
            if (err) {
              log.err(err);
              throw err;
            }
            rows.forEach((row) => {
              html +=  `<tr><td>${row.net_id}</td><td>${row.destination}</td><td>${row.d_prefix}</td><td>${row.gateway}</td><td>${row.interface_name}</td></tr>`
            });
            db.close();
            resolve(html);
          });  
      }, 1000)
  })
}