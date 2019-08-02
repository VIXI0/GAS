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
  anotaciones: String,
  active: Boolean
})

const productoMS =new Schema({
  nombre: {type: String, required: true},
  marca: Schema.Types.ObjectId,
  descripcion: String,
  location: String,
  cantidad: Number,
  unidad: String,
  Suplidor_primario: Schema.Types.ObjectId,
  active: Boolean
})

const usuarioMS = new Schema({
  nombre: String,
  user: {type: String, required: true},
  password: {type: String, required: true},
  createdAt: String,
  active: Boolean,
  role: Schema.Types.ObjectId

})

const roleMS = new Schema({
  nombre: String,
  permisos: [
    {
      sistema: String,
      link: String,
      menu: [
      {
        titulo: String,
        menu: { type: Boolean, default: false },
        sub: [
          {
            tipo: String,
            titulo: String,
            link: String,
            href: String,
            target: String,
            c: Boolean,
            r: Boolean,
            u: Boolean,
            d: Boolean,
            a: Boolean,
            sub: [
              {
                tipo: String,
                titulo: String,
                link: String,
                href: String,
                target: String,
                c: Boolean,
                r: Boolean,
                u: Boolean,
                d: Boolean,
                a: Boolean,
                sub: [
                  {
                    tipo: String,
                    titulo: String,
                    link: String,
                    href: String,
                    target: String,
                    c: Boolean,
                    r: Boolean,
                    u: Boolean,
                    d: Boolean,
                    a: Boolean

                  }
                ]
              }
            ]
          }
        ]
    }
  ]
    }
  ]

})

const marcaMS = new Schema({
  nombre: String,
  active: Boolean
})

const backMS = new Schema({
  user: String,
  date: String,
  location: String
})

const crudMS = new Schema({
  user: String,
  collec: String,
  crud: String,
  ref: String
})
//exportacion Mongo Modelos bd

exports.SuplidorMM = model('Suplidores', suplidorMS)
exports.ProductoMM = model('Productos', productoMS)
exports.UsuarioMM = model('Usuarios', usuarioMS)
exports.RoleMM = model('Role', roleMS)
exports.MarcaMM = model('Marcas', marcaMS)
exports.BackMM = model('Back', backMS)
exports.CrudMM = model('crud', crudMS)
