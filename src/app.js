import express from 'express'
import apiFirstVersion from './v1'

const port = process.env.API_PORT || 8085
const app = express()

// init routes
app.use('/v1/', apiFirstVersion())

// handle not found
app.use((req, res) => {
  res.status(404).json('404: Page not Found')
})

// handle server errors
app.use((error, req, res, next) => {
  res.status(500).json('500: Internal Server Error')
})

// listen for requests
app.listen(port)

console.log('Server running on port ' + port)