const validator = require(`../libraries/Validator`);
const models = require(`../../models`);
const env = require('../../env');


const User = models.user;
const Room = models.room;


function RoomController(){}

RoomController.prototype = {
    index: async (req, res)=>{
        try{
            let roomData = await Room.findAll();

            return res.status(200).json({
                msg: "Success!",
                data: roomData
            });
        }
        catch(error){
            return res.status(500).json({
                msg: "Something went wrong!"
            });
        }
    },
    store: async (req, res)=>{
        var rules = {
            name: {
                label: "Name",
                rule :{
                    required : true,
                    unique   : "room,name"
                }
            }
        }

        let validate = await validator.make(req.body, rules);
        if(validate.fails()){
            return res.status(400).json({
                msg: "Something went wrong!",
                errors: validate.getMessages()
            });
        }
        else{
            try{
                let result = await Room.create({
                    name: req.body.name
                });

                return res.status(200).json({
                    msg: "Success!",
                    data: result
                });
            }
            catch(error){
                return res.status(500).json({
                    msg: "Something went wrong!"
                });
            }
        }
    }
}

module.exports = new RoomController;