CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) NOT NULL,
    `ProductVersion` varchar(32) NOT NULL,
    PRIMARY KEY (`MigrationId`)
);

START TRANSACTION;

CREATE TABLE `FeatureType` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `Name` text NULL,
    PRIMARY KEY (`Id`)
);

CREATE TABLE `Users` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Username` text NULL,
    `Email` text NULL,
    `Password` text NULL,
    `UserRights` int NOT NULL,
    PRIMARY KEY (`Id`)
);

CREATE TABLE `MapFeature` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `XCoord` float NOT NULL,
    `YCoord` float NOT NULL,
    `Description` text NULL,
    `FeatureTypeId` bigint NOT NULL,
    PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MapFeature_FeatureType_FeatureTypeId` FOREIGN KEY (`FeatureTypeId`) REFERENCES `FeatureType` (`Id`) ON DELETE CASCADE
);

CREATE INDEX `IX_MapFeature_FeatureTypeId` ON `MapFeature` (`FeatureTypeId`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20210524134624_Initial', '5.0.6');

COMMIT;

