const Users = require('../repositories/users')
const { HttpCode, messages } = require('../helpers/constants')
const jwt = require('jsonwebtoken')
const fs = require('fs/promises')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

// Local upload method
// const path = require('path')
// const UploadAvatarService = require('../services/localUpload')

// Cloud upload method
const UploadAvatarService = require('../services/cloudUpload')

const register = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    if (user) {
      return res
        .status(HttpCode.CONFLICT)
        .json({
          status: 'error',
          code: HttpCode.CONFLICT,
          message: messages.CONFLICT,
      })
    }
    const { id, email, subscription, avatarURL } = await Users.createUser(req.body)
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { id, email, subscription, avatarURL },
    })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    const {email, subscription} = user
    const isValidPassword = await user?.isValidPassword(req.body.password)
    if (!user || !isValidPassword) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: messages.UNAUTHORIZED,
      })
    }
    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })
    await Users.updateToken(id, token)
    return res
      .status(HttpCode.OK)
      .json({
        status: 'success',
        code: HttpCode.OK,
        data: { token, email, subscription }
      })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    const id = req.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})
  } catch (error) {
    next(error)
  }
}

const current = async (req, res, next) => {
  try {
    const {email, subscription, avatarURL} = req.user
    return res
      .status(HttpCode.OK)
      .json({
        status: 'success',
        code: HttpCode.OK,
        data: { email, subscription, avatarURL }
    })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const userId = req.user.id
    if (req.body) {
      const user = await Users.updateUserSubscription(userId, req.body)
    const {name, email, subscription} = user
      if (user) {
        return res
          .status(HttpCode.OK)
          .json({ status: 'success', code: HttpCode.OK, data: { name, email, subscription } })
      }
      return res
        .status(HttpCode.NOT_FOUND)
        .json({
          status: 'error',
          code: HttpCode.NOT_FOUND,
          message: messages.NOT_FOUND,
          data: 'Not Found'
        })
    } else {
      return res
        .status(HttpCode.BAD_REQUEST)
        .json({
          status: 'error',
          code: HttpCode.BAD_REQUEST,
          message: messages.BAD_REQUEST,
          data: 'missing field'
      })
    }
  } catch (error) {
    next(error)
  }
}

// Local upload method
// const avatars = async (req, res, next) => {
//   try {
//     const userId = req.user.id
//     const avatarsFolder = path.join(process.env.PUBLIC_FOLDER, process.env.USERS_AVATARS)
//     const uploads = new UploadAvatarService(avatarsFolder)
//     const avatarUrl = await uploads.saveAvatar({ idUser: userId, file: req.file })
//     try {
//       await fs.unlink(path.join(avatarsFolder, req.user.avatar))
//     } catch (error) {
//       console.log(error.message)
//     }
//     await Users.updateAvatar(userId, avatarUrl)
//     return res
//       .status(HttpCode.OK)
//       .json({ status: 'success', code: HttpCode.OK, data: { avatarUrl } })
//   } catch (error) {
//     next(error)
//   }
// }

// Cloud upload method
const avatars = async (req, res, next) => {
  try {
    const userId = req.user.id
    const uploads = new UploadAvatarService()
    const { idCloudAvatar, avatarUrl } = await uploads.saveAvatar(req.file.path, req.user.idCloudAvatar)
    await fs.unlink(req.file.path)
    await Users.updateAvatar(userId, avatarUrl, idCloudAvatar)
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { avatarUrl } })
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login, logout, current, update, avatars }
