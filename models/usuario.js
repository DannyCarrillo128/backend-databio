var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

var intereses = {
    values: ['Amateur', 'Académico', 'Científico'],
    message: '{VALUE} no es un tipo de interés'
};

var estados = {
    values: ['No verificado', 'Verificado'],
    message: '{VALUE} no es un estado'
}

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es un campo requerido'] },
    email: { type: String, unique: true, required: [true, 'El correo es un campo requerido'] },
    password: { type: String, required: [true, 'La contraseña es un campo requerido'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos },
    google: { type: Boolean, default: false },
    telefono: { type: String, unique: true, required: false },
    ocupacion: { type: String, required: false },
    interes: { type: String, required: false, enum: intereses },
    institucion: { type: String, required: false },
    estado: { type: String, default: 'No verificado', enum: estados },
    solicitud: { type: String, require: false }
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);