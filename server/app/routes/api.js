const bodyParser = require('body-parser');


const AuthController = require('../controllers/AuthController');
const RoomController = require('../controllers/RoomController');


const mid = require('./middleware');


module.exports = (router) => {
        router.post("/login", [bodyParser.json()], AuthController.authenticate);
        router.get("/rooms", [mid.checkAuth, mid.auth], RoomController.index);
}