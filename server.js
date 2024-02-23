const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.post('/kk', async (req, res) => {
  try {
      console.log("1111111",req.body);
    const { firstName, lastName, email, userName, password, confirmPassword } = req.body;
    const user = new User({
      firstName,
      lastName,
      email,
      userName,
      password,
      confirmPassword,
    });

    await user.save();

    res.status(200).send('User saved successfully');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Error saving user');
  }
});

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const User = mongoose.model('User', new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  userName: String,
  password: String,
  confirmPassword: String,
}));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
