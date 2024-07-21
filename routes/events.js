/*//*CRUD EVENTOS 
    Events Routes
    /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEventos,
} = require("../controllers/events");

const router = Router();
//!todas deben pasar por el JWT
router.use(validarJWT);

//!obtener Eventos
router.get(
  "/", getEventos
);

//!crear Eventos
router.post("/",[
  check('title', 'El Titulo es obligatorio').not().isEmpty() ,
  check('start', 'Fecha de inicio es obligatoria').custom(isDate) ,
  check('end', 'Fecha de finalización es obligatoria').custom(isDate) ,
  validarCampos

], crearEvento);

//!actualizar Eventos
router.put("/:id",[
  check('title', 'El Titulo es obligatorio').not().isEmpty() ,
  check('start', 'Fecha de inicio es obligatoria').custom(isDate) ,
  check('end', 'Fecha de finalización es obligatoria').custom(isDate) ,
  validarCampos

], actualizarEvento);

//!eliminar Eventos
router.delete("/:id", eliminarEventos);


module.exports = router;