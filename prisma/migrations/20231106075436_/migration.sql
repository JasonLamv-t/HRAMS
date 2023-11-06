/*
  Warnings:

  - You are about to drop the column `superiorId` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Department` DROP FOREIGN KEY `Department_superiorId_fkey`;

-- AlterTable
ALTER TABLE `Department` DROP COLUMN `superiorId`,
    ADD COLUMN `superiorUuid` CHAR(36) NULL;

-- DropTable
DROP TABLE `Admin`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `realname` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `encryptedPassword` VARCHAR(191) NULL,
    `avatarUrl` VARCHAR(191) NULL,
    `status` ENUM('UNVERIFIED', 'NORMAL', 'BANNED', 'DELETED') NOT NULL DEFAULT 'UNVERIFIED',

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_superiorUuid_fkey` FOREIGN KEY (`superiorUuid`) REFERENCES `Department`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
