import express from "express";
import mysql from "mysql2";

import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
const app = express();

dotenv.config();
app.use(express.json()); // allows client send data to backend
app.use(cors());

// connecting to the backend
const db = mysql.createConnection({
    database: process.env.DB_NAME,
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    
    ssl: {
        rejectUnauthorized: false
    }
});

// create table if not exist
db.connect((err) => {
    if (err) {
        console.error("Connection error:", err);
        return;
    }

    console.log("Connected to MySQL");

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS books (
            id INT NOT NULL AUTO_INCREMENT,
            title VARCHAR(64) NOT NULL,
            \`desc\` VARCHAR(255) NOT NULL,
            price INT NOT NULL,
            cover VARCHAR(255),
            PRIMARY KEY (id)
        )
    `;

    db.query(createTableQuery, (err) => {
        if (err) throw err;
        console.log("Table ready");
    });
});

// http://localhost:8800/
app.get("/", (req, res)=>{
    res.json("Hello, it's the backend.")
})

// http://localhost:8800/books
app.get("/books", (req, res)=>{
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    }) 
})

app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been created successfully.")
    })
})

// http://localhost:8800/books/:id
// get // it's to get data
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const q = "SELECT * FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Not found");

    res.json(data[0]);
  });
});
// put // it's to edit data
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})
// delete // it's to delete data
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully.")
    })
})


app.listen(process.env.PORT || 3000, ()=>{
    console.log("BACKEND ON!")
})
