import express from 'express'
import request from 'request-promise'

export default () => {
  const router = express.Router()

  router.get('/test', (req, res) => {
    if (true) {
      res.json({ message: 'It\'s working' })
      // TODO: respond with status code
    }
    else {
      throw new Error
    }
  })

  router.get('/:tid/longest-preview-media-url', (req, res) => {
    // TODO: validate tid input before initial request is made

    const options = {
      uri: `http://d6api.gaia.com/vocabulary/1/${req.params.tid}`,
      headers: { 'Accept': 'application/json' },
      json: true
    }

    request(options)
    .then(response => response.terms[0].tid)
    .then(tid => request({
      uri: `http://d6api.gaia.com/videos/term/${tid}`,
      headers: { 'Accept': 'application/json' },
      json: true
    }))
    .then(response => {
      return res.json(
        response.titles
        .filter(title => typeof title.preview !== 'undefined')
        .sort((a, b) => b.preview.duration - a.preview.duration)
        .map(title => title.preview.duration)
      )
    })
  })

  return router
}
