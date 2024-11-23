const connection = require('../connection')

class EventsModels{
  All(offset) {
    return new Promise((resolve,reject)=>{
      let consult = null
      if(offset){
        consult = `SELECT * FROM eventos LIMIT 6 OFFSET ${offset}`
      }else{
        consult = `SELECT * FROM eventos`

      }
      connection.query(consult,function(error,results,fields){
        if(error){
         reject(error)
        }else{
          results.forEach(Element => {
            let dateTemp = new Date(Element.fecha)
            Element.fecha = dateTemp.toISOString().slice(0,10).replace('T','')
          });
  
          resolve(results)
        }
      })
    });
  }
  
  One(name){
    return new Promise((resolve, reject) => {
      let consult = `SELECT * FROM eventos WHERE nombre LIKE '%${name}%'`
      connection.query(consult,function(err,results){
        if(err){
          reject(err)
        }else{
          if(results.length===0){
            reject(new Error("No se encontro la materia"))
          }else{
            results.forEach(Element => {
              let dateTemp = new Date(Element.fecha)
              Element.fecha = dateTemp.toISOString().slice(0,10).replace('T','')
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
        let fecha= registro.fecha
        let lugar = registro.lugar
        let descripcion = registro.descripcion
        if(nombreR==undefined||fecha==undefined||nombreR.trim()===""||fecha.trim()===""||descripcion.trim()===""){
          reject(new Error("No se pueden enviar datos vacios"))
        }
        let fechaDate = new Date(fecha)
        let fechaIso = fechaDate.toISOString().slice(0,10).replace('T','')

             let consult = `INSERT INTO eventos (nombre, fecha, descripcion, lugar) VALUES ('${nombreR}', '${fechaIso}', '${descripcion}' , '${lugar}')`
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
        let fecha= nuevosValores.fecha
        let lugar = nuevosValores.lugar
        let descripcion = nuevosValores.descripcion
        if(nombreR==undefined||fecha==undefined||nombreR.trim()===""||fecha.trim()===""||descripcion.trim()===""){
          reject(new Error("No se pueden enviar datos vacios"))
        }
        let fechaDate = new Date(fecha)
        let fechaIso = fechaDate.toISOString().slice(0,10).replace('T','')
        let consult = `UPDATE eventos SET nombre = '${nombreR}', fecha = '${fechaIso}', descripcion = '${descripcion}', lugar = '${lugar}' WHERE id = ${idReq}`
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
          let consult = `DELETE FROM eventos WHERE id=${idElemento}`
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

module.exports = new EventsModels(); 