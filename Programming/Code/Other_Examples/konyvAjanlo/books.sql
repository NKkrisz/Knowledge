
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;


INSERT INTO `categories` (`id`, `name`) VALUES
	(4, 'Krimi'),
	(3, 'Regény'),
	(1, 'Sci-Fi'),
	(2, 'Történelem');

CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `cover` varchar(200) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

-- Dumping data for table books2.books: ~18 rows (approximately)
INSERT INTO `books` (`id`, `title`, `author`, `description`, `category_id`, `cover`, `rating`) VALUES
	(1, 'Dűne', 'Frank Herbert', 'Egy sci-fi klasszikus, amely egy sivatagos bolygón játszódik.', 1, 'https://res.cloudinary.com/myblog2024/image/upload/v1742484110/books/d%C3%BCne_vlac1w.jpg', 4),
	(2, 'Neuromancer', 'William Gibson', 'A cyberpunk műfaj úttörője, mesterséges intelligenciával és virtuális valósággal.', 1, 'https://res.cloudinary.com/myblog2024/image/upload/v1742498128/books/william_gibson_-_neuromancer_b1_300dpi_cover_ta2jx7.jpg', 3.2),
	(3, 'Hyperion', 'Dan Simmons', 'A sci-fi epikus sorozat, amely több történetet és világot ötvöz.', 1, 'https://res.cloudinary.com/myblog2024/image/upload/v1742498185/books/hip_mi0pic.jpg', 5),
	(4, 'Az ember a fellegvárban', 'Philip K. Dick', 'Alternatív történelem és a múlt másik dimenziója.', 1, 'https://res.cloudinary.com/myblog2024/image/upload/v1742498269/books/ember_nljnd5.jpg', 4.3),
	(5, 'Ender Játék', 'Orson Scott Card', 'Egy fiatal fiú története, aki a világ megmentésére készül.', 1, 'https://res.cloudinary.com/myblog2024/image/upload/v1742498342/books/v%C3%A9g_c1vptz.jpg', 3.7),
	(6, 'A világháborúk története', 'John Keegan', 'Egy átfogó mű a világháborúk történetéről.', 2, 'https://res.cloudinary.com/myblog2024/image/upload/v1742498425/books/els%C5%91_stvos2.avif', 4.8),
	(7, 'A római birodalom története', 'Mary Beard', 'A római birodalom felemelkedése és bukása.', 2, 'https://res.cloudinary.com/myblog2024/image/upload/v1742498524/books/roma_ameljg.jpg', 3.9),
	(8, 'Napoleon', 'Andrew Roberts', 'Napóleon Bonaparte élete és öröksége.', 2, 'https://res.cloudinary.com/myblog2024/image/upload/v1742498524/books/roma_ameljg.jpg', 4.1),
	(9, 'A második világháború', 'Winston Churchill', 'A második világháború története a brit miniszterelnök szemszögéből.', 2, 'https://res.cloudinary.com/myblog2024/image/upload/v1742498694/books/churchill_qmwcjl.jpg', 4.6),
	(10, 'Az ipari forradalom', 'Arnold Toynbee', 'A modern világ kialakulása és a gazdasági átalakulások.', 2, 'https://res.cloudinary.com/myblog2024/image/upload/v1742498753/books/ipar_ezjjzh.jpg', 3.7),
	(11, 'Büszkeség és balítélet', 'Jane Austen', 'Egy romantikus regény az 1800-as évekből.', 3, 'https://res.cloudinary.com/myblog2024/image/upload/v1742498946/books/jane_skejon.jpg', 4.6),
	(12, 'Anna Karenina', 'Lev Tolstoj', 'Egy férfi és egy nő tragikus szerelmi története.', 3, 'https://res.cloudinary.com/myblog2024/image/upload/v1742499068/books/ana_nrocw9.jpg', 3),
	(13, 'Moby-Dick', 'Herman Melville', 'A történet egy kapitányról, aki megszállottan vadászik egy fehér bálna után.', 3, 'https://res.cloudinary.com/myblog2024/image/upload/v1742499125/books/herman-melville-moby-dick--olvass-velunk-3-szint-241424_b7atgp.jpg', 3.3),
	(14, 'Száz év magány', 'Gabriel García Márquez', 'A mágikus realizmus egyik legismertebb műve.', 3, 'https://res.cloudinary.com/myblog2024/image/upload/v1742499181/books/100_dki9rg.jpg', 3.7),
	(15, 'Jane Eyre', 'Charlotte Brontë', 'A társadalmi osztályok és a szerelem dilemmája egy angol vidéki családban.', 3, 'Büszkeség és balítélet', 4.1),
	(16, 'A kutya se látta', 'Agatha Christie', 'Egy klasszikus Poirot-rejtély tele fordulatokkal.', 4, 'https://res.cloudinary.com/myblog2024/image/upload/v1742499454/books/covers_37199_ukjsct.jpg', 5),
	(17, 'Sherlock Holmes történetei', 'Arthur Conan Doyle', 'Sherlock Holmes egyik legismertebb nyomozása.', 4, 'https://res.cloudinary.com/myblog2024/image/upload/v1742499606/books/covers_228133_zia8fi.jpg', 4.9),
	(18, 'A lány a vonaton', 'Paula Hawkins', 'Egy pszichológiai thriller, amelyben semmi sem az, aminek látszik.', 4, 'https://res.cloudinary.com/myblog2024/image/upload/v1742499694/books/3511309_4_kascp9.jpg', 3);


