import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedDb } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'db.json');

// Self-healing seeding if db.json is missing
if (!fs.existsSync(dbPath)) {
  console.log('db.json not found. Seeding initial database...');
  seedDb(dbPath);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Helper function to read database
function readDb() {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database file, reseeding...', err);
    seedDb(dbPath);
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  }
}

// Helper function to write database
function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  const db = readDb();
  res.json(db.products);
});

// GET /api/products/:id - Get a single product by ID
app.get('/api/products/:id', (req, res) => {
  const db = readDb();
  const product = db.products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// POST /api/checkout - Process a mock checkout order
app.post('/api/checkout', (req, res) => {
  const { shipping, billing, items, subtotal, total } = req.body;

  if (!shipping || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Missing shipping details or order items' });
  }

  const db = readDb();
  
  // Generate unique order ID
  const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const newOrder = {
    orderId,
    shipping,
    billing: billing || shipping, // Default to shipping if empty
    items,
    subtotal: subtotal || total,
    total: total || subtotal,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  db.orders = db.orders || [];
  db.orders.push(newOrder);
  writeDb(db);

  console.log(`Order ${orderId} created successfully.`);

  res.status(201).json({
    success: true,
    orderId,
    order: newOrder
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express API running on http://0.0.0.0:${PORT}`);
});
