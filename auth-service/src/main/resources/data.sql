INSERT IGNORE INTO `period` (`id`, `month`, `year`) VALUES
	('1', '1', '2023'),
	('2', '2', '2023'),
	('3', '3', '2023'),
	('4', '4', '2023'),
	('5', '5', '2023'),
	('6', '6', '2023'),
	('7', '7', '2023'),
	('8', '8', '2023'),
	('9', '9', '2023'),
	('10', '10', '2023'),
	('11', '11', '2023'),
	('12', '12', '2023');

INSERT IGNORE INTO `user` (`uuid`, `is_employee`, `nama`, `password`, `role`, `username`) VALUES
	('f614eab0-bcd0-11ed-afa1-0242ac120002', '1', 'si manajer', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '1', 'manajer'),
	('f614eab0-bcd0-11ed-afa1-0242ac120003', '1', 'si admin', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '2', 'admin'),
	('f614eab0-bcd0-11ed-afa1-0242ac120004', '1', 'si supervisor X', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '3', 'supervisor_x'),
	('f614eab0-bcd0-11ed-afa1-0242ac120005', '1', 'si teknisi B', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '4', 'teknisi_a'),
	('f614eab0-bcd0-11ed-afa1-0242ac120006', '1', 'si teknisi M', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '4', 'teknisi_b'),
	('f614eab0-bcd0-11ed-afa1-0242ac120007', '1', 'si supervisor Y', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '3', 'supervisor_y'),
	('f614eab0-bcd0-11ed-afa1-0242ac120008', '1', 'si teknisi S', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '4', 'teknisi_c'),
	('f614eab0-bcd0-11ed-afa1-0242ac120009', '0', 'Burger King', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '0', 'brk'),
	('f614eab0-bcd0-11ed-afa1-0242ac120010', '0', 'Bakmi GM', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '0', 'bgm'),
	('f614eab0-bcd0-11ed-afa1-0242ac120011', '0', 'BreadTalk', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '0', 'btk'),
	('f614eab0-bcd0-11ed-afa1-0242ac120012', '0', 'Marugame Udon', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '0', 'mud'),
	('f614eab0-bcd0-11ed-afa1-0242ac120013', '0', 'McDonald', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '0', 'mcd'),
	('f614eab0-bcd0-11ed-afa1-0242ac120014', '0', 'Mie Gacoan', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '0', 'mgc'),
	('f614eab0-bcd0-11ed-afa1-0242ac120015', '0', 'Solaria', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '0', 'sol'),
	('f614eab0-bcd0-11ed-afa1-0242ac120016', '0', 'Starbucks', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '0', 'star'),
	('f614eab0-bcd0-11ed-afa1-0242ac120017', '0', 'Subway', '$2a$10$xEUTSc4LQfBLPGbec1p.K.kSfBmGWKHAy1XKIruwrF3nuCMB12Mtu', '0', 'sub');

INSERT IGNORE INTO `manager` (`id`, `address`, `birth_date`, `birth_location`, `contact`, `gender`, `is_active`, `last_login`, `user_id`) VALUES
	('1', 'Jln Manajer', '2000-12-1', 'Jakarta', '628567681249', '1', '1', '2023-03-20 0:00:01', 'f614eab0-bcd0-11ed-afa1-0242ac120002');

INSERT IGNORE INTO `administrator` (`id`, `address`, `birth_date`, `birth_location`, `contact`, `gender`, `is_active`, `last_login`, `user_id`) VALUES
	('1', 'Jln Admin', '2000-12-2', 'Jakarta', '628567681249', '1', '1', '2023-03-20 0:00:01', 'f614eab0-bcd0-11ed-afa1-0242ac120003');

INSERT IGNORE INTO `supervisor` (`id`, `address`, `birth_date`, `birth_location`, `contact`, `gender`, `is_active`, `last_login`, `user_id`) VALUES
	('1', 'Jln Supervisor', '2000-12-1', 'Jakarta', '628567681249', '1', '1', '2023-03-20 0:00:01', 'f614eab0-bcd0-11ed-afa1-0242ac120004'),
	('2', 'Jln Supervisor', '2000-12-1', 'Jakarta', '628567681249', '1', '1', '2023-03-20 0:00:01', 'f614eab0-bcd0-11ed-afa1-0242ac120007');

