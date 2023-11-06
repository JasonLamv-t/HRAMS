/*
  Warnings:

  - You are about to alter the column `level` on the `Department` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedTinyInt`.

*/
-- AlterTable
ALTER TABLE `Department` MODIFY `level` TINYINT UNSIGNED NOT NULL;
