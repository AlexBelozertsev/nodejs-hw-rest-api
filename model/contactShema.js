const { Schema, model, SchemaTypes } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const contactShema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
}, {
    versionKey: false,
    timestamps: true,
    toJSON: {},
    toObject: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret._id
        return ret
      }
    }
  }
)

contactShema.virtual('info').get(function () {
  return `This is a ${this.name} contact`
})

contactShema.plugin(mongoosePaginate)

const Contact = model('contact', contactShema)

module.exports = Contact