import { DataTypes } from "sequelize";
import db from "../utils/database.js";

// nombre del modelo         //nombre tabla
const User = db.define( 'users', {
    // Definir todos los atributos / columnas de la tabla
    // id, username, email, password
    // id int [ pk, increment]
    id: { 
        //tipo de dato
        type: DataTypes.INTEGER, 
        // Llave primaria
        primaryKey: true,
        // Increment
        autoIncrement: true,
     },

     //username varchar (30) [not null]
     username: {
        type: DataTypes.STRING(30),
        //not null
        allowNull: false,
     }, 

     //email varchar (50) [not null, unique]
     email:{
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
     },

     //password 

     password:{
        type: DataTypes.STRING,
        allowNull: false
     }
})

export default User;