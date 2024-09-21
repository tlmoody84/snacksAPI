require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axiosInstance = require('./supabaseInstance');
const getAll = require("./routes/getAll");
const getById = require("./routes/getById");
const deleteById = require("./routes/deleteById");
const updateById = require("./routes/updateById");
const addItem = require("./routes/addItem");
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (req.path === '/' || req.path.startsWith('/api/')) {
    return next();
  }
  const apiKey = req.headers["api-key"];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ message: "ACCESS DENIED!" });
  }
  next();
});

app.get('/', async (req, res) => {
  try {
    const response = await axiosInstance.get('/snacks');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching snacks:', error.message);
    res.status(500).json({ error: 'Failed to fetch snacks.' });
  }
});

app.get("/api/snacks", getAll);
app.get("/api/snacks/:id", getById);
app.delete("/api/snacks/:id", deleteById);
app.post("/api/snacks", addItem);
app.put("/api/snacks/:id", updateById);

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Resource not found." });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;












