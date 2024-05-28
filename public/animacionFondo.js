
function def_Fundo(){

 //esto es un array de los parametros para las figuras de la animacion 2 rectangulos, 2 circulos, 2 triangulos, dos estrellas
    figuras=[
    //Estructura del array:
    //    posEje_X,          posEje_Y,           width,          height,   speedEje_X, speedEje_Y
    [random(windowWidth),random(windowHeight),random(40,80), random(40,80),4,-3],// es un rectangulo
    [random(windowWidth),random(windowHeight),random(40,80), random(40,80),-5,7],// es un rectangulo
    [random(windowWidth),random(windowHeight),random(35,75),"relleno",-2,-6],// es un circulo
    [random(windowWidth),random(windowHeight),random(35,75),"relleno",4,-2]//es un circulo
  ]  //aqui colocar todas las figuras para la animacion, 

//animacion de fondo


}

//Funciones:
function draw_Fundo(){

    image(fundo,0,0)
    fundo.background(0)
    fundo.rect(figuras[0][0],figuras[0][1],figuras[0][2],figuras[0][3])
    fundo.rect(figuras[1][0],figuras[1][1],figuras[1][2],figuras[1][3])
    fundo.circle(figuras[2][0],figuras[2][1],figuras[2][2])
    fundo.circle(figuras[3][0],figuras[3][1],figuras[3][2])



    variadorDePosicoes();
    rebote();
}


function variadorDePosicoes(){
    for(let i=0; i<figuras.length;i++){ 
        figuras[i][0] += figuras[i][4]; //Estamos variando en el eje X    (speedX)
        figuras[i][1] += figuras[i][5];  // speedY;
    }
}
  function rebote() { 
    for(let h=0; h<figuras.length; h++){
        if (figuras[h][0] < 0 || figuras[h][0] > width) {
        figuras[h][4]=figuras[h][4]*-1    // speedX = speedX * -1;//ida ne para nia > 0 no < width nia continua movimentar. hensan ba mai
        } 
        if (figuras[h][1] < 0 ||figuras[h][1] > height) {
        figuras[h][5]=figuras[h][5]*-1;//speedY = speedY * -1;
        }      
    }
}