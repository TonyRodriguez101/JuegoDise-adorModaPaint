let loginMenu_btn;
let registerMenu_btn;

function startScreen() {


  loginMenu_btn= new createbuttons(windowWidth * 0.5, windowHeight * 0.5 - 100, 150, 40, 30, "Login")
  loginMenu_btn.show();

  registerMenu_btn= new createbuttons(windowWidth * 0.5, windowHeight * 0.5, 150, 40, 30,"Register")
  registerMenu_btn.show();

}

