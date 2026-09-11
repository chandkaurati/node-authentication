import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    password : {
        type : String,
        require : true,
    },

    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true,
    },
    role : {
        type : String,
        enum : ['user', "admin"],
        default : "user"
    },
    isEmailVerified : {
        type : Boolean,
        default : false,
    },

    istowFactorEnambled : {
        type : Boolean,
        default : false
    },
    twoFactorSecret : {
        type : String,
        default : undefined
    },
    tokenVersion : {
        type : Number,
        default : 0,
    },
    resetPasswordToken : {
        type : String,
        default : undefined
    },
    resetPasswordExpires: {
        type : Date,
        default : undefined,
    }

}, {
    timestamps : true
})

export const User = mongoose.model("User", userSchema)