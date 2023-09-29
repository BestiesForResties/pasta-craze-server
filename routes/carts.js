var express = require('express');
var router = express.Router();
const { Cart, User, Item } = require('../db/index');

router.get('/:id', async function(req,res,next) {
    try {
      const userId = req.params.id;
      const cart = await Cart.findByPk(userId);
      res.status(200).send(cart);
    } catch (error) {
      next(error);
    }
})

router.delete('/:id', async function(req, res, next) {
  try {
    const userId = req.params.id;

    // Find the user's current cart
    const cart = await Cart.findOne({ where: { userId, cartStatus: 'open' } });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Set the status of the current cart to "closed"
    await cart.update({ cartStatus: 'closed' });

    // Create a new cart for the user
    const newCart = await Cart.create({ userId, cartStatus: 'open' });

    res.status(200).json({ message: 'Cart closed, new cart created', newCart });
  } catch (error) {
    next(error);
  }
});

module.exports = router;