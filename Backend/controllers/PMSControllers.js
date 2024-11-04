const PMSModels = require("../models/PMSModels");

class PMSControllers{
    All(cedula,offset,table){
      return new Promise((resolve, reject) => {   
        PMSModels.All(cedula,offset,table)
       .then((result) => {
        resolve(result)
       }).catch((e) => {
        reject(e)
       });
      })
    }
    
    Create(actividad){
      return new Promise((resolve, reject) =>{
        PMSModels.Create(actividad)
        .then((result) => {
          resolve(result)
         }).catch((e) => {
          reject(e)
         })
    })
      
    }
    Modify(idReq, nuevosValores){
      return new Promise((resolve, reject) => {   
      PMSModels.Modify(idReq,nuevosValores)
      .then((result) => {
        resolve(result)
       }).catch((e) => {
        reject(e)
       });
      })
    }
    Delete(idElemento){
      return new Promise((resolve, reject) =>{
      PMSModels.Delete(idElemento)
      .then((result) => {
        resolve(result)
       }).catch((e) => {
        reject(e)
       });
      })
    }
  }
  module.exports = new PMSControllers();