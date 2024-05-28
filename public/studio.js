//botones RGB
let colorPicker
//botones switch figura:
let fig_Elipse, fig_Triangle, fig_Rect
//variable para switch figura:
let fig_Actual=0
//variables para los sliders width e height
let width_Slider, height_Slider
//variables que alamazenan tamanhoX, tamanhoY
let tamanhoX, tamanhoY //van a almazenar el valor del slider 
//botones extras:
let borracha, guardar, sell, switch_Materiales
//variable borrador:
let borracha_Valor=false;

//arrays almazenaje
let interface; //guarda los botones del studio
let dibujo;  //guardar todos los objetos del dibujo

// variables para el popUP de confirmar venta
let sellPopupVisible = false;
let designNameInput, priceInput, confirmSellButton;

//variables para los materiales
let modelos=false
let modelo_Actual=0
let slider_Materiales;

//resize de los botones de la interface-----> intento si queda tiempo
// Valores fraccionarios para las posiciones y dimensiones de los botones
let guardarX = 3 / 5;
let guardarY = 5.4 / 6;
let guardarWidth = 100;
let guardarHeight = 50;

let sellX = 3.4 / 5;
let sellY = 5.4 / 6;
let sellWidth = 100;
let sellHeight = 50;

let backX = 3.8 / 5;
let backY = 5.4 / 6;
let backWidth = 100;
let backHeight = 50;

let ellipseX = 1 / 15;
let ellipseY = 1 / 10;
let ellipseWidth = 100;
let ellipseHeight = 40;

let triangleX = 2.4 / 15;
let triangleY = 1 / 10;
let triangleWidth = 100;
let triangleHeight = 40;

let rectX = 3.8 / 15;
let rectY = 1 / 10;
let rectWidth = 100;
let rectHeight = 40;

let eraserX = 2.4 / 15;
let eraserY = 0.84 ;
let eraserWidth = 120;
let eraserHeight = 60;

