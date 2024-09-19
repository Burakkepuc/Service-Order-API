# Service Order API

## Project Description

The primary goal of the project is to develop a backend system that allows users to register, log in, and place orders for additional services on an e-commerce platform. Users can place orders for various services, and their accounts are managed with an initial balance of 100.

## Directory Structure

```
|—— .babelrc
|—— .env
|—— .gitignore
|—— .sequelizerc
|—— 127.0.0.1
|—— api
|    |—— app.js
|    |—— controllers
|        |—— authController.js
|        |—— ordersController.js
|        |—— servicesController.js
|    |—— helpers
|        |—— token.js
|    |—— middlewares
|        |—— error.js
|        |—— notFound.js
|    |—— routes
|        |—— auth.js
|        |—— index.js
|        |—— orders.js
|        |—— services.js
|        |—— users.js
|    |—— services
|        |—— authService.js
|        |—— ordersService.js
|        |—— servicesService.js
|    |—— validations
|        |—— authValidation.js
|        |—— ordersValidation.js
|—— dev.sqlite
|—— package-lock.json
|—— package.json
|—— src
|    |—— config
|        |—— config.js
|        |—— swaggerOptions.js
|    |—— migrations
|        |—— 20240917190827-create-users.js
|        |—— 20240917191025-create-services.js
|        |—— 20240917191118-create-orders.js
|        |—— 20240917191156-create-order-services.js
|    |—— models
|        |—— index.js
|        |—— orders.js
|        |—— orderservices.js
|        |—— services.js
|        |—— users.js
|    |—— seeders
|        |—— 20240918203234-add-dummy-services.js
|—— __test__
|    |—— auth.test.js
```

## Scripts

- **`npm run dev`**: Runs the application in development mode using `nodemon`
- **`npm run test`**: Runs the test suite using `jest`.
- **`npm run migrate`**: Executes database migrations using `sequelize`.
- **`npm run seed`**: Seeds the database using `sequelize`.

## Routes

### Auth

- **POST** `/register` - Registers a new user. (Handled by `AuthController.register`)
- **POST** `/login` - Logs in an existing user. (Handled by `AuthController.login`)
  ### Order
- **POST** `/createOrder` - Creates a new order. (Handled by `OrdersController.createOrder`)
- **POST** `/create/:orderId/services` - Adds services to an existing order. (Handled by `OrdersController.createOrderServices`)
- **GET** `/getOrders` - Retrieves all orders for the logged-in user. (Handled by `OrdersController.getOrders`)
- **PUT** `/updateOrderStatus/:orderId` - Updates the status of an order. (Handled by `OrdersController.updateOrderStatus`)
  ### Service
- **GET** `/getAll` - Retrieves all available services. (Handled by `ServicesController.getAll`)

## Swagger Documentation

- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
