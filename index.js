const express = require("express");

const server = express();

server.use(express.json());

const users = ["Juliet", "Reachel", "Monique"];

//global middleware (just for test) - did you know that server.get/post/put/delete calls are also middlewares?
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Metodo: ${req.method}; URL: ${req.url};`);

  next();

  //console time just to prove that no return statement is necessary
  //is important to call the next() above.
  console.timeEnd("Request");
});

//local middleware to check if user exists
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

//local middleware to check if user is in the array
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}

//lists all users
server.get("/users", (req, res) => {
  return res.json(users);
});

//lists a user
server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

//create users
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//edit users
server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

//delete users
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  //good practice to just send a status code
  return res.send();
});

server.listen(3000);
