const express = require("express");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const router = express.Router();

const users = require("./user"); //database for user

router.post("/register", (req, res) => {
  const { email, username, password } = req.body;

  const isEmailValid = validator.isEmail(email);
  if (!isEmailValid) {
    return res.status(404).send({ message: "Email is invalid" });
  }

  const userExists = users.some((u) => u.username === username);
  if (userExists) {
    return res.status(400).send({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    id: users.length + 1,
    email,
    username,
    password: hashedPassword,
  };

  users.push(newUser);

  res.status(201).send({ message: "User registered successfully" });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!username) {
    return res.status(401).send({ message: "Invalid username or password" });
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send({ message: "Invalid username or password" });
  }

  res.status(201).send({ message: "Login succesfully" });
});

router.get("/list", (req, res) => {
  res.status(201).send(users);
});

module.exports = router;
