const connection = require('../connection')
class SubjectsModels{
    All(){
      return new Promise((resolve,reject)=>{
        let consult = "SELECT * FROM materias"
        connection.query(consult,function(error,results,fields){
          if(error){
           reject(error)
          }else{results.forEach(element => {
            
            switch(element.diaClase){
              case 0:  element.diaClase = "Domingo"
              break;
              case 1: element.diaClase = "Lunes"
              break;
              case 2:  element.diaClase = "Martes"
              break;
              case 3:  element.diaClase = "Miercoles"
              break;
              case 4:  element.diaClase = "Jueves"
              break;
              case 5:  element.diaClase = "Viernes"
              break;
              case 6:  element.diaClase = "Sabado"
              break;
      
            }
          });
            resolve(results)
          }
        })
      });
    }
   
    
    Create(registro){
      return new Promise((resolve, reject) => {
        let nombreR = registro.nombre
        let diaClase = null
        let diaUpper = registro.dia.charAt(0).toUpperCase() + registro.dia.slice(1)
        if(nombreR==undefined||diaUpper==undefined||nombreR.trim()===""||diaUpper.trim()===""){
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
        }
             let consult = `INSERT INTO materias (nombre,diaClase) VALUES ('${nombreR}','${diaClase}')`
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
        let diaClase = null
        let diaUpper = registro.dia.charAt(0).toUpperCase() + registro.dia.slice(1)
        if(nombreR==undefined||diaUpper==undefined||nombreR.trim()===""||diaUpper.trim()===""){
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
        }
        let consult = `UPDATE materias SET nombre = '${nombreR}', diaClase=${diaClase} WHERE id = ${idReq}`
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
      })
      
    }
    
    
  Delete(idElemento){
    return new Promise((resolve, reject) => {
        let consult = `DELETE FROM materias WHERE id=${idElemento}`
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
module.exports = new SubjectsModels