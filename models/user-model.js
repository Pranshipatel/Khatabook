const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    fullname: String,
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password: String,
    profilepicture:{
        type:String,
        trim:true,
    },
    hisaab:[{type: mongoose.Schema.Types.ObjectId, ref:"hisaab"}],
},
);

module.exports = mongoose.model("user", userSchema);