const { ejson } = require("ejs");
const express = require("express");
const app = express();
const path = require('path')
const fs = require("fs");
const http = require("http")
const bodyParser = require("body-parser")
const { urlencoded } = require("express");
const port = process.env.PORT || 3000;

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/javascript', express.static(__dirname + '/static/javascript'));
app.use(express.urlencoded());
app.use(express.json()); 

app.set('view engine', 'ejs') // Set the template engine as ejs
app.set('views', path.join(__dirname, 'views')) // Set the views directory
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
// ENDPOINTS
app.get('/', function(req, res) {
    res.sendFile( __dirname + "/views/index.html" ); 
});
app.engine('html', require('ejs').renderFile);
// START THE SERVER
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
