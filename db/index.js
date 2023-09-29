const { sequelize } = require('./db');

const { User } = require('./models/User');
const { Item } = require('./models/Item');
const { Cart } = require('./models/Cart');

User.hasOne(Cart);  // A user can have one cart
Cart.belongsTo(User);  // A cart belongs to a user

// Define the association between Item and Cart
Item.belongsToMany(Cart, {
  through: 'CartItems', // Custom through table name
  foreignKey: 'itemId', // Foreign key in the through table for Item
  otherKey: 'cartId',   // Foreign key in the through table for Cart
});

Cart.belongsToMany(Item, {
  through: 'CartItems', // Same custom through table name
  foreignKey: 'cartId', // Foreign key in the through table for Cart
  otherKey: 'itemId',   // Foreign key in the through table for Item
});

User.afterCreate(async (user) => {
    try {
      const newCart = await Cart.create({ userId: user.id });
      console.log(`Cart created for user: ${user.username}`);
    } catch (error) {
      console.error(`Error creating cart for user ${user.username}:`, error);
    }
});

module.exports = {
    User,
    Item,
    Cart,
    sequelize,
};