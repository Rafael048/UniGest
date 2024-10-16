const express = require("express");
const PMSControllers = require("../controllers/PMSControllers");
const router = express.Router();
router.get("/", function (req, res, next) {
     const cedula = req.query.cedula
     console.log(cedula)
    PMSControllers.All(cedula)
    .then((result) => {
      res.status(200).json({ message: "Peticion exitosa", body: result });
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
