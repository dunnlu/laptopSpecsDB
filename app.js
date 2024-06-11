// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 46747;                // Set a port number at the top so it's easy to change in the future
const path = require('path')

//Database
var db = require('./dataQueries/db-connector')


// Handlebars
var { engine } = require('express-handlebars');     // Import express-handlebars
const internal = require('stream');
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


//use
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


app.get('/', function(req,res) {
    res.render('index');

});

// ---------------------------- Specs Methods ----------------------------- //

app.get('/specs', function(req, res) {
    let query1 = "SELECT * FROM Specs;";  // Define our query

    db.pool.query(query1, function(error, rows, fields) {
        // Format the budget values
        let specs = rows.map(spec => {
            spec.budget = spec.budget ? spec.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : null;
            return spec;
        });

        res.render('specs', {data: specs});  // Render the specs.hbs file, and also send the renderer
    });
});

app.post('/addSpec', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let specsName = data['input-specsName'] === '' ? null : data['input-specsName'];
    let brandName = data['input-brandName'] === '' ? null : data['input-brandName'];
    let gpu = data['input-gpu'] === '' ? null : data['input-gpu']; 
    let cpu = data['input-cpu'] === '' ? null : data['input-cpu']; 
    let ram = data['input-ram'] === '' ? null : data['input-ram']; 
    let internalStorage = data['input-internalStorage'] === '' ? null : data['input-internalStorage'];
    let displaySize = data['input-displaySize'] === '' ? null : data['input-displaySize'];
    let budget = data['input-budget'] === '' ? null : data['input-budget'];

    query1 = `INSERT INTO Specs (specsName, brandName, gpu, cpu, ram, internalStorage, displaySize, budget) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;


    db.pool.query(query1, [specsName, brandName, gpu, cpu, ram, internalStorage, displaySize, budget], function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {

            query2 = `SELECT * FROM Specs;`;
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
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

    // Capture NULL values
    let specsName = data['update-specsName'] === '' ? null : data['update-specsName'];
    let brandName = data['update-brandName'] === '' ? null : data['update-brandName'];
    let gpu = data['update-gpu'] === '' ? null : data['update-gpu'];
    let cpu = data['update-cpu'] === '' ? null : data['update-cpu'];
    let ram = data['update-ram'] === '' ? null : data['update-ram'];
    let internalStorage = data['update-internalStorage'] === '' ? null : data['update-internalStorage'];
    let displaySize = data['update-displaySize'] === '' ? null : data['update-displaySize'];
    let budget = data['update-budget'] === '' ? null : data['update-budget'];

    let updateFields = [];
    let updateValues = [];

    if (specsName !== null) {
        updateFields.push(`specsName = ?`);
        updateValues.push(specsName);
    }
    if (brandName !== null) {
        updateFields.push(`brandName = ?`);
        updateValues.push(brandName);
    }
    if (gpu !== null) {
        updateFields.push(`gpu = ?`);
        updateValues.push(gpu);
    }
    if (cpu !== null) {
        updateFields.push(`cpu = ?`);
        updateValues.push(cpu);
    }
    if (ram !== null) {
        updateFields.push(`ram = ?`);
        updateValues.push(ram);
    }
    if (internalStorage !== null) {
        updateFields.push(`internalStorage = ?`);
        updateValues.push(internalStorage);
    }
    if (displaySize !== null) {
        updateFields.push(`displaySize = ?`);
        updateValues.push(displaySize);
    }
    if (budget !== null) {
        updateFields.push(`budget = ?`);
        updateValues.push(budget);
    }

    if (updateFields.length > 0) {
        updateValues.push(data['update-id']); // Add id to the end of the array for the WHERE clause

        // Create the query and run it on the database
        let query1 = `UPDATE Specs SET ${updateFields.join(', ')} WHERE specsID = ?`;
        db.pool.query(query1, updateValues, function(error, rows, fields) {
            // Check to see if there was an error
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                // If there was no error, perform a SELECT * on Specs
                let query2 = `SELECT * FROM Specs;`;
                db.pool.query(query2, function(error, rows, fields) {
                    // If there was an error on the second query, send a 400
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        // If all went well, send the results of the query back.
                        console.log("redirecting");
                        res.redirect('/specs');
                    }
                });
            }
        });
    } else {
        res.redirect('/specs');
    }
});

// ---------------------------- Deals Methods ----------------------------- //

app.get('/deals', function(req, res) {
    let query1 = 
        `SELECT 
            Deals.dealID, 
            Deals.laptopID, 
            Deals.storeID, 
            DATE_FORMAT(Deals.timeStart, '%Y-%m-%d') AS timeStart, 
            DATE_FORMAT(Deals.timeEnd, '%Y-%m-%d') AS timeEnd, 
            Deals.stock, 
            Deals.price, 
            Deals.url,
            Laptops.laptopName,
            Stores.storeName
        FROM 
            Deals
        JOIN 
            Laptops ON Deals.laptopID = Laptops.laptopID
        LEFT JOIN 
            Stores ON Deals.storeID = Stores.storeID
        ORDER BY 
            Deals.dealID;`;
    let query2 = "SELECT * FROM Laptops;";
    let query3 = "SELECT * FROM Stores;";

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            res.status(500).send(error);
            return;
        }
        // let deals = rows;
        let deals = rows.map(deal => {
            deal.price = deal.price ? deal.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : null;
            return deal;
        });

        db.pool.query(query2, function(error, rows, fields) {
            if (error) {
                res.status(500).send(error);
                return;
            }
            let laptops = rows;

            db.pool.query(query3, function(error, rows, fields) {
                if (error) {
                    res.status(500).send(error);
                    return;
                }
                let stores = rows;
                // Render the index.hbs file, and also send the renderer
                res.render('deals', {data: deals, laptops: laptops, stores: stores});  
            });
        });
    });
});

app.post('/addDeal', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let laptopID = data['input-laptopID']; // drop down

    let storeID = data['input-storeID']; // drop down
    if (storeID === '')
    {
        storeID = null;
    }
    
    let timeStart = data['input-timeStart'];
    if (timeStart === '')
    {
        timeStart = null;
    }

    let timeEnd = data['input-timeEnd'];
    if (timeEnd === '')
    {
        timeEnd = null;
    }

    let stock = data['input-stock']; // drop down
    if (stock === '')
    {
        stock = null;
    }

    let price = data['input-price'];
    if (price === '')
    {
        price = null;
    }

    let url = data['input-url'];
    if (url === '')
    {
        url = null;
    } 

    // Create the query and run it on the database
    let query1 = `INSERT INTO Deals (laptopID, storeID, timeStart, timeEnd, stock, price, url) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.pool.query(query1, [laptopID, storeID, timeStart, timeEnd, stock, price, url], function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // If there was no error, perform a SELECT * on Deals
            let query2 = `SELECT * FROM Deals;`;
            db.pool.query(query2, function(error, rows, fields){
                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // If all went well, redirect to /deals
                    console.log("redirecting");
                    res.redirect('/deals');
                }
            });
        }
    });
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
    if (laptopID !== '')
    {
        updateString = `laptopID = "${laptopID}"`;
        notFirst = true;
    }

    let storeID = data['update-storeID'];
    if (storeID === '') {
        storeID = 'NULL';
    } else {
        storeID = `"${storeID}"`;
    }
    if (notFirst) {
        updateString += `, `;
    }
    updateString += `storeID = ${storeID}`;
    notFirst = true;

    let timeStart = data['update-timeStart'];
    if (timeStart !== '')
    {
        if (notFirst) {
            updateString += `, `;
        }
        updateString += `timeStart = "${timeStart}"`;
        notFirst = true;
    }

    let timeEnd = data['update-timeEnd'];
    if (timeEnd !== '')
    {
        if (notFirst) {
            updateString += `, `;
        }
        updateString += `timeEnd = "${timeEnd}"`;
        notFirst = true;
    }

    let stock = data['update-stock'];
    if (stock !== '')
    {
        if (notFirst) {
            updateString += `, `;
        }
        updateString += `stock = "${stock}"`;
        notFirst = true;
    }

    let price = data['update-price'];
    if (price !== '')
    {
        if (notFirst) {
            updateString += `, `;
        }
        updateString += `price = "${price}"`;
        notFirst = true;
    }

    let url = data['update-url'];
    if (url !== '')
    {
        if (notFirst) {
            updateString += `, `;
        }
        updateString += `url = "${url}"`;
        notFirst = true;
    }

    if (notFirst) {
        // Create the query and run it on the database
        query1 = `UPDATE Deals 
        SET 
            ${updateString}
        WHERE dealID= ${id}`;
        db.pool.query(query1, function(error, rows, fields) {

            // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Deals
                query2 = `SELECT * FROM Deals;`;
                db.pool.query(query2, function(error, rows, fields) {

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

// --------------------------- Laptops Methods ---------------------------- //

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
        laptopName = null
    }

    let brandName = data['input-brandName'];
    if (brandName==='')
    {
        brandName = null
    }

    let gpu = data['input-gpu']; // drop down
    if (gpu==='')
    {
        gpu = null
    }

    let cpu = data['input-cpu']; // drop down
    if (cpu==='')
    {
        cpu = null
    }

    let ram = data['input-ram']; // drop down
    if (ram==='')
    {
        ram = null
    }

    let internalStorage = data['input-internalStorage']; // drop down
    if (internalStorage==='')
    {
        internalStorage = null
    }

    let displaySize = data['input-displaySize']; // drop down
    if (displaySize==='')
    {
        displaySize = null
    }




    // Create the query and run it on the database
    query1 = `INSERT INTO Laptops (laptopName, brandName, gpu, cpu, ram, internalStorage, displaySize) 
    VALUES ( ?, ?, ?, ?, ?, ?, ?)`;
    db.pool.query(query1, [laptopName,brandName,gpu,cpu,ram,internalStorage,displaySize],function(error, rows, fields){

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

// ---------------------------- Results Methods ----------------------------- //

app.get('/results', function(req, res) {
    let query1 = `
        SELECT 
            Results.specsID, 
            Specs.specsName, 
            Results.dealID, 
            Deals.price, 
            Laptops.laptopName,
            Deals.url,
            Stores.storeName
        FROM 
            Results
        INNER JOIN Specs ON Results.specsID = Specs.specsID
        INNER JOIN Deals ON Results.dealID = Deals.dealID
        INNER JOIN Laptops ON Deals.laptopID = Laptops.laptopID
        INNER JOIN Stores ON Deals.storeID = Stores.storeID;`;
    let query2 = "SELECT specsID, specsName FROM Specs;";
    let query3 = `
        SELECT Deals.dealID, Deals.price, Laptops.laptopName 
        FROM Deals 
        JOIN Laptops ON Deals.laptopID = Laptops.laptopID;`;

    db.pool.query(query1, function(error, results, fields) {
        if (error) {
            res.status(500).send(error);
            return;
        }
        // price formatting
        results = results.map(result => {
            result.price = result.price ? result.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : null;
            return result;
        });

        db.pool.query(query2, function(error, specs, fields) {
            if (error) {
                res.status(500).send(error);
                return;
            }

            db.pool.query(query3, function(error, deals, fields) {
                if (error) {
                    res.status(500).send(error);
                    return;
                }
                // price formatting
                deals = deals.map(deal => {
                    deal.price = deal.price ? deal.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : null;
                    return deal;
                });

                res.render('results', {data: results, specs: specs, deals: deals});
            });
        });
    });
});

app.post('/auto-associate', function(req, res) {
    let updateResultsQuery = 
        `INSERT IGNORE INTO Results (specsID, dealID)
        SELECT DISTINCT 
            Specs.specsID, 
            Deals.dealID 
        FROM Specs
        INNER JOIN Laptops ON (
            (Specs.brandName IS NULL OR Laptops.brandName LIKE CONCAT('%', LOWER(Specs.brandName), '%'))
            AND (Specs.gpu IS NULL OR Laptops.gpu LIKE CONCAT('%', LOWER(Specs.gpu), '%'))
            AND (Specs.cpu IS NULL OR Laptops.cpu LIKE CONCAT('%', LOWER(Specs.cpu), '%'))
            AND (Specs.ram IS NULL OR Specs.ram = 0 OR Laptops.ram >= Specs.ram)
            AND (Specs.internalStorage IS NULL OR Specs.internalStorage = 0 OR Laptops.internalStorage >= Specs.internalStorage)
            AND (Specs.displaySize IS NULL OR Specs.displaySize = 0 OR Laptops.displaySize >= Specs.displaySize)
        )
        INNER JOIN Deals ON Laptops.laptopID = Deals.laptopID
        WHERE (Specs.budget IS NULL or Specs.budget = 0.00 OR Deals.price IS NULL OR Specs.budget >= Deals.price);`;

    db.pool.query(updateResultsQuery, function(error, updateResult, fields) {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.redirect('/results');
        // res.render('results', {data: results, specs: specs, deals: deals});
    });
});

app.post('/clear-table', function(req, res) {
    let disableForeignKeyChecks = `SET FOREIGN_KEY_CHECKS=0;`;
    let enableForeignKeyChecks = `SET FOREIGN_KEY_CHECKS=1;`;
    let dropTableQuery = `DROP TABLE IF EXISTS Results;`;
    let createTableQuery = `
        CREATE TABLE Results (
            specsID int(11) NOT NULL,
            dealID int(11) NOT NULL,
            PRIMARY KEY (specsID, dealID),
            KEY dealID (dealID),
            CONSTRAINT Results_ibfk_1 FOREIGN KEY (specsID) REFERENCES Specs (specsID) ON DELETE CASCADE,
            CONSTRAINT Results_ibfk_2 FOREIGN KEY (dealID) REFERENCES Deals (dealID) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;`;
        
    db.pool.query(disableForeignKeyChecks, function(error, result, fields) {
        if (error) {
            res.status(500).send(error);
            return;
        }

        db.pool.query(dropTableQuery, function(error, dropResult, fields) {
            if (error) {
                res.status(500).send(error);
                return;
            }

            db.pool.query(createTableQuery, function(error, createResult, fields) {
                if (error) {
                    res.status(500).send(error);
                    return;
                }
                res.redirect('/results');
                // res.render('results', {data: results, specs: specs, deals: deals});
            });
        });
    });
});

app.post('/deleteResult', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `DELETE FROM Results WHERE specsID = ${data['delete-specID']} AND dealID = ${data['delete-dealID']}`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Results
            query2 = `SELECT * FROM Results;`;
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
                    res.redirect('/results')
                }
            })
        }
    })
});

app.post('/addResult', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Results (specsID, dealID) VALUES ("${data.specsID}", "${data.dealID}")`;
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
            query2 = `SELECT * FROM Results;`;
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
                    res.redirect('/results')
                }
            })
        }
    })
});

app.post('/updateResult', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = 
    `UPDATE Results 
        SET specsID = "${data.specsID}", dealID = "${data.dealID}" 
        WHERE specsID = "${data.originalSpecsID}" AND dealID = "${data.originalDealID}";`;

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
            query2 = `SELECT * FROM Results;`;
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
                    res.redirect('/results')
                }
            })
        }
    })
    res.redirect('/results')
});

// ---------------------------- Stores Methods ---------------------------- //

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
        storeName = null
    }

    let url = data['input-url'];
    if (url==='')
    {
        url = null
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Stores (storeName, url) VALUES (?, ?)`;
    db.pool.query(query1, [storeName, url],function(error, rows, fields){

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