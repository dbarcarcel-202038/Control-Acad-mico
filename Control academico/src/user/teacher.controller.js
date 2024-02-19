const Teacher = require('../models/teacher');
const argon2 = require('argon2');

const techearPost = async (req, res) => {
    var { nombre, correo, password, tituloProfesional } = req.body;
    const pass = await argon2.hash(password);
    var bandera = false;

    do {
        if (pass !== password) {
            password = pass;
            var teacher = new Teacher({ nombre, correo, password, tituloProfesional });
            await teacher.save();
            bandera = false;
        } else {
            bandera = true;
        }
    } while (bandera == true);

    res.status(200).json({
        teacher
    });
}

module.exports = {
    techearPost
}