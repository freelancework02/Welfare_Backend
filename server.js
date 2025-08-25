const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors()); 
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use('/api', blogRoutes);
app.use('/api', contactRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});