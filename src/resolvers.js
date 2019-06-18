//importacion modelos
const {SuplidorMM, ProductoMM, UsuarioMM } = require('./mdbe.js')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')

const checkAuth = require('../util/check-auth');
const {SECRET_KEY} = require('../config')

//resolvedor de eschemas
module.exports = {


  Query: {


    greet: (root,args) => {
      return `hellow ${args.name}`
    },

    async usuarios(_,{req}, context) {
      checkAuth(context)
      return await UsuarioMM.find()
    },

    //cerrar session
    logout(_,{req},context){
      checkAuth(context)
      const token = jwt.sign({
        expired: 'expired'
      }, SECRET_KEY, {expiresIn: '1s'})

      return token
    },

    //Suplidor
    async Suplidores(_,{req}, context) {
      checkAuth(context)
      return await SuplidorMM.find()
    },


    //Producto
    async Productos(_,{req}, context) {
      checkAuth(context)
      return await ProductoMM.find()
    }


  },



  Mutation: {

    //user
    async login(_, {input},context){

      const look = input.user
      const user = await UsuarioMM.findOne({user: look})
      if(!user){
        return "usuario no existente"
      }
      const match = await bcrypt.compare(input.password,user.password)
      if(!match){
        return "contraseña incorrecta"
      }
      const token = jwt.sign({
        id: user.id,
        user: user.user
      }, SECRET_KEY, {expiresIn: '24h'})

      return token
    },


    async createUser(_, {input},context){
      const auth = checkAuth(context)
      try {
        const look = input.user
        const user = await UsuarioMM.findOne({user: look})
        if (user){
          throw new UserInputError("El usuario ya existe",{
            errors: {
              username: "this username is taken"
            }
          })
        }
        input.password = await bcrypt.hash(input.password,12)
        input.createdAt = new Date().toISOString()
        const newUser = new UsuarioMM(input)
        const res = await newUser.save()

        /*const token = jwt.sign({
          id: res.id,
          user: res.user
        }, SECRET_KEY, {expiresIn: '24h'})*/

        return true

      } catch (e) {

        return false

      }

    },

    //suplidor
    async createSuplidor(_, {input},context) {
      const auth = checkAuth(context)
      try {



        const newSuplidor = new SuplidorMM(input)
        await newSuplidor.save()
        return true

      } catch (e) {

        return false

      } finally {

      }

    },

    async updateSuplidor(_, {_id, input},context){
        const auth = checkAuth(context)
      try {
        await SuplidorMM.findByIdAndUpdate(_id,input, {new: true, useFindAndModify: false})
        return true
      } catch (e) {
        return false
      } finally {

      }
    },

    //producto
    async createProducto(_, {input},context) {
        const auth = checkAuth(context)
      try {

        const newProducto = new ProductoMM(input)
        await newProducto.save()
        return true

      } catch (e) {

        return false

      } finally {

      }

    },

    async updateProducto(_, {_id, input},context){
        const auth = checkAuth(context)
      try {
        await ProductoMM.findByIdAndUpdate(_id,input, {new: true, useFindAndModify: false})
        return true
      } catch (e) {
        return false
      } finally {

      }
    }


  }
};
