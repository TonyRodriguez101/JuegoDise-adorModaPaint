
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
    like.show()
    buy.show()
    back_shop.show()
    switch_Materiales.show()


//--------------------------------------------------------MOstrando botones--------------------------------------------





        //----------------------Tarjeta de informacion------------------

        let cardWidthFraction = 0.3;
        let cardHeightFraction = 0.2;
    
        // Posición de la tarjeta centrada en relación con el texto
        let cardX = windowWidth * 2.4 / 15;
        let cardY = windowHeight / 2.6  + 40; // 40 para separar la tarjeta del texto
                // Información del diseño (sustituir con tus datos)

        let designName = lista_Inventario[dibujo_AMostrar].design_Name;
        //let creator = lista_Inventario[dibujo_AMostrar].id_Creator;
        let creator =tarjeta.name   // da problemas unas veces sino usar la linea de arriba
        // tarjeta almazena la informacion del creador del item que esta a ser mostrado en itemView()
        let price = lista_Inventario[dibujo_AMostrar].price;
        let likes = lista_Inventario[dibujo_AMostrar].likes;
        let sold = lista_Inventario[dibujo_AMostrar].vendidos;
    
        push();
        rectMode(CENTER);
        fill(255);
        stroke(67, 75, 154);
        strokeWeight(5);
        rect(cardX, cardY, windowWidth * cardWidthFraction, windowHeight * cardHeightFraction, 10);
        

    
        // Mostrar la información en la tarjeta
        textAlign(LEFT, TOP);
        textSize(18);
        fill(0);
        noStroke();
        text(`Design Name: ${designName}\nCreator: ${creator}\nPrice: ${price} €\nLikes: ${likes}\nSelled: ${sold}`, cardX - (windowWidth * cardWidthFraction) / 2 + 20, cardY - (windowHeight * cardHeightFraction) / 2 + 20);
    
        pop();
        //----------------------End tarjeta de  informacion-------------

        //--------------------------------------------------------End MOstrando botones--------------------------------------------
        

        for (let i = 0; i < dibujo.length; i++) {
            dibujo[i].show();
        }
        if(dibujo.length>0){ // responsibidade del dibujo
            responsibidade(dibujo, windowWidth, windowHeight)
          }
          loop()

          materiales()

}//final de item_View() para la funcion draw()

function def_Item_View(){

    like=new createbuttons(windowWidth*3/5,windowHeight*5.4/6,100,50,20,"LIKE")  //despues simplemente mostrarlo en la funcion draw()
    buy=new createbuttons(windowWidth*3.4/5,windowHeight*5.4/6,100,50,20,"BUY")
    back_shop=new createbuttons(windowWidth*3.8/5,windowHeight*5.4/6,100,50,20,"BACK")
}

function eventos_itemView(){
    if(switch_Materiales.es_Clickeado(mouseX, mouseY)){//activar/desactivar modelo sugerido del creador
        modelos=!modelos
    }
    if(back_shop.es_Clickeado(mouseX,mouseY)){
        dibujo=[]//vaziarlo para poder carregar os outros lembrar que objetos sao adicionados com um .push()
        screen=7
    }
    if (like.es_Clickeado(mouseX, mouseY)) {
        designId = lista_Inventario[dibujo_AMostrar].id_Venta;
        httpPost('/likeDesign', { designId: designId }, 'json', (response) => {
            if (response.ack === 1) {
                console.log('Like dado exitosamente');
                // Puedes realizar acciones adicionales después de dar like
            } else {
                console.log('Error al dar like:', response);
                // Puedes manejar el error de acuerdo a tus necesidades
            }
        });
    }
    
    if(buy.es_Clickeado(mouseX, mouseY)){
        // JavaScript del lado del cliente
        let designId = lista_Inventario[dibujo_AMostrar].id_Venta;
        let userId = usuario_Actual.id
        let id_creador=lista_Inventario[dibujo_AMostrar].id_Creator; //para sumarle el dinero
        let dibujo_comprar=lista_Inventario[dibujo_AMostrar].array_Design //porque array_Design aun no se le ha revertido el JSON.stringify()
        // Supongamos que tienes el precio del diseño almacenado en la variable price
        let price = lista_Inventario[dibujo_AMostrar].price;
        httpPost('/buyDesign', { designId: designId, price: price, userId: userId, dibujo:dibujo_comprar, id_creador: id_creador }, 'json', (response) => {
            if (response.ack === 1) {
                console.log('Compra exitosa');
                // Puedes realizar acciones adicionales después de la compra exitosa
            } else {
                console.log('Error al comprar:', response.error);
                // Puedes manejar el error de acuerdo a tus necesidades
            }
        });
    }
}