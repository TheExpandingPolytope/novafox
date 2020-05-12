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
    
    ec2.runInstances({
        LaunchTemplate: {
            LaunchTemplateId: 'lt-08bb26119d97515c6',
            //LaunchTemplateName: 'vm-novafox',
            Version: '5'
        },
        MaxCount:1,
        MinCount:1,
    },(err, data)=>{
        if(err){
            return res.send({error:err});
        }
        
        var instance_id = data.Instances[0].InstanceId;
        var is_public = req.body.is_public;
        var name = req.body.name;
        //wait for room to run
        ec2.waitFor("instanceRunning",
        {InstanceIds:[instance_id]},
        (err, data1)=>{
            console.log(data1.Reservations[0].Instances[0]);
            //append room to db
            var newRoom = new Room({
                owner: req.user,
                name: name,
                is_public: is_public,
                instance_id: instance_id,
                url:data1.Reservations[0].Instances[0].PublicDnsName,
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

            res.send({data:"closed room"})

            room.remove();
        })
    })
    console.log()
});

router.post("/join", (req, res) => {
    //checkt if id was send
    if(!req.body.id){
        res.send({error:"no id specified"});
    }


    Room.findById(req.body.id,(err, data)=>{
        //enable session

        //send room url
        res.send({data:data.url})
    })
});

router.post("/leave", (req, res) => {
    //check if id was sent
    if(!data.id){
        res.send({error:"no id specified"});
    }

    //disable session

    //send success
    res.send({data:"left room successfully"});
});

module.exports = router;