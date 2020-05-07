const mongoose = require("mongoose");

// Create Schema
const RoomSchema = new mongoose.Schema(
    {
        owner:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
        views:{type: Number},
        members:{type: Number},
        is_public:{type: Boolean},
        name: {
            type: String
        },
    },
    { strict: false }
);

module.exports = Room = mongoose.model("rooms", RoomSchema);