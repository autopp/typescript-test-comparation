import express, { Request, Response } from 'express'
import { Product } from '@/product'

const app = express()

type SearchResBody = {
  products: Product[]
}

app.get('/products', (_: Request<unknown, SearchResBody, unknown, { query: string }>, res: Response<SearchResBody>) => {
  res.json({
    products: [
      { name: 'foo', price: 100 },
      { name: 'bar', price: 200 },
    ],
  })
})

type ProductReqBody = Product
app.post('/products', (_: Request<unknown, unknown, ProductReqBody>, res: Response) => {
  res.status(204).end()
})

const port = process.env.PORT || 8000
const server = app.listen(port, () => {
  console.log(`listen on ${port}`)
})

process.on('SIGCONT', () => {
  server.close(() => {
    console.log('shutdown')
  })
})
