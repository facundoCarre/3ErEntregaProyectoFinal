const express = require('express');
const router = express.Router();
const prductos = require('../api/productos');

router.get('/productos/listar', async (req, res) => {
    let prodRes = await prductos.buscar();
    res.json(prodRes);
    
});
router.get('/productos/listar/:id', async (req, res) => {
    let { id } = req.params;
    let prodRes = await prductos.buscarPorId(id);
    res.json(prodRes);
    
});



router.post('/productos/guardar',permisoAdministrador , (req, res) => {
    let producto = req.body;
    console.log(producto)
    res.json(prductos.guardar(producto));
});

router.put('/productos/actualizar/:id', permisoAdministrador ,(req, res) => {
    let { id } = req.params
    let producto = req.body
    prductos.update(id, producto)
    res.json('El producto se actualizo con exito');
});

router.delete('/productos/borrar/:id', permisoAdministrador,  (req, res) => {
    let { id } = req.params;
    let producto = req.body
    prductos.eliminar(id)
    res.json('Producto eliminado con exito');
});

function permisoAdministrador (req,res,next){
 let body = req.body;
 const url = req.originalUrl
 const metodo = req.method
 if(body.permisos.administrador){
    next()
 }else{
     res.status(500).send({error: '-1', descripcion: `ruta ${url} método ${metodo} no autorizada`})
 }
}
function permisoUsuario (req,res,next){
    let body = req.body;
    if(body.permisos.usuario){
       next()
    }else{
        res.status(500).send({error: '-1', descripcion: `ruta ${url} método ${metodo} no autorizada`})
    }
   }
module.exports = router;