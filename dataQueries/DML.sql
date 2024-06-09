-- ----------------------------------------------------------------------------
-- Data Manipulation Queries
-- ----------------------------------------------------------------------------
--
-- Authors:  	Team 136 - Lucas Dunn & Christian Ritchie
-- Date:	  	2024-06-10
-- Project:  	LaptopSpecsDB
-- Phase:	  	Step 6 - Final
--
-- ----------------------------------------------------------------------------
-- --- Spec wishlist queries
-- ----------------------------------------------------------------------------

-- get all spec wishlist spec IDs, names, and information to populate main page
SELECT * FROM Specs

-- add a new spec wishlist
INSERT INTO Specs (specsName, brandName, gpu, cpu, ram, internalStorage, displaySize, budget) 
VALUES (
	:specsNameInput, 
	:brandNameInput, 
	:gpuInput, 
	:cpuInput, 
	:ramInput, 
	:internalStorageInput,
	:displaySizeInput, 
	:budgetInput
	)

-- delete a spec wishlist
DELETE FROM Specs WHERE specsID = :spec_ID_selected_from_spec_list

-- update a spec wishlist
UPDATE Specs 
SET 
	specsName = :specsNameInput,
	brandName= :brandNameInput,
	gpu = :gpuInput,
	cpu = :cpuInput,
	ram = :ramInput,
	internalStorage = :internalStorageInput,
	displaySize = :displaySizeInput,
	budget = :budgetInput
WHERE specsID= :specsID_from_update_form

-- ----------------------------------------------------------------------------
-- --- Laptop queries
-- ----------------------------------------------------------------------------

-- add a new laptop
INSERT INTO Laptops (laptopName, brandName, gpu, cpu, ram, internalStorage, displaySize) 
VALUES (
	:laptopNameInput, 
	:brandNameInput, 
	:gpuInput, 
	:cpuInput, 
	:ramInput, 
	:internalStorageInput, 
	:displaySizeInput
	)

-- remove a laptop
DELETE FROM Laptops WHERE laptopID = :laptop_ID_selected_from_laptop_list

-- update a laptop
UPDATE Laptops 
SET 
	laptopName = :laptopNameInput, 
	brandName = :brandNameInput, 
	gpu = :gpuInput, 
	cpu = :cpuInput, 
	ram = :ramInput, 
	internalStorage = :internalStorageInput, 
	displaySize = :displaySizeInput 
WHERE 
	laptopID = :laptopID_from_the_update_form

-- ----------------------------------------------------------------------------
-- --- Deal queries (M-to-M associations facilitated by 'Results' table)
-- ----------------------------------------------------------------------------

-- add a deal
INSERT INTO Deals (laptopID, storeID, timeStart, timeEnd, stock, price, url)
VALUES (
    (SELECT laptopID FROM Laptops WHERE laptopName = :laptopNameInput),
    (SELECT storeID FROM Stores WHERE storeName = :storeNameInput),
    :timeStart,
    :timeEnd,
    :stock,
    :price,
    :url
)

-- retrieve deals associated with a wishlist to display on a wishlist's page
SELECT * FROM Deals WHERE dealID = (
	SELECT dealID FROM Results WHERE specsID = :SpecsIDInput
	) 
	AND (timeEnd > NOW() OR timeEnd IS NULL)


-- -- Deals queries -- selective association and dis-association (M-to-M)


-- populate 'results' intersection table with deals given a specific deal
-- LIKE concat(); https://www.tutorialspoint.com/can-we-use-like-concat-in-a-mysql-query
INSERT INTO Results (specsID, dealID)
SELECT Specs.specsID, Deals.dealID FROM Specs
INNER JOIN Laptops ON (
    (Specs.brandName IS NULL OR Laptops.brandName LIKE CONCAT('%', Specs.brandName, '%'))
    AND (Specs.gpu IS NULL OR Laptops.gpu LIKE CONCAT('%', Specs.gpu, '%'))
    AND (Specs.cpu IS NULL OR Laptops.cpu LIKE CONCAT('%', Specs.cpu, '%'))
    AND (Specs.ram IS NULL OR Laptops.ram >= Specs.ram)
    AND (Specs.internalStorage IS NULL OR Laptops.internalStorage >= Specs.internalStorage)
    AND (Specs.displaySize IS NULL OR Laptops.displaySize = Specs.displaySize)
	)
