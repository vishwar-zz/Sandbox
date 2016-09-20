// Using bl package to read all the data from get request

var http = require('http')
var bl = require('bl')

var dataFromServer = ""
var chars = ""

/*http.get(process.argv[2], function (response) {  
    response.setEncoding('utf8')  
    response.on('data', function(data) {
      dataFromServer += data  
    })  
    response.on('error', console.error)  
    
    response.on('end', function(){
        console.log(dataFromServer.length)
        console.log(dataFromServer)
    })
}).on('error', console.error)*/

http.get(process.argv[2], function (response) {  
    response.pipe(bl(function(err, data){
        if(err) throw err;
        console.log(data.toString().length)
        console.log(data.toString())
    }))
}).on('error', console.error)     
