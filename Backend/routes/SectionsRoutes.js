const express = require("express");
const router = express.Router();
const SectionsControllers = require("../controllers/SectionsControllers");
router.get("/", function (req, res, next) {
    let button = null
    SectionsControllers.All(req.query.offset)
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
router.post("/agregar", function (req, res, next) {
  SectionsControllers.Create(req.body)
    .then(() => {
      SectionsControllers.All().then((result) => {
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
router.put("/editar/:id", function (req, res, next) {
  const idReq = req.params.id;
  const nuevosValores = req.body;
  SectionsControllers.Modify(idReq, nuevosValores)
    .then(() => {
      SectionsControllers.All().then((result) => {
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
  SectionsControllers.Delete(req.params.id)
    .then(() => {
      SectionsControllers.All().then((result) => {
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
module.exports = router;
