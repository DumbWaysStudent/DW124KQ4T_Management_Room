const bcrypt = require(`bcryptjs`);
const jwt = require('jsonwebtoken');
const fs = require("fs");


const validator = require(`../libraries/Validator`);
const models = require(`../../models`);
const env = require('../../env');


const User = models.user;


function AuthController(){}

AuthController.prototype = {
    authenticate: async (req, res)=>{
        var rules = {
            username: {
                label: "Username",
                rule :{
                    required : true,
                }
            },
            password: {
                label: "Password",
                rule: {
                    required: true
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
                let authUser = await User.findOne({where:{username: req.body.username}});
                if(!authUser){

                    return res.status(400).json({
                        msg: "Wrong E-mail or Password!" 
                    });
                }
                else{
                    bcrypt.compare(req.body.password, authUser.password).then((result) => { 
                        if(result){
                            let token = jwt.sign({ userId: authUser.id }, env.jwt.secret);
                            return res.status(200).json({
                                msg: "Welcome!",
                                data: {
                                    id: authUser.id.toString(),
                                    image: (authUser.photo)?authUser.photo:"https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1",
                                    name: authUser.name,
                                    username: authUser.username,
                                    token: token
                                }
                            });
                        }
                        else{
                            return res.status(400).json({
                                msg: "Wrong E-mail or Password!" 
                            });
                        }
                    });
                }
            }
            catch(error){
                console.log(error);
            }
        }
    },

    register: async (req, res) => {
        let rules = {
            name: {
                label: "Name",
                rule: {
                    required: true
                }
            },
            username: {
                label: "Username",
                rule :{
                    required : true,
                    unique   : "user,username"
                }
            },
            password: {
                label: "Password",
                rule: {
                    required: true
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
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            }).then((result)=>{
                if(result){
                    let token = jwt.sign({ userId: result.dataValues.id }, env.jwt.secret);
                    return res.status(200).json({
                        msg: "Welcome!",
                        data: {
                            id: result.dataValues.id.toString(),
                            image: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1',
                            name: result.dataValues.name,
                            token: token
                        }
                    });
                }
                else{
                    return res.status(400).json({
                        msg: "Wrong E-mail or Password!" 
                    });
                }
            })
        }
    }
}

module.exports = new AuthController;