INSERT IGNORE INTO `technician` (`id`, `address`, `birth_date`, `birth_location`, `contact`, `gender`, `is_active`, `last_login`, `supervisor_id`, `user_id`) VALUES
	('1', 'Jln Teknisi', '2000-12-1', 'Jakarta', '628567681249', '1', '1', '2023-03-20 0:00:01', '1', 'f614eab0-bcd0-11ed-afa1-0242ac120005'),
	('2', 'Jln Teknisi', '2000-12-1', 'Jakarta', '628567681249', '1', '1', '2023-03-20 0:00:01', '1', 'f614eab0-bcd0-11ed-afa1-0242ac120006'),
	('3', 'Jln Teknisi', '2000-12-1', 'Jakarta', '628567681249', '1', '1', '2023-03-20 0:00:01', '2', 'f614eab0-bcd0-11ed-afa1-0242ac120008');

INSERT IGNORE INTO `customer` (`id`, `user_id`) VALUES
	('1', 'f614eab0-bcd0-11ed-afa1-0242ac120009'),
	('2', 'f614eab0-bcd0-11ed-afa1-0242ac120010'),
	('3', 'f614eab0-bcd0-11ed-afa1-0242ac120011'),
	('4', 'f614eab0-bcd0-11ed-afa1-0242ac120012'),
	('5', 'f614eab0-bcd0-11ed-afa1-0242ac120013'),
	('6', 'f614eab0-bcd0-11ed-afa1-0242ac120014'),
	('7', 'f614eab0-bcd0-11ed-afa1-0242ac120015'),
	('8', 'f614eab0-bcd0-11ed-afa1-0242ac120016'),
	('9', 'f614eab0-bcd0-11ed-afa1-0242ac120017');

INSERT IGNORE INTO `outlet` (`id`, `name`, `address`, `region`, `customer_id`, `supervisor_id`, `technician_id`) VALUES
	('1', 'Burger King 1', 'Jln Kucing 1', 'Jakarta Pusat', '1', '1', '1'),
	('2', 'Burger King 2', 'Jln Kucing 2', 'Jakarta Barat', '1', '1', '1'),
	('3', 'Burger King 3', 'Jln Kucing 3', 'Jakarta Timur', '1', '1', '1'),
	('4', 'Bakmi GM 1', 'Jln Kucing 4', 'Jakarta Selatan', '2', '1', '1'),
	('5', 'Bakmi GM 2', 'Jln Kucing 5', 'Jakarta Utara', '2', '1', '1'),
	('6', 'Bakmi GM 3', 'Jln Kucing 6', 'Jakarta Pusat', '2', '1', '1'),
	('7', 'Breadtalk 1', 'Jln Kucing 7', 'Jakarta Barat', '3', '1', '1'),
	('8', 'Breadtalk 2', 'Jln Kucing 8', 'Jakarta Timur', '3', '1', '1'),
	('9', 'Breadtalk 3', 'Jln Kucing 9', 'Jakarta Selatan', '3', '1', '1'),
	('10', 'Marugame Udon 1', 'Jln Kucing 10', 'Jakarta Utara', '4', '1', '2'),
	('11', 'Marugame Udon 2', 'Jln Kucing 11', 'Jakarta Pusat', '4', '1', '2'),
	('12', 'Marugame Udon 3', 'Jln Kucing 12', 'Jakarta Barat', '4', '1', '2'),
	('13', 'Mc Donald 1', 'Jln Kucing 13', 'Jakarta Timur', '5', '1', '2'),
	('14', 'Mc Donald 2', 'Jln Kucing 14', 'Jakarta Selatan', '5', '1', '2'),
	('15', 'Mc Donald 3', 'Jln Kucing 15', 'Jakarta Utara', '5', '1', '2'),
	('16', 'Mi Gacoan 1', 'Jln Kucing 16', 'Jakarta Pusat', '6', '1', '2'),
	('17', 'Mi Gacoan 2', 'Jln Kucing 17', 'Jakarta Barat', '6', '1', '2'),
	('18', 'Mi Gacoan 3', 'Jln Kucing 18', 'Jakarta Timur', '6', '1', '2'),
	('19', 'Solaria 1', 'Jln Kucing 19', 'Depok', '7', '2', '3'),
	('20', 'Solaria 2', 'Jln Kucing 20', 'Depok', '7', '2', '3'),
	('21', 'Solaria 3', 'Jln Kucing 21', 'Depok', '7', '2', '3'),
	('22', 'Starbucks 1', 'Jln Kucing 22', 'Depok', '8', '2', '3'),
	('23', 'Starbucks 2', 'Jln Kucing 23', 'Depok', '8', '2', '3'),
	('24', 'Starbucks 3', 'Jln Kucing 24', 'Depok', '8', '2', '3'),
	('25', 'Subway 1', 'Jln Kucing 25', 'Depok', '9', '2', '3'),
	('26', 'Subway 2', 'Jln Kucing 26', 'Depok', '9', '2', '3'),
	('27', 'Subway 3', 'Jln Kucing 27', 'Depok', '9', '2', '3');

