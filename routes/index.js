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
        res.send('Successful in collecting your data!');
    });
});

function saveCreds(file, callback) {
    fs.writeFile('./creds.json', JSON.stringify(file), {flag:'w'},callback);
}

module.exports = router;