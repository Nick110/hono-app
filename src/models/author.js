import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    required: true
  },
  id: {
    type: String,
    unique: true
  }
})

const Author = mongoose.model('author', authorSchema)

export default Author
