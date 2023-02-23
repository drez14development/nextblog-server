const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    avatarUrl: {
        type: String,
        required: false
    }
}, { timestamps: true })

userSchema.statics.signup = async function(email, password, username){
    
    if(!email || !password || !username){
        throw Error('All fields must be filled')
    }
    if(username.length > 15){
        throw Error('Username is too long. (Max length is 15 characters)')
    }
    if(!validator.isEmail(email)){
        throw Error('Email format is not valid')
    }
    // if(!validator.isStrongPassword(password)){
    //     throw Error('The password is not strong enough')
    // }

    const emailExists = await this.findOne({email})
    if(emailExists){
        throw Error('Email already in use')
    }

    const usernameExists = await this.findOne({username})
    if(usernameExists){
        throw Error('User name already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = this.create({username, email, password:hashedPassword})

    return user
}

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})
    if(!user){
        throw Error('User not registered')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)