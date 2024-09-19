
import AuthService from "../services/authService";
import AuthValidation from "../validations/authValidation";

/**
 * @typedef AuthRegister
 * @property {string} first_name.required
 * @property {string} last_name.required
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef AuthLogin
 * @property {string} email.required
 * @property {string} password.required
 */


class AuthController {

  /**
 * @route POST /api/auth/register 
 * @group Auth
 * @summary endpoint to register an user
 * @param {AuthRegister.model} User.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
  static async register(req, res) {
    try {
      const validateRegister = await AuthValidation.validateRegister(req)

      if (!validateRegister.type) {
        return res.status(400).json({ type: false, message: validateRegister.message });
      }

      const result = await AuthService.register(req, res);
      return res.status(result.type ? 201 : 400).json(result)

    } catch (error) {
      return res.status(500).json({ type: false, message: error.message })
    }
  }


  /**
* @route POST /api/auth/login 
* @group Auth
* @summary endpoint to login an user
* @param {AuthLogin.model} User.body.required
* @returns {object} 200 - An array of user info
* @returns {Error}  default - Unexpected error
*/
  static async login(req, res) {
    try {
      const validateLogin = await AuthValidation.validateLogin(req)

      if (!validateLogin.type) {
        return res.status(400).json({ type: false, message: validateLogin.message });
      }

      const result = await AuthService.login(req, res);
      return res.status(result.type ? 200 : 400).json(result)

    } catch (error) {
      return res.status(500).json({ type: false, message: error.message })

    }
  }

}




export default AuthController;