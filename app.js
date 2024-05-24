// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 46737;                // Set a port number at the top so it's easy to change in the future
const path = require('path')

//Database
var db = require('./dataQueries/db-connector')


// Handlebars
var { engine } = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


//use
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


app.get('/', function(req,res) {
    res.render('index');

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

app.post('/addStore', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let storeName = data['input-storeName'];
    if (storeName==='')
    {
        storeName = 'NULL'
    }

    let url = data['input-url'];
    if (url==='')
    {
        url = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Stores (storeName, url) VALUES ("${storeName}", "${url}")`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Stores;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    console.log("redirecting")
                    res.redirect('/stores')
                }
            })
        }
    })
});

app.post('/deleteStore', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `DELETE FROM Stores WHERE storeID = ${data['delete-id']}`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Stores;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    console.log("redirecting")
                    res.redirect('/stores')
                }
            })
        }
    })
});



app.listen(PORT, function(){
    console.log("Listening on port " + PORT + ".")
});