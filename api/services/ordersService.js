import db from '../../src/models/index'

class OrdersService {

  static async createOrder(req, res) {
    try {
      const userId = req.user.user_id;
      const { details, status } = req.body

      const order = await db.Orders.create({
        user_id: userId,
        details,
        status,
        total_price: null
      })
      return { type: true, data: order, message: 'Order created successfully' }

    } catch (error) {
      return { type: false, message: 'An error occurred by creating order' };

    }
  }

  static async createOrderServices(req, res) {
    try {
      const { orderId } = req.params;
      const userId = req.user.user_id;
      const { service_id, quantity } = req.body

      const service = await db.Services.findOne({ where: { id: service_id } })
      if (!service) {
        return { type: false, message: 'Service Not Found.' }
      }

      const servicePrice = parseFloat(service.price);
      if (isNaN(servicePrice)) {
        return { type: false, message: 'Service price is not valid.' }
      }

      const qty = parseInt(quantity, 10);
      if (isNaN(qty) || qty <= 0) {
        return { type: false, message: 'Quantity must be a positive number.' }
      }


      const item_price = qty * servicePrice
      const user = await db.Users.findOne({ where: { id: userId } })

      if (!user) {
        return { type: false, message: 'User Not Found.' }
      }

      if (Number(user.balance) < Number(item_price)) {
        return { type: false, message: 'User balance is insufficient.' }

      }
      user.balance -= +item_price
      await user.save();


      const orders = await db.Orders.findOne({ where: { id: orderId } })
      if (!orders) {
        return { type: false, message: 'Orders Not Found.' }
      }

      orders.total_price += Number(item_price)
      await orders.save();

      const orderService = await db.OrderServices.create({
        order_id: orderId,
        service_id,
        quantity,
        item_price
      })

      return { type: true, data: orderService, message: 'Order created successfully' }

    } catch (error) {
      return { type: false, message: 'An error occurred by creating order services' };
    }
  }

  static async getOrders(req, res) {
    try {
      const userId = req.user.user_id;
      const orders = await db.Orders.findAll({
        where: { user_id: userId },
        include: [
          {
            model: db.Users,
            attributes: ['id', 'first_name', 'last_name', 'email', 'balance']
          },
          {
            model: db.Services, through: {
              attributes: ['quantity', 'item_price'],
            }
          }
        ]
      },

      );
      return { type: true, data: orders, message: 'Orders get  successfully' }

    } catch (error) {
      console.log(error);
      return { type: false, message: 'An error occurred by getting orders' };

    }
  }

  static async updateOrderStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const updated = await db.Orders.update({ status }, { where: { id: orderId } })
      return { type: true, data: updated, message: 'Orders status updated successfully' }

    } catch (error) {
      console.log(error);
      return { type: false, message: 'An error occurred by update order status' };

    }
  }

}


export default OrdersService;