import supertest from 'supertest'
import { apiUrl } from '../../config'
const request = supertest(`${apiUrl}/terms`)

describe('/terms', () => {
  describe('GET /test', () => {
    it('responds with confirmation in json format', () => {
      return request
      .get('/test')
      .set('Accept', 'application/json')
      .then(res => {
        expect(res.status).to.eql(200)
        expect(res.type).to.eq('application/json')
        expect(res.body.message).to.eql('It\'s working')
        expect(res.body.details).to.eql('Stuff worked!')
      })
    })
  })
  describe('GET /:tid/longest-preview-media-url', () => {
    it('responds with json', () => {
      return request
      .get('/26681/longest-preview-media-url')
      .set('Accept', 'application/json')
      .then(res => {
        expect(res.status).to.eql(200)
        expect(res.type).to.eq('application/json')
        expect(res.body).to.have.property('titleNid')
        expect(res.body).to.have.property('previewNid')
        expect(res.body).to.have.property('previewDuration')
        expect(res.body).to.have.property('bcHLS')
      })
    })
    it('responds with URL, node id, preview id, and preview duration', () => {
      return request
      .get('/26681/longest-preview-media-url')
      .set('Accept', 'application/json')
      .then(res => {
        expect(res.status).to.eql(200)
      })
    })
  })
})