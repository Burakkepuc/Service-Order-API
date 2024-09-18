import { Router } from 'express'
const router = Router();
import Token from '../helpers/token'

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/user', Token.verifyToken, function (req, res, next) {
  res.send('respond with a resource');
});

export default router;
