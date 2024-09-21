// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const axiosInstance = require('./supabaseInstance');
// const getAll = require("./routes/getAll");
// const getById = require("./routes/getById");
// const deleteById = require("./routes/deleteById");
// const updateById = require("./routes/updateById");
// const addItem = require("./routes/addItem");
// const app = express();
// const PORT = process.env.PORT || 4000;
// app.use(cors());
// app.use(express.json());
// // Middleware for API key security
// app.use((req, res, next) => {
//   // Skip API key check for the root route and any other public routes
//   if (req.path === '/' || req.path.startsWith('/api/')) {
//     return next();
//   }
//   const apiKey = req.headers["api-key"];
//   if (apiKey !== process.env.ADMIN_API_KEY) {
//     return res.status(403).json({
//       message: "ACCESS DENIED! You need an API key for that. See our administrators.",
//     });
//   }
//   next();
// });
// // Root route to return the list of snacks
// app.get('/', async (req, res) => {
//   try {
//     const response = await axiosInstance.get('/snacks'); // Adjust according to your actual endpoint
//     res.json(response.data); // Return the list of snacks as JSON
//   } catch (error) {
//     console.error('Error fetching snacks:', error.message);
//     res.status(500).json({
//       error: 'Failed to fetch snacks.',
//       message: error.message
//     });
//   }
// });
// // Define API routes
// app.get("/api/snacks", getAll);
// app.get("/api/snacks/:id", getById);
// app.delete("/api/snacks/:id", deleteById);
// app.post("/api/snacks", addItem);
// app.put("/api/snacks/:id", updateById);
// // Error handling middleware
// app.use((error, req, res, next) => {
//   console.error(error.stack);
//   res.status(500).json({
//     error: "Something broke!",
//     errorStack: error.stack,
//     errorMessage: error.message,
//   });
// });
// // 404 Error handling for undefined routes
// app.use((req, res) => {
//   res.status(404).json({
//     error: "Resource not found. Are you sure you're looking in the right place?",
//   });
// });
// // Start the server
// const server = app.listen(PORT, () => {
//   console.log(`The server is running on http://localhost:${PORT}`);
// });
// // Export the app and server for testing
// module.exports = { app, server };












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
// Middleware for API key security
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


// Define API routes
app.get("/api/snacks", getAll);
app.get("/api/snacks/:id", getById);
app.delete("/api/snacks/:id", deleteById);
app.post("/api/snacks", addItem);
app.put("/api/snacks/:id", updateById);
// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: "Something broke!" });
});
// 404 Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Resource not found." });
});
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Export the app for Vercel
module.exports = app;












