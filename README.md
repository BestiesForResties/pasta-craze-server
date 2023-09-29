Here are the routes available:

ITEMS:

- Get all items, '/item/', GET

- Get all Items by category, '/items/category/{category}', GET

- Get item by ID, '/item/id/{id}', GET

- Create Item, '/item/', POST

- Update Item, '/item/{id}', PUT

- Delete item, '/item/{id}', DELETE

- Add item to user cart, '/{itemID}/add-to-cart/{userId}', POST

USERS:

- Get all Users: '/users/', GET

- Get specific user by ID: '/users/{id}', GET

- Create a new user: '/users/', POST
    JSON must contain username, email, password

- DELETE user by ID: '/users/{id}', POST

- UPDATE user by id, '/users/{id}, PUT
    JSON can contain username, email, or password

- GET users cart , '/users/{id}/cart', GET

CART:

- Get Cart by id, '/cart/{id}', GET