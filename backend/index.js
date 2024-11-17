const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const PORT = 3000; // Change this if needed

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(cors());

let latestData = null;
// Endpoint to receive data
app.post('/endpoint', (req, res) => {
  // Extract data from the request body
  const { distance1, distance2, distance3 } = req.body;
  latestData = { distance1, distance2, distance3 };
  console.log('Received data:');
  console.log(`Distance 1: ${distance1}`);
  console.log(`Distance 2: ${distance2}`);
  console.log(`Distance 3: ${distance3}`);

  // Send response back to the client
  res.status(200).json({ message: 'Data received successfully' });

  // Optionally: Save data to a database here
});
app.get('/endpoint', (req, res) => {
    if (latestData) {
      res.status(200).json(latestData);
    } else {
      res.status(404).json({ message: 'No data available' });
    }
  });
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
