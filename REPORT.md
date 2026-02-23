# Data Soul - Техникалық Жоба

## 1. Жобаның сипаттамасы
"Data Soul" — бұл электроника (ноутбуктер, смартфондар, компьютерлер) сатуға арналған мульти-вендорлы платформа. Жүйе Alibaba немесе Amazon сияқты маркетплейс қағидатымен жұмыс істейді.

## 2. Дерекқор Құрылымы (PostgreSQL Schema)

Төменде Users, Products және Orders кестелерінің SQL коды көрсетілген:

```sql
-- Users Table: Пайдаланушылар (Сатып алушы, Сатушы, Админ)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('buyer', 'vendor', 'admin')) DEFAULT 'buyer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table: Тауарлар
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    vendor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    category VARCHAR(50),
    image_url TEXT,
    -- JSONB арқылы техникалық сипаттамаларды сақтау (RAM, CPU, Screen)
    specs JSONB, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table: Тапсырыстар
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table: Тапсырыс құрамы (қосымша)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL
);
```

## 3. Инфрақұрылым (Docker & Nginx)

### docker-compose.yml
Бұл файл қосымшаны (App), дерекқорды (PostgreSQL) және веб-серверді (Nginx) контейнерлерде іске қосады.

```yaml
version: '3.8'

services:
  # Backend & Frontend (Node.js)
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:password@db:5432/datasoul
      - NODE_ENV=production
    depends_on:
      - db

  # Database (PostgreSQL)
  db:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: datasoul
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # Reverse Proxy (Nginx)
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - app

volumes:
  postgres_data:
```

### Nginx Config (nginx.conf)
Nginx сұраныстарды қабылдап, оларды Node.js қосымшасына бағыттайды.

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 4. CI/CD (GitHub Actions)

### .github/workflows/main.yml
Бұл скрипт код GitHub-қа жіберілгенде автоматты түрде тесттен өткізіп, Docker image жинайды.

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Run Lint
      run: npm run lint

    - name: Build
      run: npm run build

  docker-build:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Log in to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: user/datasoul:latest
```
