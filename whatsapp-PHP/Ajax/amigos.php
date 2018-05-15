<?php  

$usuario=$_POST['user'];

$archivo=fopen('./usuarios.csv', 'r');
while ($linea=fgetss($archivo)) {
	$partes=explode(',', $linea);
	for ($i=0; $i < count($partes); $i++) { 
		if($partes[$i]!=$usuario){

			echo '<a id="'.$partes[$i].'" onclick="mostrarPanelChat('."'".$partes[$i]."'".');"><div class="row sideBar-body" >
		              <div class="col-sm-3 col-xs-3 sideBar-avatar">
		                <div class="avatar-icon">
		                  <img src="./img/profile-pics/'.$partes[$i].'.jpg">
		                </div>
		              </div>
		              <div class="col-sm-9 col-xs-9 sideBar-main">
		                <div class="row">
		                  <div class="col-sm-8 col-xs-8 sideBar-name">
		                    <span ><b>'.$partes[$i].'
		                  </span>
		                  </div>
		                  <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
		                    <span class="time-meta pull-right">18:18
		                  </span>
		                  </div>
		                </div>
		              </div>
		          </div></a><br>';
		}
	}
}
fclose($archivo);

?>