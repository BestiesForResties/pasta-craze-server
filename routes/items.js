var express = require('express');
var router = express.Router();
const { Item, User, Cart } = require('../db/index');

//get all items
router.get('/', async function(req, res, next) {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    next(error);
  }
});

//Get Items by Category
router.get('/category/:category', async function(req, res, next) {
  try {
    const category = req.params.category;
    const items = await Item.findAll({where: {type: category}});
    res.send(items);
  } catch (error) {
    next(error);
  }
});

//GetItems by Id
router.get('/id/:id', async function(req, res, next) {
  try {
    const itemId = parseInt(req.params.id);
    const item = await Item.findByPk(itemId);
    res.send(item);
  } catch (error) {
    next(error);
  }
});

//create item
router.post('/', async function(req, res, next) {
  try {
    const { name, type, description, price } = req.body;

    if (!name || !type || !description || !price) {
      return res.status(400).json({ error: 'Please provide username, email, and password' });
    }

    const item = await Item.create({
      name,
      type,
      description,
      price,
    })

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
});

//update item by id
router.put('/:id', async (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  try {
    // Find the item by ID in the database
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Update the item's properties with the provided data
    if (name !== undefined) {
      item.name = name;
    }
    if (type !== undefined) {
      item.type = type;
    }
    if (description !== undefined) {
      item.description = description;
    }
    if (price !== undefined) {
      item.price = price;
    }

    await item.save();

    res.json({ message: 'Item updated successfully', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//delete item by id
router.delete('/:id', async function(req, res, next) {
  const itemId = parseInt(req.params.id);

  try {
    // Find the item by ID in the database
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Delete the item from the database
    await item.destroy();

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Add item to user cart
router.post('/:itemId/add-to-cart/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
  
    const user = await User.findByPk(req.params.userId);
   
    const itemId = parseInt(req.params.itemId);

    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const cart = await Cart.findOne({where:{userId, cartStatus: 'open'}, include: Item});
    // Find or create the user's cart
    if (!user || !cart) {
      return res.status(404).json({ message: 'User not found' });
    }

    await cart.addItem(item);

    res.status(200).json({ message: 'Items added to cart', cart });
  } catch (error) {
    console.error('Error adding item to cart for user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:itemId/remove-item/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const itemId = parseInt(req.params.itemId);

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const cart = await Cart.findOne({ where: { userId }, include: Item });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the item from the cart
    await cart.removeItem(item);

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error('Error removing item from cart for user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;