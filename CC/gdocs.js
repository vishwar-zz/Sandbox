// client ID: 314184643588-20elf6uq7vf4f82t56csu6d9aioi67qv.apps.googleusercontent.com
//var client secret: Na1FOHWCnG_mT_mQe3KfiIAG

var debug = 0;
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
var TOKEN_DIR = __dirname;
var TOKEN_PATH = 'token.json';
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');


module.exports = {
  authorize: function (credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
      if (err) {
        getNewToken(oauth2Client, callback);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client);
      }
    });
  },

  getShowName: function (auth, callback) {
    var sheets = google.sheets('v4');
    var pageHtmlToReturn = "";
    var showName = "";
    var showStartTime = "";
    var showEndTime = "";
    var showWhereToWatch = "";


    sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: '1rRKY3w8Q-7DuDRCsiQ5GXx13-YN5_boXVXSjabDVw5U',
      range: 'Guide!A2:D',
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var rows = response.values;
      if (rows.length == 0) {
        console.log('No data found in the spreadsheet');
      } else {
        debug && console.log('Data found in the spreadsheet.');
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          showName = row[0].toString();
          debug && console.log('Show Name = %s', showName);
          showStartTime = row[1].toString();
          showEndTime = row[2].toString();
          showWhereToWatch = row[3].toString();
        }

        pageHtmlToReturn = '<!doctype html>\n<html lang="en">\n' + 
          '\n<meta charset="utf-8">\n<title>Schedule</title>\n' + 
          '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
          '\n\n<h1>Current Shows</h1>\n' + 
          '<div id="content"><p>' + showName +'</p><ul><li>Start Time: ' + showStartTime + '</li><li>End Time: ' + showEndTime + '</li><li>Where to watch: ' + showWhereToWatch + '</li></ul></div>' + 
          '\n\n'; 
        callback(pageHtmlToReturn);
      }
    });
  }
};


function getNewToken(oauth2Client, callback) {
  debug && console.log('in getNewToken');
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  debug && console.log('in storeToken');
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}


