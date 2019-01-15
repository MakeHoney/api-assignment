import { token } from '../../utils'

export default {
  async makeToken (req, res) {
    try {
      const { session, payload } = req
      const newToken = await token.create(payload)

      session[newToken] = true

      res.status(200).json({ newToken })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async decodeToken (req, res) {
    try {
      const { session, validToken } = req
      const decoded = await token.verify(validToken)

      // without any exception...

      // check session existence
      if(session[validToken]) {
        res.json({ decoded })
      } else {
        res.json({ message: "session doesn't exist!" })
      }
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async removeSessionData (req, res) {
    try {
      const { session, validToken } = req

      await token.verify(validToken)

      // without any exception...
      delete session[validToken]

      res.send({ message: 'successfully removed' })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}
