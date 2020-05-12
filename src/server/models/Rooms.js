const mongoose = require("mongoose");

// Create Schema
const RoomSchema = new mongoose.Schema(
    {
        owner:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
        views:{type: Number, default:0},
        members:{type: Number, default:0},
        is_public:{type: Boolean},
        address:{type:String},
        name: {type: String},
        instance_id:{type:String},
        url:{type:String},
    },
    { strict: false }
);

module.exports = Room = mongoose.model("rooms", RoomSchema);