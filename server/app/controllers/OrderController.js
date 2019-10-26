const validator = require(`../libraries/Validator`);
const models = require(`../../models`);
const env = require('../../env');


const User = models.user;
const Room = models.room;
const Customer = models.customer;
const Order = models.order;


function OrderController(){}

OrderController.prototype = {
    index: async (req, res) => {
        try{
            let checkData = await Room.findAll({
                include:[{
                    as: 'checkins',
                    model: Order,
                    include: [{
                        as:'customer',
                        model: Customer
                    }],
                    limit: 1,
                    order: [
                        ['createdAt', 'DESC']
                    ]
                }],
                order: [
                    ['createdAt', 'ASC']
                ]
            });

            return res.status(200).json({
                msg: "Success!",
                data: checkData
            });
        }
        catch(error){
            return res.status(500).json({
                msg: "Something went wrong!"
            });
        }
    }
}


module.exports = new OrderController;