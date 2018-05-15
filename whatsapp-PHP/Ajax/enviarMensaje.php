<?php 
date_default_timezone_set("America/Tegucigalpa");

	$archivo=fopen('./mensaje.csv', 'a.');
	fwrite($archivo,$_POST['user'].','.$_POST['receptor'].','.$_POST['mensaje'].','.date("h:i:a")."\n");
	fclose($archivo);

	echo  '<div class="row message-body">
              <div class="col-sm-12 message-main-sender">
                <div class="sender">
                  <div class="message-text">
                    '.$_POST['mensaje'].'
                  </div>
                  <span class="message-time pull-right">
                    '.date("h:i:a").'
                  </span>
                </div>
              </div>
            </div>';


?>