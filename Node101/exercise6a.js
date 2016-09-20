var mymodule = require('./exercise6b.js')

mymodule(process.argv[2], process.argv[3], function (err, data)
         {
    if (err) 
    {
        console.error('something went wrong')
        console.error(err)
    }
})