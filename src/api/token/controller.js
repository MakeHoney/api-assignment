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
      const { session, validQuery } = req
      const decoded = await token.verify(validQuery)

      // without any exception...
      // check session existence
      if(session[validQuery]) {
        res.json({ decoded })
      } else {
        res.status(500).json({
          message: 'session does not exist!'
        })
      }
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async removeSessionData (req, res) {
    try {
      const { session, validQuery } = req
      await token.verify(validQuery)

      // without any exception...
      if (session[validQuery]) {
        delete session[validQuery]
        res.json({ message: 'successfully removed' })
      } else {
        res.status(500).json({
          message: 'no session to delete'
        })
      }
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}
