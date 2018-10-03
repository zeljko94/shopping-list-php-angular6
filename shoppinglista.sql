-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2018 at 06:12 AM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shoppinglista`
--

-- --------------------------------------------------------

--
-- Table structure for table `namirnica`
--

CREATE TABLE `namirnica` (
  `ID` int(11) NOT NULL,
  `Naziv` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Cijena` double(7,2) DEFAULT NULL,
  `ImgPath` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `namirnica`
--

INSERT INTO `namirnica` (`ID`, `Naziv`, `Cijena`, `ImgPath`, `UserID`) VALUES
(1, 'Mlijeko', 1.00, 'https://vignette.wikia.nocookie.net/phobia/images/8/82/Milk2.jpg/revision/latest?cb=20170124115645', 1),
(2, 'Kruh', 1.00, 'https://www.panerabread.com/foundation/menu/details/sourdough-bread-loaf.jpg/_jcr_content/renditions/sourdough-bread-loaf.desktop.jpeg', 1),
(3, 'Coca-Cola', 2.50, 'https://vignette.wikia.nocookie.net/logopedia/images/3/37/Coca-Cola-Logo.jpg/revision/latest?cb=20130530125633', 1),
(4, 'Žitarice', 3.75, 'http://mediflora.rs/wp-content/uploads/2016/06/musli-660x330.jpg', 1),
(5, 'Čips', 2.75, 'https://scontent.fsjj1-1.fna.fbcdn.net/v/t1.0-0/p480x480/23561307_1656656857730851_40615891428587916_n.jpg?_nc_cat=0&oh=7d8ca57fe65556214606fb7691fc247a&oe=5BE70072', 1),
(6, 'Jaja', 1.50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqFd9iAfJwI2ZSXnnaZH1vS8xz1K7wXNVRnySIXBqmiV6x6MsS', 1),
(7, 'Banana', 2.45, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI14hiUaK7yjP3Np3N-p-bA0DFV18o_IW8bKyTNqiKqsZNz99I', 1),
(8, 'Likvi', 3.65, 'http://www.adna-commerc.ba/media/com_eshop/products/resized/webLikvi-1-litar-500x500.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `shoppinglist`
--

CREATE TABLE `shoppinglist` (
  `ID` int(11) NOT NULL,
  `Naziv` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `DatumKreiranja` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `UserID` int(11) NOT NULL,
  `IsDone` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `shoppinglist`
--

INSERT INTO `shoppinglist` (`ID`, `Naziv`, `DatumKreiranja`, `UserID`, `IsDone`) VALUES
(20, 'Lista 1', '02-06-2018 04:14:30', 1, 1),
(21, 'Lista 2', '02-06-2018 04:15:43', 1, 1),
(22, 'Lista 3', '02-06-2018 04:22:37', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `shoppinglistitem`
--

CREATE TABLE `shoppinglistitem` (
  `ID` int(11) NOT NULL,
  `NamirnicaID` int(11) DEFAULT NULL,
  `ShoppingListID` int(11) DEFAULT NULL,
  `Kolicina` int(11) NOT NULL,
  `IsDone` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `shoppinglistitem`
--

INSERT INTO `shoppinglistitem` (`ID`, `NamirnicaID`, `ShoppingListID`, `Kolicina`, `IsDone`) VALUES
(43, 1, 20, 1, 1),
(44, 2, 20, 2, 1),
(45, 3, 20, 2, 1),
(46, 4, 20, 1, 1),
(47, 3, 21, 3, 1),
(48, 6, 21, 5, 1),
(49, 7, 21, 5, 1),
(50, 4, 21, 1, 1),
(51, 1, 22, 1, 1),
(52, 2, 22, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `Ime` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Prezime` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Password` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Privilegije` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Ime`, `Prezime`, `Email`, `Password`, `Privilegije`) VALUES
(1, 'korisnik1', 'korisnik1Prezime', 'korisnik1@gmail.com', 'asd', 'korisnik1'),
(2, 'korisnik2', 'korisnik2Prezime', 'korisnik2@gmail.com', 'asd', 'korisnik');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `namirnica`
--
ALTER TABLE `namirnica`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_namirnica_user` (`UserID`);

--
-- Indexes for table `shoppinglist`
--
ALTER TABLE `shoppinglist`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_shoppinglist_user` (`UserID`);

--
-- Indexes for table `shoppinglistitem`
--
ALTER TABLE `shoppinglistitem`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_shoppinglistitem_namirnica` (`NamirnicaID`),
  ADD KEY `fk_shoppinglistitem_shoppinglist` (`ShoppingListID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `namirnica`
--
ALTER TABLE `namirnica`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `shoppinglist`
--
ALTER TABLE `shoppinglist`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `shoppinglistitem`
--
ALTER TABLE `shoppinglistitem`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `namirnica`
--
ALTER TABLE `namirnica`
  ADD CONSTRAINT `fk_namirnica_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shoppinglist`
--
ALTER TABLE `shoppinglist`
  ADD CONSTRAINT `fk_shoppinglist_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shoppinglistitem`
--
ALTER TABLE `shoppinglistitem`
  ADD CONSTRAINT `fk_shoppinglistitem_namirnica` FOREIGN KEY (`NamirnicaID`) REFERENCES `namirnica` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_shoppinglistitem_shoppinglist` FOREIGN KEY (`ShoppingListID`) REFERENCES `shoppinglist` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
