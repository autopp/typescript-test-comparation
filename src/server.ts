import express, { Request, Response } from 'express'
import { Product } from '@/product'

const app = express()
app.use(express.json())

export type SearchResBody = {
  products: Product[]
}

app.get(
  '/products',
  (req: Request<unknown, SearchResBody, unknown, { query: string }>, res: Response<SearchResBody>) => {
    console.log(`query=${req.query.query}`)
    res.json({
      products: [
        { name: 'foo', price: 100 },
        { name: 'bar', price: 200 },
      ],
    })
  }
)

export type ProductReqBody = Product
app.post('/products', (req: Request<unknown, unknown, ProductReqBody>, res: Response) => {
  console.log(req.body)
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
