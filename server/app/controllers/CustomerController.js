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
    }
}
module.exports = new CustomerController;