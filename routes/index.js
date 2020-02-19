var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'iSecurity' });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    let data = {"cameraCode":req.body.cameraCode,"ssid":req.body.ssid,"pass":req.body.pass}
    saveCreds(data, function(err) {
        if (err) {
            res.status(404).send('Failed to collect your data, please refresh!');
            return;
        }
        else{
        res.send('Successful in collecting your data!');
        var spawn = require("child_process").spawn;   
        // Parameters passed in spawn - 
        // 1. type_of_script 
        // 2. list containing Path of the script 
        //    and arguments for the script  
          
        // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
        // so, first name = Mike and last name = Will 
        var process = spawn('python',["./readFile.py", 
                                req.query.firstname, 
                                req.query.lastname] ); 
      
        // Takes stdout data from script which executed 
        // with arguments and send this data to res object 
        process.stdout.on('data', function(data) { 
            res.send(data.toString()); 
        } ) 
        }
    });
});

function saveCreds(file, callback) {
    fs.writeFile('./creds.json', JSON.stringify(file), {flag:'w'},callback);
}

module.exports = router;