CREATE DATABASE `db_est`;

CREATE TABLE `m_karyawan` (
  `nik` varchar(8) NOT NULL,
  `nama` varchar(150) DEFAULT NULL,
  `alamat` text,
  `tgllahir` datetime DEFAULT NULL,
  `divisi` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`nik`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;