import express from 'express'

export default () => {
  const router = express.Router()

  router.get('/test', (req, res) => {
    res.json({ message: 'It\'s working' })
  })

  return router
}
