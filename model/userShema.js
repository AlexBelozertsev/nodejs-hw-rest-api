const { Schema, model } = require('mongoose')
const { Gender } = require('../helpers/constants')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 8

const userShema = new Schema({
    name: {
        type: String,
        minlength: 2,
      default: 'Guest',
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate(value) {
            const re = /\S+@\S+\.\S+/g
            return re.test(String(value).toLowerCase())
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    token: {
        type: String,
        default: null,
    },
    gender: {
        type: String,
        enum: {
            values: [Gender.MALE, Gender.FEMALE, Gender.NONE],
            message: 'This gender is not allowed'
        },
        default: Gender.NONE,
    }
}, {
    versionKey: false,
    timestamps: true,
  }
)

userShema.pre('save', async function (next) {
    if (this.isModified('passwird')) {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userShema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = model('user', userShema)

module.exports = User