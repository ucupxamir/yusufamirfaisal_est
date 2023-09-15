-- CreateTable
CREATE TABLE `Karyawan` (
    `nik` VARCHAR(8) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `alamat` TEXT NOT NULL,
    `tgllahir` DATETIME(3) NOT NULL,
    `divisi` VARCHAR(20) NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`nik`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
