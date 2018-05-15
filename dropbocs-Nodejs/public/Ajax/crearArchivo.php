<?php  

$carpeta = '../data/'.$_POST['raiz']."/".$_POST['nombre'];
$archivo = fopen('../data/home.csv','a.');
fwrite($archivo, $_POST['nombre'].',file,'.$_POST['fechaModificacion'].','.$_POST['fechaCreacion'].','.$_POST['usuario'].','.$_POST['tamaño']."\n");
fclose($archivo);

echo 'Correctamente';

?>