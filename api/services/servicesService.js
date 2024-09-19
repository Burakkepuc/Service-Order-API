import db from '../../src/models/index'

class ServicesService {

  static async getAll(req) {
    try {
      const services = await db.Services.findAll();
      return { type: true, data: services, message: 'All services data get' }
    } catch (error) {
      return { type: false, message: 'An error occurred during get all services' };

    }

  }

}

export default ServicesService;