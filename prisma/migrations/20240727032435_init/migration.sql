-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `fechaNacimiento` DATE NOT NULL,
    `peso` DOUBLE NOT NULL,
    `altura` DOUBLE NOT NULL,
    `metaPeso` DOUBLE NOT NULL,
    `fechaRegistro` DATETIME NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `telefono` VARCHAR(15) NOT NULL,
    `genero` VARCHAR(1) NOT NULL,
    `direccion` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Cliente_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
