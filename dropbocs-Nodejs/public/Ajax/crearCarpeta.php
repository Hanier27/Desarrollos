<?php 

$carpeta = '../data/'.$_POST['raiz']."/".$_POST['nombre'];
$archivo = fopen('../data/home.csv','a.');


if (!file_exists($carpeta)) {
    mkdir($carpeta, 0777, true);
    fwrite($archivo, $_POST['nombre'].',folder,'.$_POST['fechaModificacion'].','.$_POST['fechaCreacion'].','.$_POST['usuario'].','.$_POST['tamaño']."\n");
    $crearArchivo= fopen($carpeta.'.csv','a.');
    fclose($crearArchivo);
}

fclose($archivo);
echo 'Correctamente';

?>