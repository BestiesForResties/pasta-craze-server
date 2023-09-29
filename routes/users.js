const express = require('express');
const router = express.Router();
const { User,
  Item,
  Cart,
  CartItem,
  sequelize } = require('../db/index');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    // Handle any errors that may occur during the database query or response handling.
    next(error);
  }
});

//Get specific user
router.get('/:id', async function(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const user = await User.findByPk(id);
    res.send(user);
  } catch (error) {
    // Handle any errors that may occur during the database query or response handling.
    next(error);
  }
});

//Post new user
router.post('/', async function(req, res, next) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Please provide username, email, and password' });
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    await Cart.create({ UserId: newUser.id });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// delete user
router.delete('/:id', async function(req, res, next) {
  const userId = parseInt(req.params.id);

  try {
    // Find the item by ID in the database
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the item from the database
    await user.destroy();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Update User--
router.put('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;

  try {
    // Find the item by ID in the database
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Update the item's properties with the provided data
    if (updatedUser.username !== undefined) {
      user.username = updatedUser.username;
    }
    if (updatedUser.email !== undefined) {
      user.email = updatedUser.email;
    }
    if (updatedUser.password !== undefined) {
      user.password = updatedUser.password;
    }
    
    //with authentication implement ability to grant someone is_Admin

    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Get Users Cart
router.get('/:id/cart', async function(req, res, next) {
  try {
    const userId = parseInt(req.params.id);
    const cart = await Cart.findOne({where:{userId, cartStatus: 'open'}, include: Item});
    res.send(cart);
  } catch (error) {
    // Handle any errors that may occur during the database query or response handling.
    next(error);
  }
});

module.exports = router;
