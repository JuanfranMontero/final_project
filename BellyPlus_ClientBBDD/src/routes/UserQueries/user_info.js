//get users
function getAllUsers(req,res,con) {
    const name = req.query.name;
    let sql = `SELECT * FROM clientes`;
    con.query(sql, (err,result)=>{
        if(err) throw err
        console.log({result})
        res.send(result);
    })
}
exports.getAllUsers = getAllUsers;

//Get User By ID
function getUserById(req,res,con) {
    const id = req.query.id_usuario;
    console.log({id})
    let sql = `SELECT * FROM clientes where id_usuario = '${id}'`;
    con.query(sql, (err,result)=>{
        if(err) throw err
        console.log({result})
        res.send(result);
    })
}
exports.getUserById = getUserById;
