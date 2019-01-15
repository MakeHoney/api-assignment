import jwt from 'jsonwebtoken'
import constants from '../constants'

export default {
  async createToken (body) {
    return await jwt.sign(body, constants.token_key, {
      subject: 'user-information',
      expiredIn: '1d'
    })
  },
  async verifyToken (token) {
    return await jwt.verify(token, constants.token_key)
  }
}
