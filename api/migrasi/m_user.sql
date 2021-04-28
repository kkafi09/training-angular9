-- Adminer 4.7.8 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `m_user`;
CREATE TABLE `m_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kode` varchar(45) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `jenis_kelamin` varchar(100) DEFAULT NULL,
  `tempat_lahir` varchar(100) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `telepon` varchar(25) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `provinsi_id` varchar(45) DEFAULT NULL,
  `kabupaten_id` varchar(45) DEFAULT NULL,
  `kecamatan_id` varchar(45) DEFAULT NULL,
  `desa_id` varchar(45) DEFAULT NULL,
  `akses` text DEFAULT NULL,
  `akses_wilayah` text DEFAULT NULL,
  `m_jabatan_id` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `created_at` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_at` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

INSERT INTO `m_user` (`id`, `kode`, `nama`, `jenis_kelamin`, `tempat_lahir`, `tanggal_lahir`, `email`, `alamat`, `telepon`, `username`, `password`, `provinsi_id`, `kabupaten_id`, `kecamatan_id`, `desa_id`, `akses`, `akses_wilayah`, `m_jabatan_id`, `is_deleted`, `created_at`, `created_by`, `modified_at`, `modified_by`) VALUES
(34,	'u2',	'admin',	NULL,	NULL,	NULL,	'zepri@gmail.com',	'malang',	'0858503',	'admin',	'd033e22ae348aeb5660fc2140aec35850c4da997',	NULL,	NULL,	NULL,	NULL,	'{\"pengguna\":true}',	'3515',	1,	0,	1601984938,	0,	1617109461,	34),
;

-- 2021-04-04 13:54:50
