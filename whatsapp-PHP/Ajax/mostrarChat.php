<?php 

$user=$_POST['user'];
$amigo=$_POST['chat'];

$archivo=fopen('./mensaje.csv', 'r');
$contador=0;
while ($linea=fgetss($archivo)) {
	$partes=explode(',',$linea);
	if(($partes[1]==$user) && ($partes[0]==$amigo)){
		echo '<div class="row message-body">
              <div class="col-sm-12 message-main-receiver">
                <div class="receiver">
                  <div class="message-text">
                   '.$partes[2].'
                  </div>
                  <span class="message-time pull-right">
                    '.$partes[3].'
                  </span>
                </div>
              </div>
            </div>';

            $contador++;

	}else if(($partes[0]==$user) && ($partes[1]==$amigo)){
		echo '<div class="row message-body">
              <div class="col-sm-12 message-main-sender">
                <div class="sender">
                  <div class="message-text">
                    '.$partes[2].'
                  </div>
                  <span class="message-time pull-right">
                    '.$partes[3].'
                  </span>
                </div>
              </div>
            </div>';

            $contador++;
	}
}


	

 ?>