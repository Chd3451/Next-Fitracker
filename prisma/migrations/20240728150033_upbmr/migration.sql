/*
  Warnings:

  - You are about to drop the column `objetivo` on the `bmr` table. All the data in the column will be lost.
  - You are about to alter the column `fechaRegistro` on the `cliente` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `genero` to the `BMR` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bmr` DROP COLUMN `objetivo`,
    ADD COLUMN `genero` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cliente` MODIFY `fechaRegistro` DATETIME NOT NULL;
