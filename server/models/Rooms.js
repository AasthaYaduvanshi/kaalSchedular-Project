const bcrypt = require("bcryptjs");
const { model, Schema } = require("mongoose");

const roomSchema = Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique:true,
    min: 1,
    max: 999, 
    validate: {
      validator: function(v) {
        return /^[1-9]\d{0,2}$/.test(v.toString());
      },
      message: props => `${props.value} is not a valid room number!`
    }
  }
});

module.exports = model('Room', roomSchema);

