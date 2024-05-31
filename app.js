// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 46745;                // Set a port number at the top so it's easy to change in the future
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
    let query1 = "SELECT * FROM Specs;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('specs', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })  

});

app.post('/addSpec', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let specsName = data['input-specsName'];
    if (specsName==='')
    {
        specsName = 'NULL'
    }

    let brandName = data['input-brandName'];
    if (brandName==='')
    {
        brandName = 'NULL'
    }

    let gpu = data['input-gpu'];
    if (gpu==='')
    {
        gpu = 'NULL'
    }

    let cpu = data['input-cpu'];
    if (cpu==='')
    {
        cpu = 'NULL'
    }

    let ram = data['input-ram'];
    if (ram==='')
    {
        ram = 'NULL'
    }

    let internalStorage = data['input-internalStorage'];
    if (internalStorage==='')
    {
        internalStorage = 'NULL'
    }

    let displaySize = data['input-displaySize'];
    if (displaySize==='')
    {
        displaySize = 'NULL'
    }

    let budget = data['input-budget'];
    if (budget==='')
    {
        budget = 'NULL'
    }




    // Create the query and run it on the database
    query1 = `INSERT INTO Specs (specsName, brandName, gpu, cpu, ram, internalStorage, displaySize, budget) 
    VALUES (
        "${specsName}", 
        "${brandName}", 
        "${gpu}", 
        "${cpu}", 
        "${ram}", 
        "${internalStorage}",
        "${displaySize}", 
        "${budget}"
        )`;
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
            query2 = `SELECT * FROM Specs;`;
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
                    res.redirect('/specs')
                }
            })
        }
    })
});


app.post('/deleteSpec', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `DELETE FROM Specs WHERE specsID = ${data['delete-id']}`;
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
            query2 = `SELECT * FROM Specs;`;
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
                    res.redirect('/specs')
                }
            })
        }
    })
});


app.post('/updateSpec', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;



    let updateString = ``;
    let notFirst = false;

    // Capture NULL values

    id = data['update-id'];

    let specsName = data['update-specsName'];
    if (specsName!=='')
    {
        updateString = `specsName = "${specsName}"`;
        notFirst=true;
    }

    let brandName = data['update-brandName'];
    if (brandName!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`brandName = "${brandName}"`;
        notFirst = true;
    }

    let gpu = data['update-gpu'];
    if (gpu!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`gpu = "${gpu}"`;
        notFirst = true;
    }

    let cpu = data['update-cpu'];
    if (cpu!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`cpu = "${cpu}"`;
        notFirst = true;
    }

    let ram = data['update-ram'];
    if (ram!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`ram = "${ram}"`;
        notFirst = true;
    }

    let internalStorage = data['update-internalStorage'];
    if (internalStorage!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`internalStorage = "${internalStorage}"`;
        notFirst = true;
    }

    let displaySize = data['update-displaySize'];
    if (displaySize!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`displaySize = "${displaySize}"`;
        notFirst = true;
    }

    let budget = data['update-budget'];
    if (budget!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`budget = "${budget}"`;
        notFirst = true;
    }

    if (notFirst) {
        // Create the query and run it on the database
        query1 = `UPDATE Specs 
        SET 
            ${updateString}
        WHERE specsID= ${id}`;
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
                query2 = `SELECT * FROM Specs;`;
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
                        res.redirect('/specs')
                    }
                })
            }
        })
    } else {
        res.redirect('/specs')
    }


    
});


app.get('/deals', function(req,res){
    let query1 = "SELECT * FROM Deals;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('deals', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })  

});

app.post('/addDeal', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let laptopID = data['input-laptopID'];
  
    if (laptopID==='')
    {
        laptopID = 'NULL'
    }

    let storeID = data['input-storeID'];
    if (storeID==='')
    {
        storeID = 'NULL'
    }

    let timeStart = data['input-timeStart'];
    if (timeStart==='')
    {
        timeStart = 'NULL'
    }

    let timeEnd = data['input-timeEnd'];
    if (timeEnd==='')
    {
        timeEnd = 'NULL'
    }

    let stock = data['input-stock'];
    if (stock==='')
    {
        stock = 'NULL'
    }

    let price = data['input-price'];
    if (price==='')
    {
        price = 'NULL'
    }

    let url = data['input-url'];
    if (url==='')
    {
        url = 'NULL'
    }




    // Create the query and run it on the database
    query1 = `INSERT INTO Deals (laptopID, storeID, timeStart, timeEnd, stock, price, url) 
    VALUES (
        "${laptopID}", 
        "${storeID}", 
        "${timeStart}", 
        "${timeEnd}", 
        "${stock}", 
        "${price}",
        "${url}"
        )`;
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
            query2 = `SELECT * FROM Deals;`;
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
                    res.redirect('/deals')
                }
            })
        }
    })
});

