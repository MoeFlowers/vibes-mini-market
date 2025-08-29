import express from 'express';
import cors from 'cors';
import productsRouter from './products.router';

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
  console.log(`CORS configured for: http://localhost:3000`);
});

