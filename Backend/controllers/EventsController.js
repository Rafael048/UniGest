const EventsModels = require("../models/EventsModels");

class EventsController{
  All(offset) {
    return new Promise((resolve, reject) => {   
      EventsModels.All(offset)
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
      EventsModels.One(name)
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
        EventsModels.Create(registro)
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
      EventsModels.Modify(idReq, nuevosValores)
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
      EventsModels.Delete(idElemento)
      .then(() => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      });
    });
  }
}


module.exports = new EventsController();
