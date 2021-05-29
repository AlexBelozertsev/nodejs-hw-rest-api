const {Schema, model} = require('mongoose')

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

contactShema.path('name').validate( (value)=>{
  const re = /[A-Z]\w+/g
  return re.test(String(value))
})
  
const Contact = model('contact', contactShema)

module.exports = Contact