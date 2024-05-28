

function menuLogin(){
  //background(240,248,255);
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
  text("SIGN IN", windowWidth * 0.5-100,windowHeight * 0.5 -130);
  
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
   
  //signUP ou registo
  noStroke()
  noFill()
  rect(windowWidth * 0.5 - 40, windowHeight * 0.5 + 100,150,50)
  fill(81,190,202)
  textSize(12)
  textAlign(CENTER)
  text("do not have an account? Sing Up",windowWidth * 0.5 , windowHeight * 0.5 + 120)
  pop()


  btnLogin.show()
  volverBtn.show()


  noLoop()//se tirar nao deixa escrever...?
}

function eventos_login(){
  if(volverBtn.es_Clickeado(mouseX,mouseY)){
    //hacemos la verificacion de login con servidor:
    screen=0;
    nameInput.remove()
    passInput.remove()
    loop()
    console.log("es clicado")
    console.log(screen)

  }
  if(btnLogin.es_Clickeado(mouseX,mouseY)){

    let name = nameInput.value();
    let pass = passInput.value();
  
    let user = {
      "name": name,
      "password": pass
    }
  console.log(user)

    httpPost('/login',user,'json',(respostaServidor)=>{
  
      usuario_Actual = respostaServidor[0];
      console.log(usuario_Actual)
      if(respostaServidor.length>0){
        nameInput.remove();
        passInput.remove();
        screen=3;
        dibujo=[]
        listar_Disenhos()
        listar_Items();

        loop();
      }else{
        console.log("No esta Registrado")
      }
    })
  }
}

