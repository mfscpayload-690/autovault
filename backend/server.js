require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const carsRoutes = require('./routes/cars.routes');
const brandsRoutes = require('./routes/brands.routes');
const searchRoutes = require('./routes/search.routes');
const compareRoutes = require('./routes/compare.routes');
const adminRoutes = require('./routes/admin.routes');
const usersRoutes = require('./routes/users.routes');

const app = express();

// --- Security middleware ---
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// --- Body parsers ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- Static files (uploaded images) ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Rate limiting on auth routes ---
const loginLimiter = rateLimit({
  windowMs: 60_000,
  max: 10,
  message: { error: 'Too many attempts. Please try again after a minute.' },
});
app.use('/api/auth', loginLimiter);

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/cars', carsRoutes);
app.use('/api/brands', brandsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/compare', compareRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', usersRoutes);

// --- Health check ---
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- Global error handler ---
app.use((err, _req, res, _next) => {
  console.error('[AutoVault] Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// --- Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[AutoVault] Worker ${process.pid} listening on port ${PORT}`);
});

module.exports = app;
