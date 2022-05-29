function createUser(req, res, con) {
    const{imagen,nombre_clinica,usuario,password, email, telefono, activo} = req.body;

    const sql = `INSERT INTO clientes(imagen,nombre_clinica, usuario, password, email, telefono, activo) VALUES('${imagen}','${nombre_clinica}','${usuario}','${password}','${email}','${telefono}',${activo})`;
    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.json({ estado: 'FATAL ERROR', descripcion: "CAMPO MODIFICADO INCORRECTAMENTE" })
        }
        res.json({ estado: 'ok', descripcion: 'REGISTROS INCERTADOS CORRECTAMENTE', id: result.insertId });
    })
}


function editUser(req, res, con) {
   
    const{imagen,nombre_clinica,usuario,password, email, telefono, activo, id_usuario} = req.body;

    const sql = `UPDATE clientes SET imagen = '${imagen}', nombre_clinica = '${nombre_clinica}', usuario = '${usuario}',email ='${password}', email = '${email}', telefono = '${telefono}', activo='${activo}' WHERE id_usuario = ${id_usuario}`;
    con.query(sql, (err) => {
        if (err) {
            console.log(err);
            res.json({ estado: 'FATAL ERROR', descripcion: "CAMPO MODIFICADO INCORRECTAMENTE" });
        }
        res.json({ estado: 'TODO BIEN', descripcion: 'EL REGISTRO SE HA ACTUALIZADO' });
    })
}


function deleteUser(req, res, con) {
    const id_usuario = req.body.id_usuario;
    console.log({id_usuario})
    const sql = `DELETE FROM clientes WHERE id_usuario = ${id_usuario}`;
    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) {
            console.log({err})
            res.status(err)
            //res.json({ estado: 'FATAL ERROR', descripcion: "NO SE HA BORRADO NADA" })
        }
        res.status(err)
        //res.json(result, { estado: 'TODO BIEN', descripcion: 'EL REGISTRO SE HA BORRADO' });
    })
}

exports.createUser = createUser;
exports.editUser = editUser;
exports.deleteUser = deleteUser;