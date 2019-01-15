import { token } from '../../utils'

export default {
  async makeToken (req, res) {
    try {
      const ses = req.session
      const token = await token.createToken()

      // 중복검사 여부
      ses[token] = true

      res.status(200).json({
        token
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async decodeToken (req, res) {
    try {
      const token = req.headers['x-access-token'] || req.query.token
    } catch (err) {

    }
  },
  removeSessionData () {

  }
}
