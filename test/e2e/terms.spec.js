import supertest from 'supertest'
import { apiUrl } from '../../config'
const request = supertest(`${apiUrl}/v1/terms`)

describe('/terms', () => {
  describe('GET /:tid/longest-preview-media-url', () => {
    it('responds with json', () => {
      return request
      .get('/26681/longest-preview-media-url')
      .set('Accept', 'application/json')
      .then(res => {
        expect(res.type).to.eq('application/json')
      })
    })
    it('responds with URL, node id, preview id, and preview duration', () => {
      return request
      .get('/26681/longest-preview-media-url')
      .set('Accept', 'application/json')
      .then(res => {
        expect(res.status).to.eql(200)
        expect(res.body).to.have.property('titleNid')
        expect(res.body).to.have.property('previewNid')
        expect(res.body).to.have.property('previewDuration')
        expect(res.body).to.have.property('bcHLS')
      })
    })
  })
})