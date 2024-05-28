let like;
let buy;
let back_shop;

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
        if(dibujo.length>0){ // responsibidade del dibujo
            responsibidade(dibujo, windowWidth, windowHeight)
          }

}//final de item_View() para la funcion draw()

function def_Item_View(){

    like=new createbuttons(windowWidth*3/5,windowHeight*5.4/6,100,50,20,"LIKE")  //despues simplemente mostrarlo en la funcion draw()
    buy=new createbuttons(windowWidth*3.4/5,windowHeight*5.4/6,100,50,20,"BUY")
    back_shop=new createbuttons(windowWidth*3.8/5,windowHeight*5.4/6,100,50,20,"BACK")
}