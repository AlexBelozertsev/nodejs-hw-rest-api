const User = require('../model/userShema')

const findById = async (id) => {
  try {
    return await User.findById(id)
  } catch (error) {
    console.log(error)
  }
}

const findByEmail = async (email) => {
  try {
    return await User.findOne({ email })
  } catch (error) {
    console.log(error)
  }
}

const findByVerifyToken = async (verifyToken) => {
  try {
    return await User.findOne({ verifyToken })
  } catch (error) {
    console.log(error)
  }
}

const createUser = async (body) => {
  try {
    const user = new User(body)
    return await user.save()
  } catch (error) {
    console.log(error)
  }
}

const updateToken = async (id, token) => {
  try {
    return await User.updateOne({ _id: id }, { token })
  } catch (error) {
    console.log(error)
  }
}

const updateTokenVerify = async (id, verify, verifyToken) => {
  try {
    return await User.updateOne({ _id: id }, { verify, verifyToken })
  } catch (error) {
    console.log(error)
  }
}


const updateAvatar = async (id, avatar, idCloudAvatar = null) => {
  try {
    return await User.updateOne({ _id: id }, { avatarURL: avatar, idCloudAvatar })
  } catch (error) {
    console.log(error)
  }
}

const updateUserSubscription = async (id, body) => {
  try {
      const updatedStatus = await User.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    )
    return updatedStatus
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  findById,
  findByEmail,
  findByVerifyToken,
  createUser,
  updateToken,
  updateTokenVerify,
  updateAvatar,
  updateUserSubscription
}
