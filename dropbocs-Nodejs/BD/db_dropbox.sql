-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-05-2018 a las 03:04:28
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
-- Base de datos: `db_dropbox`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_archivos`
--

CREATE TABLE `tbl_archivos` (
  `cod_archivo` int(11) NOT NULL,
  `nombre_archivo` varchar(5000) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_modificacion` date DEFAULT NULL,
  `tamaño` varchar(45) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `cod_usuario` int(11) NOT NULL,
  `cod_carpeta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_archivos`
--

INSERT INTO `tbl_archivos` (`cod_archivo`, `nombre_archivo`, `fecha_creacion`, `fecha_modificacion`, `tamaño`, `tipo`, `cod_usuario`, `cod_carpeta`) VALUES
(5, '97b9fafff0014be16601feb8e9e6bfdc.jpg', '2018-05-13', '2018-05-13', '173203', 'jpg', 1, 8),
(6, 'INGENIERIA-.pdf', '2018-05-13', '2018-05-13', '229175', 'pdf', 1, 11),
(7, 'Programming-Language-Popularity.jpg', '2018-05-13', '2018-05-13', '280901', 'jpg', 1, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_carpeta`
--

CREATE TABLE `tbl_carpeta` (
  `cod_carpeta` int(11) NOT NULL,
  `nombre_carpeta` varchar(200) NOT NULL,
  `url` varchar(2000) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_modificacion` date DEFAULT NULL,
  `cod_usuario` int(11) NOT NULL,
  `cod_carpeta_padre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_carpeta`
--

INSERT INTO `tbl_carpeta` (`cod_carpeta`, `nombre_carpeta`, `url`, `fecha_creacion`, `fecha_modificacion`, `cod_usuario`, `cod_carpeta_padre`) VALUES
(8, 'Home', 'Archivos/Home', '2018-05-13', '2018-05-13', 1, NULL),
(9, 'Carpeta', 'Archivos/Home/Carpeta', '2018-05-13', '2018-05-13', 1, 8),
(10, 'Carpeta 2', 'Archivos/Home/Carpeta 2', '2018-05-13', '2018-05-13', 1, 8),
(11, 'SubCarpeta', 'Archivos/Home/Carpeta/SubCarpeta', '2018-05-13', '2018-05-13', 1, 9),
(12, 'Carpetas', 'Archivos/Home/Carpeta/SubCarpeta/Carpetas', '2018-05-13', '2018-05-13', 1, 11),
(13, 'Carpeta', 'Archivos/Carpeta', '2018-05-13', '2018-05-13', 2, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuarios`
--

CREATE TABLE `tbl_usuarios` (
  `cod_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(200) NOT NULL,
  `pass` varchar(200) NOT NULL,
  `img_perfil` varchar(800) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_usuarios`
--

INSERT INTO `tbl_usuarios` (`cod_usuario`, `nombre_usuario`, `pass`, `img_perfil`) VALUES
(1, 'Goku', '1234', 'img/profile-pics/goku.jpg'),
(2, 'Dende', '1234', 'img/profile-pics/dende.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_archivos`
--
ALTER TABLE `tbl_archivos`
  ADD PRIMARY KEY (`cod_archivo`),
  ADD KEY `fk_tbl_archivos_Usuarios1_idx` (`cod_usuario`),
  ADD KEY `fk_tbl_archivos_carpeta1_idx` (`cod_carpeta`);

--
-- Indices de la tabla `tbl_carpeta`
--
ALTER TABLE `tbl_carpeta`
  ADD PRIMARY KEY (`cod_carpeta`),
  ADD KEY `fk_carpeta_Usuarios_idx` (`cod_usuario`),
  ADD KEY `fk_carpeta_Carpeta_idx` (`cod_carpeta_padre`);

--
-- Indices de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  ADD PRIMARY KEY (`cod_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_archivos`
--
ALTER TABLE `tbl_archivos`
  MODIFY `cod_archivo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tbl_carpeta`
--
ALTER TABLE `tbl_carpeta`
  MODIFY `cod_carpeta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  MODIFY `cod_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_carpeta`
--
ALTER TABLE `tbl_carpeta`
  ADD CONSTRAINT `fk_carpeta_Carpeta` FOREIGN KEY (`cod_carpeta_padre`) REFERENCES `tbl_carpeta` (`cod_carpeta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_carpeta_Usuarios` FOREIGN KEY (`cod_usuario`) REFERENCES `tbl_usuarios` (`cod_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
