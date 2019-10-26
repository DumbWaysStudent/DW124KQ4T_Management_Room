const bodyParser = require('body-parser');


const AuthController = require('../controllers/AuthController');


const mid = require('./middleware');


module.exports = (router) => {
        router.post("/login", [bodyParser.json()], AuthController.authenticate);
}