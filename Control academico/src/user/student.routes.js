const { Router } = require('express');
const { studentPost, asignarmeCurso, editStudent, deleteStudent } = require('../controllers/student.controller');
const { check, body } = require('express-validator');
const { studentExists } = require('../helpers/db-validators')
const { validar } = require('../middlewares/validar-campos');
const { validarAlumno } = require('../middlewares/validar-role');
const { validarToken } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("correo", "El correo es obligatorio").not().isEmpty(),
        check('password').isLength({ min: 6 }),
        check('correo').custom(studentExists),
        validar
    ], studentPost
);

router.put(
    '/asignarme',
    [
        validarToken,
        check('curso').not().isEmpty(),
        validarAlumno,
        validar
    ], asignarmeCurso
);

router.put(
    "/editProfile",
    [
        validarToken,
        validarAlumno,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check('password').isLength({ min: 6 }),
        validar
    ], editStudent
);

router.delete(
    "/delete",
    [
        validarToken,
        validarAlumno,
        check("password").not().isEmpty(),
        validar
    ], deleteStudent
);
