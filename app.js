const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

let users = [
    {
        id: 1,
        name: "Birgitte Kirk Iversen",
        mail: "bki@mail.dk",
        title: "Senior Lecturer",
        image: "https://www.baaa.dk/media/u4gorzsd/birgitte-kirk-iversen2.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921541630000&format=webp"
    },
    {
        id: 4,
        name: "Rasmus Cederdorff",
        mail: "race@mail.dk",
        title: "Senior Lecturer",
        image: "https://www.baaa.dk/media/devlvvgj/rasmus-cederdorff.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921695570000&format=webp"
    },
    {
        id: 5,
        name: "Dan Okkels Brendstrup",
        mail: "dob@mail.dk",
        title: "Lecturer",
        image: "https://www.eaaa.dk/media/bdojel41/dan-okkels-brendstrup.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921559630000&format=webp"
    },
    {
        id: 6,
        name: "Kasper Fischer Topp",
        mail: "kato@mail.dk",
        title: "Lecturer",
        image: "https://www.eaaa.dk/media/lxzcybme/kasper-topp.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921618200000&format=webp"
    },
    {
        id: 7,
        name: "Line Skjødt",
        mail: "lskj@mail.dk",
        title: "Senior Lecturer & Internship Coordinator",
        image: "https://www.eaaa.dk/media/14qpfeq4/line-skj%C3%B8dt.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921638700000&format=webp"
    },
    {
        id: 8,
        name: "Martin Aagaard Nøhr",
        mail: "mnor@mail.dk",
        title: "Lecturer",
        image: "https://www.eaaa.dk/media/oayjq02h/martin-n%C3%B8hr.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921658800000&format=webp"
    }
];

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cors()); //Enable All CORS Requests

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
    console.log(newUser);
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
    console.log(userData);
    console.log(user);
    user.name = userData.name;
    user.title = userData.title;
    user.mail = userData.mail;
    user.image = userData.image;
    return res.json(users);
});

// DELETE: delete user
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    users = users.filter(item => item.id != id);
    return res.json(users);
});

app.listen(port, () => {
    console.log(`Node.js REST API listening at http://localhost:${port}`);
});
