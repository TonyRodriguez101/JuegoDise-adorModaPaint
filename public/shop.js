
let lista_Inventario=[]
let btn_Shop=[]

function def_Shop(){
    let incrementoY=45
    for(let i=0;i<lista_Inventario.length;i++){
        btn_Shop[i]= new createbuttons(windowWidth*5/8,windowHeight*1/5+incrementoY*i,60,35,20,"Click")
    }

}
function shop(){
    
    fill(100)
    rectMode(CENTER)
    rect(windowWidth/2,windowHeight/2,windowWidth*2/3,windowHeight*2/3,20)
    for(let z=0;z<lista_Inventario.length;z++){
        push()
        fill(255)
        text("Item number: "+z,windowWidth*2/5,windowHeight*1/5+50*z)
        pop()
        btn_Shop[z].show()
 
    }
    volverBtn.show()
    loop()
}
function eventos_shop(){
    if(volverBtn.es_Clickeado(mouseX,mouseY)){//back
        screen=3;
        dibujo=[]
    }

    for(let i=0;i<btn_Shop.length;i++){
        if(btn_Shop[i].es_Clickeado(mouseX, mouseY)){
            dibujo_AMostrar=i;
            dib_recibido=JSON.parse(lista_Inventario[dibujo_AMostrar].array_Design)//este esta bien
            dibujar_BD(dib_recibido);
            modelo_Actual=lista_Inventario[dibujo_AMostrar].modelo
            screen=8;

        //ahora la query para la informacion de la tarjeta de informacion.
        loadJSON('/getTarjeta/'+lista_Inventario[dibujo_AMostrar].id_Creator,(respostaServidor)=>{
            console.log("Respuesta del servidor para encontrar informacion del artista:")
            if(respostaServidor.length>0){
                console.log(tarjeta)
              tarjeta=respostaServidor[0]//problema de sincronia??? hay veces que no sale a la primera
              ;
            }
          });
          loop()
        }

        }
    }

function listar_Items(){
    loadJSON('/getItems/'+0,(respostaServidor)=>{
    console.log("Respuesta del servidor a Listar Diseños debe de enviar un array con los diseños:")
    console.log(respostaServidor)
    if(respostaServidor.length>0){
      lista_Inventario=respostaServidor
      console.log("tabla de Shop: ")
      console.log(lista_Inventario)
      ;
    }
  loop();
  });
}