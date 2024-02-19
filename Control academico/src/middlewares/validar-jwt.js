const jwt = require("jsonwebtoken");
const Teacher = require("../user/teacher.model.js");
const Student = require("../user/student.model.js");


const validarToken = async (req, res, next) => {
    const token = global.tokenAcces;

    if (!token) {
        return res.status(401).json({
            msg: "Primero deberias iniciar sesion",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const teacher = await Teacher.findById(uid);
        const student = await Student.findById(uid);

        if (!teacher) {
            if (!student) {
                return res.status(401).json({
                    msg: "Usuario no existe en la base de datos",
                });
            }
        }

        if (teacher == null) {
            if (!student.estado) {
                return res.status(401).json({
                    msg: "Token no válido - Alumno con estado:false",
                });
            }
        } else if (student == null) {
            if (!teacher.estado) {
                return res.status(401).json({
                    msg: "Token no válido - Maestro con estado:false",
                });
            }
        }

        next();

    } catch (e) {
        console.log(e),
            res.status(401).json({
                msg: "Token no válido",
            });
    }
}

module.exports = {
    validarToken
}