import { models, Schema, model } from "mongoose";

const insumoShema = new Schema({
        "nombre": {
          type: String,
          required: true
        },
        "categoria": {
          type: String,
          },
        "cantidad": {
          type: Number,
          min: 0
        },
        "descripcion": {
          type: String
        },
        "unidadMedida": {
          type: String,
          },
        "precio": {
          type: Number,
          min: 0
        },
        "proveedor": {
          type: String,
          ref: "Proveedores" // Si tienes una colección separada para proveedores, puedes usar referencias
        },
        "fechaIngreso": {
          type: Date,
          default: Date.now
        }
},{
    timestamps:true
})

export default models.Insumos || model('Insumos', insumoShema)