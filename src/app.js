import express from "express";
import db from "./utils/database.js";
import User from "./models/users.model.js";
import 'dotenv/config';

User;

//variable de entorno llamada PORT
const PORT = process.env.PORT ?? 8000;

//probar la conexion a la base de datos

db.authenticate()
    .then( ()=> { console.log('Conexion correcta')})
    .catch( (error) => console.log(error) )

    //Si existe la tabla y hay modificaciones => altera la tabla {alter:true}

//Aqui se colocaria el alter si es necesario en los ()
db.sync() // si no existe la tabla -> la crea / si ya existe hace nada
    .then(() => console.log('Base de datos sincronizada'))
    .catch((error) => console.log(error))

//
const app = express()

//para poder leer el body del json
app.use(express.json())

// health check
app.get('/', (req, res) => {
    res.send('Ok')
});

// CREATE user
// cuando se haga una peticion o request a users POST crear un usuario.

app.post('/users', async ( req, res ) => {
    try {
        const { body } = req
        //mandar esta info a base de datos
        // INSERT INTO users (username, email, password)
        const user = await User.create(body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error)
    }

})

//READ users
// GET /users=> devolver un json con todos los usuarios en la base de datos.
// SELECT * FROM users;

app.get('/users', async ( req, res )=>{
    try {
        const users = await User.findAll();
        res.json(users)  
    } catch (error) {
        res.status(400).json(error)
    }
})

// SELECT * FROM users WHERE id=4;
// GET /users/:id 
// path params 

app.get('/users/:id', async ( req, res ) =>{
    try {
        const { id } = req.params // params es un objeto { id: 4 }
        const user = await User.findByPk(id)
        res.json(user) 
    } catch (error) {
        res.status(400).json(error)
    }
})

// UPDATE = PUT
// PUT => '/users' => path params 
// la informacion a actualizar por el body

app.put('/users/:id', async (req, res) =>{
    try {
        const { id } = req.params
        const { body } = req
        //primer objeto es la info, segundo objeto es el where

        const users = await User.update(body, {
            where: { id } // => { id: id }
        })
        res.json(users)
    } catch (error) {
        res.status(400).json(error) 
    }
})

// DELETE = destroy

app.delete('/users/:id', async (req, res) =>{
    try {
        const { id } = req.params
    
        await User.destroy({
            where: { id }
        })
        res.status(204).end() // termina con la peticion
    } catch (error) {
        res.status(400).json(error) 
    }
})

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});