function mainScreen() {       //old main screen
for(let z=0; z<buttons.length;z++){
   buttons[z].show();
  }
}

function def_Main(){ 
  for(let i=0; i<buttonsNames.length;i++){ //Creacao de botoes do menu principal
    buttons[i] = new createbuttons(windowWidth*0.5, windowHeight*0.25+btnSpace,150,50,20,buttonsNames[i]);
    btnSpace +=70     
  }
}
