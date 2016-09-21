// This is my module file
var fs = require ('fs')
var path = require('path')  
       
module.exports = function(dirName, fileExt, callback) 
{
    var ext = '.' + fileExt 

    fs.readdir(dirName, function (err, files) {  
       if (err) return callback(err)
       
       files.forEach(function(file) {  
           if (path.extname(file) === ext) {  
               console.log(file)  
           }  
       })  
     })
}       
