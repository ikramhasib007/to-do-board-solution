import { buildApp } from '../../src/server/app'
import request from 'supertest'
import express from 'express'

function getTests(app: Express.Application) {
  it('should show GraphiQL', async () => {
    const response = await request(app)
    .get('/graphql')
    .set('Accept', 'text/html')
    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toContain('text/html')
  })

  it('should handle POST requests', async () => {
    const response = await request(app)
    .post('/graphql')
    .send({ query: '{ users { id } }' })
    expect(response.statusCode).toBe(200)
  })
}

describe('express', () => {
  const app = express()
  buildApp(app)

  getTests(app)
})

describe('express + body parser', () => {
  const app = express()
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json({ limit: '50mb' }))
  buildApp(app)

  getTests(app)
})