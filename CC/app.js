var gdocs = require('./gdocs.js');
var debug = 0;
var fs = require('fs');
var http = require('http'); 

http.createServer(function(req, res) { 
  waiting = 1;
  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }

    res.writeHead(200, {
    'Content-Type': 'text/html'
    });

    getWebPageBody(res, content, function(pageHtml) {  
      res.write(pageHtml);
      res.end();
    });

  });
}).listen(8888, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8888');


function getWebPageBody(res, content, callback) {
    gdocs.authorize(JSON.parse(content), function (auth) {
      gdocs.getShowName(auth, function(html){
        callback(html); // invoke callback    
      });
    });
};