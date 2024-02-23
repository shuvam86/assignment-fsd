const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// Define route handler for the '/kk' endpoint
app.post('/kk', async (req, res) => {
  try {
    // Extract form data from request body
    const { firstName, lastName, email, userName, password, confirmPassword } = req.body;

    // Create a new user instance
    const user = new User({
      firstName,
      lastName,
      email,
      userName,
      password,
      confirmPassword,
    });

    // Save the user to MongoDB
    await user.save();

    // Send success response
    res.status(200).send('User saved successfully');
  } catch (error) {
    // Handle errors
    console.error('Error saving user:', error);
    res.status(500).send('Error saving user');
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Define user schema and model
const User = mongoose.model('User', new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  userName: String,
  password: String,
  confirmPassword: String,
}));

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
