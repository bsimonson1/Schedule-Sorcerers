const express = require('express');
const app = express();
const port = 5001;
const cors = require('cors'); // Import the cors middleware
const MongoClient = require('mongodb').MongoClient;

app.use(express.json());
app.use(cors()); // Use the cors middleware with default options

const url = 'mongodb+srv://ben:schedulesorcerer1@schedulesorcerery.b4wjqxl.mongodb.net/?retryWrites=true&w=majority';

app.get('/grab', async (req, res) => {
  try {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db('UserInformation');
    const collection = db.collection('LoginSignupInfo');
    const user = await collection.findOne({ email: req.query.email });
    if (user) {
      res.json({ experience: user.experience });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
    await client.close();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
