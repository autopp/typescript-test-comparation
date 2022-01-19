import type { AxiosInstance } from 'axios'
import { Product } from './product'

export class Client {
  private readonly axios: AxiosInstance

  constructor(axios: AxiosInstance) {
    this.axios = axios
  }

  async search(query: string): Promise<Product[]> {
    return (await this.axios.get<Product[]>('/products', { params: { query } })).data
  }

  async create(name: string, price: number): Promise<void> {
    await this.axios.post('/products', { name, price })
  }
}
