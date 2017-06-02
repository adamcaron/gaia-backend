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

    // request({
    //   uri: `http://d6api.gaia.com/vocabulary/1/${req.params.tid}`,
    //   headers: { 'Accept': 'application/json' },
    //   json: true
    // })
    // .then(response => response.terms[0].tid)
    // .then(tid => request({
    //   uri: `http://d6api.gaia.com/videos/term/${tid}`,
    //   headers: { 'Accept': 'application/json' },
    //   json: true
    // }))
    // .then(response => response.titles
    //   .filter(title => typeof title.preview !== 'undefined')
    //   .sort((a, b) => b.preview.duration - a.preview.duration)[0].preview.nid
    // )
    // .then(nid => request({
    //   uri: `http://d6api.gaia.com/media/${nid}`,
    //   headers: { 'Accept': 'application/json' },
    //   json: true
    // }))
    // .then((node) => res.json(
    //   JSON.stringify({
    //     bcHLS: node.mediaUrls.bcHLS,
    //     titleNid: nid
    //   })
    // ))
    // .catch(reason => console.error(reason))

    getLongest()
    .then(longest => res.json(longest))
    .catch(reason => console.error(reason))

    async function getLongest () {
      const tid = await request({
        uri: `http://d6api.gaia.com/vocabulary/1/${req.params.tid}`,
        headers: { 'Accept': 'application/json' },
        json: true
      })
      .then(response => response.terms[0].tid)
      .catch(reason => console.error(reason))

      console.log('======= tid ==>\n', tid)

      const title = await request({
        uri: `http://d6api.gaia.com/videos/term/${tid}`,
        headers: { 'Accept': 'application/json' },
        json: true
      })
      .then(response => response.titles
        .filter(title => typeof title.preview !== 'undefined')
        .sort((a, b) => b.preview.duration - a.preview.duration)[0]
      )
      .catch(reason => console.error(reason))

      console.log('======= title ==>\n', title)

      const node = await request({
        uri: `http://d6api.gaia.com/media/${title.preview.nid}`,
        headers: { 'Accept': 'application/json' },
        json: true
      })
      .catch(reason => console.error(reason))

      console.log('======= node ==>\n', node)

      return {
        bcHLS: node.mediaUrls.bcHLS,
        titleNid: title.nid,
        previewNid: title.preview.nid,
        previewDuration: title.preview.duration
      }
    }

    // read();

    // async function read () {
    //   var html = await getRandomPonyFooArticle();
    //   var md = hget(html, {
    //     markdown: true,
    //     root: 'main',
    //     ignore: '.at-subscribe,.mm-comments,.de-sidebar'
    //   });
    //   var txt = marked(md, {
    //     renderer: new Term()
    //   });
    //   console.log(txt);
    // }

  })

  return router
}
