import db from '../../src/models/index'
import bcrypt from 'bcrypt'
import Token from '../helpers/token'
class AuthService {

  static async register(req) {
    try {
      const { first_name, last_name, email, password } = req.body;

      const checkUser = await db.Users.findOne({ where: { email } })

      if (checkUser) {
        return { type: false, message: 'This User already exist,please check your email or password' }
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await db.Users.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        balance: 100
      })
      return {
        type: true,
        data: { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name },
        message: 'User Created Successfully'
      }
    } catch (error) {
      return { type: false, message: 'An error occurred during registration' };
    }
  }

  static async login(req) {
    try {
      const { email, password } = req.body;

      const checkUser = await db.Users.findOne({ where: { email } })

      console.log(1);
      if (!checkUser) {
        return { type: false, message: 'User Not Found.' }
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password)
      console.log(2);
      if (!comparePassword) {
        return { type: false, message: 'Username or password is not correct. Please Check.' }
      }

      const token = await Token.generateToken(checkUser);
      return { type: true, data: token, message: 'User logged in successfully' }
    } catch (error) {
      return { type: false, message: 'An error occurred during log-in' };
    }

  }

}


export default AuthService;