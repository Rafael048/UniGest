const connection = require('../connection')
class UnitsModels{
    All(offset){
      return new Promise((resolve,reject)=>{
        let consult = null
        if(offset){
           consult = `SELECT * FROM unidades LIMIT 6 OFFSET ${offset}`
        }else{
          consult = `SELECT unidades.unidad AS unidad, unidades.idClase AS idClase, unidades.tema AS tematica, unidades.id AS id FROM unidades`
        }
        connection.query(consult,function(error,results,fields){
          if(error){
           reject(error)
          }else{
              resolve(results)
          }
        })
      });
    }
   
    
    Create(registro){
      return new Promise((resolve, reject) => {
        let unidad = registro.unidad
        let tema = registro.tema
        let idClase = registro.idClase
        if(unidad==undefined||tema==undefined||unidad.trim()===""||tema.trim()===""){
          reject(new Error("No se pueden enviar datos vacios"))
        }
          let consult = `INSERT INTO unidades (unidad,tema,idClase) VALUES ('${unidad}','${tema}',${idClase})`
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
      return new Promise((resolve,reject)=>{
        let unidad = nuevosValores.nombre
        let diaClase = null
        let diaUpper = nuevosValores.dia.charAt(0).toUpperCase() + nuevosValores.dia.slice(1)
        if(unidad==undefined||diaUpper==undefined||unidad.trim()===""||diaUpper.trim()===""){
          reject(new Error("No se pueden enviar datos vacios"))
        }
        switch(diaUpper){
          case "Domingo": diaClase = 0
          break;
          case "Lunes": diaClase = 1 
          break;
          case "Martes": diaClase = 2 
          break;
          case "Miercoles": diaClase = 3
          break;
          case "Jueves": diaClase = 4
          break;
          case "Viernes": diaClase = 5
          break;
          case "Sabado": diaClase = 6
          break;
          default : diaClase = null
        }
        if(diaClase===null){
          reject(new Error("Debes pasar un dia de la semana valido"))
        }else{

          let consult = `UPDATE unidades SET nombre = '${unidad}', diaClase=${diaClase} WHERE id = ${idReq}`
          connection.query(consult,function(error,results,fields){
            if(error){
              reject(error)
            }else{
              if(results.length===0){
                reject(new Error("No se encontro la materia"))
            }
              resolve(results)
           }
          })
        }
      })
      
    }
    
    
  Delete(idElemento){
    return new Promise((resolve, reject) => {
        let consult = `DELETE FROM unidades WHERE id=${idElemento}`
          connection.query(consult,function(error,results,fields){
            if(error){
              reject(error)
            }else{
              resolve(results)

            }
          })
         })
        }
        One(name){
          return new Promise((resolve, reject) => {
            let consult = `SELECT * FROM unidades WHERE idClase LIKE '%${name}%'`
            connection.query(consult,function(err,results){
              if(err){
                reject(err)
              }else{
                if(results.length===0){
                  reject(new Error("No hay unidades en esta clase"))
                }else{
                  console.log(results)
                  resolve(results)
                }
              }
            })
          })
        }
}
module.exports = new UnitsModels