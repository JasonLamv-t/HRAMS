/*
  Warnings:

  - You are about to drop the column `realname` on the `User` table. All the data in the column will be lost.
  - Added the required column `realName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `realname`,
    ADD COLUMN `realName` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `realname` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `IDType` INTEGER NOT NULL,
    `IDNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `departmentUuid` CHAR(36) NULL,

    UNIQUE INDEX `Employee_employeeId_key`(`employeeId`),
    UNIQUE INDEX `Employee_IDNumber_key`(`IDNumber`),
    UNIQUE INDEX `Employee_email_key`(`email`),
    UNIQUE INDEX `Employee_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_departmentUuid_fkey` FOREIGN KEY (`departmentUuid`) REFERENCES `Department`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
