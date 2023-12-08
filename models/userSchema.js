const mongoose = require('mongoose')

const validator = require('validator');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:[3]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        }
      },
      password:{
        type:String,
        required:true,
      },
})

const users = mongoose.model('users',userSchema)
module.exports = users