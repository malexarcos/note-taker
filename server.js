const express = require ('express');
const path = require ('path');
const app = express ();
const db = require ('./db/db.json');
const fs = require ('fs');
const PORT = process.env.PORT || 3001;

app.use(express.static('./public'))
app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.get("/notes", (req,res) => {
    res.sendFile (path.join(__dirname, "./public/notes.html"));
})

app.get("/api/notes", (req,res) => {
    res.sendFile (path.join(__dirname, "./db/db.json"));
})

app.post("/api/notes", (req,res) => {
    var newNote = req.body
    console.log (newNote);
    db.push (newNote);
    fs.writeFile ('./db/db.json', JSON.stringify(db), () => {
        res.json (newNote);
    })
});

app.get ('*',(req,res)=>{
    res.sendFile (path.join(__dirname, "./public/index.html"));
}) 

app.listen (PORT, () => {
console.log ('server is running');
})