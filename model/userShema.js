const { Schema, model } = require('mongoose')
const gravatar = require('gravatar')
const { Subscription, limits } = require('../helpers/constants')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 8

const userSchema = new Schema({
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
        const re = /.+@.+\..+/i
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
    subscription: {
      type: String,
      enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
      default: Subscription.STARTER
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: limits.LIMIT_AVATAR_SIZE }, true)
      }
    },
    idCloudAvatar: {
      type: String,
      default: null,
    },
}, {
    versionKey: false,
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.path('password').validate(function (value) {
  const regExp = /^[a-zA-Z0-9]{6,25}$/
  return regExp.test(String(value))
})

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User