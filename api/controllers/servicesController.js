import ServicesService from "../services/servicesService";

class ServicesController {


  /**
  * @route GET /api/services/getAll
  * @group Services
  * @summary Get all services for a user
  * @returns {object} 200 - List of services
  * @returns {Error}  default - Unexpected error
  */
  static async getAll(req, res) {
    try {
      const result = await ServicesService.getAll(req, res);
      return res.status(result.type ? 200 : 400).json(result)
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message })
    }
  }

}

export default ServicesController