var ProfessorsModels = require("../models/ProfessorsModels");

class ProfessorsControllers{
  All(offset) {
    return new Promise((resolve, reject) => {   
     ProfessorsModels.All(offset)
     .then((results) => {
      resolve(results)
      })
        .catch((error) => {
         reject(error)
      });
    });
  }

  
  Create(usuario){
    return new Promise((resolve, reject) =>{
        ProfessorsModels.Create(usuario)
        .then(() => {
          resolve()
      })
      .catch((error) => {
          reject(error)
      });
    });
  }

  Modify(idReq, nuevosValores){
    return new Promise((resolve, reject) => {   
      ProfessorsModels.Modify(idReq,nuevosValores)
      .then(() => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      });
    });
  }

  Delete(idElemento){
    return new Promise((resolve, reject) =>{
      ProfessorsModels.Delete(idElemento)
      .then(() => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      });
    });
  }
}


module.exports = new ProfessorsControllers();
