const express = require('express')
const db = require('../db/db')

const router = express.Router()

//CRUD
//METODOS
//post, GET, PUT, DELETE


//CREATE
router.post('/persona', (req, res) =>{
    const {nombre, estado, apellido, telefono, correo, direccion, fecha_nacimiento} = req.body
    const sql = 'INSERT INTO persona (nombre, estado, apellido, telefono, correo, direccion, fecha_nacimiento) VALUE (?, ?, ?, ?, ?, ?, ?) ';
    db.query(sql, [nombre, estado, apellido, telefono, correo, direccion, fecha_nacimiento], (err, result) =>{
        if(err){
            return res.status(500).json({error: 'No se pudo insertar a la persona, revisa la estructura'})
        }

        res.status(201).json({id:result.insertId, nombre, estado, apellido, telefono, correo, direccion, fecha_nacimiento})
    })
})

//READ
router.get('/persona', (req, res) =>{
    db.query('SELECT * FROM persona', (err, results)=>{
        if(err){
            return res.status(500).json(
                {
                    error: 'Hemos un error al obtener la informacion'
                }
            )
        }

        res.json(results)
    })
})

//PUT

//GET  OBTENER
// SET   PARA actualizar, o poner

router.put('/persona/:id', (req, res) => {
    const id = req.params.id
    const {nombre, estado, apellido, telefono, correo, direccion, fecha_nacimiento} = req.body
    const sql = 'UPDATE persona set nombre = ?, estado = ?, apellido= ?, telefono = ?, correo = ?, direccion = ?, fecha_nacimiento = ? where id = ? ';
    try{
        //INTENTAR, ALGUNA FUNCION, INTETAR UNMETODO O ALGUNA ACTIVIDAD.    
        db.query(sql, [nombre, estado, apellido, telefono, correo, direccion, fecha_nacimiento, id], (err, result) =>{
            if(err){
                return res.status(500).json({error: 'No se pudo actualizar la persona ' + err})
            }
            res.status(200).json({mensaje: 'Actualizado', resultado: result})
        })
    }catch(e){
        console.error('Error al actualizar el regisgtro: ' + e)
    }
})


//DELETE

router.delete('/persona/:id', (req, res)=>{
    const {id} = req.params
    const sql = 'DELETE FROM persona WHERE id = ?'
    try{
        db.query(sql, [id], (err, result) =>{
            if(err){
                return res.status(500).json({error: 'No se pudo eliminar'})
            }
            //SI LA FILA QUE QUERIA AFECTAR, O ELIMINAR, NO LA ENCONTRO, 
            if(result.affectedRows === 0){
                return res.status(404).json({error: 'no encontramos a la persona'})
            }

            res.status(200).json({error: 'LO HAS LOGRADO!, SI SE PUDO'})
        })
    }catch(error){
        console.error('HUBO UN ERROR EN CONSOLA' + error)
    }
})

module.exports =    router