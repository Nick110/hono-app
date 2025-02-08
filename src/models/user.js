import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    salt: { type: String, required: true },
    jwtSecret: {
      type: String
    },
    createdAt: {
      type: Number,
      required: true
    },
    avatarBgColor: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
)

const UserModel = mongoose.model('User', userSchema)

export default UserModel
