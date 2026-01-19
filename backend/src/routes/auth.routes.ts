import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser
} from '../controllers/auth.controllers.js'
import {verifySattachUser} from '../middleware/verifySattachUser.middleware.js'

import { Router } from 'express'

const router = Router();

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/refresh-access-token').get(refreshAccessToken);
// protected route
router.route('/logout').get(verifySattachUser, logoutUser);

export default router