const connection = require('../connection')

class SectionsModels{
  All(offset) {
    return new Promise((resolve,reject)=>{
      let consult = null
      if(offset){
        consult = `SELECT * FROM secciones LIMIT 6 OFFSET ${offset}`
      }else{
        consult = `SELECT * FROM secciones`

      }
      connection.query(consult,function(error,results,fields){
        if(error){
         reject(error)
        }else{
          results.forEach(Element => {
            let dateTemp = new Date(Element.periodoAcademico)
            Element.periodoAcademico = dateTemp.toISOString().slice(0,10).replace('T','')
          });
  
          resolve(results)
        }
      })
    });
  }
  
  One(name){
    return new Promise((resolve, reject) => {
      let consult = `SELECT * FROM secciones WHERE nombre LIKE '%${name}%'`
      connection.query(consult,function(err,results){
        if(err){
          reject(err)
        }else{
          if(results.length===0){
            reject(new Error("No se encontro la materia"))
          }else{
            results.forEach(Element => {
              let dateTemp = new Date(Element.periodoAcademico)
              Element.periodoAcademico = dateTemp.toISOString().slice(0,10).replace('T','')
            });
            resolve(results)
          }
        }
      })
    })
  }
  

    Create(registro){
      return new Promise((resolve, reject) => {
        let nombreR = registro.nombre
        let periodoAcademicoR= registro.periodo
        if(nombreR==undefined||periodoAcademicoR==undefined||nombreR.trim()===""||periodoAcademicoR.trim()===""){
          reject(new Error("No se pueden enviar datos vacios"))
        }
        let periodoDate = new Date(periodoAcademicoR)
        let periodoAcademicoIso = periodoDate.toISOString().slice(0,10).replace('T','')

             let consult = `INSERT INTO secciones (nombre, periodoAcademico, id) VALUES ('${nombreR}', '${periodoAcademicoIso}', "")`
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
        let nombreR = nuevosValores.nombre
        let periodoAcademicoR= nuevosValores.periodo
        if(nombreR==undefined||periodoAcademicoR==undefined||nombreR.trim()===""||periodoAcademicoR.trim()===""){
          reject(new Error("No se pueden enviar datos vacios"))
        }
        let periodoDate = new Date(periodoAcademicoR)
        let periodoAcademicoIso = periodoDate.toISOString().slice(0,10).replace('T','')
        let consult = `UPDATE secciones SET nombre = '${nombreR}', periodoAcademico = '${periodoAcademicoIso}' WHERE id = ${idReq}`
        connection.query(consult,function(error,results,fields){
          if(error){
            reject(error)
          }else{
            if(results.length===0){
              reject(new Error("No se encontro la seccion"))
          }
            resolve(results)
         }
        }
      )
      })
      }

    Delete(idElemento){
      return new Promise((resolve, reject) => {
          let consult = `DELETE FROM secciones WHERE id=${idElemento}`
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
//

module.exports = new SectionsModels(); 