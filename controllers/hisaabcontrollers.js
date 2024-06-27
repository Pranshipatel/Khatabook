const hisaabModel = require("../models/hisaab-model");
const userModel = require("../models/user-model");


module.exports.createHisaabController = async function(req,res){
    let {title,description,encrypted,shareable,passcode,editpermissions} = req.body;


    encrypted = encrypted === "on" ? true : false;
    shareable = shareable === "on" ? true : false;
    editpermissions = encrypted === "on" ? true : false;
    
    try{

        let hisaabCreated = await hisaabModel.create({
            title,
            description,
            user: req.user._id,
            passcode,
            encrypted,
            editpermissions,
            shareable
        })
    
        let user = await userModel.findOne({email : req.user.email});
        user.hisaab.push(hisaabCreated._id);
    
        await user.save();
    }
    catch(err){
        res.send(err.message)
    }

    res.redirect("/profile");
}