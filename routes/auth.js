/*
    Rutas de usuarios / auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/new",
  [
    //!Middlewares
    check("name", "El nombre es obligatorio y debe poseer como minimo 5 caracteres").not().isEmpty().isLength({min:5}),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe tener como minimo 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos
  ],
  crearUsuario
);

router.post(
  "/",
  [
    //!Middlewares
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe tener como minimo 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos
  ],
  loginUsuario
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
