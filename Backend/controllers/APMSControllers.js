const APMSModels = require("../models/APMSModels");

class APMSControllers{
    All(id,cedula){
      return new Promise((resolve, reject) => {   
        APMSModels.All(id,cedula)
       .then((result) => {
        resolve(result)
       }).catch((e) => {
        reject(e)
       });
      })
    }
    
    Create(actividad){
      return new Promise((resolve, reject) =>{
        APMSModels.Create(actividad)
        .then((result) => {
          resolve(result)
         }).catch((e) => {
          reject(e)
         })
    })
      
    }
    Modify(idReq, nuevosValores){
      return new Promise((resolve, reject) => {   
      APMSModels.Modify(idReq,nuevosValores)
      .then((result) => {
        resolve(result)
       }).catch((e) => {
        reject(e)
       });
      })
    }
    Delete(idElemento){
      return new Promise((resolve, reject) =>{
      APMSModels.Delete(idElemento)
      .then((result) => {
        resolve(result)
       }).catch((e) => {
        reject(e)
       });
      })
    }
  }
  module.exports = new APMSControllers();