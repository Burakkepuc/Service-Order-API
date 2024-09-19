import Joi from '@hapi/joi';


class OrdersValidation {

  static async validateOrders(req) {
    try {
      const { body } = req;

      const ordersSchema = Joi.object({

        status: Joi.string().min(4),
        details: Joi.string().min(4),
      })

      const { error } = ordersSchema.validate(body);

      if (error) {
        return { type: false, message: error.details[0].message };
      }
      return { type: true }

    } catch (error) {
      return { type: false, message: error.message };

    }
  }
  static async validateOrderServices(req) {
    try {
      const { body } = req;

      const ordersSchema = Joi.object({
        service_id: Joi.number().min(1).required(),
        quantity: Joi.string().min(1).required()
      })

      const { error } = ordersSchema.validate(body);

      if (error) {
        return { type: false, message: error.details[0].message };
      }
      return { type: true }

    } catch (error) {
      return { type: false, message: error.message };

    }
  }

  static async validateOrderStatus(req) {
    try {
      const { body } = req;

      const ordersSchema = Joi.object({
        status: Joi.string().min(3).required(),
      })

      const { error } = ordersSchema.validate(body);

      if (error) {
        return { type: false, message: error.details[0].message };
      }
      return { type: true }

    } catch (error) {
      return { type: false, message: error.message };

    }
  }


}


export default OrdersValidation;