/*
  Warnings:

  - You are about to alter the column `fechaRegistro` on the `cliente` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `cliente` MODIFY `fechaRegistro` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `BMR` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `peso` DOUBLE NOT NULL,
    `altura` DOUBLE NOT NULL,
    `edad` INTEGER NOT NULL,
    `actividad` DOUBLE NOT NULL,
    `objetivo` VARCHAR(191) NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `BMR_clienteId_key`(`clienteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BMR` ADD CONSTRAINT `BMR_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
