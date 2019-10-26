const validator = require(`../libraries/Validator`);
const models = require(`../../models`);
const env = require('../../env');


const User = models.user;
const Room = models.room;
const Customer = models.customer;


function CustomerController(){}

CustomerController.prototype = {

    index: async (req, res) => {
        try{
            let customers = await Customer.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            customers.forEach((item, index)=>{
                if(item.image===null){
                    customers[index].image="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1";
                }
            });
            return res.status(200).json({
                msg: "Success",
                data: customers
            });
        }
        catch(error){
            console.log(error)
        }
    },
    store: async (req, res) => {
        var rules = {
            name: {
                label: "Name",
                rule :{
                    required : true,
                }
            },
            identity: {
                label: "Identity",
                rule :{
                    required : true,
                    unique   : "customer,identityNumber"
                }
            },
            phone: {
                label: "Phone",
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
                let customerData = await Customer.create({
                    name: req.body.name,
                    identityNumber: req.body.identity,
                    phoneNumber: req.body.phone
                });

                customerData.image="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1";

                return res.status(200).json({
                    msg: "Success!",
                    data: customerData
                });
            }
            catch(error){
                console.log(error);
            }
        }

    }
}
module.exports = new CustomerController;