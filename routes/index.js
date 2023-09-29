const express = require("express");
const router = express.Router();
const cartsRouter = require('./carts');
const itemsRouter = require('./items');
const usersRouter = require('./users');


//routes
router.use('/cart', cartsRouter);
router.use('/item', itemsRouter);
router.use('/users', usersRouter);


module.exports = router;
