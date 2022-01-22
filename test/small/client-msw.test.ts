import { DefaultRequestBody, PathParams, rest } from 'msw'
import { setupServer } from 'msw/node'
import axios from 'axios'
import { Client } from '@/client'
import { ProductReqBody, SearchResBody } from '@/server'

const productsRes = { products: [{ name: 'foo', price: 42 }] }
const mockServer = setupServer(
  rest.get<Record<string, never>, Record<string, never>, SearchResBody>(
    'http://example.com/products',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(productsRes))
    }
  ),
  rest.post<ProductReqBody>('http://example.com/products', (_, res, ctx) => {
    return res(ctx.status(204))
  })
)

beforeAll(() => {
  mockServer.listen()
})

afterEach(() => {
  mockServer.resetHandlers()
})

afterAll(() => {
  mockServer.close()
})

describe('Client', () => {
  const baseURL = 'http://example.com'
  let client: Client

  beforeEach(() => {
    client = new Client(axios.create({ baseURL }))
  })

  describe('search()', () => {
    it('returns found products', async () => {
      expect(await client.search('foo')).toEqual(productsRes)
    })
  })

  describe('create()', () => {
    it('returns found products', async () => {
      await client.create('foo', 42)
    })
  })
})
