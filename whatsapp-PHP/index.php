<!DOCTYPE html>
<html lang="es">

<head>
  <title>Telegram</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/custome.css">
  <link rel="icon" type="image/png" href="img/favicon.png">
  <!-- Font Awesome File -->
  <link rel="stylesheet" href="css/font-awesome.css">
</head>

<body>

  <div class="container-fluid1 ">
    <div class="row app-one">

      <div class="col-sm-4 side">
        <div class="side-one">
          <!-- Heading -->
          <div class="row heading" style="border-bottom: 1px solid rgba(0, 0, 0, .08) ">
            <div class="col-sm-2 col-xs-2 heading-avatar">
              <div class="heading-avatar-icon">
                <i class="fa fa-align-justify" aria-hidden="true" style="color: #DEDFE0; font-size: 35px; padding-left: 10px; padding-top: 5px;"></i>
              </div>
            </div>
            <div class="col-sm-7 col-xs-7" style="padding-top: 3px;">
              <input type="search" class="form-controls" name="" placeholder="Search">
            </div>
            <div class="col-sm-3 col-xs-3" style="padding: 3px 0px;">
                <select id="slc-usuario" class="form-control">
                    <option value = "Vegueta">Vegueta</option>
                    <option value = "Goku">Goku</option>
                    <option value = "Trunks">Trunks</option>
                    <option value = "Patricio">Patricio</option>
                </select>
            </div>
            
          </div>
          <!-- Heading End -->


          <!-- Search Box End -->
          <!-- sideBar -->
          <div id="amigos" class="row sideBar">
        
            
            <!--  Lista de conversaciones -->
          

          </div>
          <!-- Sidebar End -->
        </div>
        <div class="side-two">

          <!-- Heading -->
          <div class="row newMessage-heading">
            <div class="row newMessage-main">
              <div class="col-sm-2 col-xs-2 newMessage-back">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
              </div>
              <div class="col-sm-10 col-xs-10 newMessage-title">
                New Chat
              </div>
            </div>
          </div>
          <!-- Heading End -->

          <!-- ComposeBox -->
          <div class="row composeBox">
            <div class="col-sm-12 composeBox-inner">
              <div class="form-group has-feedback">
                <input id="composeText" type="text" class="form-control" name="searchText" placeholder="Search People">
                <span class="glyphicon glyphicon-search form-control-feedback"></span>
              </div>
            </div>
          </div>
          <!-- ComposeBox End -->
        </div>
        <!-- Sidebar End -->
      </div>


      <!-- New Message Sidebar End -->

      <!-- Conversation Start -->
      <div  class="col-sm-8 conversation">
        <div id="conversacion">
          <img src="img/t.jpg"  style="width:100%; height:100%; padding:20px;">
        </div>

        <div class="all-mensajes">
        
          <div class="row heading">
            

            <div class="col-sm-8 col-xs-7 heading-name text-left">
              <a type="button" class="heading-name-meta">
              </a>
              <p style="padding-left: 5px;" class="text-line">Online</p>
            </div>
            <div class="col-sm-1 col-xs-1  heading-avatar pull-right" >
              <div class="heading-avatar-icon1">
                <i class="fa fa fa-ellipsis-v" aria-hidden="true" style="color: #DEDFE0; font-size: 29px;  padding-top: 7px;"></i>
              </div>
            </div>
            <div class="col-sm-1 col-xs-1  heading-avatar pull-right">
              <div class="heading-avatar-icon1">
                <i class="fa fa-search" aria-hidden="true" style="color: #DEDFE0; font-size: 29px;  padding-top: 5px; transform: scale(-1,1);"></i>
              </div>
            </div>
            
          </div>
        <!-- Heading End -->

          
          <div class="row message" id="conversation" >

            <div class="row message-previous">
              <div class="col-sm-12 previous">
              </div>

            </div>

            
            

          </div>


        <!-- Message Box End -->

        <!-- Reply Box -->
          <div class="row reply">
            <div class="col-sm-1 col-xs-1 reply-emojis">
              <i class="fa fa-paperclip fa-2x" style="transform: scale(-1,1);"></i>
            </div>
            <div class="col-sm-9 col-xs-9 reply-main">
              <textarea class="form-control" rows="1" id="txta-mensaje" placeholder="Write a message..."></textarea>
            </div>
            <div id="btn-enviar" class="col-sm-1 col-xs-1 reply-send">
              <i class="fa fa-send fa-2x" aria-hidden="true"></i>
            </div>
            <div class="col-sm-1 col-xs-1 reply-recording">
              <i class="fa fa-microphone fa-2x" aria-hidden="true"></i>
            </div>
          </div>
        <!-- Reply Box End -->
       </div>
      </div>
      <!-- Conversation End -->
    </div>
    <!-- App One End -->
  </div>
  <script src="js/jquery.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/controladorMy.js"></script>
  <!-- App End -->
</body>

</html>