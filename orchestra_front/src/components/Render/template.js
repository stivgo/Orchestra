
function generate(content, items, endTime) {
    const text =
    
    `<!DOCTYPE html PUBLIC "-//HbbTV//1.1.1//EN" "http://www.hbbtv.org/dtd/HbbTV-1.1.1.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Expires" content="0" />
        <meta http-equiv="Last-Modified" content="0" />
        <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta xmlns="http://www.w3.org/1999/xhtml" http-equiv="Content-Type" content="application/vnd.hbbtv.xhtml+xml; charset=UTF-8" />
        <title>Orchesta</title>
    
        <script type="text/javascript" src="hbbtvlib.js"></script>
        
    
        <script src="https://luke-chang.github.io/js-spatial-navigation/spatial_navigation.js"></script>
        <script>
          window.addEventListener('load', function() {
            // Initialize
            SpatialNavigation.init();
      
            // Define navigable elements (anchors and elements with "focusable" class).
            SpatialNavigation.add({
              selector: 'a, .focusable'
            });
      
            // Make the *currently existing* navigable elements focusable.
            SpatialNavigation.makeFocusable();
      
            // Focus the first navigable element.
            SpatialNavigation.focus();
          });
        </script>
    
    
        <style>
          .avionEnBarco {
            transform: rotate(-40deg);
          }
          .GyCControlIdioma {
            opacity: 0.3;
            animation: GyCControlIdiomaAnimation 20s infinite;
            transition: all 0.3s ease;
          }
          @keyframes GyCControlIdiomaAnimation {
            0% {
              opacity: 0.3;
            }
            20% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              opacity: 0.3;
            }
          }
          .GyCInteractivoCortinilla {
            opacity: 0;
            animation: GyCOpacityAnimation 2s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
          @keyframes GyCOpacityAnimation {
            40% {
              opacity: 1;
            }
          }
          .banderaSinSeleccionar {
            width: 50px;
            height: 50px;
            padding: 15px;
          }
          .traslucido {
            opacity: 0.5;
          }
          .nube1 {
            animation: Nube1Animation 4s infinite;
          }
          @keyframes Nube1Animation {
            0% {
              left: -50px;
            }
            100% {
              left: 1500px;
            }
          }
    
          .avionCandelario {
            transform: rotate(15deg);
            animation: AvionCandelarioAnimation 1s infinite;
          }
    
          @keyframes AvionCandelarioAnimation {
            0% {
              transform: rotate(14deg);
            }
    
            35% {
              transform: rotate(16deg);
            }
            75% {
              transform: rotate(15deg);
            }
            100% {
              transform: rotate(14deg);
            }
          }
    
          .candelarioEnAvion {
            animation: CandelarioEnAvionAnimation 1s infinite;
          }
    
          @keyframes CandelarioEnAvionAnimation {
            0% {
              transform: rotate(-1deg);
            }
    
            30% {
              transform: rotate(1deg);
            }
            70% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-1deg);
            }
          }
          .elementoOculto {
            /*
      opacity: 0.35;
      */
            display: none;
          }
          .elementoVisible {
            /*
      opacity: 1;
      */
            display: inline;
          }
    
          .GyCTransicionColor {
            opacity: 0;
            animation: GyCTransicionColorAnimation 5.5s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
          }
          @keyframes GyCTransicionColorAnimation {
            100% {
              opacity: 1;
            }
          }
          .GyCFocusElement {
            animation: GyCFocusAnimation 0.7s infinite;
            /*transition: all 1s ease-in-out;
      width: 100%; max-width: 100%;*/
          }
          @keyframes GyCFocusAnimation {
            50% {
              transform: scale(1.3, 1.3);
              -o-transform: scale(1.3, 1.3);
            }
          }
          .rectangle {
            position: fixed;
            top: 17px;
            left: 26px;
            width: 10px;
            height: 10px;
            z-index: 1001;
            border-color: white;
            border-style: solid;
            border-width: 1px;
            background: rgba(100, 0, 0, 0.3);
            color: white;
          }
         
    
    :focus {
      border: 5px solid white;
    }
    .grid-container {
      display: grid;
      grid-template-columns: auto auto auto;
      background-color: #2196F3;
      padding: 10px;
      column-gap: 100px;
      row-gap: 100px;
    }
    
    .grid-item {
     
    
      padding: 20px;
      font-size: 30px;
      text-align: center;
    }
    
    
    
      /*Carousel*/
    
    
        .slide-container{
          width: 100%;
          align-items: center;
          overflow: hidden;
          }
    
          .image-slider{
            width: 100%;
            position: relative;
            left: 0;
            display: flex;
            transition: .7s;
          }
    
          .slides-div{
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 30px 0 30px;
    
          }
          .imagenes{
            position: relative;
            width: 150px;
            height: 200px;
            transition: .5s;
            
            
          }
          .button{
            
            width: 150px;
            height: 200px;
            background-color: rgba(0, 0, 0, .5);
            transition: .5s;
            
          }
          
          #slider-span1:target ~ .image-slider #img1,
          #slider-span1:target ~ .image-slider #button-1{
            width: 200px;
            height: 300px;
            background-color: rgba(0, 0, 0, 0);
            
            
          }
          #slider-span2:target ~ .image-slider #img2,
          #slider-span2:target ~ .image-slider #button-2{
            width: 200px;
            height: 300px;
            background-color: rgba(0, 0, 0, 0);
            
          }
          #slider-span3:target ~ .image-slider #img3,
          #slider-span3:target ~ .image-slider #button-3{
            width: 200px;
            height: 300px;
            background-color: rgba(0, 0, 0, 0);
          
            
          }
          #slider-span4:target ~ .image-slider #img4,
          #slider-span4:target ~ .image-slider #button-4{
            width: 200px;
            height: 300px;
            background-color: rgba(0, 0, 0, 0);
     
          }
          #slider-span5:target ~ .image-slider #img5,
          #slider-span5:target ~ .image-slider #button-5{
            width: 200px;
            height: 300px;
            background-color: rgba(0, 0, 0, 0);
       
          }
          #slider-span6:target ~ .image-slider #img6,
          #slider-span6:target ~ .image-slider #button-6{
            width: 200px;
            height: 300px;
            background-color: rgba(0, 0, 0, 0);
        
          }
          #slider-span7:target ~ .image-slider #img7,
          #slider-span7:target ~ .image-slider #button-7{
            width: 200px;
            height: 300px;
            background-color: rgba(0, 0, 0, 0);
        
          }
    
          #slider-span1:target ~ .image-slider {left: 45%;}
          #slider-span2:target ~ .image-slider {left: 35%;}
          #slider-span3:target ~ .image-slider {left: 25%;}
          
          #slider-span5:target ~ .image-slider {left: -25%;}
          #slider-span6:target ~ .image-slider {left: -35%;}
          #slider-span7:target ~ .image-slider {left: -45%;}
    
    
    
        </style>
    
        <!--script type="text/javascript" src="js/application.js"></script-->
        <script type="text/javascript">
          var int_objs = new Array();
          var int_objTypes = {
            appMan: "oipfApplicationManager",
            config: "oipfConfiguration",
          };
          var int_app = null;
          var int_keyset = null;
          var int_ksVisible = null;
          var keynames = [
            "ENTER",
            "LEFT",
            "UP",
            "RIGHT",
            "DOWN",
            "PLAY",
            "PAUSE",
            "STOP",
            "FAST_FWD",
            "REWIND",
            "BACK",
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "GREEN",
            "YELLOW",
            "RED",
            "BLUE",
          ];
          var keycodes = [];
    
          var propertyActual = 0;
    
          var pruebaAlineadaAlTiempo = true;
    
          var pages = [];
          var globalTimers = {};
          var initialBroadcastTime = new Date().getTime(); //null; //
          var tiempoInicioSTB = initialBroadcastTime;
          var zeroTime = 0;
          var initialBeebeeTime = null;
          var lastBroadcastTime = 0;
          var stbTime = 0;
          var lastSyncSTBTime = 0;
    
          var broadcastDuration = 210 * 1000; //172.36666666 * 1000; //GyC: 170seg
          if (pruebaAlineadaAlTiempo == false) {
            broadcastDuration = 210 * 1000;
          }
          var desfaseNegroInicial = 40000;
    
          var checkPageFrequency = 30;
          var lastPage = null;
          var esPrimeraVez = true;
    
          var topCuadrito = 40;
          var leftCuadrito = 40;
          var widthCuadrito = 100;
          var heightCuadrito = 100;
          var deltaCuadrito = 100;
          var moverOAgrandarCuadrito = true;
          var opacidadElementosSuperpuestos = 1;
    
          var posicionBanderaSeleccionada = 0;
          var seleccionandoIdioma = false;
    
        
     
    
          function keyFunction(event) {
            try {
              if (lastPage != null) {
                for (i = 0; i < lastPage.keylisteners.length; i++) {
                  if (event == lastPage.keylisteners[i].key) {
                    lastPage.keylisteners[i].callback();
                  }
                }
              }
            } catch (e) {
              imprimir(e);
            }
    
            try {
              //var element = document.elementFromPoint(x, y);
              var getCuadrito = document.getElementById("cuadrito")
              var rect = getCuadrito.getBoundingClientRect();
              var element = document.elementFromPoint(rect.left, rect.top);
              if (event == KeyEvent.VK_UP) {
                moverCuadrito(-1, 0);
                //element = document.elementFromPoint(x, y);
                
                console.log(rect.left,rect.top);
                element.focus();
                return;
               
              } else if (event == KeyEvent.VK_DOWN) {
                
                moverCuadrito(1, 0);
                console.log(rect.left,rect.top);
                element.focus();
                return;
                
              } else if (event == KeyEvent.VK_RIGHT) {
               
                moverCuadrito(0, 1);
                console.log(rect.left,rect.top);
                element.focus();
                return;
               
              } else if (event == KeyEvent.VK_LEFT) {
               
                moverCuadrito(0, -1);
                console.log(rect.left,rect.top);
                element.focus();
    
                return;
              } else if (event == KeyEvent.VK_ENTER) {
                element.click()
              } else if (event == KeyEvent.VK_RED) {
                var cuadrito = document.getElementById("cuadrito");
                if (consola.classList.contains("elementoOculto")) {
                  cuadrito.classList.remove("elementoOculto");
                  consola.classList.remove("elementoOculto");
                  //document.getElementById("divTime").classList.remove("elementoOculto");
                  document
                    .getElementById("divTime2")
                    .classList.remove("elementoOculto");
    
                  cuadrito.classList.add("elementoVisible");
                  consola.classList.add("elementoVisible");
                  //document.getElementById("divTime").classList.add("elementoVisible");
                  document
                    .getElementById("divTime2")
                    .classList.add("elementoVisible");
                } else {
                  cuadrito.classList.add("elementoOculto");
                  consola.classList.add("elementoOculto");
                  //document.getElementById("divTime").classList.add("elementoOculto");
                  document
                    .getElementById("divTime2")
                    .classList.add("elementoOculto");
    
                  cuadrito.classList.remove("elementoVisible");
                  consola.classList.remove("elementoVisible");
                  //document.getElementById("divTime").classList.remove("elementoVisible");
                  document
                    .getElementById("divTime2")
                    .classList.remove("elementoVisible");
                }
              } else if (event == KeyEvent.VK_GREEN) {
                limpiarConsola();
              } else if (event == KeyEvent.VK_YELLOW) {
                //var broadcast = document.getElementById(idOfVideo);
    
                //var info = getElementInfo(broadcast);
                //consola.innerText = info;
                //initialBroadcastTime += 10;
    
                seleccionandoIdioma = !seleccionandoIdioma;
    
                if (seleccionandoIdioma) {
                  document.getElementById("langs").classList.add("elementoVisible");
                  document
                    .getElementById("controlIdioma")
                    .classList.add("elementoVisible");
                  document
                    .getElementById("langs")
                    .classList.remove("elementoOculto");
                  document
                    .getElementById("controlIdioma")
                    .classList.remove("GyCControlIdioma");
                } else {
                  document
                    .getElementById("controlIdioma")
                    .classList.remove("elementoVisible");
                  document
                    .getElementById("langs")
                    .classList.remove("elementoVisible");
                  document.getElementById("langs").classList.add("elementoOculto");
                  document
                    .getElementById("controlIdioma")
                    .classList.add("GyCControlIdioma");
    
                  actualizarTextos();
                }
              } else if (event == KeyEvent.VK_BLUE) {
                //propertyActual = 0;
                //initialBroadcastTime -= 10;
                limpiarConsola();
                imprimir(new Date(getSTBTime()) + " STB");
                imprimir(new Date(initialBroadcastTime) + " IB");
              } else if (event == KeyEvent.VK_PLAY) {
                initialBroadcastTime = new Date().getTime();
                lastBroadcastTime = 0;
                imprimir("Empezando show");
              } else if (event == KeyEvent.VK_PAUSE) {
                /*
          if(vidObject)
          {
            var p = vidObject.properties;
            
            imprimir(vidObject.properties.length);
          }
          */
                // 2 cuadros
                initialBroadcastTime += 66.666;
              } else if (event == KeyEvent.VK_STOP) {
                initialBroadcastTime -= 66.666;
              } else if (event == KeyEvent.VK_REWIND) {
                // 10 seg
                initialBroadcastTime += 33.3333333; //10000;
              } else if (event == KeyEvent.VK_FAST_FWD) {
                initialBroadcastTime -= 33.333333; //10000;
              } else if (event == KeyEvent.VK_0) {
                moverOAgrandarCuadrito = !moverOAgrandarCuadrito;
              } else if (event == KeyEvent.VK_1) {
                deltaCuadrito = 1;
              } else if (event == KeyEvent.VK_2) {
                deltaCuadrito = 10;
              } else if (event == KeyEvent.VK_3) {
                deltaCuadrito = 100;
              } else if (event == KeyEvent.VK_4) {
                // 3 cuadros
                initialBroadcastTime += 16.6666666;
              } else if (event == KeyEvent.VK_5) {
                initialBroadcastTime -= 16.666666;
              } else if (event == KeyEvent.VK_6) {
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
                //synchronizeSTBTime();
    
                imprimir(new Date(getSTBTime()));
    
                for (var i = 0; i < pages.length; i += 1) {
                  var page = pages[i];
                  imprimir(
                    page.name + " " + page.initialTime + " " + page.finalTime
                  );
                }
              } else if (event == KeyEvent.VK_7) {
                // 11 cuadros
                (initialBroadcastTime += 366), 6666667;
              } else if (event == KeyEvent.VK_8) {
                (initialBroadcastTime -= 366), 6666667;
              } else if (event == KeyEvent.VK_9) {
                synchronizeAll();
              } else {
                imprimir(event);
              }
            } catch (e) {
              imprimir(e);
            }
          }
    
          function synchronizeAll() {
            synchronize();
            synchronizeSTBTime();
            pages[0].onload();
            actualizarTextos();
          }
    
          function synchronizeSTBTime() {
            var tiempoAntesDeSync = new Date().getTime();
            try {
              getJSON("./getTime.php", function (err, data) {
                if (err !== null) {
                  imprimir("Something went wrong con JSON: " + err);
                } else {
                  var tiempoDespuesDeSync = new Date().getTime();
                  stbTime = data.time;
    
                  lastSyncSTBTime = tiempoDespuesDeSync;
    
                  var diferencia = tiempoDespuesDeSync - tiempoAntesDeSync;
    
                  stbTime += diferencia;
    
                  imprimir(stbTime + " [Nuevo STB Time] " + new Date(stbTime));
                }
              });
            } catch (errorS) {
              imprimir(errorS);
            }
          }
          function synchronize() {
            try {
              //pages[0].onload();
    
              //Sincronización
              var tiempoAntesDeSync = new Date().getTime();
              try {
                getJSON("./beebeeTime.json", function (err, data) {
                  if (err !== null) {
                    imprimir("Something went wrong con JSON: " + err);
                  } else {
                    initialBroadcastTime = data.time;
                    lastBroadcastTime = 0;
                    var tiempoDespuesDeSync = new Date().getTime();
                    var diferencia = tiempoDespuesDeSync - tiempoAntesDeSync;
                    imprimir(tiempoDespuesDeSync + " [STB time] ");
                    imprimir(
                      initialBroadcastTime +
                        " [" +
                        diferencia +
                        "]  Sincronizando con BeeBee " +
                        new Date(initialBroadcastTime)
                    );
                    //imprimir( zeroTime + " [Zero Time]");
                  }
                });
              } catch (errorS) {
                imprimir(errorS);
              }
            } catch (error) {
              imprimir(error);
            }
          }
    
          var getJSON = function (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "json";
            xhr.setRequestHeader(
              "cache-control",
              "no-cache, must-revalidate, post-check=0, pre-check=0"
            );
            xhr.setRequestHeader("cache-control", "max-age=0");
            xhr.setRequestHeader("expires", "0");
            xhr.setRequestHeader("expires", "Tue, 01 Jan 1980 1:00:00 GMT");
            xhr.setRequestHeader("pragma", "no-cache");
            xhr.onload = function () {
              var status = xhr.status;
              if (status === 200) {
                callback(null, xhr.response);
              } else {
                callback(status, xhr.response);
              }
            };
            xhr.send();
          };
          // function registerKeyEventListener() {
          //   setKeyCodes();
          //   document.addEventListener(
          //     "keydown",
          //     function (e) {
          //       e.preventDefault();
          //       if (handleKeyCode2(e.keyCode)) {
          //       }
          //     },
          //     false
          //   );
          // }
          function setKeyCodes() {
            if (typeof KeyEvent != "undefined") {
              if (typeof KeyEvent.VK_LEFT != "undefined") {
                var VK_LEFT = KeyEvent.VK_LEFT;
                var VK_UP = KeyEvent.VK_UP;
                var VK_RIGHT = KeyEvent.VK_RIGHT;
                var VK_DOWN = KeyEvent.VK_DOWN;
              }
              if (typeof KeyEvent.VK_ENTER != "undefined") {
                var VK_ENTER = KeyEvent.VK_ENTER;
              }
              if (typeof KeyEvent.VK_RED != "undefined") {
                var VK_RED = KeyEvent.VK_RED;
                var VK_GREEN = KeyEvent.VK_GREEN;
                var VK_YELLOW = KeyEvent.VK_YELLOW;
                var VK_BLUE = KeyEvent.VK_BLUE;
              }
              if (typeof KeyEvent.VK_PLAY != "undefined") {
                var VK_PLAY = KeyEvent.VK_PLAY;
                var VK_PAUSE = KeyEvent.VK_PAUSE;
                var VK_STOP = KeyEvent.VK_STOP;
              }
              if (typeof KeyEvent.VK_FAST_FWD != "undefined") {
                var VK_FAST_FWD = KeyEvent.VK_FAST_FWD;
                var VK_REWIND = KeyEvent.VK_REWIND;
              }
              if (typeof KeyEvent.VK_BACK != "undefined") {
                var VK_BACK = KeyEvent.VK_BACK;
              }
              if (typeof KeyEvent.VK_0 != "undefined") {
                var VK_0 = KeyEvent.VK_0;
                var VK_1 = KeyEvent.VK_1;
                var VK_2 = KeyEvent.VK_2;
                var VK_3 = KeyEvent.VK_3;
                var VK_4 = KeyEvent.VK_4;
                var VK_5 = KeyEvent.VK_5;
                var VK_6 = KeyEvent.VK_6;
                var VK_7 = KeyEvent.VK_7;
                var VK_8 = KeyEvent.VK_8;
                var VK_9 = KeyEvent.VK_9;
              }
            }
    
            if (typeof VK_LEFT == "undefined") {
              var VK_LEFT = 0x25;
              var VK_UP = 0x26;
              var VK_RIGHT = 0x27;
              var VK_DOWN = 0x28;
            }
            if (typeof VK_ENTER == "undefined") {
              var VK_ENTER = 0x0d;
            }
            if (typeof VK_RED == "undefined") {
              var VK_RED = 0x74;
              var VK_GREEN = 0x75;
              var VK_YELLOW = 0x76;
              var VK_BLUE = 0x77;
            }
            if (typeof VK_PLAY == "undefined") {
              var VK_PLAY = 0x50;
              var VK_PAUSE = 0x51;
              var VK_STOP = 0x53;
            }
            if (typeof VK_FAST_FWD == "undefined") {
              var VK_FAST_FWD = 0x46;
              var VK_REWIND = 0x52;
            }
            if (typeof VK_BACK == "undefined") {
              var VK_BACK = 0xa6;
            }
            if (typeof VK_0 == "undefined") {
              var VK_0 = 0x30;
              var VK_1 = 0x31;
              var VK_2 = 0x32;
              var VK_3 = 0x33;
              var VK_4 = 0x34;
              var VK_5 = 0x35;
              var VK_6 = 0x36;
              var VK_7 = 0x37;
              var VK_8 = 0x38;
              var VK_9 = 0x39;
            }
    
            for (var i = 0; i < keynames.length; i++) {
              keycodes[i] = -1;
              try {
                eval("keycodes[" + i + "] = KeyEvent.VK_" + keynames[i]);
                // do not use: eval('keycodes['+i+'] = VK_'+keynames[i]);
              } catch (e) {
                // ignore
                eval("keycodes[" + i + "] = VK_" + keynames[i]);
              }
            }
            try {
              playpausecode = KeyEvent.VK_PLAY_PAUSE;
            } catch (e) {
              // ignore
            }
          }
          function handleKeyCode2(kc) {
            keyFunction(kc);
          }
    
          function init() {
            imprimir("Iniciando la app");
            imprimir("Desfase inicial: " + desfaseNegroInicial / 1000);
            //adding listener to the application
            /*
      document.addEventListener("keydown", function(e){
        var keycode = e.keyCode;
        e.preventDefault();
        handleKeyCode(keycode);
        
        //if(handleKeyCode(e.keyCode)){ e.preventDefault()};
      },false);
      */
            registerKeyEventListener();
    
            imprimir("keydown listener");
            // set appMngr to the application/oipfApplicationManager object
            var appMgr = document.getElementById("oipfID");
            imprimir("buscando appMgr");
            if (typeof appMgr.getOwnerApplication != "undefined") {
              // create the application
              imprimir("Creando el appMgr");
              int_app = appMgr.getOwnerApplication(document);
              //setting remote control buttons
              int_keyset = int_app.privateData.keyset;
              int_ksVisible = 0x33f; //0x23F;  //0x33F color + nav + vcr + numeric + alpha
              int_app.show();
              int_keyset.setValue(int_ksVisible);
    
              createAppContent();
    
              imprimir("Mostrando la app y registrando streamEvents");
              registerStreamEvents();
              imprimir("después de registrarlos");
              moverCuadrito(0, 0);
              var myVar = setInterval(verifyPage, checkPageFrequency);
            }
          }
    
          function getSTBTime() {
            //imprimir (	"XXXXXXXXXXXXXXXXXX
            if (lastSyncSTBTime != 0) {
              var newTime = new Date().getTime() - lastSyncSTBTime + stbTime;
              return newTime;
            } else {
              return -1;
            }
          }
    
          function verifyPage() {
            if (initialBroadcastTime != null) {
              var d = getSTBTime();
              if (d != -1) {
                //imprimir ("Tiempo actual: " + new Date(d));
                var t = Math.round(d) - initialBroadcastTime;
    
                document.getElementById("divTime2").innerHTML = msToHMSm(t);
                t = t % broadcastDuration;
                //imprimir("BROADCAST DUR     : " + broadcastDuration);
                //imprimir("TIEMPO TRANSCURRIDO " + t);
                //if( t >= broadcastDuration)
                if (t < 2 * checkPageFrequency) {
                  //imprimir("BROADCAST DUR     : " + broadcastDuration);
                  //imprimir("TIEMPO TRANSCURRIDO " + t);
                  synchronize();
                  synchronizeSTBTime();
                  actualizarTextos();
    
                  for (i = 0; i < pages.length; i++) {
                    var p = pages[i];
                    if (p.restart != null) {
                      //imprimir(".......... Reiniciando página: " + p.name);
                      p.restart();
                    }
                  }
                }
                /*
        if(t <= 2 * checkPageFrequency)
        {
          zeroTime = new Date().getTime();
          //TODO
          if(!esPrimeraVez)
          {
            //initialBroadcastTime += 10;
          }
          else
          {
            esPrimeraVez = false;
          }
          for (i = 0; i < pages.length; i++)
          {
            var p = pages[i];
            if( p.restart != null)
            {
              //imprimir(".......... Reiniciando página: " + p.name);
              p.restart();
            }
          }
        }
        */
                var actual = checkWhichPage(t);
    
                var paginaAct = "--";
    
                if (lastPage != actual) {
                  if (lastPage != null) {
                    lastPage.onunload();
                    document
                      .getElementById("pagesContainer")
                      .removeChild(lastPage.divPage);
                    //imprimir( lastPage.name + " deleted");
                  }
                  if (actual != null) {
                    paginaAct = actual.name;
                    document
                      .getElementById("pagesContainer")
                      .appendChild(actual.divPage);
                    actual.onload();
                    imprimir("[PAGE] " + actual.name + " Loaded");
                  }
                  lastPage = actual;
                }
                if (actual != null) {
                  for (i = 0; i < Object.keys(globalTimers).length; i++) {
                    var timerTime = Object.keys(globalTimers)[i];
                    var roundedTimerTime =
                      parseInt(timerTime / checkPageFrequency, 10) *
                      checkPageFrequency;
                    var roundedCurrentTime =
                      parseInt(t / checkPageFrequency, 10) * checkPageFrequency;
                    //print("timers " +roundedCurrentTime +" - "+ roundedTimerTime);
                    if (
                      lastBroadcastTime <= roundedTimerTime &&
                      roundedTimerTime <= roundedCurrentTime
                    ) {
                      var timerActual = globalTimers[timerTime];
                      for (evAct = 0; evAct < timerActual.length; evAct++) {
                        if (typeof timerActual[evAct] == "function") {
                          timerActual[evAct]();
                        } else {
                          imprimir(
                            ">>>> (" +
                              t +
                              " - " +
                              timerTime +
                              ") " +
                              roundedCurrentTime +
                              " - " +
                              roundedTimerTime +
                              " ==== " +
                              timerActual[evAct]
                          );
                        }
                      }
                    }
                  }
                }
    
                lastBroadcastTime = t;
                var diff = t < desfaseNegroInicial ? 0 : -desfaseNegroInicial;
                document.getElementById("divTime").innerHTML =
                  msToHMSm(t + diff) + "  " + paginaAct;
              } else {
                synchronize();
                synchronizeSTBTime();
              }
            }
          }
    
          function msToHMSm(ms) {
            // 1- Convert to seconds:
            var seconds = ms / 1000;
            // 2- Extract hours:
            var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
            seconds = seconds % 3600; // seconds remaining after extracting hours
            // 3- Extract minutes:
            var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
            // 4- Keep only seconds not extracted to minutes:
            seconds = parseInt(seconds % 60, 10);
    
            var millis = ms - seconds * 1000 - minutes * 60000;
    
            // To frames
            millis = parseInt(millis / 33.3333333333);
    
            return (
              (hours < 10 ? "0" + hours : hours) +
              ":" +
              (minutes < 10 ? "0" + minutes : minutes) +
              ":" +
              (seconds < 10 ? "0" + seconds : seconds) +
              ":" +
              (millis < 10 ? "0" + millis : millis)
            );
          }
          function checkWhichPage(t) {
            var currentPage = null;
            for (i = 0; i < pages.length && currentPage == null; i++) {
              var p = pages[i];
              if (p.initialTime <= t && t <= p.finalTime) {
                currentPage = p;
              }
            }
            return currentPage;
          }
          function createPage(name, initialTime, finalTime) {
            var divPage = document.createElement("div");
            //divPage.style.opacity = 0.1;
            var page = {
              divPage: divPage,
              name: name,
              deltaInitialTime: 0,
              deltaFinalTime: 0,
              deltaTimer: 0,
              initialTime: initialTime * 1000,
              finalTime: finalTime * 1000,
              timeOutTransformacion: -1,
              properties: [],
              objects: [],
              restart: null,
              addGroup: function () {
                var group = document.createElement("div");
                group.style.position = "fixed";
                group.style.top = "0px";
                group.style.left = "0px";
                //group.style.width = "300px";
                //group.style.height = "300px";
                //group.style.backgroundColor = "red";
    
                group.addCSS = function (cssClass) {
                  this.classList.add(cssClass);
                };
                group.removeCSS = function (cssClass) {
                  this.classList.remove(cssClass);
                };
    
                group.add = function (element) {
                  //imprimir("--- Agregando " + element+ " en " + this);
                  this.appendChild(element);
                };
    
                this.divPage.appendChild(group);
                this.objects.push(group);
                return group;
              },
              addImage: function (url, x, y, width, height) {
                var image = createImage(url, x, y, width, height);
    
                this.divPage.appendChild(image);
                this.objects.push(image);
                return image;
              },
              keylisteners: [],
              addKey: function (key, func) {
                var pair = { key: key, callback: func };
                this.keylisteners.push(pair);
                return pair;
              },
              removeKey: function (key, func) {
                /*
          var pair = {key: key, func: func};
          this.keylisteners.remove(pair);
                return pair;
          */
              },
              timers: [],
              addTimer: function (time, func) {
                var timeInMilis = time * 1000;
                var pair = { time: timeInMilis, callback: func };
                this.timers.push(pair);
                addGlobalTimeEvent(timeInMilis, func);
                return pair;
              },
              onload: function () {},
              onunload: function () {},
              updateLanguage: function () {},
              setInitialDelta: function (delta) {
                var parts = ("" + delta).split(" ");
                var deltaMillis = parseInt(parts[0]);
    
                if (parts[1] == "f") {
                  deltaMillis *= 33.333333333;
                } else if (parts[1] == "s") {
                  deltaMillis *= 1000;
                }
    
                var originalTime = this.initialTime - this.deltaInitialTime;
                this.deltaInitialTime = deltaMillis;
                this.initialTime = originalTime + this.deltaInitialTime;
    
                this.initialTime = delta * 1000 + desfaseNegroInicial;
                //imprimir (".     new initial time <"+this.name + "> : " + this.initialTime+ " ms");
              },
              setFinalDelta: function (delta) {
                var parts = ("" + delta).split(" ");
                var deltaMillis = parseInt(parts[0]);
    
                if (parts[1] == "f") {
                  deltaMillis *= 33.333333333;
                } else if (parts[1] == "s") {
                  deltaMillis *= 1000;
                }
    
                var originalTime = this.finalTime - this.deltaFinalTime;
                this.deltaFinalTime = deltaMillis;
                this.finalTime = originalTime + this.deltaFinalTime;
    
                this.finalTime = delta * 1000 + desfaseNegroInicial;
                //imprimir (".     new final Time<"+this.name + "> : " + this.finalTime+ " ms");
              },
              setTimerDelta: function (delta) {
                var parts = delta.split(" ");
                var deltaMillis = parseInt(parts[0]);
    
                if (parts[1] == "f") {
                  deltaMillis *= 33.333333333;
                } else if (parts[1] == "s") {
                  deltaMillis *= 1000;
                }
    
                var originalTime = this.finalTime - this.deltaFinalTime;
                this.deltaFinalTime = deltaMillis;
                this.finalTime = originalTime + this.deltaFinalTime;
              },
            };
    
            //addGlobalTimeEvent(page.initialTime, "loadPage_" + page.name);
            //addGlobalTimeEvent(page.finalTime, "unloadPage_" + page.name);
    
            pages.push(page);
            return page;
          }
    
          function shuffle(array) {
            var currentIndex = array.length,
              temporaryValue,
              randomIndex;
    
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
    
              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
            //imprimir(JSON.stringify(array));
            return array;
          }
    
          function createImage(url, x, y, width, height) {
            var image = document.createElement("img");
            if (width != 0) {
              image.style.width = width + "px";
            }
            if (height != 0) {
              image.style.height = height + "px";
            }
    
            image.style.position = "fixed";
            image.style.top = y + "px";
            image.style.left = x + "px";
    
            image.src = url;
    
            image.addCSS = function (cssClass) {
              this.classList.add(cssClass);
            };
            image.removeCSS = function (cssClass) {
              this.classList.remove(cssClass);
            };
            return image;
          }
    
          function addGlobalTimeEvent(time, event) {
            if (globalTimers[time] == undefined) {
              globalTimers[time] = [];
            }
            globalTimers[time].push(event);
          }
          var vidObject = -1;
          var idOfVideoContainer = "vidCont";
          var idOfVideo = "video";
          var DVB_URL = "dvb://1.1.65.65/";
          var SE_PATH = ".streamEvents";
          var TRY_ON_XML = "./streamsGYC";
          //var TRY_ON_XML = "/streamEvents";
          //var SE_PATH = ".streamEvents";
          //SE_PATH = ".xml";
          //var EVENT_NAME = "eventItem";
          //var EVENT_NAME = "pro7";
          var EVENT_NAME = "eventItem";
          var lastStreamEventReceived = "";
          var lang = 0;
    
          /*
           * SE registration
           */
          function registerStreamEvents() {
            imprimir("Registering to se : " + TRY_ON_XML);
    
            if (vidObject == -1) {
              imprimir("Initializing broadcast");
              vidObject = hbbtvlib_init_broadcast(idOfVideoContainer, idOfVideo);
            }
    
            if (vidObject) {
              try {
                var path = DVB_URL + SE_PATH;
                //vidObject.addStreamEventListener(path, EVENT_NAME, handleStreamEvent);
                vidObject.addStreamEventListener(
                  path,
                  EVENT_NAME,
                  handleStreamEvent
                );
                //doLog("Successfully registered to se : " + DVB_URL + SE_PATH + "/" + EVENT_NAME);
                imprimir(
                  "Successfully registered to se : " + path + "/" + EVENT_NAME
                );
              } catch (notATV) {
                imprimir("Could not register to SE : " + notATV);
              }
            } else {
              imprimir("No video object found");
            }
          }
    
          /*
           * Callback when  StreamEvent is received from broadcast
           */
          function handleStreamEvent(streamEvent) {
            var seText = streamEvent.text;
    
            imprimir(seText);
    
            //prevents for flooding with not-changed SE
            if (seText == lastStreamEventReceived) {
              imprimir("es repetido");
              return;
            }
            imprimir("actualizando streamEvent");
            lastStreamEventReceived = seText;
            applyEvent(seText);
          }
    
          function handleKeyCode(kc) {
            if (
              kc == VK_UP ||
              kc == VK_DOWN ||
              kc == VK_LEFT ||
              kc == VK_RIGHT ||
              kc == VK_ENTER ||
              kc == VK_RED ||
              kc == VK_YELLOW ||
              kc == VK_GREEN ||
              kc == VK_BLUE ||
              kc == VK_PLAY ||
              kc == VK_PAUSE ||
              kc == VK_STOP ||
              kc == VK_BACK ||
              kc == VK_FAST_FWD ||
              kc == VK_REWIND ||
              kc == VK_0 ||
              kc == VK_1 ||
              kc == VK_2 ||
              kc == VK_3 ||
              kc == VK_4 ||
              kc == VK_5 ||
              kc == VK_6 ||
              kc == VK_7 ||
              kc == VK_8 ||
              kc == VK_9
            ) {
              keyFunction(kc);
              return true;
            } else {
              return false;
            }
          }
          function imprimir(texto) {
            var consola = document.getElementById("consola");
            if (consola != null) {
              consola.innerHTML = texto + "<br>" + consola.innerHTML;
            }
          }
    
          function limpiarConsola() {
            consola.innerHTML = "";
          }
    
          function getElementInfo(element) {
            var info = "";
            var bkeys = Object.getOwnPropertyNames(element);
            var bvals = Object.keys(element).map(function (key) {
              return element[key];
            });
    
            info += bkeys.length + ", " + bvals.length + "<br>";
            var limite = propertyActual + 30;
            for (; propertyActual < limite; propertyActual++) {
              info +=
                "(" +
                propertyActual +
                ") " +
                bkeys[propertyActual] +
                ": " +
                bvals[propertyActual] +
                " <br> ";
            }
            if (propertyActual >= limite) {
              propertyActual = 0;
            }
    
            return info;
          }
    
          function actualizarVariables() {}
    
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
          //*****************************************************************************************************************************************
    
          function createAppContent() {
            {
              // ======================================================================
              //                               PAGE 0 - Vars
              // ======================================================================
    
              var pageVars;
              if (pruebaAlineadaAlTiempo == false) {
                pageVars = createPage("seleccionMaterial", 0, 2);
              } else {
                pageVars = createPage("pageVars", 2, 10);
              }
              pageVars.onload = function () {
                //synchronize();
                //synchronizeSTBTime();
    
                // Load vars
                try {
                  getJSON("./vars.json", function (err, data) {
                    if (err !== null) {
                      imprimir("Something went wrong con JSON: " + err);
                    } else {
                      //imprimir('Your query count: ' + JSON.stringify(data));
    
                      for (var i in data) {
                        var imagen = eval(data[i].name);
                        if (imagen != null && imagen !== "undefined") {
                          if (
                            data[i].properties != undefined &&
                            data[i].properties.length > 0
                          ) {
                            //imagen.style.opacity = opacidadElementosSuperpuestos;
                            for (j in data[i].properties) {
                              try {
                                var prop = data[i].properties[j].name;
    
                                var val = data[i].properties[j].value;
                                if (val != -1) {
                                  var unids = "px";
    
                                  if (
                                    typeof val === "string" ||
                                    val instanceof String
                                  ) {
                                    unids = "";
                                  }
                                  var instr =
                                    data[i].name +
                                    ".style." +
                                    prop +
                                    ' = "' +
                                    val +
                                    unids +
                                    '";';
                                  //imprimir("----- Actualizando prop: " + instr);
                                  eval(instr);
                                }
                              } catch (error) {
                                imprimir(error);
                              }
                            }
                          } else if (
                            data[i].timers != undefined &&
                            data[i].timers.length > 0
                          ) {
                            //imprimir("cambiando timers de " +data[i].name);
                            for (j in data[i].timers) {
                              try {
                                var prop = data[i].timers[j].name;
    
                                var val = data[i].timers[j].value;
                                if (prop == "initialTime") {
                                  var instr =
                                    data[i].name + ".setInitialDelta(" + val + ");";
                                  //imprimir("----- Actualizando prop: " + instr);
                                  eval(instr);
                                } else if (prop == "finalTime") {
                                  var instr =
                                    data[i].name + ".setFinalDelta(" + val + ");";
                                  //imprimir("----- Actualizando prop: " + instr);
                                  eval(instr);
                                }
                              } catch (error) {
                                imprimir(error);
                              }
                            }
                          }
    
                          //imprimir(imagen.src);
                        } else {
                          imprimir(data[i].name + " no está definido");
                        }
                      }
                    }
                  });
                } catch (error2) {
                  imprimir(error2);
                }
              };
            }
            {
              // ======================================================================
              //                               PAGE 0.1 - Cortinilla
              // ======================================================================
    
              var pCortinilla;
    
              if (pruebaAlineadaAlTiempo == false) {
                pCortinilla = createPage("cortinilla", 2, 7);
                timeoutPagina1 = 5;
              } else {
                pCortinilla = createPage("pCortinilla", 12, 14.8);
              }
    
              var grupoCortinilla = pCortinilla.addGroup();
              var controlCortinilla = createImage(
                "./images/4.3.Indicador_peq.gif",
                900,
                395,
                190,
                0
              );
              grupoCortinilla.add(controlCortinilla);
              var textoInteractivo = createImage(
                "images/textos/interactivo.png",
                620,
                595,
                180,
                0
              );
              textoInteractivo.style.transform = "rotate(-4deg)";
              //textoInteractivo.addCSS("GyCInteractivoCortinilla");
              grupoCortinilla.add(textoInteractivo);
    
              pCortinilla.updateLanguage = function () {
                var nuevoIdioma = darIdiomaSeleccionado();
    
                if (nuevoIdioma == "co") {
                  textoInteractivo.src = "./images/textos/interactivo.png";
                  grupoTextoChangeColor.addCSS("elementoOculto");
                } else {
                  textoInteractivo.src =
                    "./images/textos/" + nuevoIdioma + "/interactive.png";
                  if (nuevoIdioma == "de") {
                  }
                  //tituloChangeColor.style.width = "550px";
                  //tituloChangeColor.style.left = "290px";
                  grupoTextoChangeColor.removeCSS("elementoOculto");
                }
              };
            }
            {
              // ======================================================================
              //                               PAGE 0.1 - Presentación del episodio
              // ======================================================================
    
              var presentacionEpisodio;
    
              if (pruebaAlineadaAlTiempo == false) {
                presentacionEpisodio = createPage("presentacionEpisodio", 2, 7);
                timeoutPagina1 = 5;
              } else {
                //15.33
                presentacionEpisodio = createPage("presentacionEpisodio", 14.8, 18);
              }
    
              var grupoPresentacionEpisodio = presentacionEpisodio.addGroup();
              var tablaPresentacionEpisodio = createImage(
                "./images/textos/fondoTablaCortinilla.jpg",
                255,
                73,
                0,
                100
              );
              grupoPresentacionEpisodio.add(tablaPresentacionEpisodio);
              var tituloPresentacionEpisodio = createImage(
                "./images/textos/uk/episodeName.png",
                255,
                73,
                0,
                0
              );
              grupoPresentacionEpisodio.add(tituloPresentacionEpisodio);
              grupoPresentacionEpisodio.addCSS("elementoOculto");
    
              presentacionEpisodio.updateLanguage = function () {
                var nuevoIdioma = darIdiomaSeleccionado();
                //imprimir("Actualizando cortinilla a : " + nuevoIdioma  +"  => " +"./images/textos/" + nuevoIdioma + "/episodeName.png");
                tituloPresentacionEpisodio.src =
                  "./images/textos/" + nuevoIdioma + "/episodeName.png";
                if (nuevoIdioma == "co") {
                  grupoPresentacionEpisodio.addCSS("elementoOculto");
                } else {
                  if (nuevoIdioma == "de") {
                  }
                  tituloPresentacionEpisodio.style.width = "650px";
                  tituloPresentacionEpisodio.style.left = "290px";
                  grupoPresentacionEpisodio.removeCSS("elementoOculto");
                }
              };
            }
            {
              // ======================================================================
              //                               PAGE 1
              // ======================================================================
    
              var p;
              var timeoutPagina1;
    
              if (pruebaAlineadaAlTiempo == false) {
                p = createPage("seleccionMaterial", 2, 7);
                timeoutPagina1 = 5;
              } else {
                p = createPage("p", 41.22, 50.4);
                timeoutPagina1 = 50.35 + desfaseNegroInicial / 1000;
              }
    
              var control = p.addImage(
                "./images/4.3.Indicador_peq.gif",
                55,
                495,
                160,
                0
              );
    
              var grupoTextoLighter = p.addGroup();
              var fondoTextoLighter = createImage(
                "./images/liviano/FondoTextoCasa_peq.png",
                360,
                0,
                0,
                0
              );
              grupoTextoLighter.add(fondoTextoLighter);
              var tituloLighter = createImage(
                "./images/textos/uk/lighter.png",
                440,
                40,
                470,
                0
              );
              grupoTextoLighter.add(tituloLighter);
              grupoTextoLighter.addCSS("elementoOculto");
    
              var grupo1 = p.addGroup();
    
              var fondoCasaPlastilina = createImage(
                "./images/liviano/fondoCasaPlastilina.png",
                94,
                244,
                0,
                0
              );
              grupo1.add(fondoCasaPlastilina);
              var fondoCasaPapel = createImage(
                "./images/liviano/fondoCasaPapel.png",
                946,
                244,
                0
              );
              grupo1.add(fondoCasaPapel);
    
              var tituloPlastilina = createImage(
                "./images/textos/co/plastilina.png",
                160,
                414,
                190,
                0
              );
              grupo1.add(tituloPlastilina);
              var tituloPapel = createImage(
                "./images/textos/co/papel.png",
                1020,
                416,
                105,
                0
              );
              grupo1.add(tituloPapel);
    
              var imgPlastilina = createImage(
                "./images/liviano/avion_plastilina_sinTexto.png",
                76,
                250,
                330,
                0
              );
              imgPlastilina.style.zIndex = 89324;
              grupo1.add(imgPlastilina);
              var imgPapel = createImage(
                "./images/liviano/avion_papel_sinTexto.png",
                906,
                250,
                330,
                0
              );
              imgPlastilina.style.zIndex = 89325;
              grupo1.add(imgPapel);
    
              p.seleccionarMaterial = function () {
                var anterior = p.properties.actual;
                if (p.properties.actual == imgPlastilina) {
                  p.properties.actual = imgPapel;
                } else {
                  p.properties.actual = imgPlastilina;
                }
                if (anterior != null) {
                  anterior.removeCSS("GyCFocusElement");
                }
                p.properties.actual.addCSS("GyCFocusElement");
              };
              p.addKey(VK_LEFT, p.seleccionarMaterial);
              p.addKey(VK_RIGHT, p.seleccionarMaterial);
    
              p.addKey(VK_ENTER, function () {
                imprimir("key OK");
                p.revisarRespuestaPagina1();
              });
    
              p.revisarRespuestaPagina1 = function () {
                if (p.properties.seleccionFinal == null) {
                  imprimir("validando respuesta");
                  grupo1.removeCSS("elementoVisible");
                  grupo1.addCSS("elementoOculto");
    
                  p.properties.seleccionFinal = p.properties.actual;
    
                  if (p.properties.actual == imgPlastilina) {
                    //grupo2.removeCSS("elementoOculto");
                    //grupo2.addCSS("elementoVisible");
                    imprimir(
                      ">.................> Se cumplió el tiempo: Plastilina"
                    );
                  } else {
                    imprimir("Se cumplió el tiempo: Papel");
                  }
                }
              };
    
              p.addTimer(timeoutPagina1, function () {
                p.revisarRespuestaPagina1();
              });
    
              p.restart = function () {
                grupo1.removeCSS("elementoOculto");
                grupo1.addCSS("elementoVisible");
    
                //grupo2.addCSS("elementoOculto");
                //grupo2.removeCSS("elementoVisible");
    
                p.properties.actual = imgPapel;
                p.properties.seleccionFinal = null;
                p.seleccionarMaterial();
              };
    
              p.updateLanguage = function () {
                var nuevoIdioma = darIdiomaSeleccionado();
                //imprimir("Actualizando Pág1 a : " + nuevoIdioma  +"  => " +"./images/textos/" + nuevoIdioma + "/lighter.png");
                tituloLighter.src =
                  "./images/textos/" + nuevoIdioma + "/lighter.png";
                tituloPapel.src = "./images/textos/" + nuevoIdioma + "/papel.png";
                tituloPlastilina.src =
                  "./images/textos/" + nuevoIdioma + "/plastilina.png";
                if (nuevoIdioma == "co") {
                  grupoTextoLighter.addCSS("elementoOculto");
                } else {
                  if (
                    nuevoIdioma == "fr" ||
                    nuevoIdioma == "gr" ||
                    nuevoIdioma == "uk"
                  ) {
                    tituloPapel.style.width = "105px";
                  } else if (nuevoIdioma == "it") {
                    tituloPapel.style.width = "130px";
                  } else if (nuevoIdioma == "de") {
                    tituloPapel.style.width = "160px";
                  }
                  //imprimir("Actualizando papel a " +nuevoIdioma + " " + tituloPapel.style.width);
                  //tituloLighter.style.width = "550px";
                  //tituloLighter.style.left = "290px";
                  grupoTextoLighter.removeCSS("elementoOculto");
                }
              };
    
              p.restart();
            }
            {
              // ======================================================================
              //                               PAGE 1 - Bad response
              // ======================================================================
              var p1Bad;
    
              if (pruebaAlineadaAlTiempo == false) {
                p1Bad = createPage("seleccionMaterialIncorrecto", 8, 12);
              } else {
                p1Bad = createPage("p1Bad", 50.46, 53.82);
              }
    
              var grupo2 = p1Bad.addGroup();
              var fondoCasa = createImage(
                "./images/4.6.FondoCasa_reducida.jpg",
                0,
                0,
                0,
                0
              );
              grupo2.add(fondoCasa);
              var candeDiceNo = createImage(
                "./images/5.2CandeDiceNo_micro.gif",
                445,
                115,
                390,
                0
              );
              grupo2.add(candeDiceNo);
              grupo2.addCSS("elementoOculto");
    
              p1Bad.onload = function () {
                if (p.properties.actual == imgPlastilina) {
                  grupo2.removeCSS("elementoOculto");
                  grupo2.addCSS("elementoVisible");
                  imprimir(">             > MOSTRANDO RESPUESTA BAD: Plastilina");
                } else {
                  imprimir(">             > MOSTRANDO RESPUESTA BAD: Papel");
                }
              };
    
              p1Bad.restart = function () {
                grupo2.addCSS("elementoOculto");
                grupo2.removeCSS("elementoVisible");
              };
    
              p1Bad.restart();
            }
            {
              // ======================================================================
              //                               PAGE 2
              // ======================================================================
    
              var p2;
              var timeoutPagina2;
    
              if (pruebaAlineadaAlTiempo == false) {
                p2 = createPage("avionesColores", 15, 20);
                timeoutPagina2 = 19;
              } else {
                p2 = createPage("p2", 66.65, 76.24);
                timeoutPagina2 = 76.12 + desfaseNegroInicial / 1000;
              }
    
              var control = p2.addImage(
                "./images/4.3.Indicador_peq.gif",
                55,
                495,
                160,
                0
              );
              control.style.zIndex = 8334;
              var fondoPapel = p2.addImage(
                "./images/avionColores/FondoPapel_opciones.jpg",
                7,
                153,
                0,
                0
              );
              //fondoPapel.style.border = "1px solid #FFFFFF";
    
              var opciones = p2.addGroup();
    
              var opcionAvionVerde = createImage(
                "./images/avionColores/v2/verde_peq.png",
                36,
                302,
                275,
                0
              );
              opciones.add(opcionAvionVerde);
              var opcionAvionMorado = createImage(
                "./images/avionColores/v2/morado_peq.png",
                208,
                485,
                275,
                0
              );
              opciones.add(opcionAvionMorado);
              var opcionAvionRojo = createImage(
                "./images/avionColores/v2/rojo_peq.png",
                210,
                174,
                275,
                0
              );
              opciones.add(opcionAvionRojo);
              var opcionAvionAmarillo = createImage(
                "./images/avionColores/v2/amarillo_peq.png",
                420,
                342,
                275,
                0
              );
              opciones.add(opcionAvionAmarillo);
    
              var grupoTextoChangeColor = p2.addGroup();
              var fondoTextoChangeColor = createImage(
                "./images/avionColores/FondoPapel_texto.png",
                370,
                0,
                550,
                0
              );
              grupoTextoChangeColor.add(fondoTextoChangeColor);
              var tituloChangeColor = createImage(
                "./images/textos/en/changeColors.png",
                330,
                30,
                600,
                0
              );
              grupoTextoChangeColor.add(tituloChangeColor);
              grupoTextoChangeColor.addCSS("elementoOculto");
    
              p2.addKey(VK_UP, function () {
                p2.properties.actual = opcionAvionRojo;
                p2.actualizarSeleccionAvion();
              });
              p2.addKey(VK_RIGHT, function () {
                p2.properties.actual = opcionAvionAmarillo;
                p2.actualizarSeleccionAvion();
              });
              p2.addKey(VK_DOWN, function () {
                p2.properties.actual = opcionAvionMorado;
                p2.actualizarSeleccionAvion();
              });
              p2.addKey(VK_LEFT, function () {
                p2.properties.actual = opcionAvionVerde;
                p2.actualizarSeleccionAvion();
              });
              p2.addKey(VK_ENTER, function () {
                //p2.revisarRespuestaPagina2();
    
                imprimir("Seleccionando COLOR: " + p2.properties.actual.src);
              });
    
              p2.actualizarSeleccionAvion = function () {
                opcionAvionVerde.removeCSS("GyCFocusElement");
                opcionAvionAmarillo.removeCSS("GyCFocusElement");
                opcionAvionMorado.removeCSS("GyCFocusElement");
                opcionAvionRojo.removeCSS("GyCFocusElement");
    
                if (p2.properties.actual != null) {
                  //imprimir("Cambiar a??? " + p2.properties.actual.src);
                  p2.properties.actual.addCSS("GyCFocusElement");
    
                  var ruta = p2.properties.actual.src.split("/");
                  var nombreImagen = ruta[ruta.length - 1];
                  var rutaTransformacion = "";
    
                  if (nombreImagen == "rojo_peq.png") {
                    rutaTransformacion = "./images/avionColores/v2/RojoGrande.png";
                  } else if (nombreImagen == "amarillo_peq.png") {
                    rutaTransformacion =
                      "./images/avionColores/v2/AmarilloGrande.png";
                  } else if (nombreImagen == "morado_peq.png") {
                    rutaTransformacion =
                      "./images/avionColores/v2/MoradoGrande.png";
                  }
                  if (rutaTransformacion != "") {
                    if (transformacionARojo != undefined) {
                      transformacionARojo.src = rutaTransformacion;
                    }
                  }
                }
              };
    
              p2.restart = function () {
                opciones.removeCSS("elementoOculto");
                opciones.addCSS("elementoVisible");
    
                p2.properties.actual = opcionAvionRojo;
                if (p2.properties.transformacion != null) {
                  p2.properties.transformacion.removeCSS("GyCTransicionColor");
                }
                p2.properties.transformacion = null;
                p2.actualizarSeleccionAvion();
              };
    
              p2.restart();
    
              p2.revisarRespuestaPagina2 = function () {
                //imprimir ("Revisando selección de color");
                opciones.removeCSS("elementoVisible");
                opciones.addCSS("elementoOculto");
              };
    
              p2.addTimer(timeoutPagina2, function () {
                //p2.revisarRespuestaPagina2();
    
                var ruta = p2.properties.actual.src.split("/");
                var nombreImagen = ruta[ruta.length - 1];
    
                transformadoARojo.src = "images/avionColores/v2/" + nombreImagen;
                transformadoARojo1.src = "images/avionColores/v2/" + nombreImagen;
                transformadoARojo2.src = "images/avionColores/v2/" + nombreImagen;
                transformadoARojo3.src = "images/avionColores/v2/" + nombreImagen;
                transformadoARojo4.src = "images/avionColores/v2/" + nombreImagen;
    
                var rutaTransformacion = "";
    
                if (nombreImagen == "rojo_peq.png") {
                  rutaTransformacion = "./images/avionColores/v2/RojoGrande.png";
                } else if (nombreImagen == "amarillo_peq.png") {
                  rutaTransformacion =
                    "./images/avionColores/v2/AmarilloGrande.png";
                } else if (nombreImagen == "morado_peq.png") {
                  rutaTransformacion = "./images/avionColores/v2/MoradoGrande.png";
                }
                if (rutaTransformacion != "") {
                  transformacionARojo.src = rutaTransformacion;
                }
    
                imprimir(
                  "(Cambiando ruta de imagen) TIMEOUT Seleccionando COLOR: " +
                    nombreImagen
                );
              });
    
              p2.updateLanguage = function () {
                var nuevoIdioma = darIdiomaSeleccionado();
                //imprimir("Actualizando Pág1 a : " + nuevoIdioma  +"  => " +"./images/textos/" + nuevoIdioma + "/lighter.png");
                tituloChangeColor.src =
                  "./images/textos/" + nuevoIdioma + "/changeColors.png";
                if (nuevoIdioma == "co") {
                  grupoTextoChangeColor.addCSS("elementoOculto");
                } else {
                  if (nuevoIdioma == "de") {
                  }
                  //tituloChangeColor.style.width = "550px";
                  //tituloChangeColor.style.left = "290px";
                  grupoTextoChangeColor.removeCSS("elementoOculto");
                }
              };
            }
    
            {
              // ======================================================================
              //                               PAGE 2 - Transformación
              // ======================================================================
              var p2Transformation;
              var p2TransformationTimeout;
    
              if (pruebaAlineadaAlTiempo == false) {
                p2Transformation = createPage("transformacionColor", 21, 26);
              } else {
                p2Transformation = createPage("p2Transformation", 76.466666, 81.56);
                p2TransformationTimeout = 81.127777 + desfaseNegroInicial / 1000;
              }
              /*
        var transformacionAMorado = p2Transformation.addImage("./images/avionColores/v2/MoradoGrande.png", 206, 264, 851, 0);
        transformacionAMorado.addCSS("elementoOculto");
        */
              var transformacionARojo = p2Transformation.addImage(
                "./images/avionColores/v2/RojoGrande.png",
                206,
                264,
                851,
                0
              );
              transformacionARojo.addCSS("elementoOculto");
    
              /*
        var transformacionAAmarillo = p2Transformation.addImage("./images/avionColores/v2/AmarilloGrande.png", 206, 264, 851, 0);
        transformacionAAmarillo.addCSS("elementoOculto");
        */
    
              p2Transformation.onload = function () {
                if (p2.properties.actual != opcionAvionVerde) {
                  transformacionARojo.addCSS("elementoVisible");
                }
                /*
          var transformacion = null;
          
          if(p2.properties.actual == opcionAvionAmarillo)
          {
            transformacion = transformacionAAmarillo;
          }
          else if(p2.properties.actual == opcionAvionMorado)
          {
            transformacion = transformacionAMorado;
          }
          else if(p2.properties.actual == opcionAvionRojo)
          {
            transformacion = transformacionARojo;
          }
          
          if(transformacion != null)
          {
            transformacion.addCSS("elementoVisible");
            //transformacion.addCSS("GyCTransicionColor");
          }
          */
              };
    
              p2Transformation.restart = function () {
                /*
          transformacionAMorado.addCSS("elementoOculto");
          transformacionAAmarillo.addCSS("elementoOculto");
          
          transformacionAMorado.removeCSS("elementoVisible");
          transformacionAAmarillo.removeCSS("elementoVisible");
          
          transformacionAMorado.style.left = "206px";
          transformacionAMorado.style.top = "264px";
          transformacionAMorado.style.width = "851px";
          */
                transformacionARojo.addCSS("elementoOculto");
                transformacionARojo.removeCSS("elementoVisible");
                transformacionARojo.style.left = "206px";
                transformacionARojo.style.top = "264px";
                transformacionARojo.style.width = "851px";
                /*
          transformacionAAmarillo.style.left = "206px";
          transformacionAAmarillo.style.top = "264px";
          transformacionAAmarillo.style.width = "851px";
          */
              };
              p2Transformation.restart();
    
              p.addKey(VK_ENTER, function () {
                try {
                  //p2.revisarRespuestaPagina2();
                  var movePlaneInterval = setInterval(movePlane, 33);
    
                  function movePlane() {
                    //mprimir(".       moviendo avión");
                    try {
                      var transformacion = null;
    
                      if (p2.properties.actual != opcionAvionVerde) {
                        transformacion = transformacionARojo;
                      }
                      /*
                if(p2.properties.actual == opcionAvionAmarillo)
                {
                  transformacion = transformacionAAmarillo;
                }
                else if(p2.properties.actual == opcionAvionMorado)
                {
                  transformacion = transformacionAMorado;
                }
                else if(p2.properties.actual == opcionAvionRojo)
                {
                  transformacion = transformacionARojo;
                }
                */
                      if (transformacion != null) {
                        var leftanterior = parseInt(
                          transformacion.style.left.replace("px", "")
                        );
                        var topanterior = parseInt(
                          transformacion.style.top.replace("px", "")
                        );
                        var widthanterior = parseInt(
                          transformacion.style.width.replace("px", "")
                        );
    
                        leftanterior -= 74;
                        topanterior += 42;
    
                        transformacion.style.left = leftanterior + "px";
                        transformacion.style.top = topanterior + "px";
    
                        if (leftanterior < -900) {
                          //imprimir("######## Terminando de mover");
                          clearInterval(movePlaneInterval);
                        }
                        //imprimir("############## " + transformacion.style.left +" - " +transformacion.style.top);
                        //transformacion.addCSS("GyCTransicionColor");
                      } else {
                        imprimir("transformación es null");
                        clearInterval(movePlaneInterval);
                      }
                    } catch (errorMove) {
                      imprimir(errorMove);
                    }
                  }
    
                  //imprimir("TIMEOUT Seleccionando COLOR: " + p2.properties.actual.src);
                } catch (errorT) {
                  imprimir(errorT);
                }
              });
    
              p2Transformation.addTimer(p2TransformationTimeout, function () {
                try {
                  //p2.revisarRespuestaPagina2();
                  var movePlaneInterval = setInterval(movePlane, 33);
    
                  function movePlane() {
                    //mprimir(".       moviendo avión");
                    try {
                      var transformacion = null;
    
                      if (p2.properties.actual != opcionAvionVerde) {
                        transformacion = transformacionARojo;
                      }
                      /*
                if(p2.properties.actual == opcionAvionAmarillo)
                {
                  transformacion = transformacionAAmarillo;
                }
                else if(p2.properties.actual == opcionAvionMorado)
                {
                  transformacion = transformacionAMorado;
                }
                else if(p2.properties.actual == opcionAvionRojo)
                {
                  transformacion = transformacionARojo;
                }
                */
                      if (transformacion != null) {
                        var leftanterior = parseInt(
                          transformacion.style.left.replace("px", "")
                        );
                        var topanterior = parseInt(
                          transformacion.style.top.replace("px", "")
                        );
                        var widthanterior = parseInt(
                          transformacion.style.width.replace("px", "")
                        );
    
                        leftanterior -= 74;
                        topanterior += 42;
    
                        transformacion.style.left = leftanterior + "px";
                        transformacion.style.top = topanterior + "px";
    
                        if (leftanterior < -900) {
                          //imprimir("######## Terminando de mover");
                          clearInterval(movePlaneInterval);
                        }
                        //imprimir("############## " + transformacion.style.left +" - " +transformacion.style.top);
                        //transformacion.addCSS("GyCTransicionColor");
                      } else {
                        imprimir("transformación es null");
                        clearInterval(movePlaneInterval);
                      }
                    } catch (errorMove) {
                      imprimir(errorMove);
                    }
                  }
    
                  //imprimir("TIMEOUT Seleccionando COLOR: " + p2.properties.actual.src);
                } catch (errorT) {
                  imprimir(errorT);
                }
              });
            }
    
            {
              // ======================================================================
              //                               PAGE 3  - Transformado
              // ======================================================================
    
              var p3;
    
              if (pruebaAlineadaAlTiempo == false) {
                p3 = createPage("p3", 27, 35);
              } else {
                p3 = createPage("p3", 86.66666, 93.505);
              }
    
              //var transformadoAMorado = p3.addImage("./images/avionColores/v2/morado_peq.png", 650, 590, 235, 0);
              //transformadoAMorado.addCSS("elementoOculto");
              var transformadoARojo = p3.addImage(
                "./images/avionColores/v2/rojo_peq.png",
                650,
                590,
                235,
                0
              );
              transformadoARojo.addCSS("elementoOculto");
              //var transformadoAAmarillo = p3.addImage("./images/avionColores/v2/amarillo_peq.png", 650, 590, 235, 0);
              //transformadoAAmarillo.addCSS("elementoOculto");
    
              p3.onload = function () {
                if (p2.properties.actual != null) {
                  var ruta = p2.properties.actual.src.split("/");
                  ruta = ruta[ruta.length - 1];
                  imprimir(
                    "~~~~~~~~~~~~~~~~~~ MOSTRAR CAMBIO segunda toma DEsde la pág3 " +
                      ruta
                  );
    
                  var rutaNueva = transformadoARojo.src.split("/");
                  rutaNueva = rutaNueva[rutaNueva.length - 1];
                  imprimir(
                    "~~~~~~~~~~~~~~~~~~ MOSTRAR CAMBIO segunda toma DEsde la pág3 " +
                      rutaNueva
                  );
    
                  /*
            if(p2.properties.actual == opcionAvionAmarillo)
            {
              transformadoAAmarillo.addCSS("elementoVisible");
            }
            else if(p2.properties.actual == opcionAvionRojo)
            {
              transformadoARojo.addCSS("elementoVisible");
            }
            else if(p2.properties.actual == opcionAvionMorado)
            {
              transformadoAMorado.addCSS("elementoVisible");
            }
            */
                  transformadoARojo.addCSS("elementoVisible");
                } else {
                  imprimir("~~~~~~~~~~~~~~~~~~ DEsde la pág3 NO HAY NADA :(");
                }
              };
    
              p3.restart = function () {
                //transformadoAMorado.removeCSS("elementoVisible");
                transformadoARojo.removeCSS("elementoVisible");
    
                //transformadoAAmarillo.removeCSS("elementoVisible");
    
                //transformadoAMorado.addCSS("elementoOculto");
                transformadoARojo.addCSS("elementoOculto");
                //transformadoAAmarillo.addCSS("elementoOculto");
              };
    
              p3.restart();
            }
    
            {
              // ======================================================================
              //                               PAGE 4  - Transformado en Barco 1
              // ======================================================================
    
              var pAvionEnBarco1;
    
              if (pruebaAlineadaAlTiempo == false) {
                pAvionEnBarco1 = createPage("pAvionEnBarco1", 27, 35);
              } else {
                pAvionEnBarco1 = createPage("pAvionEnBarco1", 116.333, 124.6);
              }
    
              /*
        var transformadoAMorado1 = pAvionEnBarco1.addImage("./images/avionColores/v2/morado_peq.png", 954, 488, 200, 0);
        transformadoAMorado1.addCSS("elementoOculto");
        transformadoAMorado1.addCSS("avionEnBarco");
        */
    
              var transformadoARojo1 = pAvionEnBarco1.addImage(
                "./images/avionColores/v2/rojo_peq.png",
                954,
                488,
                200,
                0
              );
              transformadoARojo1.addCSS("elementoOculto");
              transformadoARojo1.addCSS("avionEnBarco");
    
              /*
        var transformadoAAmarillo1 = pAvionEnBarco1.addImage("./images/avionColores/v2/amarillo_peq.png", 954, 488, 200, 0);
        transformadoAAmarillo1.addCSS("elementoOculto");
        transformadoAAmarillo1.addCSS("avionEnBarco");
        */
              pAvionEnBarco1.onload = function () {
                if (p2.properties.actual != null) {
                  var ruta = p2.properties.actual.src.split("/");
                  ruta = ruta[ruta.length - 1];
                  imprimir(
                    "~~~~~~~~~~~~~~~~~~ MOSTRAR CAMBIO segunda toma DEsde Avión en barco " +
                      ruta
                  );
    
                  /*
            if(p2.properties.actual == opcionAvionAmarillo)
            {
              transformadoAAmarillo1.addCSS("elementoVisible");
            }
            else if(p2.properties.actual == opcionAvionRojo)
            {
              transformadoARojo1.addCSS("elementoVisible");
            }
            else if(p2.properties.actual == opcionAvionMorado)
            {
              transformadoAMorado1.addCSS("elementoVisible");
            }
            */
                  transformadoARojo1.addCSS("elementoVisible");
                } else {
                  imprimir("~~~~~~~~~~~~~~~~~~ DEsde la pág3 NO HAY NADA :(");
                }
              };
    
              pAvionEnBarco1.restart = function () {
                /*
          transformadoAMorado1.removeCSS("elementoVisible");
          transformadoAAmarillo1.removeCSS("elementoVisible");
          
          transformadoAMorado1.addCSS("elementoOculto");
          transformadoAAmarillo1.addCSS("elementoOculto");
          */
                transformadoARojo1.addCSS("elementoOculto");
                transformadoARojo1.removeCSS("elementoVisible");
              };
    
              pAvionEnBarco1.restart();
            }
    
            {
              // ======================================================================
              //                               PAGE ¿Cuántos avioncitos somos?
              // ======================================================================
    
              var pCuantosSomos;
              var timeoutPaginaCuantosSomos;
    
              if (pruebaAlineadaAlTiempo == false) {
                pCuantosSomos = createPage("seleccionCuantos", 37, 43);
                timeoutPaginaCuantosSomos = 42;
              } else {
                pCuantosSomos = createPage("pCuantosSomos", 124.6, 133.41);
                timeoutPaginaCuantosSomos = 133.4 + desfaseNegroInicial / 1000;
              }
    
              var control = pCuantosSomos.addImage(
                "./images/4.3.Indicador_peq.gif",
                55,
                495,
                160,
                0
              );
              //var control2 = pCuantosSomos.addImage("./images/textos/CuantosSomos.png", 350, 60, 500, 0);
    
              var arr = [4];
    
              try {
                while (arr.length < 4) {
                  var num = Math.floor(Math.random() * 10);
                  var found = false;
                  for (current = 0; current < arr.length && !found; current++) {
                    if (arr[current] == num) {
                      found = true;
                    }
                  }
    
                  if (found == false) {
                    arr.push(num);
                  }
                }
    
                arr = shuffle(arr);
              } catch (error) {
                imprimir(error);
              }
    
              pCuantosSomos.properties.respuesta = null;
    
              var act = 0;
              while (
                act < arr.length &&
                pCuantosSomos.properties.respuesta == null
              ) {
                if (arr[act] == 4) {
                  pCuantosSomos.properties.respuesta = act + 1;
                }
                act++;
              }
    
              var grupoNumeros = pCuantosSomos.addGroup();
              var imgOp1 = createImage(
                "./images/textos/" + arr[0] + ".png",
                400,
                550,
                0,
                0
              );
              grupoNumeros.add(imgOp1);
              var imgOp2 = createImage(
                "./images/textos/" + arr[1] + ".png",
                550,
                550,
                0,
                0
              );
              grupoNumeros.add(imgOp2);
              var imgOp3 = createImage(
                "./images/textos/" + arr[2] + ".png",
                700,
                550,
                0,
                0
              );
              grupoNumeros.add(imgOp3);
              var imgOp4 = createImage(
                "./images/textos/" + arr[3] + ".png",
                850,
                550,
                0,
                0
              );
              grupoNumeros.add(imgOp4);
    
              var grupoTextoCuantosSomos = pCuantosSomos.addGroup();
              var fondoTextoCuantosSomos = createImage(
                "./images/volando/cielo_fondo_texto.png",
                400,
                5,
                500,
                0
              );
              grupoTextoCuantosSomos.add(fondoTextoCuantosSomos);
              var tituloCuantosSomos = createImage(
                "./images/textos/en/howManyAreWe.png",
                440,
                40,
                460,
                0
              );
              grupoTextoCuantosSomos.add(tituloCuantosSomos);
              grupoTextoCuantosSomos.addCSS("elementoOculto");
    
              pCuantosSomos.actualizarSeleccionCuantos = function () {
                var anterior = pCuantosSomos.properties.imgActual;
                var actual = null;
                if (pCuantosSomos.properties.actual == 1) {
                  actual = imgOp1;
                } else if (pCuantosSomos.properties.actual == 2) {
                  actual = imgOp2;
                } else if (pCuantosSomos.properties.actual == 3) {
                  actual = imgOp3;
                } else if (pCuantosSomos.properties.actual == 4) {
                  actual = imgOp4;
                }
    
                if (anterior != null) {
                  anterior.removeCSS("GyCFocusElement");
                }
                if (actual != null) {
                  actual.addCSS("GyCFocusElement");
                  pCuantosSomos.properties.imgActual = actual;
                }
              };
    
              pCuantosSomos.seleccionarCuantosIzquierda = function () {
                pCuantosSomos.properties.actual--;
    
                if (pCuantosSomos.properties.actual == 0) {
                  pCuantosSomos.properties.actual = 4;
                }
                pCuantosSomos.actualizarSeleccionCuantos();
              };
    
              pCuantosSomos.seleccionarCuantosDerecha = function () {
                pCuantosSomos.properties.actual++;
    
                if (pCuantosSomos.properties.actual == 5) {
                  pCuantosSomos.properties.actual = 1;
                }
                pCuantosSomos.actualizarSeleccionCuantos();
              };
    
              pCuantosSomos.addKey(
                VK_LEFT,
                pCuantosSomos.seleccionarCuantosIzquierda
              );
              pCuantosSomos.addKey(
                VK_RIGHT,
                pCuantosSomos.seleccionarCuantosDerecha
              );
    
              pCuantosSomos.addKey(VK_ENTER, function () {
                imprimir("key OK");
              });
    
              pCuantosSomos.addTimer(timeoutPaginaCuantosSomos, function () {
                imprimir("TIMEOUT  #OPción " + pCuantosSomos.properties.actual);
              });
    
              pCuantosSomos.restart = function () {
                var arr = [4];
    
                while (arr.length < 4) {
                  var num = Math.floor(Math.random() * 10);
                  var found = false;
                  for (current = 0; current < arr.length && !found; current++) {
                    if (arr[current] == num) {
                      found = true;
                    }
                  }
    
                  if (found == false) {
                    arr.push(num);
                  }
                }
    
                arr = shuffle(arr);
    
                pCuantosSomos.properties.respuesta = null;
    
                var act = 0;
                while (
                  act < arr.length &&
                  pCuantosSomos.properties.respuesta == null
                ) {
                  if (arr[act] == 4) {
                    pCuantosSomos.properties.respuesta = act + 1;
                  }
                  act++;
                }
                //imprimir( "RESP: " + arr[pCuantosSomos.properties.respuesta] + "POS : " + pCuantosSomos.properties.respuesta );
    
                imgOp1.src = "./images/textos/" + arr[0] + ".png";
                imgOp2.src = "./images/textos/" + arr[1] + ".png";
                imgOp3.src = "./images/textos/" + arr[2] + ".png";
                imgOp4.src = "./images/textos/" + arr[3] + ".png";
    
                if (pCuantosSomos.properties.imgActual != null) {
                  pCuantosSomos.properties.imgActual.removeCSS("GyCFocusElement");
                }
    
                pCuantosSomos.properties.actual = 1;
                pCuantosSomos.properties.imgActual = imgOp1;
                pCuantosSomos.actualizarSeleccionCuantos();
              };
    
              pCuantosSomos.updateLanguage = function () {
                var nuevoIdioma = darIdiomaSeleccionado();
                //imprimir("Actualizando Pág1 a : " + nuevoIdioma  +"  => " +"./images/textos/" + nuevoIdioma + "/lighter.png");
                tituloCuantosSomos.src =
                  "./images/textos/" + nuevoIdioma + "/howManyAreWe.png";
                if (nuevoIdioma == "co") {
                  grupoTextoCuantosSomos.addCSS("elementoOculto");
                } else {
                  if (nuevoIdioma == "de") {
                  }
                  //tituloCuantosSomos.style.width = "500px";
                  //tituloCuantosSomos.style.left = "200px";
                  grupoTextoCuantosSomos.removeCSS("elementoOculto");
                }
              };
    
              pCuantosSomos.restart();
            }
    
            {
              // ======================================================================
              //                               PAGE Cuantos somos - Bad response
              // ======================================================================
              var pCuantosBad;
    
              if (pruebaAlineadaAlTiempo == false) {
                pCuantosBad = createPage("cuantosSomosIncorrecto", 44, 150);
              } else {
                pCuantosBad = createPage("pCuantosBad", 133.418, 138.1);
              }
    
              var grupoCuantosBad = pCuantosBad.addGroup();
              var fondoCielo = createImage(
                "./images/volando/cielo_peq.jpg",
                0,
                0,
                0,
                0
              );
              grupoCuantosBad.add(fondoCielo);
    
              var nube1 = createImage(
                "./images/volando/nube_peq.png",
                100,
                150,
                0,
                0
              );
              nube1.addCSS("nube1");
              grupoCuantosBad.add(nube1);
    
              var avionCandelario = createImage(
                "./images/volando/avionPapelCande_nit_peq.png",
                200,
                410,
                0,
                0
              );
              avionCandelario.addCSS("avionCandelario");
              grupoCuantosBad.add(avionCandelario);
              var candeDiceNo = createImage(
                "./images/5.2CandeDiceNo_micro.gif",
                480,
                75,
                300,
                0
              );
              candeDiceNo.addCSS("candelarioEnAvion");
              grupoCuantosBad.add(candeDiceNo);
              grupoCuantosBad.addCSS("elementoOculto");
    
              pCuantosBad.onload = function () {
                //imprimir("Validando número de aviones: " + pCuantosSomos.properties.actual +" || " + pCuantosSomos.properties.respuesta);
                if (
                  pCuantosSomos.properties.actual !=
                  pCuantosSomos.properties.respuesta
                ) {
                  grupoCuantosBad.removeCSS("elementoOculto");
                  grupoCuantosBad.addCSS("elementoVisible");
                  imprimir(
                    ">             > MOSTRANDO RESPUESTA BAD: " +
                      pCuantosSomos.properties.actual
                  );
                } else {
                  imprimir(
                    ">             > MOSTRANDO RESPUESTA Bieeen!!: " +
                      pCuantosSomos.properties.actual
                  );
                }
              };
    
              pCuantosBad.restart = function () {
                grupoCuantosBad.addCSS("elementoOculto");
                grupoCuantosBad.removeCSS("elementoVisible");
              };
    
              pCuantosBad.restart();
            }
    
            {
              // ======================================================================
              //                               PAGE 4  - Transformado en Barco 2
              // ======================================================================
    
              var pAvionEnBarco2;
    
              if (pruebaAlineadaAlTiempo == false) {
                pAvionEnBarco2 = createPage("pAvionEnBarco2", 27, 35);
              } else {
                pAvionEnBarco2 = createPage("pAvionEnBarco2", 138.1, 139.9);
              }
              /*
        var transformadoAMorado2 = pAvionEnBarco2.addImage("./images/avionColores/v2/morado_peq.png", 954, 488, 200, 0);
        transformadoAMorado2.addCSS("elementoOculto");
        transformadoAMorado2.addCSS("avionEnBarco");
        */
              var transformadoARojo2 = pAvionEnBarco2.addImage(
                "./images/avionColores/v2/rojo_peq.png",
                954,
                488,
                200,
                0
              );
              transformadoARojo2.addCSS("elementoOculto");
              transformadoARojo2.addCSS("avionEnBarco");
              /*
        var transformadoAAmarillo2 = pAvionEnBarco2.addImage("./images/avionColores/v2/amarillo_peq.png", 954, 488, 200, 0);
        transformadoAAmarillo2.addCSS("elementoOculto");
        transformadoAAmarillo2.addCSS("avionEnBarco");
        */
              pAvionEnBarco2.onload = function () {
                if (p2.properties.actual != null) {
                  /*
            var ruta = p2.properties.actual.src.split("/");
            ruta = ruta[ruta.length - 1];
            imprimir("~~~~~~~~~~~~~~~~~~ MOSTRAR CAMBIO segunda toma DEsde Barco 2 " + ruta);
            
            /*
            if(p2.properties.actual == opcionAvionAmarillo)
            {
              transformadoAAmarillo2.addCSS("elementoVisible");
            }
            else if(p2.properties.actual == opcionAvionRojo)
            {
              transformadoARojo2.addCSS("elementoVisible");
            }
            else if(p2.properties.actual == opcionAvionMorado)
            {
              transformadoAMorado2.addCSS("elementoVisible");
            }
            
            */
                  transformadoARojo2.addCSS("elementoVisible");
                } else {
                  imprimir("~~~~~~~~~~~~~~~~~~ DEsde la pág3 NO HAY NADA :(");
                }
              };
    
              pAvionEnBarco2.restart = function () {
                /*
          transformadoAMorado2.removeCSS("elementoVisible");
          transformadoAAmarillo2.removeCSS("elementoVisible");
          
          transformadoAMorado2.addCSS("elementoOculto");
          transformadoAAmarillo2.addCSS("elementoOculto");
          */
    
                transformadoARojo2.addCSS("elementoOculto");
                transformadoARojo2.removeCSS("elementoVisible");
              };
    
              pAvionEnBarco2.restart();
            }
    
            {
              // ======================================================================
              //                               PAGE 4  - Transformado en Barco 3
              // ======================================================================
    
              var pAvionEnBarco3;
    
              if (pruebaAlineadaAlTiempo == false) {
                pAvionEnBarco3 = createPage("pAvionEnBarco3", 27, 35);
              } else {
                pAvionEnBarco3 = createPage("pAvionEnBarco3", 142, 143.5);
              }
              /*
        var transformadoAMorado3 = pAvionEnBarco3.addImage("./images/avionColores/v2/morado_peq.png", 442, 412, 155, 0);
        transformadoAMorado3.addCSS("elementoOculto");
        transformadoAMorado3.addCSS("avionEnBarco");
        */
              var transformadoARojo3 = pAvionEnBarco3.addImage(
                "./images/avionColores/v2/rojo_peq.png",
                442,
                412,
                155,
                0
              );
              transformadoARojo3.addCSS("elementoOculto");
              transformadoARojo3.addCSS("avionEnBarco");
              /*
        var transformadoAAmarillo3 = pAvionEnBarco3.addImage("./images/avionColores/v2/amarillo_peq.png", 442, 412, 155, 0);
        transformadoAAmarillo3.addCSS("elementoOculto");
        transformadoAAmarillo3.addCSS("avionEnBarco");
        */
              pAvionEnBarco3.onload = function () {
                if (p2.properties.actual != null) {
                  /*
            var ruta = p2.properties.actual.src.split("/");
            ruta = ruta[ruta.length - 1];
            imprimir("~~~~~~~~~~~~~~~~~~ MOSTRAR CAMBIO segunda toma DEsde la Barco 3 " + ruta);
            if(p2.properties.actual == opcionAvionAmarillo)
            {
              transformadoAAmarillo3.addCSS("elementoVisible");
            }
            else if(p2.properties.actual == opcionAvionRojo)
            {
              transformadoARojo3.addCSS("elementoVisible");
            }
            else if(p2.properties.actual == opcionAvionMorado)
            {
              transformadoAMorado3.addCSS("elementoVisible");
            }
            */
                  transformadoARojo3.addCSS("elementoVisible");
                } else {
                  imprimir("~~~~~~~~~~~~~~~~~~ DEsde la pág3 NO HAY NADA :(");
                }
              };
    
              pAvionEnBarco3.restart = function () {
                /*
          transformadoAMorado3.removeCSS("elementoVisible");
          transformadoAAmarillo3.removeCSS("elementoVisible");
          
          transformadoAMorado3.addCSS("elementoOculto");
          transformadoAAmarillo3.addCSS("elementoOculto");
          */
                transformadoARojo3.removeCSS("elementoVisible");
                transformadoARojo3.addCSS("elementoOculto");
              };
    
              pAvionEnBarco3.restart();
            }
    
            {
              // ======================================================================
              //                               PAGE 4  - Transformado en Barco 4
              // ======================================================================
    
              var pAvionEnBarco4;
    
              if (pruebaAlineadaAlTiempo == false) {
                pAvionEnBarco4 = createPage("pAvionEnBarco4", 27, 35);
              } else {
                pAvionEnBarco4 = createPage("pAvionEnBarco4", 146.333, 150.5333);
              }
    
              /*
        var transformadoAMorado4 = pAvionEnBarco4.addImage("./images/avionColores/v2/morado_peq.png", 915, 510, 322, 0);
        transformadoAMorado4.addCSS("elementoOculto");
        transformadoAMorado4.addCSS("avionEnBarco");
        */
              var transformadoARojo4 = pAvionEnBarco4.addImage(
                "./images/avionColores/v2/rojo_peq.png",
                915,
                510,
                322,
                0
              );
              transformadoARojo4.addCSS("elementoOculto");
              transformadoARojo4.addCSS("avionEnBarco");
    
              /*
        var transformadoAAmarillo4 = pAvionEnBarco4.addImage("./images/avionColores/v2/amarillo_peq.png", 915, 510, 322, 0);
        transformadoAAmarillo4.addCSS("elementoOculto");
        transformadoAAmarillo4.addCSS("avionEnBarco");
        */
    
              pAvionEnBarco4.onload = function () {
                if (p2.properties.actual != null) {
                  /*
            var ruta = p2.properties.actual.src.split("/");
            ruta = ruta[ruta.length - 1];
            imprimir("~~~~~~~~~~~~~~~~~~ MOSTRAR CAMBIO segunda toma DEsde BARCO 4 " + ruta);
            
            if(p2.properties.actual == opcionAvionAmarillo)
            {
              transformadoAAmarillo4.addCSS("elementoVisible");
            }
            else if(p2.properties.actual == opcionAvionRojo)
            {
              transformadoARojo4.addCSS("elementoVisible");
            }
            else if(p2.properties.actual == opcionAvionMorado)
            {
              transformadoAMorado4.addCSS("elementoVisible");
            }
            */
                  transformadoARojo4.addCSS("elementoVisible");
                } else {
                  imprimir("~~~~~~~~~~~~~~~~~~ DEsde la pág3 NO HAY NADA :(");
                }
              };
    
              pAvionEnBarco4.restart = function () {
                /*
          transformadoAMorado4.removeCSS("elementoVisible");
          transformadoAAmarillo4.removeCSS("elementoVisible");
          
          transformadoAMorado4.addCSS("elementoOculto");
          transformadoAAmarillo4.addCSS("elementoOculto");
          */
                transformadoARojo4.addCSS("elementoOculto");
                transformadoARojo4.removeCSS("elementoVisible");
              };
    
              pAvionEnBarco4.restart();
            }
            /*
      {
        var SYNC;
        if(pruebaAlineadaAlTiempo == false)
        {
          SYNC = createPage("seleccionMaterial", 0, 2);
        }
        else
        {
          SYNC = createPage("SYNC", broadcastDuration + 0.10, broadcastDuration+ 0.2);
        }
        SYNC.onload = function()
        {
        /*
          //Sincronización
          var tiempoAntesDeSync = new Date().getTime();
          try{
            getJSON('./beebeeTime.json',
            function(err, data) {
              if (err !== null) {
              imprimir('Something went wrong con JSON: ' + err);
              } else {
              initialBroadcastTime = (data.time);
              lastBroadcastTime = 0;
              var tiempoDespuesDeSync = new Date().getTime();
              var diferencia = tiempoDespuesDeSync - tiempoAntesDeSync;
              imprimir( tiempoDespuesDeSync + " [STB time]");
              imprimir( initialBroadcastTime + " [" + diferencia + "]  Sincronizando con BeeBee ");
              imprimir( zeroTime + " [Zero Time]");
              
              }
            });
          }catch(errorS)
          {
            imprimir(errorS);
          }
          *
        };
      }
      */
          }
        </script>
        <script type="text/javascript" src="https://itv.mit-xperts.com/hbbtvtest/keycodes.js"></script>
        <!-- <link rel="stylesheet" type="text/css" href="css/application.css" /> -->
      </head>
    
      <body onload="init()">
        

      ${content}
  
    <!-- No quitar -->
    <object id="oipfID" type="application/oipfApplicationManager"
      style="position: absolute; left: 0px; top: 0px; width: 0px; height: 0px"></object>
    <object type="application/oipfConfiguration"
      style="position: absolute; left: 0px; top: 0px; width: 0px; height: 0px"></object>
    <!-- No quitar -->
  
    <div id="vidCont"></div>
    <script type="text/javascript">
      var itemsLineTime = ${items};
      var tiempo = ${endTime}
      var actual = 0
      var interval = setInterval(() => {
      for (var i = 0; i<itemsLineTime.length; i++){ 
        var item = itemsLineTime[i]
        var element = document.getElementById(item._id)
        if(actual === item.startTime){
          element.style.display= "block"
        }
        if(actual === item.endTime){
          element.style.display= "none"
        }
      };
      actual+=50
      if(actual>=tiempo) clearInterval(interval)
      }, 50)
    </script>

  </body>
  
  </html>
`
return text;
}

export default generate
