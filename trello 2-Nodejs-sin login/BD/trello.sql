-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-04-2018 a las 01:33:20
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `trello`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_listas`
--

CREATE TABLE `tbl_listas` (
  `codigo_lista` int(11) NOT NULL,
  `titulo_lista` varchar(500) DEFAULT NULL,
  `fecha_creacion` date NOT NULL,
  `cod_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_listas`
--

INSERT INTO `tbl_listas` (`codigo_lista`, `titulo_lista`, `fecha_creacion`, `cod_usuario`) VALUES
(45, 'Primera Lista', '2018-04-27', 1),
(46, 'Primera Lista', '2018-04-27', 2),
(47, 'Primera Lista', '2018-04-27', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tarjetas`
--

CREATE TABLE `tbl_tarjetas` (
  `codigo_tarjeta` int(11) NOT NULL,
  `codigo_usuario` int(11) NOT NULL,
  `codigo_lista` int(11) NOT NULL,
  `contenido_tarjeta` varchar(3000) DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_tarjetas`
--

INSERT INTO `tbl_tarjetas` (`codigo_tarjeta`, `codigo_usuario`, `codigo_lista`, `contenido_tarjeta`, `fecha_creacion`) VALUES
(22, 1, 45, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2018-04-27'),
(23, 2, 46, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2018-04-27'),
(24, 5, 47, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2018-04-27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuarios`
--

CREATE TABLE `tbl_usuarios` (
  `codigo_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(500) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `url_imagen` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_usuarios`
--

INSERT INTO `tbl_usuarios` (`codigo_usuario`, `nombre_usuario`, `password`, `url_imagen`) VALUES
(1, 'Goku', '1234', 'img/profile-pics/goku.jpg'),
(2, 'Vegeta', '1234', 'img/profile-pics/vegeta.jpg'),
(3, 'Trunks', '1234', 'img/profile-pics/trunks.jpg'),
(4, 'Goten', '1234', 'img/profile-pics/goten.png'),
(5, 'Pan', '1234', 'img/profile-pics/pan.png'),
(6, 'Dende', '1234', 'img/profile-pics/dende.jpg'),
(7, 'Krillin', '1234', 'img/profile-pics/krilin.jpg'),
(8, 'Bulma', '1234', 'img/profile-pics/bulma.jpg'),
(9, 'Kibito', '1234', 'img/profile-pics/kibito.jpg'),
(10, 'Videl', '1234', 'img/profile-pics/videl.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_listas`
--
ALTER TABLE `tbl_listas`
  ADD PRIMARY KEY (`codigo_lista`),
  ADD KEY `cod_usuario` (`cod_usuario`);

--
-- Indices de la tabla `tbl_tarjetas`
--
ALTER TABLE `tbl_tarjetas`
  ADD PRIMARY KEY (`codigo_tarjeta`),
  ADD KEY `fk_tbl_tarjetas_tbl_usuarios_idx` (`codigo_usuario`),
  ADD KEY `fk_tbl_tarjetas_tbl_listas1_idx` (`codigo_lista`);

--
-- Indices de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  ADD PRIMARY KEY (`codigo_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_listas`
--
ALTER TABLE `tbl_listas`
  MODIFY `codigo_lista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `tbl_tarjetas`
--
ALTER TABLE `tbl_tarjetas`
  MODIFY `codigo_tarjeta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  MODIFY `codigo_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_listas`
--
ALTER TABLE `tbl_listas`
  ADD CONSTRAINT `tarjetas_usuarios` FOREIGN KEY (`cod_usuario`) REFERENCES `tbl_usuarios` (`codigo_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tbl_tarjetas`
--
ALTER TABLE `tbl_tarjetas`
  ADD CONSTRAINT `fk_tbl_tarjetas_tbl_listas1` FOREIGN KEY (`codigo_lista`) REFERENCES `tbl_listas` (`codigo_lista`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tbl_tarjetas_tbl_usuarios` FOREIGN KEY (`codigo_usuario`) REFERENCES `tbl_usuarios` (`codigo_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
