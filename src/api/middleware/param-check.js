export default {
  bodyChecker (req, res, next) {
    const { body } = req
    // check if body object is empty
    if (Object.keys(body).length) {
      req.payload = body
      next()
    } else {
      return res.status(404).json({
        message: 'User information body is requested!'
      })
    }
  },
  queryChecker (req, res, next) {
    const tokenRequested = req.headers['x-access-token'] || req.query.token
    if (tokenRequested) {
      req.validQuery = tokenRequested
      next()
    } else {
      return res.status(404).json({
        message: 'Token does not exist!'
      })
    }
  }
}
