const { Router } = require('express');
const router = Router();
 
//Raiz
router.get('/', (req, res) => {    
    res.json(
        {
            "Title": "Hola mundo usando rutas!"
        }
    );
})
 
//Seleccionar todos los usuarios

module.exports = router;