function studio() { //para colocar en la funcion draw()
    background(0,0);
    push()
    rectMode(CORNER)
    stroke(67, 75, 154);
    strokeWeight(5);
    rect(windowWidth - (3 * windowWidth) / 5-13,0, (3 * windowWidth)/5+13, windowHeight-windowHeight/5+12,50,0,0,50);
    pop()
    if(dibujo.length>0){ // responsibidade del dibujo
      responsibidade(dibujo, windowWidth, windowHeight)
    }
//--------------------------------------------------------MOstrando botones--------------------------------------------
for(let i=0; i<interface.length;i++){
  interface[i].show()
}
push();
fill(0, 10);
// Para los textos:
rect(windowWidth * 2.4 / 15, windowHeight / 19 - windowHeight * 0.004, windowWidth * 220 / 1920, windowHeight * 32 / 1080); // Select figure
rect(windowWidth * 2.4 / 15, windowHeight / 6 - windowHeight * 0.004, windowWidth * 150 / 1920, windowHeight * 32 / 1080); // Value red
rect(windowWidth * 2.4 / 15, windowHeight / 2.6 + windowHeight * 90 / 1080, windowWidth * 270 / 1920, windowHeight * 32 / 1080); // Modify dimension
rect(windowWidth * 2.4 / 15, windowHeight / 2.6 + windowHeight * 138 / 1080, windowWidth * 154 / 1920, windowHeight * 32 / 1080); // Value Width
rect(windowWidth * 2.4 / 15, windowHeight / 2.6 + windowHeight * 234 / 1080, windowWidth * 154 / 1920, windowHeight * 32 / 1080); // Value Height
rect(windowWidth * 2.4 / 15, windowHeight / 2.6 + windowHeight * 342 / 1080, windowWidth * 200 / 1920, windowHeight * 32 / 1080); // Others options

// Para los números:
rect(windowWidth * 2 / 9, windowHeight / 2.6 + windowHeight * 170 / 1080, windowWidth * 50 / 1920, windowHeight * 30 / 1080); // Width
rect(windowWidth * 2 / 9, windowHeight / 2.6 + windowHeight * 265 / 1080, windowWidth * 50 / 1920, windowHeight * 30 / 1080); // Height
pop();

push();
fill(255);
textSize(windowWidth * 20 / 1920);
textAlign(CENTER);
push();
textSize(windowWidth * 25 / 1920); // Subsección
text("Select your Figure:", windowWidth * 2.4 / 15, windowHeight / 19);
pop();
text("Select the Color: ", windowWidth * 2.4 / 15, windowHeight / 6);
colorPicker.position(windowWidth * 2.17 / 15, windowHeight / 6 + windowHeight * 20 / 1080);
push();
textSize(windowWidth * 25 / 1920); // Subsección
text("Select the type of model", windowWidth * 2.4 / 15, (windowHeight / 6 + windowHeight * 20 / 1080 + windowHeight / 2.6 + windowHeight * 80 / 1080) / 2); // Nuevo Text()
pop();

slider_Materiales.position(windowWidth * 2 / 18, (windowHeight / 6 + windowHeight * 20 / 1080 + windowHeight / 6 + windowHeight * 50 / 1080)); // Posición del nuevo slider
modelo_Actual=slider_Materiales.value();
push();
textSize(windowWidth * 25 / 1920); // Subsección
text("Modify the dimensions!", windowWidth * 2.4 / 15, windowHeight / 2.6 + windowHeight * 100 / 1080);
pop();
text("Value of Width: ", windowWidth * 2.4 / 15, windowHeight / 2.6 + windowHeight * 145 / 1080);
width_Slider.position(windowWidth * 2 / 18, windowHeight / 2.6 + windowHeight * 160 / 1080); // Slider X
tamanhoX = width_Slider.value();
text(tamanhoX, windowWidth * 2 / 9, windowHeight / 2.6 + windowHeight * 175 / 1080); // Valor slider X
text("Value of Height: ", windowWidth * 2.4 / 15, windowHeight / 2.6 + windowHeight * 240 / 1080);
height_Slider.position(windowWidth * 2 / 18, windowHeight / 2.6 + windowHeight * 255 / 1080); // Slider Y
tamanhoY = height_Slider.value();
text(tamanhoY, windowWidth * 2 / 9, windowHeight / 2.6 + windowHeight * 270 / 1080); // Valor slider Y
push();
textSize(windowWidth * 25 / 1920);
text("Others Options:! ", windowWidth * 2.4 / 15, windowHeight / 2.6 + windowHeight * 350 / 1080);
pop();
pop();


        //--------------------------------------------------------End MOstrando botones--------------------------------------------
   // rectMode(CENTER);
    //Ahora hacemos como si fuera un switch para las 3 figuras pero con if:
     if (onArea(mouseX, mouseY)) {//Este es para todas las figuras
        //porque en la funcion dibujar() ya se define para cada figura
        // y la funcion borrar() funciona para todos porque tienen el mismo metodo isClicked()
        mostrarPincel(); //se vera la figura a dibujar en el mouse
    

        if (mouseIsPressed && borracha_Valor == false) {
            dibujar(fig_Actual);
          }
          if (mouseIsPressed && borracha_Valor == true) {
            borrar(dibujo);
          }
    }
    if(dibujo.length>0){
        for (let i = 0; i < dibujo.length; i++) {
            dibujo[i].show();
        }
        }
  
        //area del popup-------------
           // Crear elementos para el popup
        if(sellPopupVisible){
         dibuja_popUp()
        }

        //modelos---Imagenes de la ropa
        materiales()
  

}//final de studio() para la funcion draw()
  
  
  //creamos la parte estetica con los botones aqui
  
  //crear solo el boton que guarda el array de objetos: 
  function def_Studio(){
    dibujo=[]
    //definir y crear todos los botones del studio


// Crear botones usando los valores fraccionarios
guardar = new createbuttons(windowWidth * guardarX, windowHeight * guardarY, guardarWidth, guardarHeight, 20, "SAVE");
sell = new createbuttons(windowWidth * sellX, windowHeight * sellY, sellWidth, sellHeight, 20, "SELL");
back = new createbuttons(windowWidth * backX, windowHeight * backY, backWidth, backHeight, 20, "BACK");

fig_Elipse = new createbuttons(windowWidth * ellipseX, windowHeight * ellipseY, ellipseWidth, ellipseHeight, 20, "⚪");
fig_Triangle = new createbuttons(windowWidth * triangleX, windowHeight * triangleY, triangleWidth, triangleHeight, 20, "△");
fig_Rect = new createbuttons(windowWidth * rectX, windowHeight * rectY, rectWidth, rectHeight, 20, "⬜");
switch_Materiales=new createbuttons(windowWidth * 2.4 / 15, windowHeight / 4.5 + windowHeight * 20 / 1080 + windowHeight * 20 / 1080, 120, 40, 20, "Off/On");
borracha = new createbuttons(windowWidth * eraserX, windowHeight * eraserY, eraserWidth, eraserHeight, 20, "ERASER");


    //ahora metemos todos en un array
    //INDICES   0       1     2     3           4              5          6       7      
    interface=[guardar,sell,back,fig_Elipse, fig_Triangle, fig_Rect,borracha,switch_Materiales]
          
  
}//final de def_Studio()

  
  //funcion para los botones de la interface: 
  function eventos_interface(){
    if(interface[0].es_Clickeado(mouseX, mouseY)){//boton guardar
      let= datos={
        "id_User":usuario_Actual.id,
        "design_Name":"pikatchu",
        "array_Design":JSON.stringify(dibujo)
      }
      console.log("Datos enviados al clicar  boton guardar: ")
      console.log(datos)
      httpPost('/guardar',datos,'json',(respostaServidor)=>{
        console.log(respostaServidor)
      })
    }
    if(interface[1].es_Clickeado(mouseX, mouseY)){//boton sell
      sellPopupVisible = true;

    }
    if(interface[2].es_Clickeado(mouseX, mouseY)){ //boton Back
      screen=3
      width_Slider.remove();
      height_Slider.remove();
      slider_Materiales.remove();
      colorPicker.remove()
      dibujo=[]
      lixo=btn_Lobby.pop()//elimina el boton New porque fue agregado con un .push()
      
    }
    if(interface[3].es_Clickeado(mouseX, mouseY)){fig_Actual=0}//elipse
    if(interface[4].es_Clickeado(mouseX, mouseY)){fig_Actual=1}//triangulo
    if(interface[5].es_Clickeado(mouseX, mouseY)){fig_Actual=2}//rectangulo
    if(interface[6].es_Clickeado(mouseX, mouseY)){borracha_Valor = !borracha_Valor}
    if(interface[7].es_Clickeado(mouseX, mouseY)){modelos=!modelos} //activa/desactiva los modelos
  }//final de Eventos de Botones Interface:

    function mostrarPincel(){//este es para que se vea como se va a dibujar el objeto
        if(fig_Actual==0){//para elipse
            push()
            fill(colorPicker.color());
            ellipse(mouseX, mouseY, tamanhoX, tamanhoY);
            pop()
        }
        if(fig_Actual==1){
          push()
          fill(colorPicker.color());
          //calculamos los vertices para el triangulo
          let x1 = mouseX - width_Slider.value() / 2;
          let y1 = mouseY + height_Slider.value() / 2;
          let x2 = mouseX + width_Slider.value()/ 2;
          let y2 = mouseY + height_Slider.value() / 2;
          let x3 = mouseX;
          let y3 = mouseY - height_Slider.value() / 2;
          triangle(x1, y1, x2, y2, x3, y3)
          pop()

        }//este es para el triangulo  
        if(fig_Actual==2){//para rectangulo
            push()
            fill(colorPicker.color());
            rect(mouseX, mouseY, tamanhoX, tamanhoY);
            pop()
        }
    }

  
  function dibujar(fig_Actual){//para cada una de las figuras
    //segun la variable que almazena la figura actual
    if(fig_Actual==0){
        dibujo.push(new Elipse(mouseX,mouseY,tamanhoX,tamanhoY,colorPicker.color().levels, windowWidth, windowHeight)) //hay que cambiar el objeto colorPicker, pasar este parametro solo a los valores de colores
        actualizarIndice(dibujo)
    }
    if(fig_Actual==1){
        dibujo.push(new Triangulo(mouseX,mouseY,tamanhoX,tamanhoY,colorPicker.color().levels,windowWidth, windowHeight))
        actualizarIndice(dibujo)

    }
    if(fig_Actual==2){
        dibujo.push(new Rectangulo(mouseX,mouseY,tamanhoX,tamanhoY,colorPicker.color().levels,windowWidth, windowHeight))
        actualizarIndice(dibujo)
    }

  }
  function actualizarIndice(array){
    for(let i=0; i<array.length;i++){
        array[i].indiceArray=i;
    }
}
  function borrar(array){
    for(let i=0; i< array.length; i++){
        if(array[i].isClicked(mouseX,mouseY)){
            array.splice(i,1)//elimina ese objeto del array
            actualizarIndice(array)
            console.log(array)
      }
  }
}

  class Elipse{
    constructor(pointX, pointY, ancho, largo, colorPicker, w_width, w_height){
      this.fig_num=0;
      this.indiceArray;
      this.pointX=pointX;
      this.pointY=pointY;
      this.ancho=ancho;
      this.largo=largo;
      this.color=colorPicker
      this.w_width=w_width
      this.w_height=w_height

    }  
    
  //ahora los metodos:
    show(){
      push()
      fill(this.color)
      ellipse(this.pointX,this.pointY,this.ancho,this.largo)
      pop()
    }//para dibujar los elementos del array
    isClicked(mouseX, mouseY){
      // Verificar si las coordenadas del clic están dentro de la elipse
      let dX = mouseX - this.pointX;
      let dY = mouseY - this.pointY;
      // Fórmula para verificar si un punto (mouseX, mouseY) está dentro de la elipse
      if ((dX * dX) / ((this.ancho / 2) ** 2) + (dY * dY) / ((this.largo / 2) ** 2) <= 1) {
        // Hacer algo cuando se hace clic en la elipse
        console.log("Clic en la elipse");
        return true
      }else{
        return false
      }
      
    }//mismo metodo que tenemos en los botones

    
  }
  
  class Rectangulo{
    constructor(pointX, pointY, ancho, largo,colorPicker,w_width, w_height){
      this.fig_num=1;
      this.indiceArray;
      this.pointX=pointX;
      this.pointY=pointY;
      this.ancho=ancho;
      this.largo=largo;
      //para la funcion show()
      this.color=colorPicker
      this.w_width=w_width
      this.w_height=w_height

    }  
    
  //ahora los metodos:
    show(){
        push()
        fill(this.color)
        rect(this.pointX, this.pointY, this.ancho, this.largo)
        pop() 
    }//para dibujar los elementos del array
    isClicked(mouseX, mouseY){//mismo metodo que tenemos en los botones
    if(      
        mouseX >= this.pointX - this.ancho / 2 &&
        mouseX <= this.pointX + this.ancho / 2 &&
        mouseY >= this.pointY - this.largo / 2 &&
        mouseY <= this.pointY + this.largo / 2){ //dividimos x1 e y2 porque estamos a utilizar rectMode(CENTER)
        return true
      }else{
        return false
      }
    }
  }
  
  class Triangulo{
    constructor(pointX, pointY, base, altura,colorPicker,w_width, w_height){
      this.fig_num=2;
      this.indiceArray;
      this.pointX=pointX;
      this.pointY=pointY;
      this.base=base;
      this.altura=altura;
      this.color=colorPicker
      //calculamos los vertices 
      this.x1 = this.pointX - this.base / 2;
      this.y1 = this.pointY + this.altura / 2;
      this.x2 = this.pointX + this.base/ 2;
      this.y2 = this.pointY + this.altura / 2;
      this.x3 = this.pointX;
      this.y3 = this.pointY - this.altura / 2;
      this.w_width=w_width
      this.w_height=w_height
    
    }  
    
  //ahora los metodos:
    show(){
      push()
      fill(this.color)
    // Dibujar el triángulo
      triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
      pop()
    } //para dibujar los elementos del array
    isClicked(mouseX, mouseY){
      let areaTriangulo = 0.5 * (-this.y2 * this.x3 + this.y1 * (-this.x2 + this.x3) + this.x1 * (this.y2 - this.y3) + this.x2 * this.y3);
      let s = 1 / (2 * areaTriangulo) * (this.y1 * this.x3 - this.x1 * this.y3 + (this.y3 - this.y1) * mouseX + (this.x1 - this.x3) * mouseY);
      let t = 1 / (2 * areaTriangulo) * (this.x1 * this.y2 - this.y1 * this.x2 + (this.y1 - this.y2) * mouseX + (this.x2 - this.x1) * mouseY);
    
      return s > 0 && t > 0 && (1 - s - t) > 0;

    }//mismo metodo que tenemos en los botones
    
  }
 
  function onArea(mouseX, mouseY) { //para definir el area en el que se puede dibujar
    if (
      mouseX >= windowWidth - (3 * windowWidth) / 5 &&
      mouseX < windowWidth &&
      mouseY < windowHeight - windowHeight / 5
    ) {
      return true;
    } else {
      return false;
    }
  }

