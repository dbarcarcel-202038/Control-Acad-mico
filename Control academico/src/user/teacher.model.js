const { Schema, model } = require('mongoose');

const TeacherSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Este es un campo obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'Este es un campo obligatorio']
    },
    password: {
        type: String,
        required: [true, 'Este es un campo obligatorio']
    },
    role: {
        type: String,
        required: true,
        default: 'TEACHER_ROLE'
    },
    tituloProfesional: {
        type: String,
        default: "Lic.",
        required: [true, 'Este es un campo obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Teacher', TeacherSchema);