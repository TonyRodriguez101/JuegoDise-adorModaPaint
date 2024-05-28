

//classe
class createbuttons {
  constructor(x, y, largo, ancho, radio, btText) {
    this.x = x;
    this.y = y;
    this.x1 = largo;
    this.y1 = ancho;
    this.r = radio;
    this.btText=btText;
  }
  
  //metodos
  show() {
    rectMode(CENTER);//no retirar porque la funcion es_Clickeado() toma en consideracion que los botones estan centrados
    stroke(124,252,0);
    strokeWeight(4);
    fill(0);
    rect(this.x, this.y, this.x1, this.y1, this.r);

    noStroke();
    textSize(25);
    textStyle(NORMAL);
    textAlign(CENTER);
    fill(255);
    text(this.btText, this.x, this.y + 10);  
  }

  es_Clickeado(mouseX, mouseY){
    if(mouseX>=this.x-this.x1/2 && mouseX<=this.x+this.x1/2 && mouseY>=this.y-this.y1/2 && mouseY<=this.y+this.y1/2){ //dividimos x1 e y2 porque estamos a utilizar rectMode(CENTER)
      return true
    }else{
      return false
    }
  }
}
