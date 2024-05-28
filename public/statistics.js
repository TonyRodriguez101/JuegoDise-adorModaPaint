
function statistic(){
push();
fill(0);
textSize(20);
textAlign(CENTER, CENTER);

// Encabezado de la tabla
text("Estadísticas del Usuario Actual", width / 2, 50);

// Nombre del usuario actual
text(`Nombre: ${usuario_Actual.name}`, width / 2, 100);

// Dinero del usuario actual
text(`Dinero: $${usuario_Actual.money}`, width / 2, 150);

// Tabla de diseños en la tienda
text("Diseños en Shop", width / 2, 200);
text("Nombre  |  Likes  |  Ventas", width / 2, 230);

// Mostrar información de cada diseño en la tienda
for (let i = 0; i < userData.designsInShop.length; i++) {
  let design = userData.designsInShop[i];
  let designInfo = `${design.designName}  |  ${design.likes}  |  ${design.sales}`;
  text(designInfo, width / 2, 260 + i * 30);
}

pop();

push();
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);

  // Encabezado de la tabla
  text("Estadísticas de Otros Usuarios", width / 2, 400);

  // Tabla de otros usuarios
  text("Nombre  |  Dinero", width / 2, 450);

  // Mostrar información de cada usuario
  for (let i = 0; i < otherUsersData.length; i++) {
    let user = otherUsersData[i];
    let userInfo = `${user.name}  |  $${user.money}`;
    text(userInfo, width / 2, 480 + i * 30);
  }

  pop()
}

function def_Statistics(){
    let something="something"
}