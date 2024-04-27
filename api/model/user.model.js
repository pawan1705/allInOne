import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema=mongoose.Schema({
    _id:Number,
    username:{
        type:String,
        trim:true,
        required: [true,'Please provide your name']
    },
    email:{
        type: String,  
        lowercase: true, 
        trim: true,  
        unique: true
    },
    password:{
        type:String,
        minlength:[6,"Password should be at least 6 characters"],
        required: [true,'Please provide a password'],
    },
        password:{
        type:String,
        minlength:[6,"Password should be at least 6 characters"],
        required: [true,'Please provide a password'],
    },
    phone:{ 
        type:String
    },
    address:{
        type:String,
        required: [true,'Please provide a address'],
    },
    city:{
        type:String,
        required:[true,"city is required"]
    },
    gender:{
        type:String,
        required:[true,"gender is required"]
    },
    role:String,
    status:Number,
    info:String
})

userSchema.plugin(uniqueValidator); //this will add the validators
const userSchemaModel=mongoose.model("data",userSchema);

export default userSchemaModel;