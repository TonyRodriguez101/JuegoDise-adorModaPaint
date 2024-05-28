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
let borracha, guardar, sell
//variable borrador:
let borracha_Valor=false;

//arrays almazenaje
let interface; //guarda los botones del studio
let dibujo;  //guardar todos los objetos del dibujo

function studio() { //para colocar en la funcion draw()
    background(0,0);
    push()
    rectMode(CORNER)
    stroke(67, 75, 154);
    strokeWeight(5);
    rect(windowWidth - (3 * windowWidth) / 5-13,0, (3 * windowWidth)/5+13, windowHeight-windowHeight/5+12,50,0,0,50);
    pop()

//--------------------------------------------------------MOstrando botones--------------------------------------------
for(let i=0; i<interface.length;i++){
  interface[i].show()
}
        push() //fondo para que la animacion no obstruya la lectura del text()
        fill(255,0,0)
        //para los textos:
        rect(windowWidth*2.4/15,windowHeight/19-8,220,32) //select figure
        rect(windowWidth*2.4/15,windowHeight/6-8,150,32) //value red

        rect(windowWidth*2.4/15,windowHeight/2.6+90,270,32)//modify dimension
        rect(windowWidth*2.4/15,windowHeight/2.6+138,154,32)//value Width
        rect(windowWidth*2.4/15,windowHeight/2.6+234,154,32)//value Height
        rect(windowWidth*2.4/15,windowHeight/2.6 +342,200,32)//others options

  
        //para los numeros:
        rect(windowWidth*2/9,windowHeight/2.6+170,50,30)//width
        rect(windowWidth*2/9,windowHeight/2.6+265,50,30)//height
        pop()

        push()
        fill(255)
        textSize(20)
        textAlign(CENTER)
        push()
        textSize(25) //subseccion
        text("Select your Figure:",windowWidth*2.4/15,windowHeight/19)
        pop()
        text("Select the Color: ",windowWidth*2.4/15,windowHeight/6)
        colorPicker.position(windowWidth*2.17/15,windowHeight/6+20)
        push()
        textSize(25) //subseccion
        text("Modify the dimensions!",windowWidth*2.4/15,windowHeight/2.6+100)
        pop()
        text("Value of Width: ",windowWidth*2.4/15,windowHeight/2.6+145)
        width_Slider.position(windowWidth*2/18,windowHeight/2.6+160)//slider X
        tamanhoX=width_Slider.value()
        text(tamanhoX,windowWidth*2/9,windowHeight/2.6+175)//valor slider X
        text("Value of Height: ",windowWidth*2.4/15,windowHeight/2.6+240)
        height_Slider.position(windowWidth*2/18,windowHeight/2.6+255) //slider Y
        tamanhoY=height_Slider.value();
        text(tamanhoY,windowWidth*2/9,windowHeight/2.6+270) // valor slider Y 
        push()
        textSize(25)
        text("Others Options:! ",windowWidth*2.4/15,windowHeight/2.6 +350)
        pop()
        pop()

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
  

}//final de studio() para la funcion draw()
  
  
  //creamos la parte estetica con los botones aqui
  
  //crear solo el boton que guarda el array de objetos: 
  function def_Studio(){
    dibujo=[]
    //definir y crear todos los botones del studio
    guardar=new createbuttons(windowWidth*3/5,windowHeight*5.4/6,100,50,20,"SAVE")  //despues simplemente mostrarlo en la funcion draw()
    sell=new createbuttons(windowWidth*3.4/5,windowHeight*5.4/6,100,50,20,"SELL")
    back=new createbuttons(windowWidth*3.8/5,windowHeight*5.4/6,100,50,20,"BACK")
    //seccion de seleccion de figuras:

    fig_Elipse=new createbuttons(windowWidth/15,windowHeight/10,100,40,20,"⚪")
    fig_Triangle=new createbuttons(windowWidth*2.4/15,windowHeight/10,100,40,20,"△")
    fig_Rect=new createbuttons(windowWidth*3.8/15,windowHeight/10,100,40,20,"⬜")

    //botones extras: 
    borracha=new createbuttons(windowWidth*2.4/15,windowHeight/2.6 +410,120,60,20,"ERASER")



    //ahora metemos todos en un array
    //INDICES   0       1     2     3           4              5          6             
    interface=[guardar,sell,back,fig_Elipse, fig_Triangle, fig_Rect,borracha]
          
  
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
      let venta={
        "id_Disenho":lista_Dibujos[dibujo_AMostrar].id_Design,
        "nome_Disenho":lista_Dibujos[dibujo_AMostrar].design_Name,
        "id_Creator":usuario_Actual.id,
        "array_Disenho":JSON.stringify(dibujo)
      }
      httpPost('/sell',venta,'json',(respostaServidor)=>{
        console.log(respostaServidor)
        if(respostaServidor.ack==0){
          console.log("Diseño ya esta en inventario");
        }else{
          console.log("Diseño adiccionado con exito")
       
         }
      })

    }
    if(interface[2].es_Clickeado(mouseX, mouseY)){ //boton Back
      screen=3
      width_Slider.remove();
      height_Slider.remove();
      colorPicker.remove()
      dibujo=[]
      lixo=btn_Lobby.pop()//elimina el boton New porque fue agregado con un .push()
      
    }
    if(interface[3].es_Clickeado(mouseX, mouseY)){fig_Actual=0}//elipse
    if(interface[4].es_Clickeado(mouseX, mouseY)){fig_Actual=1}//triangulo
    if(interface[5].es_Clickeado(mouseX, mouseY)){fig_Actual=2}//rectangulo
    if(interface[6].es_Clickeado(mouseX, mouseY)){borracha_Valor = !borracha_Valor}
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
        dibujo.push(new Elipse(mouseX,mouseY,tamanhoX,tamanhoY,colorPicker.color()))
        actualizarIndice(dibujo)
    }
    if(fig_Actual==1){
        dibujo.push(new Triangulo(mouseX,mouseY,tamanhoX,tamanhoY,colorPicker.color()))
        actualizarIndice(dibujo)
    }
    if(fig_Actual==2){
        dibujo.push(new Rectangulo(mouseX,mouseY,tamanhoX,tamanhoY,colorPicker.color()))
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
    constructor(pointX, pointY, ancho, largo, colorPicker){
      this.fig_num=0;
      this.indiceArray;
      this.pointX=pointX;
      this.pointY=pointY;
      this.ancho=ancho;
      this.largo=largo;
      this.color=colorPicker

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
    constructor(pointX, pointY, ancho, largo,colorPicker){
      this.fig_num=1;
      this.indiceArray;
      this.pointX=pointX;
      this.pointY=pointY;
      this.ancho=ancho;
      this.largo=largo;
      //para la funcion show()
      this.color=colorPicker
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
    constructor(pointX, pointY, base, altura,colorPicker){
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

