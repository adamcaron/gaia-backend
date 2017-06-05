import express from 'express'
import request from 'request-promise'

export default () => {
  const router = express.Router()

  router.get('/:tid/longest-preview-media-url', (req, res, next) => {
    getLongest(req, res, next)
    .then(response => res.json(response))
    .catch(next)

    async function getLongest () {
      const tid = await request({
        uri: `http://d6api.gaia.com/vocabulary/1/${req.params.tid}`,
        headers: { 'Accept': 'application/json' },
        json: true
      })
      .then(response => response.terms[0].tid)
      .catch(next)

      const title = await request({
        uri: `http://d6api.gaia.com/videos/term/${tid}`,
        headers: { 'Accept': 'application/json' },
        json: true
      })
      .then(response => response.titles
        .filter(title => typeof title.preview !== 'undefined')
        .sort((a, b) => b.preview.duration - a.preview.duration)[0]
      )
      .catch(next)

      const node = await request({
        uri: `http://d6api.gaia.com/media/${title.preview.nid}`,
        headers: { 'Accept': 'application/json' },
        json: true
      })
      .catch(next)

      return {
        bcHLS: node.mediaUrls.bcHLS,
        titleNid: title.nid,
        previewNid: title.preview.nid,
        previewDuration: title.preview.duration
      }
    }
  })

  return router
}
