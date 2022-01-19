import { ClientImpl } from './client'
import axios from 'axios'

async function main() {
  const axiosInstance = axios.create({ baseURL: process.env.API_BASE_URL || 'http://localhost:8000' })
  const client = new ClientImpl(axiosInstance)

  console.log('search')
  console.log(await client.search('foo'))
  console.log('create')
  await client.create('bar', 42)
  console.log('done')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
