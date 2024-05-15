// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 56294;                 // Set a port number at the top so it's easy to change in the future
const path = require('path')


app.get('/', function(req,res) {
    console.log("Requested URL: ",req.url);
    res.sendFile(path.join(__dirname, 'htmlFiles/index.html'));

});


app.get('/wishlists', function(req,res) {
    console.log("Requested URL: ",req.url);
    res.sendFile(path.join(__dirname, 'htmlFiles/wishlists.html'));

});

app.get('/deals', function(req,res){
    console.log("Requested URL: ",req.url);
    res.sendFile(path.join(__dirname, 'htmlFiles/deals.html'));
    
});

app.get('/laptops', function(req,res) {
    console.log("Requested URL: ",req.url);
    res.sendFile(path.join(__dirname, 'htmlFiles/laptops.html'));

});

app.get('/laptops', function(req,res) {
    console.log("Requested URL: ",req.url);
    res.sendFile(path.join(__dirname, 'htmlFiles/results.html'));

});

app.get('/laptops', function(req,res) {
    console.log("Requested URL: ",req.url);
    res.sendFile(path.join(__dirname, 'htmlFiles/stores.html'));

});


app.listen(PORT, function(){
    console.log("Listening on port " + PORT + ".")
});