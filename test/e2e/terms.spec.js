import supertest from 'supertest'
const request = supertest(`localhost:${process.env.API_PORT}/v1/terms`)

describe('/terms', () => {
  describe('GET /test', () => {
    it('responds with confirmation in json format', () => {
      return request
      .get('/test')
      .set('Accept', 'application/json')
      .then(res => {
        expect(res.status).to.eql(200)
        expect(res.type).to.eq('application/json')
        expect(res.body).to.eql({ message: 'It\'s working' })
      })
    })
  })
  describe('GET /:tid/longest-preview-media-url', () => {
    xit('responds with json', () => {
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
    xit('responds with URL, node id, preview id, and preview duration', () => {
      return request
      .get('/26681/longest-preview-media-url')
      .set('Accept', 'application/json')
      .then(res => {
        expect(res.status).to.eql(200)
      })
    })
  })
})

// ///////////////////////////////////////////////////
// A
// Build the functionailty for the API:
// Write the test and get it to pass.
// Handle errors
