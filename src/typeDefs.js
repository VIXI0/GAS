const { gql } = require('apollo-server');

module.exports = gql`
type Query {

  hello: String
  greet(name: String): String


  Suplidores: [Suplidor]!
  Productos: [Producto]!
  usuarios: [usuario]!
  logout: String
}

type Suplidor {
  _id: ID
  nombre: String
  direccion: String
  telefono: [String]
  rnc: String
  ncf: String
  Representante: String
  telefonor: [String]
  anotaciones: String
}

type Producto {
  _id: ID
  nombre: String!
  descripcion: String
  location: String
  cantidad: Float
  unidad: String!
  Suplidor_primario: String
}



type usuario {
  _id: ID
  user: String
  password: String
}

  type Mutation {


    createUser(input: UsuarioInput): Boolean
    login(input: UsuarioInput): String

    createSuplidor(input: SuplidorInput): Boolean
    updateSuplidor(_id: ID, input: SuplidorInput): Boolean

    createProducto(input: ProductoInput): Boolean
    updateProducto(_id: ID, input: ProductoInput): Boolean
  }


  input UsuarioInput {
    user: String!
    password: String!
    createdAt: String
  }

  input SuplidorInput {
    nombre: String!
    direccion: String
    telefono: [String]
    rnc: String
    ncf: String
    Representante: String
    telefonor: [String]
    anotaciones: String
  }

  input ProductoInput {
    nombre: String!
    descripcion: String
    location: String
    cantidad: Float
    unidad: String!
    Suplidor_primario: String
  }
`;
