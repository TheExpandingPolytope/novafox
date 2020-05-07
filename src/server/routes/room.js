const express = require("express");
const router = express.Router();
const Room = require("../models/Rooms");
const auth = require("../middleware/auth");

//gets all public rooms
router.get("/all", (req, res, next)=>{
    passport.session()
    
});

router.post("create", auth, (req, res, next)=>{
    var newRoom = new Room({})
});

router.post("close", auth, (req, res, next)=>{

});

router.post("join");

router.post("leave");