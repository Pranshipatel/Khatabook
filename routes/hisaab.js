const express = require("express")
const router = express.Router();
const {createHisaabController} = require("../controllers/hisaabcontrollers")

const {registerUser , loginUser, logout} = require("../controllers/authcontrollers")
const {isLoggedIn, redirectIfLoggedIn} = require("../middlewares/isLoggedIn");

router.get("/create",isLoggedIn, function(req,res){
    res.render("create")
})
router.post("/create" , isLoggedIn ,createHisaabController);

module.exports = router;