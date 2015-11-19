var ZSchema = require("z-schema");
var express = require('express');
var app = express();
var fs = require('fs');
var lead = null;
var schema = null;

app.configure(function(){
    app.use(express.json());
    app.use(express.urlencoded());

    app.use(express.methodOverride());
    app.use(express.multipart());
});

var validator = new ZSchema({ sync: true });

app.post('/', function(req, res) {

    console.log('body:' , req.body);

    //lead = JSON.parse(fs.readFileSync(req.files.lead.path, 'utf8'));
    lead = req.body.lead;

    //schema = JSON.parse(fs.readFileSync(req.files.schema.path, 'utf8'));
    schema = req.body.schema;

    console.log('lead: ' , lead);
    console.log('schema: ' , schema);

    var valid = validator.validate(lead, schema);
    if (!valid) {
        var error = validator.getLastError();
        res.send({status:'failed', error:error});
        console.log('error: ', error);
    }else{
        console.log('Complete: 0 Errors');
        res.send({status:'Passed'});
    }

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

//app.listen(3000);
console.log('Listening on port '+port+'...');
