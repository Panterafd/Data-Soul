import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// In-memory data store
const products = [
  {
    id: 1,
    title: 'MacBook Pro 16"',
    price: 2499,
    category: 'Ноутбуктер',
    image_url: 'https://picsum.photos/seed/mac/400/300',
    specs: {CPU: 'M3 Max', RAM: '32GB', Storage: '1TB'},
    vendor_id: 2
  },
  {
    id: 2,
    title: 'Dell XPS 15',
    price: 1899,
    category: 'Ноутбуктер',
    image_url: 'https://picsum.photos/seed/dell/400/300',
    specs: {CPU: 'i9-13900H', RAM: '16GB', Storage: '512GB'},
    vendor_id: 2
  },
  {
    id: 3,
    title: 'iPhone 15 Pro',
    price: 999,
    category: 'Смартфондар',
    image_url: 'https://picsum.photos/seed/iphone/400/300',
    specs: {CPU: 'A17 Pro', RAM: '8GB', Screen: '6.1 OLED'},
    vendor_id: 2
  },
  {
    id: 4,
    title: 'Samsung Galaxy S24',
    price: 899,
    category: 'Смартфондар',
    image_url: 'https://picsum.photos/seed/samsung/400/300',
    specs: {CPU: 'Snapdragon 8 Gen 3', RAM: '12GB', Screen: '6.8 AMOLED'},
    vendor_id: 2
  }
];

const stats = {
  sales: [
    { name: 'Қаң', value: 4000 },
    { name: 'Ақп', value: 3000 },
    { name: 'Нау', value: 2000 },
    { name: 'Сәу', value: 2780 },
    { name: 'Мам', value: 1890 },
    { name: 'Мау', value: 2390 },
  ],
  orders: 120,
  revenue: 45000,
  vendors: 15
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/products', (req, res) => {
    res.json(products);
  });

  app.get('/api/stats', (req, res) => {
    res.json(stats);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
