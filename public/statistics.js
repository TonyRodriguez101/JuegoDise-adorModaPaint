
let back_mainBtn;

function statistic(){
  push();
  rectMode(CENTER);
  fill(10,10);
  stroke(124, 252, 0);
  strokeWeight(5);
  let rectWidth = windowWidth * 0.6;
  let rectHeight = windowHeight * 0.7;
  let rectX = windowWidth * 0.5;
  let rectY = windowHeight * 0.5;
  rect(rectX, rectY, rectWidth, rectHeight,10);
  pop()
  push()
  textAlign(CENTER, TOP); // Cambié a TOP para ajustar el texto correctamente
  fill(255);

  // Encabezado de la tabla
  textSize(20);
  text("User Statistics", rectX, rectY - rectHeight / 2 + 50);

  // Nombre del usuario actual
  text(`Name: ${usuario_Actual.name}`, rectX, rectY - rectHeight / 2 + 100);

  // Dinero del usuario actual
  text(`Money: $${usuario_Actual.money}`, rectX, rectY - rectHeight / 2 + 150);

  // Tabla de diseños en la tienda
  text("Designs in Shop", rectX, rectY - rectHeight / 2 + 200);
  text("Name  |  Likes  |  Selled", rectX, rectY - rectHeight / 2 + 230);

  // Mostrar información de cada diseño en la tienda
  for (let i = 0; i < info_Statistics.length; i++) {
    let design = info_Statistics[i];
    let designInfo = `${design.design_Name}  |  ${design.likes}  |  ${design.vendidos}`;
    text(designInfo, rectX, rectY - rectHeight / 2 + 260 + i * 30);
  }
  pop()
  back_mainBtn.show()
}

function def_Statistics(){
  back_mainBtn=new createbuttons(windowWidth*3.8/5,windowHeight*5.4/6,100,50,20,"BACK")

}

function eventos_Statistics(){
  if(back_mainBtn.es_Clickeado(mouseX,mouseY)){screen=3}
}