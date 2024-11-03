const ActivitiesModels = require("../models/ActivitiesModels");

class ActivitiesControllers{
    All(offset){
      return new Promise((resolve, reject) => {   
        ActivitiesModels.All(offset)
       .then((result) => {
        resolve(result)
       }).catch((e) => {
        reject(e)
       });
      })
    }
   
    Create(actividad){
      return new Promise((resolve, reject) =>{
        ActivitiesModels.Create(actividad)
        .then((result) => {
          resolve(result)
         }).catch((e) => {
          reject(e)
         })
    })
      
    }
    Modify(idReq, nuevosValores){
      return new Promise((resolve, reject) => {   
      ActivitiesModels.Modify(idReq,nuevosValores)
      .then((result) => {
        resolve(result)
       }).catch((e) => {
        reject(e)
       });
      })
    }
    Delete(idElemento){
      return new Promise((resolve, reject) =>{
      ActivitiesModels.Delete(idElemento)
      .then((result) => {
        resolve(result)
       }).catch((e) => {
        reject(e)
       });
      })
    }
  }
  module.exports = new ActivitiesControllers();