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
            checkData = JSON.parse(JSON.stringify(checkData));
            checkData.forEach((item, index)=>{
                if(item.checkins.length>0){
                    checkData[index].order = item.checkins[0];
                    checkData[index].customer = item.checkins[0].customer;
                    delete checkData[index].checkins[0].customer;

                }
                delete checkData[index].checkins;
            });

            return res.status(200).json({
                msg: "Success!",
                data: checkData
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                msg: "Something went wrong!"
            });
        }
    },
    store: async (req, res)=>{
        var rules = {
            roomId: {
                label: "Room",
                rule :{
                    required : true,
                }
            },
            customerId: {
                label: "customer",
                rule :{
                    required : true,
                }
            },
            duration: {
                label: "duration",
                rule :{
                    required : true,
                }
            },
            orderEndTime: {
                label: "order End Time",
                rule :{
                    required : true,
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
                let oldOrderData = await Room.findOne({where:{
                    id: req.body.roomId,
                },include:[{
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
                }]})

                let isBooked = true;
                
                if(oldOrderData.checkins.length>0){
                    oldOrderData.checkins.forEach((item)=>{
                        if(!item.isBooked){
                            isBooked = false
                        }
                    });
                }
                else{
                    isBooked = false
                }


                if(isBooked){
                    return res.status(400).json({
                        msg: "Already Booked!"
                    });
                }
                else{

                    let result = await Order.create({
                        roomId: req.body.roomId,
                        customerId: req.body.customerId,
                        duration: req.body.duration,
                        orderEndTime: req.body.orderEndTime,
                        isBooked: true,
                        isDone: false
                    })
                    let orderData = await Room.findOne({where:{
                        id: result.roomId,
                    },include:[{
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
                    }]})
                    orderData = JSON.parse(JSON.stringify(orderData));
                        if(orderData.checkins.length>0){
                            orderData.order = orderData.checkins[0];
                            orderData.customer = orderData.checkins[0].customer;
                            delete orderData.checkins[0].customer;
        
                        }
                        delete orderData.checkins;
                    return res.status(200).json({
                        msg: "Success!",
                        data: orderData
                    });
                }
            }
            catch(error){
                console.log(error);
                return res.status(500).json({
                    msg: "oh no!",
                });
            }
            
        }
    },
    update: async (req, res)=>{
        try{
            await Order.update({
                name: req.body.name,
                isBooked: req.body.isBooked,
                isDone: req.body.isDone
            },{
                where: {
                    id: req.params.id
                }
            })
            let orderData = await Room.findOne({where:{
                id: req.body.roomId,
            },include:[{
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
            }]})
            orderData = JSON.parse(JSON.stringify(orderData));
            if(orderData.checkins.length>0){
                orderData.order = orderData.checkins[0];
                orderData.customer = orderData.checkins[0].customer;
                delete orderData.checkins[0].customer;

            }
            delete orderData.checkins;
            return res.status(200).json({
                msg: "Success!",
                data: orderData
            });
        }
        catch(error){
            console.log(error);
                return res.status(500).json({
                    msg: "oh no!",
                });
        }
        
    }

}


module.exports = new OrderController;