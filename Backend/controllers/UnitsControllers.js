const UnitsModels = require("../models/UnitsModels");


class UnitsControllers{
    All(offset){
      return new Promise((resolve, reject) => {   
        UnitsModels.All(offset)
        .then((results) => {
          resolve(results)
      })
      .catch((error) => {
          reject(error)
      });
    });
  }
  One(name){
    return new Promise((resolve, reject) => {   
      UnitsModels.One(name)
      .then((results) => {
        resolve(results)
    })
    .catch((error) => {
        reject(error)
    });
  });
}


    Create(registro){
      return new Promise((resolve, reject) =>{
        UnitsModels.Create(registro)
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
        UnitsModels.Modify(idReq,nuevosValores)
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
        UnitsModels.Delete(idElemento)
        .then(() => {
          resolve()
        })
        .catch((error) => {
          reject(error)
        });
    });
  }
}
  module.exports = new UnitsControllers();