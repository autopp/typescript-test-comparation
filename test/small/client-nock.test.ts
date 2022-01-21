import nock, { Scope } from 'nock'
import axios from 'axios'
import { Client } from '@/client'

describe('Client', () => {
  const baseURL = 'http://example.com'
  let scope: Scope
  let client: Client

  beforeEach(() => {
    client = new Client(axios.create({ baseURL }))
    scope = nock(baseURL)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('search()', () => {
    const res = { products: [{ name: 'foo', price: 42 }] }
    beforeEach(() => {
      scope.get('/products').query({ query: 'foo' }).reply(200, res)
    })

    it('returns found products', async () => {
      expect(await client.search('foo')).toEqual(res)
      expect(scope.isDone()).toBeTruthy()
    })
  })

  describe('create()', () => {
    beforeEach(() => {
      scope.post('/products', { name: 'foo', price: 42 }).reply(204)
    })

    it('returns found products', async () => {
      await client.create('foo', 42)
      expect(scope.isDone()).toBeTruthy()
    })
  })
})
