const express = require("express");
const router = express.Router();
const ActivitiesControllers = require("../controllers/ActivitiesControllers");
router.get("/", function (req, res, next) {
  let button = null

    ActivitiesControllers.All(req.query.offset)
      .then((result) => {
        if(result[5]){
          button=true
          result.pop()
        }else{
          button=false
        }
        res.status(200).json({ message: "Peticion exitosa", body: result , button:button });
      })      
      .catch((e) => {
        res
          .status(500)
          .json({
            message: "Algo no ha salido como se esperaba",
            error: e.message,
          });
      });
  }
);
router.get("/Uno/:nombre",function(req,res){
  ActivitiesControllers.One(req.params.nombre)
  .then((result) => {
    res.status(200).json({ message: "Peticion exitosa", body: result });
  }).catch((e) => {
    res
    .status(500)
    .json({
      message: "Algo no ha salido como se esperaba",
      error: e.message,
    });
  });
})
router.post("/agregar", function (req, res, next) {
  console.log(req.body)
  ActivitiesControllers.Create(req.body)
    .then(() => {
      res.status(200).json({message:"Agregado Correctamente"})
      })
      .catch((e) => {
        res
          .status(500)
          .json({
            message: "Algo no ha salido como se esperaba",
            error: e.message,
          });
      });
    })
router.put("/editar/:id", function (req, res, next) {
  const idReq = req.params.id;
  const nuevosValores = req.body;
  ActivitiesControllers.Modify(idReq, nuevosValores)
    .then(() => {
      ActivitiesControllers.All(0).then((result) => {
        res.status(200).json({ message: "Peticion exitosa", body: result });
      });
    })
    .catch((e) => {
      res
        .status(500)
        .json({
          message: "Algo no ha salido como se esperaba",
          error: e.message,
        });
    });
});
router.delete("/eliminar/:id", function (req, res, next) {
  ActivitiesControllers.Delete(req.params.id)
    .then((result) => {
        res.status(200).json({ message: "Peticion exitosa", body: result });
    })
    .catch((e) => {
      res
        .status(500)
        .json({
          message: "Algo no ha salido como se esperaba",
          error: e.message,
        });
    });
});

module.exports = router;
