const Teacher = require('../models/teacher');
const Student = require('../models/student');

const argon2 = require('argon2');
const { generarJWT } = require('../helpers/generar-jwt');

const loginGet = async (req, res = '') => {
    var { correo, password } = req.body;
    const query = { estado: true };
    var comproba = false;
    var log = '';
    var id = '';
    var claveCorrecta = false;

    const [maestro] = await Promise.all([
        Teacher.find(query)
    ]);

    const [alumno] = await Promise.all([
        Student.find(query)
    ]);

    for (const element of alumno) {
        claveCorrecta = await argon2.verify(element.password, password);
        if (element.correo == correo && claveCorrecta == true) {
            comproba = true;
            log = 'ALUMNO';
            id = element._id;
        }
    }

    if (comproba == false) {
        for (const element of maestro) {
            claveCorrecta = await argon2.verify(element.password, password);
            if (element.correo == correo && claveCorrecta == true) {
                comproba = true;
                log = 'MESTRO';
                id = element._id;
            }
        }

    }

    if (comproba) {
        const token = await generarJWT(id);
        global.tokenAcces = null;
        global.tokenAcces = token;
        res.status(200).json({
            msg: `SE INICIO SESION, BIENVENIDO ${log} | -> token: ${token}`
        });

    } else {
        res.status(400).json({
            msg: `ALGUNO DE LOS DATOS NO ES CORRECTO`
        });
    }


}

module.exports = {
    loginGet
}