const express = require("express");
const router = express.Router();
const ProfessorsControllers = require("../controllers/ProfessorsControllers");
router.get("/", function (req, res, next) {
    ProfessorsControllers.All()
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
  }
);

router.post("/agregar", function (req, res, next) {
  ProfessorsControllers.Create(req.body)
    .then(() => {
      ProfessorsControllers.All().then((result) => {
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
  ProfessorsControllers.Modify(idReq, nuevosValores)
    .then(() => {
      ProfessorsControllers.All().then((result) => {
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
  ProfessorsControllers.Delete(req.params.id)
    .then(() => {
      ProfessorsControllers.All().then((result) => {
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
