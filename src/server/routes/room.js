const express = require("express");
const router = express.Router();
const Room = require("../models/Rooms");
const auth = require("../middleware/auth");
const AWS = require("aws-sdk");

var ec2 = new AWS.EC2({
    region:'us-east-1',
    secretAccessKey:"8dUM/mluoYnCzZNlEL5CBlAmcsRoqt1Uud2OcGc1", 
    accessKeyId:"AKIA3R3OSGRTXBNOLBWK"
});

//gets all public rooms
router.get("/all", (req, res)=>{
    Room.find({is_public:true}, (err, rooms)=>{
        if(err){
            res.send({error:true});
        }else{
            res.send({data:rooms});
        }
    })
});

router.post("/create", auth, (req, res)=>{
    var data = req.body;
    if(!data.is_public){
        return res.send({error:"is public not defined"});
    }
    if(!data.name){
        return res.send({error:"name is not defined"});
    }

    //get all instances
    ec2.describeInstances({Filters: [{Name: "tag:type", Values: ["vm"]}]},
    function(err, data){
        console.log(err);
        var all_instance_ids = [];
        data.Reservations.forEach((reservation)=>{
            reservation.Instances.forEach((instance)=>{
                all_instance_ids.push(instance.InstanceId);
            });
        });

        //get all instances not being used
        Room.find((err, rooms)=>{
            if(err){
                console.log(err);
            }
            rooms.forEach((room)=>{
                if(all_instance_ids.includes(room.instance_id)){
                    all_instance_ids.splice(all_instance_ids.indexOf(room.instance_id), 1);
                }
            });

            //checkt if any instances are available
            if(all_instance_ids.length <= 0 ){
                return res.send({error:"no free instances"});
            }

            //create new room
            var instance_id = all_instance_ids.pop();
            var newRoom = new Room({
                owner: req.user,
                name: data.name,
                is_public: data.is_public,
                instance_id: instance_id,
            });

            //save new room
            newRoom.save()
            .then((room)=>{

                
                res.send({data:room._id});
            })
            .catch((err)=>{
                res.send({error:err});
            })
        });

    })
    
    
});

router.post("/close", auth, (req, res, next)=>{
    var data = req.body;

    //checkt if id was send
    if(!data.id){
        res.send({error:"no id specified"});
    }

    //find room by id
    Room.findById(data.id,(err1, room)=>{
        if(err1){
            return res.send({error:err1});
        }

        //stop instance
        var instance_id = room.instance_id;
        ec2.stopInstances({InstanceIds:[instance_id]},(err2, result)=>{
            if(err2){
                return res.send({error:err2});
            }

            room.remove();
        })
    })
    console.log()
});

router.post("/join", (req, res) => {
    //checkt if id was send
    if(!data.id){
        res.send({error:"no id specified"});
    }
});

router.post("/leave", (req, res) => {
    //checkt if id was send
    if(!data.id){
        res.send({error:"no id specified"});
    }
});

module.exports = router;