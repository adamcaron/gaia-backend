import express from 'express'
import { host, port } from '../config'
import apiFirstVersion from './v1'

const app = express()

// init routes
app.use('/v1/', apiFirstVersion())

// handle not found
app.use((req, res) => {
  res.status(404).json('404: Page not Found')
})

// handle server errors
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json('500: Internal Server Error')
})

// listen for requests
app.listen(port)

console.log(`Server running at ${host} on port ${port}`)