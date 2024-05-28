let info_Statistics=[];
function mainScreen() {       //old main screen
for(let z=0; z<buttons.length;z++){
   buttons[z].show();
  }
}

function def_Main(){ 
  for(let i=0; i<buttonsNames.length;i++){ //Creacao de botoes do menu principal
    buttons[i] = new createbuttons(windowWidth*0.5, windowHeight*0.25+btnSpace,150,50,20,buttonsNames[i]);
    btnSpace +=70     
  }
}

function eventos_mainMenu(){
  

  if(buttons[0].es_Clickeado(mouseX,mouseY)){ //boton Studio_Lobby
    screen=5;
    def_StudioLobby();
    //seccion de elementos DOM para Studio
    colorPicker=createColorPicker('yellow');//hay que colocarle un valor default porque la funcion mostrarPincel() necesita un input de color desde el inicio.
    //cambiar las dimensiones:
    width_Slider=createSlider(5, 220, 20, 5)
    height_Slider=createSlider(5, 220, 20, 5)
    slider_Materiales=createSlider(0,4)
    loop()
  }
if(buttons[1].es_Clickeado(mouseX,mouseY)){
  screen=7;//shop()
  def_Shop();

  loop();
}
if(buttons[2].es_Clickeado(mouseX,mouseY)){
  screen=9;//statistics()
  def_Statistics();
  //ahora tenemos que hacer el request de informacion para las tablas:
  loadJSON('/getStatisticsShop/'+usuario_Actual.id,(respostaServidor)=>{
    console.log("Respuesta del servidor para encontrar informacion del artista:")
    if(respostaServidor.length>0){
      info_Statistics=respostaServidor
      ;
    }
  });

  loop();
}
  if(buttons[3].es_Clickeado(mouseX,mouseY)){ //boton About
    screen=4;
    loop()
  }

  if(buttons[4].es_Clickeado(mouseX,mouseY)){ //boton Exit
    screen=0;
    //reiniciando las variables
    dibujo=[]
    usuario_Actual=0
    lista_Dibujos=[]; //
    dib_recibido=[]; //dibujo recibido de servidor al hacer JSON.parse()
    dibujo_AMostrar=0

    loop()
  }
}