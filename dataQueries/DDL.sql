-- ----------------------------------------------------------------------------
-- Data Definition Queries
-- ----------------------------------------------------------------------------
--
-- Authors:  		Team 136 - Lucas Dunn & Christian Ritchie
-- Date:	  		2024-06-10
-- Project:  		LaptopSpecsDB
-- Phase:	  		Step 6 - Final
--
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- MariaDB dump 10.19  Distrib 10.5.22-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_ritchchr
-- ------------------------------------------------------
-- Server version	10.6.17-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Deals`
--

DROP TABLE IF EXISTS `Deals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Deals` (
  `dealID` int(11) NOT NULL AUTO_INCREMENT,
  `laptopID` int(11) DEFAULT NULL,
  `storeID` int(11) DEFAULT NULL,
  `timeStart` date DEFAULT NULL,
  `timeEnd` date DEFAULT NULL,
  `stock` varchar(8) DEFAULT NULL,
  `price` decimal(19,2) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`dealID`),
  KEY `laptopID` (`laptopID`),
  KEY `storeID` (`storeID`),
  CONSTRAINT `Deals_ibfk_1` FOREIGN KEY (`laptopID`) REFERENCES `Laptops` (`laptopID`),
  CONSTRAINT `Deals_ibfk_2` FOREIGN KEY (`storeID`) REFERENCES `Stores` (`storeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Deals`
--

LOCK TABLES `Deals` WRITE;
/*!40000 ALTER TABLE `Deals` DISABLE KEYS */;

INSERT INTO `Deals` VALUES 
(1,15,1,'2024-04-30','2024-07-30','high',2759.00,'https://www.hp.com/us-en/shop/mdp/hp-zbook-power-15-mobile-workstation'),
(2,3,2,'2024-04-30',NULL,'low',1299.00,'https://www.qvc.com/msi-thin-gf63-156-144hz-gaming-laptop-i7-rtx40-60-16gb-512gb.product.E318491.html'),
(3,18,2,'2024-04-30','2024-08-15','low',1999.98,'https://www.omen.com/us/en/laptops/2019-omen-15/specifications.html'),
(4,8,3,'2024-05-16',NULL,NULL,1849.99,'https://www.newegg.com/blue-msi-ge-series-ge76-raider-11ue-046-gaming/p/2WC-000C-0DDJ4?Item=9SIADG3J7R0690&cm_sp=SP-_-1798083-_-0-_-2-_-9SIADG3J7R0690-_-MSI%20Nvidia%20GeForce-_-msi-_-2'),
(5,11,4,'2024-05-01',NULL,'medium',2200.00,'https://www.bestbuy.com/site/lenovo-thinkpad-x1-carbon/'),
(6,7,5,'2024-05-02','2024-08-31','high',3500.00,'https://www.amazon.com/macbook-pro/'),
(7,19,6,'2024-05-03',NULL,'low',1800.00,'https://www.bhphotovideo.com/c/dell-xps-15'),
(8,10,7,'2024-05-04',NULL,'medium',1400.00,'https://www.walmart.com/ip/hp-spectre-x360/'),
(9,14,8,'2024-05-05',NULL,'high',1500.00,'https://www.target.com/p/microsoft-surface-laptop-4/'),
(10,1,9,'2024-05-06',NULL,'low',1200.00,'https://www.costco.com/acer-aspire-7.html'),
(11,20,10,'2024-05-07',NULL,'medium',1300.00,'https://www.microcenter.com/lenovo-legion-5'),
(12,2,1,'2024-05-08','2024-07-20','high',2500.00,'https://www.hp.com/us-en/shop/razer-blade-15'),
(13,12,2,'2024-05-09',NULL,'low',900.00,'https://www.qvc.com/acer-swift-3/'),
(14,4,3,'2024-05-10',NULL,'medium',800.00,'https://www.newegg.com/asus-vivobook-s15/'),
(15,16,4,'2024-05-11',NULL,'high',700.00,'https://www.bestbuy.com/site/hp-pavilion-15/'),
(16,9,5,'2024-05-12','2024-09-01','low',1100.00,'https://www.amazon.com/hp-envy-13/'),
(17,6,6,'2024-05-13',NULL,'medium',650.00,'https://www.bhphotovideo.com/c/dell-inspiron-15'),
(18,13,7,'2024-05-14',NULL,'high',1400.00,'https://www.walmart.com/ip/lenovo-yoga-c940/'),
(19,17,8,'2024-05-15',NULL,'low',1600.00,'https://www.target.com/p/lg-gram-17/'),
(20,5,9,'2024-05-16','2024-10-05','medium',900.00,'https://www.costco.com/hp-probook-450.html');

/*!40000 ALTER TABLE `Deals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Laptops`
--

DROP TABLE IF EXISTS `Laptops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Laptops` (
  `laptopID` int(11) NOT NULL AUTO_INCREMENT,
  `laptopName` varchar(50) DEFAULT NULL,
  `brandName` varchar(50) DEFAULT NULL,
  `gpu` varchar(50) DEFAULT NULL,
  `cpu` varchar(50) DEFAULT NULL,
  `ram` int(11) DEFAULT NULL,
  `internalStorage` int(11) DEFAULT NULL,
  `displaySize` int(11) DEFAULT NULL,
  PRIMARY KEY (`laptopID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Laptops`
--

LOCK TABLES `Laptops` WRITE;
/*!40000 ALTER TABLE `Laptops` DISABLE KEYS */;
INSERT INTO `Laptops` VALUES 
  (1,'Zbook','HP','Nvidia RTX 2000','Intel i7 5.2 GHz',64,2,16),
  (2,'Thin GF63','MSI','NVIDIA GeForce GTX 1650 ','Intel i7 4.7 GHz',16,512,16),
  (3,'Omen','HP','NVIDIA GeForce RTX 2060','Intel i7 5 GHz',16,512,17),
  (4,'GE76 Raider','MSI','NVIDIA GeForce RTX 3060','Intel i7 2.3 GHz',32,1,16),
  (5,'ThinkPad X1 Carbon','Lenovo','Intel UHD Graphics','Intel i7 4.6 GHz',16,1,14),
  (6,'MacBook Pro','Apple','AMD Radeon Pro 5300M','Intel i9 2.3 GHz',32,1,16),
  (7,'XPS 15','Dell','NVIDIA GeForce GTX 1650 Ti','Intel i7 4.5 GHz',16,512,15),
  (8,'Spectre x360','HP','Intel Iris Plus','Intel i7 4.9 GHz',16,512,13),
  (9,'Surface Laptop 4','Microsoft','Intel Iris Xe','Intel i7 4.8 GHz',16,512,15),
  (10,'Aspire 7','Acer','NVIDIA GeForce GTX 1650','AMD Ryzen 5 4.0 GHz',8,512,15),
  (11,'Legion 5','Lenovo','NVIDIA GeForce GTX 1660 Ti','AMD Ryzen 7 3.3 GHz',16,512,15),
  (12,'Blade 15','Razer','NVIDIA GeForce RTX 2070','Intel i7 5.0 GHz',16,512,15),
  (13,'Swift 3','Acer','AMD Radeon Graphics','AMD Ryzen 7 4.1 GHz',8,512,14),
  (14,'VivoBook S15','ASUS','NVIDIA GeForce MX250','Intel i5 3.9 GHz',8,512,15),
  (15,'Pavilion 15','HP','Intel UHD Graphics','Intel i5 3.6 GHz',8,256,15),
  (16,'ENVY 13','HP','Intel Iris Plus','Intel i7 4.7 GHz',16,512,13),
  (17,'Inspiron 15','Dell','Intel UHD Graphics','Intel i5 3.7 GHz',8,256,15),
  (18,'Yoga C940','Lenovo','Intel Iris Plus','Intel i7 4.9 GHz',16,1,14),
  (19,'Gram 17','LG','Intel Iris Xe','Intel i7 4.7 GHz',16,1,17),
  (20,'ProBook 450','HP','Intel UHD Graphics','Intel i5 3.8 GHz',8,256,15);
-- /*!40000 ALTER TABLE `Laptops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Results` (intersection table between Specs:Deals)
--

DROP TABLE IF EXISTS `Results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Results` (
  `specsID` int(11) NOT NULL,
  `dealID` int(11) NOT NULL,
  PRIMARY KEY (`specsID`,`dealID`),
  KEY `dealID` (`dealID`),
  CONSTRAINT `Results_ibfk_1` FOREIGN KEY (`specsID`) REFERENCES `Specs` (`specsID`) ON DELETE CASCADE,
  CONSTRAINT `Results_ibfk_2` FOREIGN KEY (`dealID`) REFERENCES `Deals` (`dealID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Results`
--

-- LOCK TABLES `Results` WRITE;
-- /*!40000 ALTER TABLE `Results` DISABLE KEYS */;
-- INSERT INTO `Results` VALUES (1,1),(1,2),(2,3),(3,4);
-- /*!40000 ALTER TABLE `Results` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `Specs`
--

DROP TABLE IF EXISTS `Specs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Specs` (
  `specsID` int(11) NOT NULL AUTO_INCREMENT,
  `specsName` varchar(50) DEFAULT NULL,
  `brandName` varchar(50) DEFAULT NULL,
  `gpu` varchar(50) DEFAULT NULL,
  `cpu` varchar(50) DEFAULT NULL,
  `ram` int(11) DEFAULT NULL,
  `internalStorage` int(11) DEFAULT NULL,
  `displaySize` int(11) DEFAULT NULL,
  `budget` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`specsID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Specs`
--

-- LOCK TABLES `Specs` WRITE;
-- /*!40000 ALTER TABLE `Specs` DISABLE KEYS */;
-- INSERT INTO `Specs` VALUES 
--   (1,'Joe\'s List','NULL','NVIDIA GeForce RTX 2060','NULL',16,512,14,3000.00),
--   (2,'Mariana\'s List','HP','NULL','Intel i7 5 GHz',16,128,16,2000.00),
--   (3,'Schindler''s list','NULL','Nvidia Geforce RTX','NULL',32,'NULL',16,1900.00);
-- /*!40000 ALTER TABLE `Specs` ENABLE KEYS */;
-- UNLOCK TABLES;

LOCK TABLES `Specs` WRITE;
/*!40000 ALTER TABLE `Specs` DISABLE KEYS */;
INSERT INTO `Specs` (specsID, specsName, brandName, gpu, cpu, ram, internalStorage, displaySize, budget) VALUES 
  (1,'Joe\'s List', NULL, 'NVIDIA GeForce RTX', NULL, 16, 512, 14, 3000.00),
  (2,'Mariana\'s List', 'HP', NULL, 'Intel i7 5 GHz', 16, 128, 16, 2000.00),
  (3,'Schindler\'s List', NULL, 'NVIDIA GeForce RTX', NULL, 32, NULL, 16, 1900.00),
  (4,'Jennay\'s AMD Thing', NULL, 'AMD Radeon', 'AMD Ryzen', NULL, NULL, NULL, 2500.00),
  (5,'Benny Wants RTX', NULL, 'GeForce RTX', NULL, NULL, NULL, NULL, NULL),
  (6,'Jenny Wants HP', 'HP', NULL, NULL, NULL, NULL, NULL, NULL),
  (7,'GIVE RITCHIE ALL', NULL, NULL, NULL, NULL, NULL, NULL, 100000);
/*!40000 ALTER TABLE `Specs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stores`
--

DROP TABLE IF EXISTS `Stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Stores` (
  `storeID` int(11) NOT NULL AUTO_INCREMENT,
  `storeName` varchar(50) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`storeID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stores`
--

LOCK TABLES `Stores` WRITE;
/*!40000 ALTER TABLE `Stores` DISABLE KEYS */;
INSERT INTO `Stores` VALUES 
  (1,'HP','https://www.hp.com/us-en/home.html'),
  (2,'QVC','https://www.qvc.com/'),
  (3,'NewEgg','https://www.newegg.com/'),
  (4,'Best Buy','https://www.bestbuy.com/'),
  (5,'Amazon','https://www.amazon.com/'),
  (6,'B&H Photo','https://www.bhphotovideo.com/'),
  (7,'Walmart','https://www.walmart.com/'),
  (8,'Target','https://www.target.com/'),
  (9,'Costco','https://www.costco.com/'),
  (10,'Micro Center','https://www.microcenter.com/');
/*!40000 ALTER TABLE `Stores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-09 18:32:19


SET FOREIGN_KEY_CHECKS=1;
COMMIT;