const { Router } = require('express');
const { check } = require('express-validator');
const { validar } = require('../middlewares/validar-campos');
const { loginGet } = require('../controllers/auth.controller');
const router = Router();

router.get(
    "/login",
    [
        check("correo", "Ingrese un correo valido").isEmail(),
        check("password").not().isEmpty(),
        validar
    ], loginGet
);

module.exports = router;