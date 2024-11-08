const AutenticationModels = require("../Models/AutenticationModel")
class AutenticationControllers{
    Register(userData){
        return new Promise((resolve, reject) => {
            AutenticationModels.Register(userData)
                .then((results) => {
                    resolve(results)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
   
    Login(userData){
        return new Promise((resolve, reject) => {
            AutenticationModels.Login(userData)
                .then((results) => {
                    resolve(results)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
    Verify(cookie){
        return new Promise((resolve, reject) => {
            AutenticationModels.Verify(cookie)
                .then((userName) => {
                    resolve(userName)
                })
                .catch((error) => {
                    reject(error)
                });
        });
    }
    Logout(cookie){
        return new Promise((resolve, reject) => {
            AutenticationModels.Logout(cookie)
                .then(() => {
                    resolve()
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
    Modify(idReq, nuevosValores){
        return new Promise((resolve, reject) => {   
          AutenticationModels.Modify(idReq,nuevosValores)
          .then(() => {
            resolve()
          })
          .catch((error) => {
            reject(error)
          });
        });
      }
      Delete(pass,user){
        return new Promise((resolve, reject) => {
            AutenticationModels.Delete(pass,user)
            .then(() => {
                resolve()
            }).catch((e) => {
                reject(e)
            });
        })
      }
    }
    
  
module.exports = new AutenticationControllers()