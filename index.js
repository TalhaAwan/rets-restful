var request = require("request").defaults({jar: true});
var parseString = require('xml2js').parseString;
var config = require('./config.json');
var loginURL = config.loginURL;
var queryURL = config.queryURL+"?SearchType=Property&Class=RES&QueryType=DMQL2&Query=(ListingStatus=|1),(LastModifiedDate=2016-10-01T00:00:00-2016-10-02T00:00:00)&Format=COMPACT-DECODED&StandardNames=0&Limit=50&Count=1&offset=1";
var options = {
    "auth": {
        "user": config.username,
        "pass": config.password,
        "sendImmediately": false
    },
    "headers": {
        "User-Agent": "request"
    }
}
request.get(loginURL, options, function(err){
    if(err) {
        console.log(err);
    }
    else{
        request.get(queryURL, options, function(err, res , body){
            if(err) {
                console.log(err);
            }
            else{
                parseString(body, function (err, result) {
                    console.log(processRecords(result));
                });
            }
        });
    }
});


function processRecords(data){
    var retsResult = data.RETS;
    var fields, rows = [], objs = [], result = {};
    fields = retsResult.COLUMNS[0].split(/\t/) // split on tab and get column/field names
    if(retsResult.DATA && retsResult.DATA.length){
        retsResult.DATA.forEach(function(d, i){ // split on tab each DATA row and push in rows
            rows.push(d.split(/\t/))
        })
        rows.forEach(function(){ // equal to no. of rows, push empty objects
            objs.push({})
        })
        fields.forEach(function(field, i){ // insert field and its value for each row in its object
            if(field){
                rows.forEach(function(row, index){
                    objs[index][field] = rows[index][i];
                })
            }
        })
    }
    result.records = objs;
    result.count = (retsResult.COUNT && retsResult.COUNT[0].$.Records)? retsResult.COUNT[0].$.Records : undefined;
    return result;
}
