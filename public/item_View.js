function item_View() { //para colocar en la funcion draw()
    background(0,0);
    push()
    rectMode(CORNER)
    stroke(67, 75, 154);
    strokeWeight(5);
    rect(windowWidth - (3 * windowWidth) / 5-13,0, (3 * windowWidth)/5+13, windowHeight-windowHeight/5+12,50,0,0,50);
    pop()

//--------------------------------------------------------MOstrando botones--------------------------------------------

        push() //fondo para que la animacion no obstruya la lectura del text()
        fill(255,0,0)

        rect(windowWidth*2.4/15,windowHeight/2.6 +342,200,32)//others options

        pop()

        
        push()
        textSize(25)
        text("Others Options:! ",windowWidth*2.4/15,windowHeight/2.6 +350)
        pop()

        //--------------------------------------------------------End MOstrando botones--------------------------------------------
        

        for (let i = 0; i < dibujo.length; i++) {
            dibujo[i].show();
        }
  

}//final de item_View() para la funcion draw()
