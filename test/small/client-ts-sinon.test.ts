import { Client } from '@/client'
import type { AxiosInstance } from 'axios'
import { StubbedInstance, stubInterface } from 'ts-sinon'

describe('Client', () => {
  let client: Client
  let mockAxios: StubbedInstance<AxiosInstance>

  beforeEach(() => {
    mockAxios = stubInterface<AxiosInstance>()
    client = new Client(mockAxios)
  })

  describe('search()', () => {
    const res = { products: [{ name: 'foo', price: 42 }] }
    beforeEach(() => {
      mockAxios.get.withArgs('/products', { params: { query: 'foo' } }).resolves({ status: 200, data: res })
    })

    it('returns found products', async () => {
      expect(await client.search('foo')).toEqual(res)
      expect(mockAxios.get.args).toEqual([['/products', { params: { query: 'foo' } }]])
    })
  })

  describe('create()', () => {
    beforeEach(() => {
      mockAxios.post.withArgs('/products', { name: 'foo', price: 42 }).resolves({ status: 204 })
    })

    it('returns found products', async () => {
      await client.create('foo', 42)
      expect(mockAxios.post.args).toEqual([['/products', { name: 'foo', price: 42 }]])
    })
  })
})
