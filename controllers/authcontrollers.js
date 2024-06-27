const userModel = require("../models/user-model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

module.exports.registerUser = async(req,res)=>{
    try{
    let {username,email, password} = req.body;
    let user = await userModel.findOne({email});
    if(user)return res.redirect("/");
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
            if(err){
                res.send(err.message)
            }
            else{
                let createdUser = await userModel.create({
                    username,
                    email,
                    password:hash,
                })
                let token = jwt.sign({email},process.env.JWT_KEY);
                res.cookie("token",token);
                res.redirect("/");
            }
        });
    });
    
    }
    catch(err){
        res.send(err.message);
    }
}

module.exports.loginUser = async(req,res)=>{
    try{
    let{email,password} = req.body;
    let user = await userModel.findOne({email});
    if(!user){
        return res.redirect("/register")
    }

    bcrypt.compare(password, user.password , function(err, result) {
        if(result){
            console.log(result);
            return res.redirect("/profile");
        }
        else{
            res.send(err.message);
        }
    });
    

    }
    catch(err){
        res.send(err.message)
    }
}

module.exports.logout = async(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
}