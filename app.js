// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 46737;                // Set a port number at the top so it's easy to change in the future
const path = require('path')

//Database
var db = require('./dataQueries/db-connector')


// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


app.get('/', function(req,res) {
    console.log("Requested URL: ",req.url);
    res.sendFile(path.join(__dirname, 'htmlFiles/index.html'));

});


app.get('/specs', function(req,res) {
    console.log("Requested URL: ",req.url);
    res.sendFile(path.join(__dirname, 'htmlFiles/specs.html'));

});

app.get('/deals', function(req,res){
    console.log("Requested URL: ",req.url);
    res.sendFile(path.join(__dirname, 'htmlFiles/deals.html'));
    
});

app.get('/laptops', function(req,res) {
    console.log("Requested URL: ",req.url);
    res.sendFile(path.join(__dirname, 'htmlFiles/laptops.html'));

});

app.get('/results', function(req,res) {
    console.log("Requested URL: ",req.url);
    res.sendFile(path.join(__dirname, 'htmlFiles/results.html'));

});

app.get('/stores', function(req,res) {
    let query1 = "SELECT * FROM Stores;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('stores', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })  
});


app.listen(PORT, function(){
    console.log("Listening on port " + PORT + ".")
});