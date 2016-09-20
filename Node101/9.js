// read 3 urls but handle async because they might come back in different order

var http = require('http')
var bl = require('bl')
var url1 = process.argv[2]
var url2 = process.argv[3]
var url3 = process.argv[4]

var data1 = ""
var data2 = ""
var data3 = ""
var waiting = 3;

http.get(url1, function (response) {  
    response.pipe(bl(function(err, d1){
        if(err) throw err;
        data1 = d1.toString()
        waiting--
        printData()
    }))
}).on('error', console.error)

http.get(url2, function (response) {  
    response.pipe(bl(function(err, d2){
        if(err) throw err;
        data2 = d2.toString()
        waiting--
        printData()
    }))
}).on('error', console.error)

http.get(url3, function (response) {  
    response.pipe(bl(function(err, d3){
        if(err) throw err;
        data3 = d3.toString()
        waiting--
        printData()
    }))
}).on('error', console.error)

function printData()
{
    if(waiting == 0)
        {
            console.log(data1)
            console.log(data2)
            console.log(data3)
            
        }
        
}

    


-------OFFICIAL ANSWER ---------
    var http = require('http')  
     var bl = require('bl')  
     var results = []  
     var count = 0  
       
     function printResults () {  
       for (var i = 0; i < 3; i++)  
         console.log(results[i])  
     }  
       
     function httpGet (index) {  
       http.get(process.argv[2 + index], function (response) {  
         response.pipe(bl(function (err, data) {  
           if (err)  
             return console.error(err)  
       
           results[index] = data.toString()  
           count++  
       
           if (count == 3)  
             printResults()  
         }))  
       })  
     }  
       
     for (var i = 0; i < 3; i++)  
       httpGet(i)  
