import { Router } from 'express'
import session from 'express-session'
import constants from '../../constants'
import controller from './controller'
import { paramCheck } from '../middleware'
const router = Router()

router.use(session({
  secret: constants.session_key,
  resave: false,
  saveUninitialized: true
}))

router.post('/encode', paramCheck.bodyChecker, controller.makeToken)
router.get('/decode', paramCheck.queryChecker, controller.decodeToken)
router.delete('/destroy', paramCheck.queryChecker, controller.removeSessionData)

export default router
