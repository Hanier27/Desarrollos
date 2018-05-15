<?php 
$url=$_POST['Carpeta'];
$_SESION[];
if($_POST['Carpeta']=='home'){
	$url='../data/'.$_POST['Carpeta'].'.csv';
}else{
	$url='../data/home/'.$_POST['Carpeta'].'.csv';
}


$archivo=fopen($url,'r');
while ($linea=fgets($archivo)) {
	$contenido=explode(',', $linea);
	if($contenido[1]=='folder'){
		echo '<tr>
              <td><a href="index.php?carpeta='.$contenido[0].'"><i class="fas fa-folder-open"></i> '.$contenido[0].'</a></td>
              <td>'.$contenido[3].'</td>
              <td>'.$contenido[4].'</td>
              <td>'.$contenido[5].'</td>
             </tr>';
	}else {
		$tipo=explode('.', $contenido[0]);
		if($tipo[1]=='aspx'){
			echo ' <tr>
		              <td><button class="btn btn-link" onclick="detalleRegistro('."'".$contenido[0]."'".','."'".$contenido[2]."'".','."'".$contenido[3]."'".','."'".$contenido[4]."'".');"><i class="far fa-file"></i> '.$contenido[0].'</button></td>
		              <td>'.$contenido[3].'</td>
              		  <td>'.$contenido[4].'</td>
              		  <td>'.$contenido[5].'</td>
		            </tr>';
		}else if( $tipo[1]=='jpg'){
			echo ' <tr>
		              <td><button class="btn btn-link" onclick="detalleRegistro('."'".$contenido[0]."'".','."'".$contenido[2]."'".','."'".$contenido[3]."'".','."'".$contenido[4]."'".');"><i class="far fa-image"></i> '.$contenido[0].'</button></td>
		              <td>'.$contenido[3].'</td>
              		  <td>'.$contenido[4].'</td>
              		  <td>'.$contenido[5].'</td>
		            </tr>';
		}else if($tipo[1]=='png'){
			echo ' <tr>
		              <td><button class="btn btn-link" onclick="detalleRegistro('."'".$contenido[0]."'".','."'".$contenido[2]."'".','."'".$contenido[3]."'".','."'".$contenido[4]."'".');"><i class="far fa-image"></i> '.$contenido[0].'</button></td>
		              <td>'.$contenido[3].'</td>
              		  <td>'.$contenido[4].'</td>
              		  <td>'.$contenido[5].'</td>
		            </tr>';
		}else if($tipo[1]=='pdf'){
			echo ' <tr>
		              <td><button class="btn btn-link" onclick="detalleRegistro('."'".$contenido[0]."'".','."'".$contenido[2]."'".','."'".$contenido[3]."'".','."'".$contenido[4]."'".');"><i class="far fa-file-pdf"></i> '.$contenido[0].'</button></td>
		              <td>'.$contenido[3].'</td>
              		  <td>'.$contenido[4].'</td>
              		  <td>'.$contenido[5].'</td>
		            </tr>';
		}else if($tipo[1]=='docx'){
			echo ' <tr>
		              <td><button class="btn btn-link" onclick="detalleRegistro('."'".$contenido[0]."'".','."'".$contenido[2]."'".','."'".$contenido[3]."'".','."'".$contenido[4]."'".');"><i class="far fa-file-word"></i> '.$contenido[0].'</button></td>
		              <td>'.$contenido[3].'</td>
              		  <td>'.$contenido[4].'</td>
              		  <td>'.$contenido[5].'</td>
		            </tr>';
		}

	}
}


?>