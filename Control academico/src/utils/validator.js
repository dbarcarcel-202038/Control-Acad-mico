const { response } = require('express');
const Teacher = require("../user/teacher.model.js");
const Student = require("../user/student.model.js");
const Curse = require('../course');

const studentExists = async (correo = '') => {
    const correoExistente = await Student.findOne({ correo });
    if (correoExistente) {
        throw new Error(`El email ya fue registrado`);
    }
}

const teacherNameExists = async (nombre = '') => {
    var teacherExiste = await Teacher.findOne({ nombre });
    if (teacherExiste.nombre.isEmpty()) {
        console.log("ESE MAESTRO NO EXISTE: " + teacherExiste);
    }
}

const curseNameExists = async (nombre = '') => {
    var curseExists = await Curse.findOne({ nombre });
    if (curseExists) {
        throw new Error(`El nombre del curso ya esta en uso, por favor escoge otro`);
    }
}

const teacherExists = async (correo = '') => {
    var correoExistente = await Teacher.findOne({ correo });
    if (correoExistente) {
        throw new Error(`El email ya fue registrado`);
    }
}

module.exports = {
    studentExists,
    teacherNameExists,
    teacherExists,
    curseNameExists
}