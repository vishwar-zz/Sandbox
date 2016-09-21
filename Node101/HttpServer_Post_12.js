// HTTP file server

var http = require('http') 

var server = http.createServer(function (req, res) { 
	if(req.method != 'GET')
		return res.end('send me a GET request \n')
    
    // If path is /api/parsetime do x
    var obj = url.parse(req.url, true)
    if(obj.url) == '/api/parsetime'){
		console.log(obj.query)
    }	
    else if (obj.url == '/api/unixtime') {
    	console.log(obj.query)
    }

})  
       
server.listen(Number(process.argv[2]))  