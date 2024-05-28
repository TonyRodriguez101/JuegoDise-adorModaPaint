
function menuRegisto() {
  background(0,0,0,0);
  push()
  rectMode(CENTER);
  stroke(67, 75, 154);
  strokeWeight(5);

  rect(windowWidth * 0.5, windowHeight * 0.5, 400, 450,20);
  image(logLogo, windowWidth * 0.5, windowHeight * 0.5-200, 160, 160);
  noStroke()
  fill(28,28,28)
  rect(windowWidth * 0.5, windowHeight * 0.5+100, 397, 247,20);//rectBlack
 
  noStroke()
  textSize(26) 
  textStyle(BOLD)
  textAlign(CENTER)
  fill(67,75,154)
  text("REGISTER", windowWidth * 0.5-100,windowHeight * 0.5 -130);
  
  //name input
  fill(255)
  noStroke()
  textSize(20) 
  textAlign(CENTER)
  text("Username: ", windowWidth * 0.5 - 100, windowHeight * 0.5 +30)
  nameInput = createInput().attribute('placeholder', 'Username');//username
  nameInput.position(windowWidth * 0.5 - 40, windowHeight * 0.5 + 10);
  nameInput.size(150,20);
  
  //pass input
  fill(255)
  text("Password: ", windowWidth * 0.5 - 100, windowHeight * 0.5 +70)
  passInput = createInput().attribute('placeholder', 'Password').attribute('type', 'password'); 
  passInput.position(windowWidth * 0.5 - 40, windowHeight * 0.5 + 50);
  passInput.size(150,20);
   
  //Mostrar botones de registo

  registrarBtn.show()
  volverBtn.show()


  // noStroke()
  // noFill()
  // rect(windowWidth * 0.5 - 40, windowHeight * 0.5 + 100,150,50)
  // fill(81,190,202)
  // textSize(12)
  // textAlign(CENTER)
  //text("Already have an account? Log In",windowWidth * 0.5 , windowHeight * 0.5 + 120)
  noLoop()//se tirar nao deixa escrever...?
  pop()

  
}

function def_RegisterLogin(){
  registrarBtn= new createbuttons(windowWidth * 0.5+100, windowHeight * 0.5 + 150,120,50,30, "Register")
  volverBtn= new createbuttons(windowWidth * 0.5-120, windowHeight * 0.5 + 150,100,50,30, "Back")
  btnLogin= new createbuttons(windowWidth * 0.5+100, windowHeight * 0.5 + 150,120,50,30, "Login")
}

