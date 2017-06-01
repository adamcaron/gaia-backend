import express from 'express'
import apiFirstVersion from './v1'

const port = process.env.API_PORT || 8085
const app = express()

app.use('/v1/', apiFirstVersion())

app.listen(port)
console.log('Server running on port ' + port)