const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Helper functions (same as before)
async function readDb() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const initialData = { /* ... your initial data here ... */ };
      await fs.writeFile(DB_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    throw error;
  }
}
async function writeDb(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

// Endpoint untuk menerima data aktivitas dari ekstensi
app.post('/api/track', async (req, res) => {
  const { cs, activityKey } = req.body;
  if (!cs || !activityKey) {
    return res.status(400).json({ error: 'Missing cs or activityKey' });
  }

  try {
    const db = await readDb();
    if (db.csData[cs] && db.csData[cs][activityKey] !== undefined) {
      db.csData[cs][activityKey]++;
      await writeDb(db);
      res.status(200).json({ status: 'success', message: 'Activity recorded' });
    } else {
      res.status(404).json({ error: 'CS or activityKey not found' });
    }
  } catch (error) {
    console.error('Error handling track request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint untuk dashboard admin
app.get('/api/dashboard', async (req, res) => {
  try {
    const db = await readDb();
    res.status(200).json(db.csData);
  } catch (error) {
    console.error('Error handling dashboard request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Penting: Ekspor aplikasi sebagai handler serverless
module.exports = app;