app.post('/deleteDeal', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `DELETE FROM Deals WHERE dealID = ?`;
    db.pool.query(query1, [data['delete-id']], function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Deals;`;
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
                    res.redirect('/deals')
                }
            })
        }
    })
});

app.post('/updateDeal', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;



    let updateString = ``;
    let notFirst = false;

    // Capture NULL values

    id = data['update-id'];

    let laptopID = data['update-laptopID'];
    if (laptopID!=='')
    {
        updateString = `laptopID = "${laptopID}"`;
        notFirst=true;
    }

    let storeID = data['update-storeID'];
    if (storeID!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`storeID = "${storeID}"`;
        notFirst = true;
    }

    let timeStart = data['update-timeStart'];
    if (timeStart!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`timeStart = "${timeStart}"`;
        notFirst = true;
    }

    let timeEnd = data['update-timeEnd'];
    if (timeEnd!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`timeEnd = "${timeEnd}"`;
        notFirst = true;
    }

    let stock = data['update-stock'];
    if (stock!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`stock = "${stock}"`;
        notFirst = true;
    }

    let price = data['update-price'];
    if (price!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        price+=`price = "${price}"`;
        notFirst = true;
    }

    let url = data['update-url'];
    if (url!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`url = "${url}"`;
        notFirst = true;
    }


    if (notFirst) {
        // Create the query and run it on the database
        query1 = `UPDATE Deals 
        SET 
            ${updateString}
        WHERE dealID= ${id}`;
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
                query2 = `SELECT * FROM Deals;`;
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
                        res.redirect('/deals')
                    }
                })
            }
        })
    } else {
        res.redirect('/deals')
    }


    
});

app.get('/laptops', function(req,res) {
    let query1 = "SELECT * FROM Laptops;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('laptops', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })  

});

app.post('/addLaptop', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let laptopName = data['input-laptopName'];
    if (laptopName==='')
    {
        laptopName = 'NULL'
    }

    let brandName = data['input-brandName'];
    if (brandName==='')
    {
        brandName = 'NULL'
    }

    let gpu = data['input-gpu'];
    if (gpu==='')
    {
        gpu = 'NULL'
    }

    let cpu = data['input-cpu'];
    if (cpu==='')
    {
        cpu = 'NULL'
    }

    let ram = data['input-ram'];
    if (ram==='')
    {
        ram = 'NULL'
    }

    let internalStorage = data['input-internalStorage'];
    if (internalStorage==='')
    {
        internalStorage = 'NULL'
    }

    let displaySize = data['input-displaySize'];
    if (displaySize==='')
    {
        displaySize = 'NULL'
    }




    // Create the query and run it on the database
    query1 = `INSERT INTO Laptops (laptopName, brandName, gpu, cpu, ram, internalStorage, displaySize) 
    VALUES (
        "${laptopName}", 
        "${brandName}", 
        "${gpu}", 
        "${cpu}", 
        "${ram}", 
        "${internalStorage}",
        "${displaySize}"
        )`;
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
            query2 = `SELECT * FROM Laptops;`;
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
                    res.redirect('/laptops')
                }
            })
        }
    })
});


app.post('/deleteLaptop', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `DELETE FROM Laptops WHERE laptopID = ${data['delete-id']}`;
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
            query2 = `SELECT * FROM Laptops;`;
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
                    res.redirect('/laptops')
                }
            })
        }
    })
});


app.post('/updateLaptop', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;



    let updateString = ``;
    let notFirst = false;

    // Capture NULL values

    id = data['update-id'];

    let laptopName = data['update-laptopName'];
    if (laptopName!=='')
    {
        updateString = `laptopName = "${laptopName}"`;
        notFirst=true;
    }

    let brandName = data['update-brandName'];
    if (brandName!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`brandName = "${brandName}"`;
        notFirst = true;
    }

    let gpu = data['update-gpu'];
    if (gpu!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`gpu = "${gpu}"`;
        notFirst = true;
    }

    let cpu = data['update-cpu'];
    if (cpu!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`cpu = "${cpu}"`;
        notFirst = true;
    }

    let ram = data['update-ram'];
    if (ram!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`ram = "${ram}"`;
        notFirst = true;
    }

    let internalStorage = data['update-internalStorage'];
    if (internalStorage!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`internalStorage = "${internalStorage}"`;
        notFirst = true;
    }

    let displaySize = data['update-displaySize'];
    if (displaySize!=='')
    {
        if (notFirst) {
            updateString+=`, `;
        }
        updateString+=`displaySize = "${displaySize}"`;
        notFirst = true;
    }


    if (notFirst) {
        // Create the query and run it on the database
        query1 = `UPDATE Laptops 
        SET 
            ${updateString}
        WHERE laptopID= ${id}`;
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
                query2 = `SELECT * FROM Laptops;`;
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
                        res.redirect('/laptops')
                    }
                })
            }
        })
    } else {
        res.redirect('/laptops')
    }


    
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

app.post('/updateStore', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let updateString = ``;
    let notFirst = false;



    id = data['update-id'];
    
    let storeName = data['update-storeName'];
    if (storeName!=='')
    {
        updateString+= `storeName = "${storeName}"`;
        notFirst = true;
    } 

    let url = data['update-url'];
    if (url!=='')
    {
        if (notFirst) {
            updateString+=', ';
        }
        updateString+=`url = "${url}"`;
    }



    if (notFirst) {

        // Create the query and run it on the database
        query1 = `UPDATE Stores SET ${updateString} WHERE storeID = ${id};`;
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
    } else {
        res.redirect('/stores')
    }
});

app.listen(PORT, function(){
    console.log("Listening on port " + PORT + ".")
});