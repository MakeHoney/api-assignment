import jwt from 'jsonwebtoken'
import constants from '../constants'

export default {
  create (body) {
    return jwt.sign(body, constants.token_key, {
      subject: 'user-information',
      expiresIn: '1d'
    })
  },
  verify (token) {
    return jwt.verify(token, constants.token_key)
  }
}
