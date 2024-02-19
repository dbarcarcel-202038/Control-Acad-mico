const { Schema, model } = require('mongoose');

const CurseSchema = Schema({
    nombre: {
        type: String,
        required: [true, "EL nombre del curso es obligatorio"]
    },
    descripcion: {
        type: String,
        required: [true, "La descripción del curso es obligatoria"]
    },
    maestro: {
        type: String
    },
    cantidadDeModulos: {
        type: String,
        required: [true, "La cantidad de modulos del curso es obligatoria"]
    },
    duracionTotal: {
        type: String,
        default: "No definida"
    },
    fechaFinalizacion: {
        type: String,
        required: [true, "La fecha de finalización del curso es obligatoria"]
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Curse', CurseSchema);