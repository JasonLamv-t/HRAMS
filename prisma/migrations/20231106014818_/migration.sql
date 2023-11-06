/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `realname` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `encryptedPassword` VARCHAR(191) NULL,
    `avatarUrl` VARCHAR(191) NULL,
    `status` ENUM('UNVERIFIED', 'NORMAL', 'BANNED', 'DELETED') NOT NULL DEFAULT 'UNVERIFIED',

    UNIQUE INDEX `Admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `uuid` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `superiorId` CHAR(36) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_superiorId_fkey` FOREIGN KEY (`superiorId`) REFERENCES `Department`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
