const express = require("express");
const PMSControllers = require("../controllers/PMSControllers");
const router = express.Router();
router.get("/", function (req, res, next) {
    const table = req.query.table
    const offset = req.query.offset
    const cedula = req.query.cedula
    let button = null
    PMSControllers.All(cedula,offset,table)
    .then((result) => {
      if(result[5]){
        result.pop()
        button = true
      }
      res.status(200).json({ message: "Peticion exitosa", body: result, button:button });
    });
  }
);

router.post("/agregar", function (req, res, next) {
  PMSControllers.Create(req.body)
    .then(() => {
      PMSControllers.All().then((result) => {
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
  PMSControllers.Modify(idReq, nuevosValores)
    .then(() => {
      PMSControllers.All().then((result) => {
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
  PMSControllers.Delete(req.params.id)
    .then(() => {
      PMSControllers.All().then((result) => {
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
