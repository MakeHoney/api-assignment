import express from 'express'
import bodyParser from 'body-parser'
import api from './api'

const app = express()

app.set('port', process.env.PORT || 3000)
// app.set('jwt-secret', config.secret)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ urlencoded: true }))

app.use('/api', api)

app.listen(app.get('port'), () => {
  console.log(`Server Running on port ${app.get('port')}`)
})
