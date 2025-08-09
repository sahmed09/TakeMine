-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Dic 11, 2024 alle 15:07
-- Versione del server: 10.4.21-MariaDB
-- Versione PHP: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `TakeMine`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `BORROWS`
--

CREATE TABLE `BORROWS` (
  `Borrow_ID` int(11) NOT NULL,
  `Res_ID` int(11) NOT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `StartTime` datetime NOT NULL,
  `EndTime` datetime DEFAULT NULL,
  `ResRating` int(11) DEFAULT NULL,
  `Borrower_TUID` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `BORROWS`
--

INSERT INTO `BORROWS` (`Borrow_ID`, `Res_ID`, `Status`, `StartTime`, `EndTime`, `ResRating`, `Borrower_TUID`) VALUES
(2, 14, 'Started', '2024-12-10 21:49:43', '2024-12-10 21:49:43', 4, '222222'),
(4, 31, 'Completed', '2024-12-10 22:06:29', '2024-12-10 22:06:29', 3, '123456'),
(7, 36, 'Requested', '2024-12-11 00:00:00', '2024-12-20 00:00:00', NULL, '222222'),
(8, 31, 'Approved', '2024-12-11 00:00:00', '2024-12-11 00:00:00', NULL, '222222');

-- --------------------------------------------------------

--
-- Struttura della tabella `CATEGORY`
--

CREATE TABLE `CATEGORY` (
  `CNAME` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `CATEGORY`
--

INSERT INTO `CATEGORY` (`CNAME`) VALUES
('Arts'),
('Electronics'),
('Food'),
('Housing'),
('Learning'),
('Music'),
('Sport&Fitness'),
('Transportation'),
('Wellness');

-- --------------------------------------------------------

--
-- Struttura della tabella `PHOTO`
--

CREATE TABLE `PHOTO` (
  `PH_ID` int(11) NOT NULL,
  `Res_ID` int(11) NOT NULL,
  `PH_URL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `REPORTS`
--

CREATE TABLE `REPORTS` (
  `ReportID` int(11) NOT NULL,
  `Text` text NOT NULL,
  `ReportedUser` varchar(50) NOT NULL,
  `ReportingUser` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `RESOURCE`
--

CREATE TABLE `RESOURCE` (
  `Res_ID` int(11) NOT NULL,
  `ResName` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `Location` text NOT NULL,
  `Availability` tinyint(1) NOT NULL DEFAULT 1,
  `Cost` decimal(10,2) DEFAULT NULL,
  `TU_ID` varchar(50) NOT NULL,
  `ResourceType` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `RESOURCE`
--

INSERT INTO `RESOURCE` (`Res_ID`, `ResName`, `Description`, `Location`, `Availability`, `Cost`, `TU_ID`, `ResourceType`) VALUES
(14, 'Bikesharing', 'Mountain bike for a week', 'Filadelfia', 1, '50.00', '123456', 'Item'),
(31, 'Guitar lesson', 'Guitar lesson', 'USA', 1, '35.00', '123456', 'Help'),
(32, 'Guitar', 'Acustic Fender', 'New York', 1, '4.00', '123456', 'Item'),
(33, 'Book', 'Learning React Native\r\nby Bonnie Eisemann', 'Philadelphia', 1, '77.00', '123456', 'Item'),
(34, 'Piano', 'Yamaha PSR 5700', 'Italy', 0, '250.00', '123456', 'Item'),
(35, 'Laptop', 'MacBook Air', 'M3 256G 16G RAM', 0, '3.00', '123456', 'Item'),
(36, 'JS lesson', 'Js for dummies (1h)', 'Boston', 0, '66.00', '123456', 'Item');

-- --------------------------------------------------------

--
-- Struttura della tabella `ROAR_ACCOUNT`
--

CREATE TABLE `ROAR_ACCOUNT` (
  `AC_ID` int(11) NOT NULL,
  `Balance` decimal(10,2) NOT NULL,
  `TU_ID` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `TAGGEDAS`
--

CREATE TABLE `TAGGEDAS` (
  `CNAME` varchar(50) NOT NULL,
  `RES_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `TAGGEDAS`
--

INSERT INTO `TAGGEDAS` (`CNAME`, `RES_ID`) VALUES
('Arts', 14),
('Arts', 31),
('Electronics', 31),
('Electronics', 35),
('Housing', 35),
('Learning', 31),
('Music', 31),
('Transportation', 36);

-- --------------------------------------------------------

--
-- Struttura della tabella `USER`
--

CREATE TABLE `USER` (
  `TU_ID` varchar(50) NOT NULL,
  `UserStatus` varchar(50) NOT NULL DEFAULT 'Active',
  `Email` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Address` text DEFAULT NULL,
  `Phone` varchar(15) DEFAULT NULL,
  `DoB` date DEFAULT NULL,
  `Nickname` varchar(50) DEFAULT NULL,
  `Password` varchar(100) NOT NULL,
  `Roars` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `USER`
--

INSERT INTO `USER` (`TU_ID`, `UserStatus`, `Email`, `Name`, `Address`, `Phone`, `DoB`, `Nickname`, `Password`, `Roars`) VALUES
('123456', 'Active', 'oreste1@students.towson.edu', 'Oreste Borelli', 'Viale Europa 2, int 6', '3393048667', '1976-05-11', 'oreb', '$2a$10$2cyGXwDonroo0okvIUiiLuXlq38HMlO2TTI8wslvUmqPdl9Dutjve', 100),
('222222', 'Active', 'gianky@students.towson.edu', 'Giancarlo Colloca', 'USA', '456123', '1980-02-02', 'gianky', '$2a$10$GdBCFJcvgLnGjEA7RMjxceHnHOXF4MlOQwSWWHPNJAGWYG2RZjQ8q', 100);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `BORROWS`
--
ALTER TABLE `BORROWS`
  ADD PRIMARY KEY (`Borrow_ID`),
  ADD KEY `Res_ID` (`Res_ID`),
  ADD KEY `Borrower_TUID` (`Borrower_TUID`);

--
-- Indici per le tabelle `CATEGORY`
--
ALTER TABLE `CATEGORY`
  ADD PRIMARY KEY (`CNAME`);

--
-- Indici per le tabelle `PHOTO`
--
ALTER TABLE `PHOTO`
  ADD PRIMARY KEY (`PH_ID`),
  ADD KEY `Res_ID` (`Res_ID`);

--
-- Indici per le tabelle `REPORTS`
--
ALTER TABLE `REPORTS`
  ADD PRIMARY KEY (`ReportID`),
  ADD KEY `ReportedUser` (`ReportedUser`),
  ADD KEY `ReportingUser` (`ReportingUser`);

--
-- Indici per le tabelle `RESOURCE`
--
ALTER TABLE `RESOURCE`
  ADD PRIMARY KEY (`Res_ID`),
  ADD KEY `TU_ID` (`TU_ID`);

--
-- Indici per le tabelle `ROAR_ACCOUNT`
--
ALTER TABLE `ROAR_ACCOUNT`
  ADD PRIMARY KEY (`AC_ID`),
  ADD KEY `TU_ID` (`TU_ID`);

--
-- Indici per le tabelle `TAGGEDAS`
--
ALTER TABLE `TAGGEDAS`
  ADD PRIMARY KEY (`CNAME`,`RES_ID`),
  ADD KEY `RES_ID` (`RES_ID`);

--
-- Indici per le tabelle `USER`
--
ALTER TABLE `USER`
  ADD PRIMARY KEY (`TU_ID`),
  ADD UNIQUE KEY `TUEmail` (`Email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `BORROWS`
--
ALTER TABLE `BORROWS`
  MODIFY `Borrow_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT per la tabella `PHOTO`
--
ALTER TABLE `PHOTO`
  MODIFY `PH_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `REPORTS`
--
ALTER TABLE `REPORTS`
  MODIFY `ReportID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `RESOURCE`
--
ALTER TABLE `RESOURCE`
  MODIFY `Res_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT per la tabella `ROAR_ACCOUNT`
--
ALTER TABLE `ROAR_ACCOUNT`
  MODIFY `AC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `BORROWS`
--
ALTER TABLE `BORROWS`
  ADD CONSTRAINT `borrows_ibfk_1` FOREIGN KEY (`Res_ID`) REFERENCES `RESOURCE` (`Res_ID`),
  ADD CONSTRAINT `borrows_ibfk_2` FOREIGN KEY (`Borrower_TUID`) REFERENCES `USER` (`TU_ID`);

--
-- Limiti per la tabella `PHOTO`
--
ALTER TABLE `PHOTO`
  ADD CONSTRAINT `photo_ibfk_1` FOREIGN KEY (`Res_ID`) REFERENCES `RESOURCE` (`Res_ID`);

--
-- Limiti per la tabella `REPORTS`
--
ALTER TABLE `REPORTS`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`ReportedUser`) REFERENCES `USER` (`TU_ID`),
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`ReportingUser`) REFERENCES `USER` (`TU_ID`);

--
-- Limiti per la tabella `RESOURCE`
--
ALTER TABLE `RESOURCE`
  ADD CONSTRAINT `resource_ibfk_1` FOREIGN KEY (`TU_ID`) REFERENCES `USER` (`TU_ID`);

--
-- Limiti per la tabella `ROAR_ACCOUNT`
--
ALTER TABLE `ROAR_ACCOUNT`
  ADD CONSTRAINT `roar_account_ibfk_1` FOREIGN KEY (`TU_ID`) REFERENCES `USER` (`TU_ID`);

--
-- Limiti per la tabella `TAGGEDAS`
--
ALTER TABLE `TAGGEDAS`
  ADD CONSTRAINT `taggedas_ibfk_1` FOREIGN KEY (`RES_ID`) REFERENCES `RESOURCE` (`Res_ID`),
  ADD CONSTRAINT `taggedas_ibfk_2` FOREIGN KEY (`CNAME`) REFERENCES `CATEGORY` (`CNAME`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
