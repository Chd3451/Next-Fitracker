/*
  Warnings:

  - You are about to alter the column `fechaRegistro` on the `cliente` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `cliente` MODIFY `fechaRegistro` DATETIME NOT NULL;
