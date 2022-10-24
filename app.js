const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
// Your github page origin has to be written EXACTLY like this! https://behu-kea.github.io
const URL_FOR_FRONTEND = "YOUR_GITHUB_PAGE_ORIGIN_HERE";

const users = require("./data"); // users array imported from data.js

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// If the application is running localhost allow all requests,
// otherwise add cors for specific website
// Remember to add the NODE_ENV="prod" on server!
const cors_url = process.env.NODE_ENV === "prod" ? URL_FOR_FRONTEND : "*";
app.use(
    cors({
        origin: cors_url
    })
);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// READ: read all users from users
app.get("/users", (req, res) => {
    return res.json(users);
});

// READ: get user by id
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const user = users.find(item => item.id == id);
    return res.json(user);
});

// CREATE: create new user and add to users
app.post("/users", (req, res) => {
    let newUser = req.body;
    const timestamp = Date.now(); // dummy generated user id
    newUser.id = timestamp;
    users.push(newUser);
    return res.json(users);
});

// UPDATE: update existing user
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    let user = users.find(item => item.id == id);
    user.name = userData.name;
    user.title = userData.title;
    user.mail = userData.mail;
    user.image = userData.image;
    return res.json(users);
});

// DELETE: delete user
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    users = users.filter(item => item.id != id);
    return res.json(users);
});

app.listen(port, () => {
    console.log(`Node.js REST API listening at http://localhost:${port}`);
});
