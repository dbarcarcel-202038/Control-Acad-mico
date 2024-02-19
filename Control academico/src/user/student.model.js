const { Schema, model } = require('mongoose');

const StudentSchema = Schema({
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
        default: 'STUDENT_ROLE'
    },
    cursos: {
        type: Array,
        default : 'NONE'
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Student', StudentSchema);