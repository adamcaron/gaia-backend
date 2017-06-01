import supertest from 'supertest'
const request = supertest(`localhost:${process.env.API_PORT}/v1/terms`)

describe('/terms', () => {
  describe('GET /test', () => {
    it('should respond with json confirmation', done => {
      request
        .get('/test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { message: 'It\'s working' }, done)
    })
  })
})