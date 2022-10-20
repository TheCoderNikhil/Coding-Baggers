const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      trim: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   admin:{
      type: Number,
      required:true
   }
});

const User = mongoose.model('User', userSchema);

module.exports = User;