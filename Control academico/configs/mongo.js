const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.REF_DB, {});
        console.log(" -> DATABASE CONECTED SUCESFULLY");
    } catch (e) {
        throw new Error("Ocurrio algo", e);

    }
}

module.exports = {
    dbConnection
}