const cloudinary = require('cloudinary').v2
const { promisify } = require('util')
const { limits } = require('../helpers/constants')
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadCloud = promisify(cloudinary.uploader.upload)

class UploadService {
  async saveAvatar(pathFile, oldIdCloudAvatar) {
    const { public_id: idCloudAvatar, secure_url: avatarUrl } =
      await uploadCloud(pathFile, {
        public_id: oldIdCloudAvatar?.replace('CloudAvatar/', ''),
        folder: 'CloudAvatar',
        transformation: {
            width: limits.LIMIT_AVATAR_SIZE,
            height: limits.LIMIT_AVATAR_SIZE,
            crop: 'pad'
        },
      })
    return { idCloudAvatar, avatarUrl }
  }
}

module.exports = UploadService
