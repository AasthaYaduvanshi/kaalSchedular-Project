const bcrypt = require("bcryptjs")
const { model, Schema } = require("mongoose")

const assignedSchema = new Schema({
  teacherName: {
    type: String,
    unique: true,
  },
  assignedSubjects: {
    type: Number,
    default: 0,
  },
})

module.exports = model("Assigned", assignedSchema)
