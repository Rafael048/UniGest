const express = require("express");
const router = express.Router();
const APMSControllers = require("../controllers/APMSControllers");
router.get("/", function (req, res, next) {
  if (req.query.id) {
    APMSControllers.One(req.query.id)
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
  } else {
    APMSControllers.All().then((result) => {
      res.status(200).json({ message: "Peticion exitosa", body: result });
    });
  }
});

router.post("/agregar", function (req, res, next) {
  APMSControllers.Create(req.body)
    .then(() => {
      APMSControllers.All().then((result) => {
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
  APMSControllers.Modify(idReq, nuevosValores)
    .then(() => {
      APMSControllers.All().then((result) => {
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
  APMSControllers.Delete(req.params.id)
    .then(() => {
      APMSControllers.All().then((result) => {
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
