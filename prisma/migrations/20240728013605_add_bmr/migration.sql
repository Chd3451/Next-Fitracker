/*
  Warnings:

  - You are about to drop the column `createdAt` on the `bmr` table. All the data in the column will be lost.
  - You are about to alter the column `actividad` on the `bmr` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `fechaRegistro` on the `cliente` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `calorias` to the `BMR` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbohidratos` to the `BMR` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grasas` to the `BMR` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proteinas` to the `BMR` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bmr` DROP COLUMN `createdAt`,
    ADD COLUMN `calorias` DOUBLE NOT NULL,
    ADD COLUMN `carbohidratos` DOUBLE NOT NULL,
    ADD COLUMN `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `grasas` DOUBLE NOT NULL,
    ADD COLUMN `proteinas` DOUBLE NOT NULL,
    MODIFY `actividad` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cliente` MODIFY `fechaRegistro` DATETIME NOT NULL;
