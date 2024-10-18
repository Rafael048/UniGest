const e = require('express');
const connection = require('../connection')
const PMSControllers = require("../controllers/PMSControllers");
class ProfessorsModels{
  All() {
    return new Promise((resolve,reject)=>{
      let consult = "SELECT * FROM profesores"
      connection.query(consult,function(error,results,fields){
        if(error){
         reject(error)
        }else{
          PMSControllers.All(undefined)
          .then((pms) => {
            for (let i = 0; i < results.length; i++) {
              results[i].materias_Secciones = []
              
              for (let j = 0; j < pms.length; j++) {
                if (results[i].id == pms[j].idProf) {
                  results[i].materias_Secciones.push(pms[j].Materias+ " " +pms[j].Secciones)
                }
              }
            }
            resolve(results)
          }).catch((e) => {
            reject(e)
          });
        }
      })
    });
  }
  
  Create(usuario){
    return new Promise((resolve, reject) => {
      let nombreUS = usuario.nombre
      let apellidoUS = usuario.apellido
      let cedula = usuario.cedula
      if(nombreUS==undefined|| apellidoUS==undefined || cedula==undefined||nombreUS.trim()===" "|| apellidoUS.trim()===" " || cedula.trim()===""){
        reject(new Error("No se pueden pasar datos vacios"))
      }
        let consult = `INSERT INTO profesores (nombre, apellido,cedula) VALUES ('${nombreUS}','${apellidoUS}',${cedula} )`
        connection.query(consult,function(error,results,fields){
         if(error){
           reject(error)
         }else{
           resolve(results)
         }
        })    
    })
  }
 Modify(idReq, nuevosValores) {
  return new Promise((resolve, reject) => {
    let nombreUs = nuevosValores.nombre
    let apellidoUS= nuevosValores.apellido
    if(nombreUS==undefined|| apellidoUS==undefined || cedula==undefined||nombreUs.trim()===" "|| apellidoUS.trim()===" " || cedula.trim()===""){
      reject(new Error("No se pueden pasar datos vacios"))
    }
    let consult = `UPDATE profesores SET nombre = '${nombreUs}', apellido = '${apellidoUS}' WHERE id = ${idReq}`
    connection.query(consult,function(error,results,fields){
      if(error){
        reject(error)
      }else{
        if(results.length===0){
          reject(new Error("No se encontro el profesor"))
      }
        resolve(results)
      }
    })
  });
}
  
Delete(idElemento){
  return new Promise((resolve,reject)=>{
    connection.query(`SELECT profesores.cedula FROM profesores WHERE id=${idElemento}`,function(err,result){
      if(err){
        reject(err)
      }else{
        let consult = `DELETE FROM profesores WHERE id = ${idElemento}`
        connection.query(consult,function(error,results,fields){
          if(error){
            reject(error)
          }else{
            connection.query(`DELETE FROM users WHERE cedula = ${result[0].cedula}`,function(err,result3){
              if(err){
                reject(err)
              }else{
                resolve(result3)
              }
            })
          }
        })
      }
    })

  })


}

}

module.exports = new ProfessorsModels(); 