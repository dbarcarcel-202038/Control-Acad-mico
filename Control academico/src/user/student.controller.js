const Student = require('../models/student');
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");
const Curse = require('../models/curse');

//ENVIAR ->
const studentPost = async (req, res) => {
    var { nombre, correo, password } = req.body;
    var bandera = false;
    const pass = await argon2.hash(password);

    do {
        if (pass !== password) {
            password = pass;
            var alumno = new Student({ nombre, correo, password });
            await alumno.save();
            bandera = false;
        } else {
            bandera = true;
        }
    } while (bandera == true);

    res.status(200).json({
        alumno
    });
}

//ASIGNARME A CURSOS
const asignarmeCurso = async (req, res) => {

    var { curso } = req.body;
    const token = global.tokenAcces;

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const student = await Student.findById(uid);
    var cursosAlumno = [];
    cursosAlumno = student.cursos;
    var cursosNew = '';

    const cursoAgregar = await Curse.findOne({ nombre: curso, estado: true });

    if (!cursoAgregar) {
        return res.status(400).json({
            msg: "El curso que buscas no existe!"
        });
    }

    if (cursosAlumno == 'NONE') {
        cursosNew = curso;
        await Student.findByIdAndUpdate(uid, { cursos: cursosNew });

    } else if (cursosAlumno.length < 3) {

        cursosNew = student.cursos;

        for (const element of cursosNew) {

            if (element == curso) {
                return res.status(400).json({
                    msg: "Ya te encuentras asignado a ese curso"
                });
            }
        }

        cursosNew.push(curso);
        await Student.findByIdAndUpdate(uid, { cursos: cursosNew });

    } else {
        return res.status(400).json({
            msg: "Unicamente puedes asignarte a 3 cursos!"
        });
    }

    res.status(200).json({
        msg: "Actualzado"
    });

}

const editStudent = async (req, res) => {
    var { nombre, password } = req.body;
    const token = global.tokenAcces;
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const pass = await argon2.hash(password);
    password = pass;
    await Student.findByIdAndUpdate(uid, { nombre: nombre, password: password });
    res.status(200).json({
        msg: "Actualzado"
    });
}

const deleteStudent = async (req, res) => {
    var { password } = req.body;
    const token = global.tokenAcces;
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const student = await Student.findById(uid);
    const confirm = await argon2.verify(student.password, password);

    if (confirm) {
        await Student.findByIdAndUpdate(uid, { estado: false });
        global.tokenAcces = '';
    } else {
        return res.status(200).json({
            msg: "La contraseña no es la Correcta"
        });
    }

    res.status(200).json({
        msg: "Perfil Eliminado | SESIÓN EXPIRADA"
    });

}



module.exports = {
    studentPost,
    asignarmeCurso,
    editStudent,
    deleteStudent
}