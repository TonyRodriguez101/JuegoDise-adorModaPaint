const express = require("express");
var bodyParser = require('body-parser')
const mysql = require('mysql');
const app = express();
const port = 8000;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())


app.use(express.static('public')); //static is hosting static file 

//CODE FOR CONNECTION TO DATABASE
const dbase = mysql.createConnection({
  host:"localhost",
  port:"3306",
  user:"root",
  password:"",
  database:"jogodesign",
  //this line is for MAMP only
  // socketPath:"/Applications/MAMP/tmp/mysql/mysql.sock"
  });
  
  dbase.connect(function(err){
  if(err)throw err;
  
  console.log("Database Connected!");
  
  });
  
  //Login
  app.post('/login',(req,res)=>{


    console.log("Login data:")
    console.log(req.body)
    let name = req.body.name;
    let pass = req.body.password;
    console.log(name)
    console.log(pass)
  
    let sql = "SELECT * FROM user WHERE name ='" + name + "' AND password = '" + pass + "';"
  
    dbase.query(sql, (err,result)=>{
      if(err) throw err;
        res.send(result);
    });
  });
  

  //Register
  app.post('/register',(req,res)=>{
    let name = req.body.name;
    let pass = req.body.password;

    console.log("Register data:");
    console.log(req.body);
    
    //primero verificar si ya existe el usuario:
    let sql = "SELECT * from User WHERE Name ='"+name+"';"
    dbase.query(sql, (err,result)=>{
      if(err) throw err; 
    
        if(result.length>0){
        
          res.send({"ack":0})
        
        }else{
        // Consulta SQL para insertar el nuevo usuario en la tabla User
        let values = [name, pass, 2000];
        let sql = "INSERT INTO User (Name, Password, Money) VALUES (?, ?, ?)";

      
        dbase.query(sql, values, (err, result) => {
          if (err) throw err;
          console.log("Usuario registrado con éxito");
          res.send({"ack":1});
        });
      }
    });
  });


  app.post('/guardar',(req,res)=>{


    console.log("Datos recibidos:")
    console.log(req.body)
    let id = req.body.id_User;
    let name = req.body.design_Name;
    let array_Dibujo=req.body.array_Design//para guardar el array en base de datos con una cadena de caracteres?

    let values = [name, id,array_Dibujo];
    let sql = "INSERT INTO Studio (design_Name, id_User, array_Dibujo) VALUES (?, ?, ?)";

    dbase.query(sql, values, (err,result)=>{
      if(err) throw err;
        res.send(result);
    });
  });

  app.get('/getDibujos/:id_User',(req,res)=>{

    let id = req.params.id_User;
  
    let sql = "SELECT * FROM studio WHERE id_User = ' "+id+"';" 
  
      dbase.query(sql, (err,result)=>{
      if(err) throw err; 
      res.send(result);
        console.log(result)
      });    });
  
  

app.post('/sell',(req,res)=>{
  let id_Design =req.body.id_Disenho // esto esta dando el problema en la shop porque no puede ser el id del diseño de cada jugador.
  let nombre_Design=req.body.nome_Disenho
  let id_Creator=req.body.id_Creator
  let array_Disenho=req.body.array_Disenho
  let price=req.body.price
  let modelo=req.body.modelo

//Verifica se o disenho já existe
  let sql = "SELECT * from shop WHERE id_Design ='"+id_Design+"';"
      
  dbase.query(sql, (err,result)=>{
    if(err) throw err;   
    if(result.length>0){
  //já existe?
      res.send({"ack":0})    
    }else{
//se não existe cria novo item em shop
      let values = [id_Design, nombre_Design,id_Creator,array_Disenho,price, modelo];
      let sql2 = "INSERT INTO shop (id_Design, design_Name,id_Creator,array_Design,price,modelo) VALUES (?, ?, ?, ?, ?, ? )";
      dbase.query(sql2, values, (err,result)=>{
        if(err) throw err;
          res.send(result);
      })
    }
  });
});

app.get('/getItems/:0',(req,res)=>{
let something=req.params[0]//antes no funcionaba sin el req daba error.

  let sql = "SELECT * FROM shop ;" 
  
  dbase.query(sql, (err,result)=>{
  if(err) throw err; 
  res.send(result);
    console.log(result)
  });    });

  // para los eventos de la shop---------------
