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
    }
}

module.exports = new RoomController;