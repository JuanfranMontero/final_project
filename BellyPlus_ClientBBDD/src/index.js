const express = require('express');
const app = express();
const morgan=require('morgan');
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: false }));
const bodyParser = require('body-parser');
const cors = require('../node_modules/cors');

// const app = express();
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

//Conexion Mysql
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bellyplus_clientes"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


//Routes
app.use(require('./routes/index'));

//Iniciando el servidor, escuchando...
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});

const userInfo = require("./routes/UserQueries/user_info.js")
const userModification = require("./routes/UserQueries/user_modification.js")

//Get user
app.get("/user", (req,res)=>userInfo.getAllUsers(req,res,con));
app.get("/userById", (req,res)=>userInfo.getUserById(req,res,con));

//Crear usuario
app.post("/createUser",(req,res)=>userModification.createUser(req,res,con));


//Edit user
app.post("/editUser",(req, res)=>{userModification.editUser(req,res,con)});

//Borrar usuario
app.post("/deleteUser", (req,res)=>{userModification.deleteUser(req,res,con)});