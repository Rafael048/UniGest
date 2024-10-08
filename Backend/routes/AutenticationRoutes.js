const express = require("express");
const router = express.Router();
const AutenticationControllers = require("../controllers/AutenticationControllers");
const RelacionesModelos = require("../models/RelacionesModelos");

router.post("/register", function (req, res, next) {
  AutenticationControllers.Register(req.body)
    .then(() => {
      res.send("Usuario Creado");
    })
    .catch((e) => {
      res
        .status(400)
        .json({ error: "Nombre de usuario ya utilizado", message: e.message });
    });
});

router.post("/login", function (req, res, next) {
  console.log(req.body);
  AutenticationControllers.Login(req.body)
    .then((results) => {
      res.send(results);
    })
    .catch((e) => {
      console.error(e);
      res
        .status(401)
        .json({ error: "Error al autenticar", message: e.message });
    });
});

router.get("/logout", function (req, res, next) {
  res.send("Logout");
});
router.get("/verify/:token", function (req, res, next) {
  const token = req.params.token;
  AutenticationControllers.Verify(token)
    .then((userName) => {
      res
        .status(200)
        .json({ result: "Usuario Autenticado", userName: userName });
    })
    .catch((e) => {
      res
        .status(401)
        .json({ error: "Error al autenticar", message: e.message });
    });
});
router.get("/500", (req, res, next) => {
  res.status(500).json({message:"Algo no ha salido como se esperaba", error:e.message})
});


module.exports = router;