INNER JOIN Deals ON Laptops.laptopID = Deals.laptopID
WHERE Specs.specsID = :specID
	AND (Deals.price IS NULL OR Specs.budget >= Deals.price)

-- remove expired deals from results (should occur before displaying deals)
-- NOW() function	https://www.w3schools.com/sql/func_mysql_now.asp
DELETE FROM Results WHERE dealID IN (
    SELECT dealID FROM Deals WHERE timeEnd IS NOT NULL 
		AND timeEnd < NOW()
	)

-- update a deal to NULLify a Store Relationship
UPDATE Deals SET storeID = NULL WHERE dealID = :storeIDInput;


-- -- Results queries -- manutal association and dis-association (M-to-M)


-- associate a spec wishlist with a deal (M-to-M association)
INSERT INTO Results (specsID, dealID) VALUES (:specsID, :dealID)

-- dis-associate a spec wishlist from a deal (M-to-M dis-association)
DELETE FROM Results WHERE specsID = :specsID AND dealID = :dealID

-- ----------------------------------------------------------------------------
-- -- Store queries
-- ----------------------------------------------------------------------------

-- retrieve all stores
SELECT * FROM Stores

-- add store
INSERT INTO Stores (storeName, url) VALUES (:storeNameInput, :urlInput)

-- delete store
DELETE FROM Stores WHERE storeID = :storeID

-- ----------------------------------------------------------------------------
-- -- potentially useful unused queries and subqueries
-- ----------------------------------------------------------------------------

-- populate 'results' intersection table; associating all spec wishlists with
-- laptops with attributes that have a partial match to each specs attribute.
INSERT INTO Results (specsID, laptopID)
SELECT Specs.specsID, Laptops.laptopID FROM Specs
INNER JOIN Laptops ON (
    (Specs.brandName IS NULL OR Laptops.brandName LIKE CONCAT('%', Specs.brandName, '%'))
    AND (Specs.gpu IS NULL OR Laptops.gpu LIKE CONCAT('%', Specs.gpu, '%'))
    AND (Specs.cpu IS NULL OR Laptops.cpu LIKE CONCAT('%', Specs.cpu, '%'))
    AND (Specs.ram IS NULL OR Laptops.ram >= Specs.ram)
    AND (Specs.internalStorage IS NULL OR Laptops.internalStorage >= Specs.internalStorage)
    AND (Specs.displaySize IS NULL OR Laptops.displaySize = Specs.displaySize)
)

-- get laptopIDs correlated with a spec from the Results intersection table
SELECT Laptops.laptopID
FROM Specs
INNER JOIN Laptops ON (
    (Specs.brandName IS NULL OR Laptops.brandName LIKE CONCAT('%', Specs.brandName, '%'))
    AND (Specs.gpu IS NULL OR Laptops.gpu LIKE CONCAT('%', Specs.gpu, '%'))
    AND (Specs.cpu IS NULL OR Laptops.cpu LIKE CONCAT('%', Specs.cpu, '%'))
    AND (Specs.ram IS NULL OR Laptops.ram >= Specs.ram)
    AND (Specs.internalStorage IS NULL OR Laptops.internalStorage >= Specs.internalStorage)
    AND (Specs.displaySize IS NULL OR Laptops.displaySize = Specs.displaySize)
)
WHERE Specs.specsID = :specID

-- get deals associated with a laptopID
SELECT *
FROM Deals
WHERE laptopID = :laptopIDInput
	AND (Deals.price IS NULL OR Specs.budget >= Deals.price)

