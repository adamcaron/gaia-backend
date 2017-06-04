import express from 'express'
import request from 'request-promise'

export default () => {
  const router = express.Router()

  router.get('/test', (req, res, next) => {
    var promise = new Promise((resolve, reject) => {
      if (false) {
        resolve("Stuff worked!")
      }
      else {
        reject(new Error("It broke"))
      }
    })

    promise
    .then(result => res.json({ message: 'It\'s working' + `: ${result}` }))
    .catch(next)
  })

  router.get('/:tid/longest-preview-media-url', (req, res, next) => {
    // TODO: validate tid input before initial request is made

    getLongest()
    .then(response => res.json(response))
    .catch(next) // ensure this catches and passes error details thrown in 'getLongest' function

    async function getLongest () {
      const tid = await request({
        uri: `http://d6api.gaia.com/vocabulary/1/${req.params.tid}`,
        headers: { 'Accept': 'application/json' },
        json: true
      })
      .then(response => response.terms[0].tid)
      .catch(next) // term not found  OR some other error response

      const title = await request({
        uri: `http://d6api.gaia.com/videos/term/${tid}`,
        headers: { 'Accept': 'application/json' },
        json: true
      })
      .then(response => response.titles
        .filter(title => typeof title.preview !== 'undefined')
        .sort((a, b) => b.preview.duration - a.preview.duration)[0]
      )
      .catch(next) // no title for that term OR some other error response

      const node = await request({
        uri: `http://d6api.gaia.com/media/${title.preview.nid}`,
        headers: { 'Accept': 'application/json' },
        json: true
      })
      .catch(next) // no media for that node id OR some other error response

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
