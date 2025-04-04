const connection = require('../connection')
const APMSControllers = require("../controllers/APMSControllers");

class ActivitiesModels{
  All(offset,creator) {
    return new Promise((resolve,reject)=>{
      let consult = null
      if(creator){
        consult = `SELECT actividades.nombre AS nombre, actividades.descripcion AS descripcion, actividades.semana AS semana,actividades.id AS id, users.userName AS creador, actividades.horaFinal AS Hora, actividades.porcentaje AS porcentaje FROM actividades JOIN users ON actividades.creador = users.id WHERE users.userName = '${creator}' LIMIT 6 OFFSET ${offset}`

      }else{
        consult = `SELECT actividades.nombre AS nombre, actividades.descripcion AS descripcion, actividades.semana AS semana,actividades.id AS id, users.userName AS creador, actividades.horaFinal AS Hora, actividades.porcentaje AS porcentaje FROM actividades JOIN users ON actividades.creador = users.id LIMIT 6 OFFSET ${offset}`
      }
      connection.query(consult,function(error,results,fields){
        if(error){
         reject(error)
        }else{
          APMSControllers.All()
          .then((apms) => {
            console.log(apms)
            for (let i = 0; i < results.length; i++) {
              results[i].Clase = []
              for (let j = 0; j < apms.length; j++) {
                if (results[i].id == apms[j].idAct) {
                  results[i].Clase.push(apms[j].profesor+ " " +apms[j].materia+ " " +apms[j].seccion,apms[j].id)
                }
              }
            }
            resolve(results)
          }).catch((e) => {
            reject(e)
          })
        }
      })
    });
  }
  One(name){
    return new Promise((resolve, reject) => {
      let consult = `SELECT * FROM actividades WHERE nombre LIKE '%${name}%'`
      connection.query(consult,function(err,results){
        if(err){
          reject(err)
        }else{
          if(results.length===0){
            reject(new Error("No se encontro la materia"))
          }else{
            APMSControllers.All()
          .then((apms) => {
            console.log(apms)
            for (let i = 0; i < results.length; i++) {
              results[i].Clase = []
              for (let j = 0; j < apms.length; j++) {
                if (results[i].id == apms[j].idAct) {
                  results[i].Clase.push(apms[j].profesor+ " " +apms[j].materia+ " " +apms[j].seccion,apms[j].id)
                }
              }
            }
            resolve(results)
          }).catch((e) => {
            reject(e)
          })
          }
        }
      })
    })
  }
  Create(actividades){
    return new Promise((resolve, reject) => {
      let nombreAC = actividades.nombre
      let descripcionAC = actividades.descripcion
      let semanaAC = actividades.semana
      let creador = actividades.creador
      let hora = actividades.hora
      let porcentaje = Number(actividades.porcentaje)
      if(!nombreAC||!descripcionAC||!semanaAC||nombreAC.trim()===" "||descripcionAC.trim()===""||semanaAC.trim()===""||!creador||!hora||!porcentaje){
        reject(new Error("No se pueden enviar datos vacios"))
      }
      let consult = `INSERT INTO actividades (nombre, descripcion, semana, creador, horaFinal, porcentaje) VALUES ('${nombreAC}','${descripcionAC}',${semanaAC}, ${creador}, '${hora}', ${porcentaje})`
        connection.query(consult,function(error,results,fields){
          if(error){
            reject(error)
          }else{
            resolve(results.insertId)

          }
        })
    })
  }

  Modify(idReq, nuevosValores) {
    return new Promise((resolve,reject)=>{
      let nombreAC = nuevosValores.nombre
      let descripcionAC = nuevosValores.descripcion
      let semanaAC = nuevosValores.semana
      let hora = nuevosValores.hora
      let porcentaje = Number(nuevosValores.porcentaje)
      if(!nombreAC||!descripcionAC||!semanaAC||nombreAC.trim()===" "||descripcionAC.trim()===""||semanaAC.trim()===""||!hora||!porcentaje){
        reject(new Error("No se pueden enviar datos vacios"))
      }
      let consult = `UPDATE actividades SET nombre = '${nombreAC}', descripcion = '${descripcionAC}', semana = '${semanaAC}', horaFinal = '${hora}', porcentaje = ${porcentaje} WHERE id = ${idReq}`
      connection.query(consult,function(error,results,fields){
        if(error){
          reject(error)
        }else{
          if(results.length===0){
            reject(new Error("No se encontro la actividad"))
        }
          resolve(results)
       }
      }
    )
    })
    }
  
  
Delete(idElemento){
    return new Promise((resolve, reject) => {
        let consult = `DELETE FROM actividades WHERE id=${idElemento}`
          connection.query(consult,function(error,results,fields){
            if(error){
              reject(error)
            }else{
              resolve(results)
  
            }
          })
         })

}
}

module.exports = new ActivitiesModels(); 