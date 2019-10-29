const bodyParser = require('body-parser');


const AuthController = require('../controllers/AuthController');
const RoomController = require('../controllers/RoomController');
const CustomerController = require('../controllers/CustomerController');
const OrderController = require('../controllers/OrderController');


const mid = require('./middleware');


module.exports = (router) => {
        router.post("/login", [bodyParser.json()], AuthController.authenticate);
        router.post("/register", [bodyParser.json()], AuthController.register);
        router.get("/rooms", [mid.checkAuth, mid.auth], RoomController.index);

        router.group("/room", (room) =>{
                room.post("/", [mid.checkAuth, mid.auth, bodyParser.json()], RoomController.store);

                room.put("/:id", [mid.checkAuth, mid.auth, bodyParser.json()], RoomController.update);
        });

        router.get("/customers", [mid.checkAuth, mid.auth], CustomerController.index);

        router.group("/customer", (customer) =>{
                customer.post("/", [mid.checkAuth, mid.auth, bodyParser.json()], CustomerController.store);
                customer.put("/:id", [mid.checkAuth, mid.auth, bodyParser.json()], CustomerController.update);
        });
        router.get("/checkin", [mid.checkAuth, mid.auth], OrderController.index);
        router.post("/checkin", [mid.checkAuth, mid.auth, bodyParser.json()], OrderController.store);
        router.put("/order/:id", [mid.checkAuth, mid.auth, bodyParser.json()], OrderController.update);
}