// esta funcion va a ir a cada objeto del array dibujo y va a verificar si los valores 
// w_width e w_height son los mismos que los windowWidth e WindowHeight de la pantalla actual
// caso sean diferentes va a actualizar las posiciones y despues modificara w_width e w_height
// Deberia ser puesta en draw().??
  function responsibidade(array,windowWidth,windowHeight){ 
   if(array[0].w_width!=windowWidth || array[0].w_height!= windowHeight){
      for(let i=0; i<array.length;i++){
        array[i].pointX=(array[i].pointX*windowWidth)/array[i].w_width
        array[i].pointY=(array[i].pointY*windowHeight)/array[i].w_height
        array[i].w_width=windowWidth
        array[i].w_height=windowHeight
      }
    }
  }

  //area del Popup:
  function dibuja_popUp(){
  designNameInput = createInput('');
  designNameInput.position(windowWidth / 2 - 50, windowHeight / 2 - 50);

  priceInput = createInput('');
  priceInput.position(windowWidth / 2 - 50, windowHeight / 2);

  confirmSellButton = createButton('Confirmar Venta');
  confirmSellButton.position(windowWidth / 2 - 50, windowHeight / 2 + 50);
  confirmSellButton.mousePressed(confirmarVenta);

    background(0, 150); // Fondo oscuro para el popup

    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Ingresa el nombre y el precio del diseño", windowWidth / 2, windowHeight / 2 - 100);
    noLoop()
}
function confirmarVenta() {
  // Aquí puedes agregar la lógica para enviar el nombre, precio y otros datos al servidor
  let designName = designNameInput.value();
  let price = priceInput.value();

  let venta={
    "id_Disenho":lista_Dibujos[dibujo_AMostrar].id_Design,
    "nome_Disenho": designName,
    "id_Creator":usuario_Actual.id,
    "array_Disenho":JSON.stringify(dibujo),
    "price" : price,
    "modelo" :modelo_Actual
  }
  httpPost('/sell',venta,'json',(respostaServidor)=>{
    console.log(respostaServidor)
    if(respostaServidor.ack==0){
      console.log("Diseño ya esta en inventario");
    }else{
      console.log("Diseño adiccionado con exito")
   
     }
  })

  // Ahora eliminamos los elementos Html
  designNameInput.remove()
  priceInput.remove()
  confirmSellButton.remove()
  colorPicker.remove()
  height_Slider.remove()
  width_Slider.remove()
  slider_Materiales.remove()
  dibujo=[]

  // Ocultar el popup
  sellPopupVisible = false;
  loop()
  screen=5
}

function materiales(){
  if(modelos){
    if(modelo_Actual==0){
      image(camisaCorta, windowWidth - (3 * windowWidth) / 5, 0, (3 * windowWidth) / 5, windowHeight - windowHeight / 5);
    }
    if(modelo_Actual==1){
      image(camisa, windowWidth - (3 * windowWidth) / 5, 0, (3 * windowWidth) / 5, windowHeight - windowHeight / 5);
    }
    if(modelo_Actual==2){
      image(pantalon, windowWidth - (3 * windowWidth) / 5, 0, (3 * windowWidth) / 5, windowHeight - windowHeight / 5);
    }
    if(modelo_Actual==3){
      image(saya, windowWidth - (3 * windowWidth) / 5, 0, (3 * windowWidth) / 5, windowHeight - windowHeight / 5);
    }
    if(modelo_Actual==4){
      image(short, windowWidth - (3 * windowWidth) / 5, 0, (3 * windowWidth) / 5, windowHeight - windowHeight / 5);
    }
  }
}
