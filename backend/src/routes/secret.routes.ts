import {secretController} from '../controllers/secret.controllers.js'
import {verifySattachUser} from '../middleware/verifySattachUser.middleware.js'

import { Router } from 'express'

const router = Router();

// protected route
router.route('/secret').get(verifySattachUser, secretController);

export default router