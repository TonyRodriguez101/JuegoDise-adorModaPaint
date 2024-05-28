
function infoAbout(){
    // informacao do jogo
   title = "Design it, Sell it";
   description = "A simulation design game where you can create and sell your design.";
//informacao
   
   //
   rectMode(CENTER); 
   noFill();
   stroke(124, 252, 0);
   strokeWeight(5);
   rect(windowWidth * 0.5, windowHeight * 0.5, windowWidth * 0.6, windowHeight * 0.7);
 
   // informacao dentro do rect 
   textAlign(CENTER, CENTER);
   textSize(windowWidth * 0.03); 
   noStroke();
   fill(255);
   text(title, windowWidth / 2, windowHeight * 0.23); //deixar tudo em responsivo, valor ficar como percentagem
 
   textSize(windowWidth * 0.015); //deixar texto responsivo
   text(description, windowWidth / 2, windowHeight * 0.4);
 
   textSize(windowWidth * 0.018); //deixar texto responsivo
   for (let i = 0; i < features.length; i++) {
     let yPos = windowHeight * 0.5 + i * (windowHeight * 0.050)// esta parte vai listar de forma vertical e com espacamento
     text("• " + features[i], windowWidth / 2, yPos);
   }
   
   backAbout.show();
 }
 function def_About(){
  backAbout=new createbuttons(windowWidth * 0.5, windowHeight * 0.8,100,50,30, "Back")
     
  features = [
    "Design and customize your environment.",
    "Create your own design then sell it.",
    "Experience dynamic events and challenges.",
    "Unlock new design materials and features.",
    "Share your design with other players."
  ]; 
 }

 function eventos_about(){
  if(backAbout.es_Clickeado(mouseX,mouseY)){
    screen=3;
  }
 }