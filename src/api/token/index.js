import { Router } from 'express'
import session from 'express-session'
import constants from '../../constants'

const router = Router()

router.use(session({
  secret: constants.session_key,
  resave: false,
  saveUninitialized: true
}))

router.post('/encode')
router.get('/decode')
router.delete('/destroy')

export default router
