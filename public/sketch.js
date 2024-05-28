let screen = 0; //ecra
let logLogo;//imagens
//variables para Animacion del fondo
let fundo;
let figuras=[];
//botones de MainMenu
let btnSpace=0
let buttonsNames=["Studio","Shop","Statistic","About","Exit"]
let buttons=[]
//variables del menu Registro-login
let registrarBtn;
let volverBtn;
let nameInput 
let passInput 
let btnLogin;
//variables de menu About
let backAbout;
let features;
//Variables para studio
let btn_Lobby=[];

//variables almazenadas de servidor en el cliente:
let usuario_Actual;
let lista_Dibujos=[]; //
let dib_recibido=[]; //dibujo recibido de servidor al hacer JSON.parse()
let dibujo_AMostrar=0;

//temporales: 
let colorRestaurado

function preload() {
  logLogo = loadImage("logoOrig.png")
}

function setup() {
  //definicion de las variables y creacion de los botones generales y estaticos(no dependen de base de datos).
  def_Fundo() //crea las variables definidas para el fondo.
  def_Main()
  def_RegisterLogin();
  def_About();
  def_Studio();
 
  createCanvas(windowWidth,windowHeight); 
  fundo=createGraphics(windowWidth,windowHeight);//tiene que ser definido dentro de una funcion de p5.js porque fuera no es reconocida

}// porfavor no tocar este parentesis// nao mexer com a chave ******


function draw() { //aqui solo colocar cosas para que se repitan, no poner menu de botones input .remove porque se come la memoria?
  draw_Fundo()
  changeScreen()
}

function mousePressed() {
//---------------------------------------------------------Click On Buttons--------------------------------------------------------------------------------------
  //Eventos de la Screen StartScreen
if(screen==0){ //si estas en la start_screen 
  if(loginMenu_btn.es_Clickeado(mouseX,mouseY)){
    screen=1;
    console.log("login clicado")
  }
  if(registerMenu_btn.es_Clickeado(mouseX,mouseY)){
    screen=2;
    
    console.log("register clicado")
  }
}
//Eventos de la Screen  menuLogin
if(screen==1){
  if(volverBtn.es_Clickeado(mouseX,mouseY)){
    //hacemos la verificacion de login con servidor:
    screen=0;
    nameInput.remove()
    passInput.remove()
    loop()
    console.log("es clicado")
    console.log(screen)

  }
  if(btnLogin.es_Clickeado(mouseX,mouseY)){

    let name = nameInput.value();
    let pass = passInput.value();
  
    let user = {
      "name": name,
      "password": pass
    }
  console.log(user)

    httpPost('/login',user,'json',(respostaServidor)=>{
  
      usuario_Actual = respostaServidor[0];
      console.log(usuario_Actual)
      if(respostaServidor.length>0){
        nameInput.remove();
        passInput.remove();
        screen=3;
        dibujo=[]
        listar_Disenhos()
        listar_Items();

        loop();
      }else{
        console.log("No esta Registrado")
      }
    })

  }
}//final menuLogin


//Eventos de la Screen  menuRegistro
if(screen==2){
  if(volverBtn.es_Clickeado(mouseX,mouseY)){
    screen=0;
    nameInput.remove()
    passInput.remove()
    loop()

  }


  if(registrarBtn.es_Clickeado(mouseX,mouseY)){
    let name = nameInput.value();
    let pass = passInput.value();
  
    let user = {
      "name": name,
      "password": pass
     }
  
    httpPost('/register',user,'json',(respostaServidor)=>{
      if(respostaServidor.length>0){
        console.log("FUE REGISTRADO")
        screen=1;
      }else{
        console.log("NO FUE REGISTRADO")
      }
    })

  }
}//final menuRegistro

//Eventos de la Screen  menuPrincipal
if(screen==3){

  if(buttons[0].es_Clickeado(mouseX,mouseY)){ //boton Studio_Lobby
    screen=5;
    def_StudioLobby();
    //seccion de elementos DOM para Studio
    colorPicker=createColorPicker('yellow');//hay que colocarle un valor default porque la funcion mostrarPincel() necesita un input de color desde el inicio.
    //cambiar las dimensiones:
    width_Slider=createSlider(5, 220, 20, 5)
    height_Slider=createSlider(5, 220, 20, 5)
    console.log("es clicado")
    console.log(screen)
    loop()
  }
if(buttons[1].es_Clickeado(mouseX,mouseY)){
  screen=7;//shop()
  def_Shop();

  loop();
}
  if(buttons[3].es_Clickeado(mouseX,mouseY)){ //boton About
    screen=4;
    loop()
    console.log("es clicado")
    console.log(screen)

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
    console.log("es clicado")
    console.log(screen)

  }
}
//Eventos de la Screen About
if(screen==4){
  if(backAbout.es_Clickeado(mouseX,mouseY)){
    screen=3;
  }
}
if(screen==5){
  eventos_lobby()
}
if(screen==6){
  eventos_interface()
}
if(screen==7){
  eventos_shop()
}
if(screen==8){item_View()}

//---------------------------------------------------------End of Click On Buttons--------------------------------------------------------------------------------------

}//termina mousePressed()
  
//Controladores de  Pantallas
function changeScreen(){
  if(screen==0){
    startScreen();
  }
  if(screen==1){    
    menuLogin();
  }
  if(screen==2){
    menuRegisto();
  }
  if(screen==3){
    mainScreen();
  }
  if(screen==4){
    infoAbout();
  }
  if(screen==5){
    studio_Lobby()
  }
  if(screen==6){
    studio();
  }
  if(screen==7){shop()}
  if(screen==8){item_View()}
}

function listar_Disenhos(){
  loadJSON('/getDibujos/'+usuario_Actual.id,(respostaServidor)=>{
    console.log("Respuesta del servidor a Listar Diseños debe de enviar un array con los diseños:")
    if(respostaServidor.length>0){
      lista_Dibujos=respostaServidor
      ;
    }
  loop();
  });
}
function dibujar_BD(Array_dibujo_recibido){ //Arreglado
  for(let i=0; i<Array_dibujo_recibido.length;i++){

    if(Array_dibujo_recibido[i].fig_num==0){
      dibujo.push(new Elipse(Array_dibujo_recibido[i].pointX,Array_dibujo_recibido[i].pointY,Array_dibujo_recibido[i].ancho,Array_dibujo_recibido[i].largo,Array_dibujo_recibido[i].color, Array_dibujo_recibido[i].w_width, Array_dibujo_recibido[i].w_height))
  }
  if(Array_dibujo_recibido[i].fig_num==2){
      dibujo.push(new Triangulo(Array_dibujo_recibido[i].pointX,Array_dibujo_recibido[i].pointY,Array_dibujo_recibido[i].base,Array_dibujo_recibido[i].altura,Array_dibujo_recibido[i].color,Array_dibujo_recibido[i].w_width, Array_dibujo_recibido[i].w_height))
  }
  if(Array_dibujo_recibido[i].fig_num==1){
      dibujo.push(new Rectangulo(Array_dibujo_recibido[i].pointX,Array_dibujo_recibido[i].pointY,Array_dibujo_recibido[i].ancho,Array_dibujo_recibido[i].largo,Array_dibujo_recibido[i].color, Array_dibujo_recibido[i].w_width, Array_dibujo_recibido[i].w_height))
  }
  }
  actualizarIndice(dibujo)
  responsibidade(dibujo,windowWidth, windowHeight)
}