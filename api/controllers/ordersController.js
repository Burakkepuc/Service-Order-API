import OrdersService from "../services/ordersService"
import OrdersValidation from "../validations/ordersValidation";

/**
 * @typedef Order
 * @property {string} details.required - Details of the order
 * @property {string} status - Status of the order
 */

/**
 * @typedef OrderService
 * @property {number} service_id.required - ID of the service
 * @property {number} quantity.required - Quantity of the service
 */

/**
 * @typedef OrderStatus
 * @property {string} status.required - New status of the order
 */


class OrdersController {

  /**
   * @route POST /api/orders/createOrder
   * @group Orders
   * @summary Create a new order
   * @param {Order.model} Order.body.required - Order details
   * @returns {object} 200 - Order created successfully
   * @returns {Error}  default - Unexpected error
   */
  static async createOrder(req, res) {
    try {

      const validateOrders = await OrdersValidation.validateOrders(req)

      if (!validateOrders.type) {
        return res.status(400).json({ type: false, message: validateOrders.message });
      }
      const result = await OrdersService.createOrder(req, res)
      return res.status(result.type ? 201 : 400).json(result)
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message })
    }
  }


  /**
 * @route POST /api/orders/create/{orderId}/services
 * @group Orders
 * @summary Add services to an existing order
 * @param {number} orderId.path.required - Order ID
 * @param {OrderService.model} OrderService.body.required - Service details
 * @returns {object} 200 - Service added to the order successfully
 * @returns {Error}  default - Unexpected error
 */
  static async createOrderServices(req, res) {
    try {
      const validateOrderServices = await OrdersValidation.validateOrderServices(req)

      if (!validateOrderServices.type) {
        return res.status(400).json({ type: false, message: validateOrderServices.message });
      }

      const result = await OrdersService.createOrderServices(req, res)
      return res.status(result.type ? 201 : 400).json(result)
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message })
    }
  }



  /**
  * @route GET /api/orders/getOrders
  * @group Orders
  * @summary Get all orders for a user
  * @returns {object} 200 - List of orders
  * @returns {Error}  default - Unexpected error
  */
  static async getOrders(req, res) {
    try {
      const result = await OrdersService.getOrders(req, res)
      return res.status(result.type ? 200 : 400).json(result)
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message })

    }
  }


  /**
 * @route PUT /api/orders/updateOrderStatus/{orderId}
 * @group Orders
 * @summary Update the status of an order
 * @param {number} orderId.path.required - Order ID
 * @param {OrderStatus.model} OrderStatus.body.required - New status
 * @returns {object} 200 - Order status updated successfully
 * @returns {Error}  default - Unexpected error
 */
  static async updateOrderStatus(req, res) {
    try {

      const validateOrderStatus = await OrdersValidation.validateOrderStatus(req)

      if (!validateOrderStatus.type) {
        return res.status(400).json({ type: false, message: validateOrderStatus.message });
      }

      const result = await OrdersService.updateOrderStatus(req, res)
      return res.status(result.type ? 200 : 400).json(result)
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message })

    }
  }

}

export default OrdersController