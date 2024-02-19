const { Router } = require('express');
const { check, body } = require('express-validator');
const { techearPost } = require('../controllers/teacher.controller');
const { validar } = require('../middlewares/validar-campos');
const { teacherExists } = require('../helpers/db-validators')

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("correo", "Ingrese un correo valido").isEmail(),
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        check('correo').custom(teacherExists),
        validar
    ], techearPost
);

module.exports = router;