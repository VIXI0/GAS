const {Schema, model } = require('mongoose');

//Mongo Schemas base de datos
const suplidorMS = new Schema({
  nombre: {type: String, required: true},
  direccion: String,
  telefono: [String],
  rnc: String,
  ncf: String,
  Representante: {type: String, required: true},
  telefonor: [String],
  anotaciones: String
})

const productoMS =new Schema({
  nombre: {type: String, required: true},
  descripcion: String,
  location: String,
  cantidad: Number,
  unidad: String,
  Suplidor_primario: String
})

const usuarioMS = new Schema({
  user: {type: String, required: true},
  password: {type: String, required: true},
  createdAt: String
})
//exportacion Mongo Modelos bd

exports.SuplidorMM = model('Suplidores', suplidorMS)
exports.ProductoMM = model('Productos', productoMS)
exports.UsuarioMM = model('Usuarios', usuarioMS)
