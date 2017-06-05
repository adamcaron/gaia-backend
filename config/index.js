const host = 'localhost'
const port = process.env.API_PORT
const apiVersion = 'v1'
const apiUrl = `${host}:${port}/${apiVersion}`

export {
  host,
  port,
  apiVersion,
  apiUrl
}