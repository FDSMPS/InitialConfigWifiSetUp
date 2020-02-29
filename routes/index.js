/*
 To grab the data and save the WiFi credentials

 @author Dorsa Nahid
 @date 2020-1-31
 Project: ECE 492 Group 1
*/
var express = require('express');
var router = express.Router();
var fs = require('fs');
let {PythonShell} = require('python-shell');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'iSecurity' });
});

router.post('/', function(req, res, next) {
    let data = {"cameraCode":req.body.cameraCode,"ssid":req.body.ssid,"pass":req.body.pass}
    saveCreds(data, function(err) {
        if (err) {
            res.status(404).send('Failed to collect your data, please refresh!');
            return;
        }

        PythonShell.run('/home/pi/InitialConfigWifiSetUp/readFile.py', null,function (err) {
            if(err){
                res.send(err);
            }else{
                res.send("Successful in collecting your data!");
            }
        });
    });
});
/*
Saves the creds to a json file
 */
function saveCreds(file, callback) {
    fs.writeFile('./creds.json', JSON.stringify(file), {flag:'w'},callback);
}

module.exports = router;