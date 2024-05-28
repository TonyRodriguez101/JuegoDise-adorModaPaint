let lixo;

function def_StudioLobby(){
    let incrementoY=45
    for(let i=0;i<lista_Dibujos.length;i++){
        btn_Lobby[i]= new createbuttons(windowWidth*5/8,windowHeight*1/5+incrementoY*i,60,35,20,"Click")
    }
    btn_Lobby.push(new createbuttons(windowWidth*5/8,windowHeight*1/5+incrementoY*(btn_Lobby.length+1),60,35,20,"NEW"))
}
function studio_Lobby(){
    
    fill(100)
    rectMode(CENTER)
    rect(windowWidth/2,windowHeight/2,windowWidth*2/3,windowHeight*2/3,20)
    for(let z=0;z<lista_Dibujos.length;z++){
        push()
        fill(255)
        //text(lista_Dibujos[z].design_Name,windowWidth*2/5,windowHeight*1/5+50*z)
        text("Design number: "+z,windowWidth*2/5,windowHeight*1/5+50*z)
        pop()
 
    }
    for(let i=0;i<=lista_Dibujos.length;i++){
        btn_Lobby[i].show()
    }
    volverBtn.show()
}
function eventos_lobby(){
    if(volverBtn.es_Clickeado(mouseX,mouseY)){screen=3}
    if(btn_Lobby[btn_Lobby.length-1].es_Clickeado(mouseX,mouseY)){
        screen=6;
    }else{
    for(let i=0;i<btn_Lobby.length;i++){
        if(btn_Lobby[i].es_Clickeado(mouseX, mouseY)){
            if(i!=lista_Dibujos.length){
            dibujo_AMostrar=i;
            dib_recibido=JSON.parse(lista_Dibujos[dibujo_AMostrar].array_Dibujo)
            dibujar_BD(dib_recibido);
        }
            screen=6;
            loop()
        }
    }
    }

}