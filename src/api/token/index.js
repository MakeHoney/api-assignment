import { Router } from 'express'
import session from 'express-session'
import constants from '../../constants'
import controller from './controller'

const router = Router()

router.use(session({
  secret: constants.session_key,
  resave: false,
  saveUninitialized: true
}))

router.post('/encode', controller.makeToken)
router.get('/decode', controller.decodeToken)
router.delete('/destroy', controller.removeSessionData)

export default router
