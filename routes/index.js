const express = require("express")
const router = express.Router();
const {registerUser , loginUser, logout} = require("../controllers/authcontrollers")
const {isLoggedIn, redirectIfLoggedIn} = require("../middlewares/isLoggedIn");
const userModel = require("../models/user-model");
const hisaabModel = require("../models/hisaab-model")

router.get("/",(req,res)=>{
    res.render("index", {loggedIn : false});
})

router.get("/profile",isLoggedIn,async(req,res)=>{
   let byDate = Number(req.query.byDate);
   let {startDate , endDate} = req.query;
 
   byDate = byDate ? byDate : -1;
   startDate = startDate ? startDate : new Date("2000-01-01");
   endDate = endDate ? endDate : new Date();

    let user = await userModel
    .findOne({email : req.user.email})
    .populate({
        path:"hisaab",
        match: { createdAt: {$gte : startDate , $lte: endDate}},
        options: {sort : {createdAt : byDate}}
    })
    res.render("profile",{user} );
})

router.get("/register",(req,res)=>{
    res.render("register" ,{loggedIn: false});
})
router.get("/logout", logout);



router.post("/create", registerUser);
router.post("/login", loginUser);


module.exports = router;