//para el udpate cuando se hace un like
app.post('/likeDesign', (req, res) => {
  const designId = req.body.designId;
  const sql = "UPDATE shop SET likes = likes + 1 WHERE id_Venta = ?";
  
  dbase.query(sql, [designId], (err, result) => {
      if (err) {
          console.error('Error al dar like:', err);
          res.status(500).send({ ack: 0, error: 'Error interno del servidor' });
          return;
      }

      res.send({ ack: 1, message: 'Like dado exitosamente' });
      console.log('Like dado exitosamente');
  });
});

 //para comprar un diseño

app.post('/buyDesign', (req, res) => {
  const designId = req.body.designId;
  const price = req.body.price;
  const userId = req.body.userId;
  const dibujo_comprado=req.body.dibujo;
  const id_creador =req.body.id_creador;

  
  // Verifica si el usuario tiene suficiente dinero
  let sql = "SELECT Money FROM User WHERE id = ?";
  dbase.query(sql, [userId], (err, result) => {
      if (err) {
          console.error('Error al verificar el dinero del usuario:', err);
          res.status(500).send({ ack: 0, error: 'Error interno del servidor' });
          return;
      }

      const userMoney = result[0].Money;

      if (userMoney >= price) {
        // Realiza la compra y actualiza el dinero del usuario
        let updateSql = "UPDATE User SET Money = Money - ? WHERE id = ?";
        dbase.query(updateSql, [price, userId], (updateErr, updateResult) => {
            if (updateErr) {
                console.error('Error al actualizar el dinero del usuario:', updateErr);
                res.status(500).send({ ack: 0, error: 'Error interno del servidor' });
                return;
            }
        //Sumarle al vendedor el dinero:
        let updateSql2 = "UPDATE User SET Money = Money + ? WHERE id = ?";
        dbase.query(updateSql2, [price, id_creador], (updateErr, updateResult) => {
            if (updateErr) {
                console.error('Error al actualizar el dinero del vendedor:', updateErr);
                res.status(500).send({ ack: 0, error: 'Error interno del servidor' });
                return;
            }
        // Agrega el diseño comprado a la tabla Studio
        let insertSql = "INSERT INTO Studio (design_Name, id_User, array_Dibujo) VALUES (?, ?, ?)";
        dbase.query(insertSql, [designId, userId, dibujo_comprado], (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Error al agregar el diseño comprado a Studio:', insertErr);
                res.status(500).send({ ack: 0, error: 'Error interno del servidor' });
                return;
            }
          // Hacerle update a la tabla shop para actualizar el numero de vendidos del item:
          let updateSql3 = "UPDATE shop SET vendidos = vendidos + 1 WHERE id_Venta = ?";
          dbase.query(updateSql3, [ designId], (updateErr, updateResult) => {
              if (updateErr) {
                  console.error('Error al actualizar el numero de unidades vendidas:', updateErr);
                  res.status(500).send({ ack: 0, error: 'Error interno del servidor' });
                  return;
              }
                res.send({ ack: 1, message: 'Compra exitosa' });
                console.log('Compra exitosa');
            });
          });
        });
        });


      } else {
          res.send({ ack: 0, error: 'Dinero insuficiente para realizar la compra' });
          console.log('Dinero insuficiente para realizar la compra');
      }
  });
});

//para la tarjeta de informacion del diseño de la shop
app.get('/getTarjeta/:id_User',(req,res)=>{

  let id = req.params.id_User;

  let sql = "SELECT * FROM user WHERE id = ' "+id+"';" 

    dbase.query(sql, (err,result)=>{
    if(err) throw err; 
    res.send(result);
      console.log(result)
    });    });

// -------- End eventos Shop------

//-------Requests para Statistics--------
//para la tarjeta de informacion del diseño de la shop
app.get('/getStatisticsShop/:id',(req,res)=>{

  let id = req.params.id;

  let sql = "SELECT * FROM shop WHERE id_Creator = ' "+id+"';" 

    dbase.query(sql, (err,result)=>{
    if(err) throw err; 
    res.send(result);
      console.log(result)
    });    });


//-------End requests Statistics----------
      

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});