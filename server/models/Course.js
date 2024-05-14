const bcrypt = require("bcryptjs")
const { model, Schema } = require("mongoose")

const courseSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subjects: [
    {
      name: {
        type: String,
        required: true,
      },
      teacher: {
        type: String,
        required: true,
      },
    },
  ],
})

module.exports = model("Course", courseSchema)
