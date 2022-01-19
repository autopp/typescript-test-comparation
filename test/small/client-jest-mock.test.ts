import { mock, MockProxy } from 'jest-mock-extended'
import type { AxiosInstance } from 'axios'
import { Client } from '@/client'

describe('Client', () => {
  let client: Client
  let mockAxios: MockProxy<AxiosInstance>

  beforeEach(() => {
    mockAxios = mock()
    client = new Client(mockAxios)
  })

  describe('search()', () => {
    const res = { products: [{ name: 'foo', price: 42 }] }
    beforeEach(() => {
      mockAxios.get.mockResolvedValueOnce({ status: 200, data: res })
    })

    it('returns found products', async () => {
      expect(await client.search('foo')).toEqual(res)
      expect(mockAxios.get.mock.calls).toEqual([['/products', { params: { query: 'foo' } }]])
    })
  })

  describe('create()', () => {
    beforeEach(() => {
      mockAxios.post.mockResolvedValueOnce({ status: 204 })
    })

    it('returns found products', async () => {
      await client.create('foo', 42)
      expect(mockAxios.post.mock.calls).toEqual([['/products', { name: 'foo', price: 42 }]])
    })
  })
})
