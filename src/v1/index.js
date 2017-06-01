import express from 'express'
import terms from './endpoints/term'

export default () => {
  const router = express.Router()

  router.use('/terms', terms())

  return router
}