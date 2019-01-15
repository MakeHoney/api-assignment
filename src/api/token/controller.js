import { token } from '../../utils'

export default {
  async makeToken (req, res) {
    try {
      const { session, body } = req
      const newToken = await token.create(body)

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
      const tokenRequested = req.headers['x-access-token'] || req.query.token
      const { session } = req
      const decoded = await token.verify(tokenRequested)

      // without any exception...

      // check session existence
      if(session[tokenRequested]) {
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
      const tokenRequested = req.headers['x-access-token'] || req.query.token
      const { session } = req

      await token.verify(tokenRequested)

      // without any exception...
      session[tokenRequested] = false

      res.send({ message: 'successfully removed' })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}
