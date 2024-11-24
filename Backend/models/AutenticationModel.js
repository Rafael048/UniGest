const connection = require("../connection")
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
require('dotenv').config();
const ProfessorsControllers = require("../controllers/ProfessorsControllers");



class AutenticationModels{
         Register(userData){
        return new Promise(async(resolve,reject)=>{
            console.log(userData)
            const name = userData.name
            const lastName = userData.lastName
            const user = userData.user
            const password = userData.password 
            const rol = userData.rol
            const cedulaUser = userData.cedula
            const registerpass = userData.registerpass
            if(name==undefined||lastName==undefined||user==undefined||password==undefined||rol==undefined||cedulaUser==undefined||registerpass==undefined||name.trim()===" "||lastName.trim()=== " "||user.trim()=== " "||rol.trim()===" "||registerpass.trim()===" "){
                reject(new Error("No se pueden enviar datos vacios"))
            }
            let consultPass = `SELECT directorPass FROM accespass`
            connection.query(consultPass,async function(err,result){
                if(err){
                    reject(err)
                }else{
                    if(result[0].directorPass==registerpass){
                        let passwordHash = await bcryptjs.hash(password,8)
                        let consult = `INSERT INTO users (nombre,apellido,userName,password,rol,cedula) VALUES (' ${name}', '${lastName}','${user}','${passwordHash}', '${rol}','${cedulaUser}  ')`
                        connection.query(consult,function(error,results,fields){
                            if(error){
                                reject(error)
                            }else{
                                if(rol === "Profesor"){
                                    const data = {
                                        nombre:name,
                                        apellido:lastName,
                                        cedula: cedulaUser
                                    }
                                    ProfessorsControllers.Create(data)
                                    .then((result) => {
                                        console.log(result)
                                    }).catch((err) => {
                                        console.log(err)
                                    });
                                }
                                resolve(results)
                            }
                        })
                    }else{
                        reject(new Error("No tiene permisos para registrarse"))
                    }
                }
            })
          
        })
     
    }
    Login(userData){
        return new Promise((resolve,reject)=>{
            const user = userData.user
            const password = userData.password
            if(!user || !password || user.trim() === "" || password.trim() === ""){
                return reject(new Error("No se pueden pasar valores vacios"))
                
            }else{

                let consult = `SELECT * FROM users WHERE userName = ?`
                connection.query(consult,[user],async function(error,results,fields){
                    if (error) {
                        return reject(error)
                    }
    
                    if (results.length === 0) {
                        return reject(new Error("Usuario no encontrado"))
                    }
                    try {
                        
                        let comparation = await bcryptjs.compare(password, results[0].password);
                        if (comparation) {
                            const id = results[0].id
                            const rol = results[0].rol
                            const cedula = results[0].cedula
                            const name = results[0].name
                            const userName = results[0].userName
                            const token = jwt.sign({ name:name,id: id, userName:userName, rol:rol, cedula:cedula  }, process.env.JWT_SECRET);
                            resolve(token)
                        } else {
                            reject(new Error("Contraseña incorrecta"))
                        }
                    } catch (error) {
                        reject(error)
                    }
                });
            }
        
        }
    )  
   }
   Verify(cookie){
    return new Promise((resolve, reject) => {
        if (cookie) {
            try {
                const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
                let consult = `SELECT * FROM users WHERE id = ?`;
                connection.query(consult, [decoded.id], function(error, results, fields) {
                    if (error) {
                        reject(error)
                    } else {
                        if (!results || results.length === 0) {
                            reject(new Error("Usuario no encontrado"))
                        } else {
                            resolve(results[0])
                        }
                    }
                });
            } catch (error) {
                reject(error)
            }
        } else {
            reject(new Error("No se proporcionó ningún token"))
        }
    })
}

Logout(cookie){
    return new Promise((resolve,reject)=>{
        if(!cookie){
            reject(new Error("No has iniciado sesion"))
        }else{
            resolve()
        }
    })
}
Modify(cedula,values){
    return new Promise((resolve, reject) => {
       let cedulaFront = cedula
       let nombre = values.nombre
       let apellido = values.apellido
       if(!values.warning){
        let user = values.usuario
        let newPassword = values.nueva
        let oldPassword = values.contraseña

        if(nombre==undefined||apellido==undefined||nombre.trim()==" "||apellido.trim()==" "||user==undefined||user.trim()==""||newPassword==undefined||newPassword.trim()==""||oldPassword==undefined||oldPassword.trim()==""){
            reject(new Error("No se peuden enviar datos vacios"))
        }else{
            let queryPass = `SELECT * FROM users WHERE cedula = ${cedulaFront}`
            connection.query(queryPass,async function(err,result){
                if(err){
                    reject(err)
                }else{
                    if(result.length==0){
                        reject(new Error("No se encontró el usuario"))
                    }else{
                        let passwordHash = result[0].password
                        let comparation = await bcryptjs.compare(oldPassword, passwordHash)
                        if(comparation){
                            let newPassHash = await bcryptjs.hash(newPassword,8)
                            let queryUpdate = `UPDATE users SET nombre = '${nombre}', apellido = '${apellido}', userName = '${user}', password = '${newPassHash}' WHERE cedula = ${cedulaFront}`
                            connection.query(queryUpdate,function(err,results){
                                if(err){
                                    reject(err)
                                }else{
                                    if(values.rol){
                                        let queryID = `SELECT * FROM profesores WHERE cedula = ${cedulaFront}`
                                        connection.query(queryID,function(err,result){
                                            if(err){
                                                reject(err)
                                            }else{
                                                if(result.length==0){
                                                    reject(new Error("No se encontró el profesor"))
                                                }else{
                                                    let id = result[0].id
                                                    let obj = {nombre:nombre,apellido:apellido}
                                                    ProfessorsControllers.Modify(id,obj)
                                                    .then(() => {
                                                        console.log("Actualizado")
                                                        resolve()
                                                    }).catch((err) => {
                                                        reject(err)
                                                    });
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }else{
                            reject(new Error("Contraseña incorrecta"))
                        }
                    }
                }
            })
        }
       }else{
           if(nombre==undefined||apellido==undefined||nombre.trim()==" "||apellido.trim()==" "){
            reject(new Error("No se peuden enviar datos vacios"))
        }
           let consult = `UPDATE users SET nombre = '${nombre}', apellido = '${apellido}' WHERE cedula = ${cedulaFront}`
           connection.query(consult, function(err, results, fields) {
            if(err){
                reject(err)
            }else{
                if(results.length===0){
                    reject(new Error("No se encontro el usuario"))
                }
                resolve()
            }
           })
       }
    })
}
Delete(pass,user){
    return new Promise((resolve, reject) => {
        let consultUser = `SELECT * FROM users WHERE userName = '${user}'`
        connection.query(consultUser,async function(err, results, fields){
            if(err){
                reject(err)
            }else{
                if(results.length===0){
                    reject(new Error("No se encontro el usuario"))
                }else{
                    let consultUserRoot = `SELECT * FROM users WHERE rol = "Director"`
                    connection.query(consultUserRoot,async function(err, resultsRoot, fields){
                        if(err){
                            reject
                        }else{
                            if(resultsRoot.length<=1){
                                reject(new Error("No se puede eliminar el unico director activo"))
                            }else{
                                let passBD = results[0].password
                                let comparation = await bcryptjs.compare(pass, passBD)
                                if(comparation){
                                    let consult = `DELETE FROM users WHERE userName = '${user}'`
                                    connection.query(consult,function(err,result){
                                        if(err){
                                            reject(err)
                                        }else{
                                            resolve(result)
                                        }
                                    })
                                }
                            }
                        }
                    })  
                }
            }
        })
    })
}

}
module.exports = new AutenticationModels()