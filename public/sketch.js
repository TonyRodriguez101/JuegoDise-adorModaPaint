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

let tarjeta=[];

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
  def_Item_View();
 
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
if(screen==0){eventos_startScreen()}
if(screen==1){eventos_login()}
if(screen==2){eventos_registro()}
if(screen==3){eventos_mainMenu()}
if(screen==4){eventos_about()}
if(screen==5){eventos_lobby()}
if(screen==6){eventos_interface()}
if(screen==7){eventos_shop()}
if(screen==8){eventos_itemView()}
if(screen==9){eventos_Statistics()}

//---------------------)------------------------------------End of Click On Buttons--------------------------------------------------------------------------------------

}//termina mousePressed()
  
//Controladores de  Pantallas
function changeScreen(){
  if(screen==0){startScreen()}
  if(screen==1){menuLogin()}
  if(screen==2){menuRegisto()}
  if(screen==3){mainScreen()}
  if(screen==4){infoAbout()}
  if(screen==5){studio_Lobby()}
  if(screen==6){studio()}
  if(screen==7){shop()}
  if(screen==8){item_View()}
  if(screen==9){statistic()}
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