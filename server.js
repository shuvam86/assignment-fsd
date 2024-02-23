const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.post("/kk", async (req, res) => {
  try {
    const { firstName, lastName, email, userName, password, confirmPassword } =
      req.body;
    console.log("Request Body:", req.body);

    const user = new User({
      firstName,
      lastName,
      email,
      userName,
      password,
      confirmPassword,
    });

    try {
      await user.save();
      console.log("User saved successfully:", user);
      res.status(200).json({ message: "User saved successfully" });
    } catch (saveError) {
      console.error("Error saving user:", saveError);
      res.status(500).json({ error: "Error saving user" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Error processing request" });
  }
});

mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    password: String,
    confirmPassword: String,
  })
);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
