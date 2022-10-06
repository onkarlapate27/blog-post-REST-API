// importing dependencies
const express = require('express');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3').verbose();

// setting port as environment variable
const port = process.env.port || 3000;

// express server
const app = express();

// connecting to database
const db = new sqlite.Database('models/database.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log(`error with db connection`, err);
    }
    console.log(`sqlite database connected`);
});

// create table
const create_table = ("CREATE TABLE IF NOT EXISTS blogs(id INTEGER PRIMARY KEY NOT NULL, title VARCHAR(255) NOT NULL, content BLOB NOT NULL, category VARCHAR(50) NOT NULL);");

db.run(create_table, (err)=>{
    if(err){
        return console.log('error in creating table,', err);
    }
});

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

// defing endpoints
// get request for listing all blogs
app.get('/api/blogs', (req, res)=>{
    const sql = "SELECT * FROM blogs"; 
    db.all(sql, [], (err, row)=>{
        if(err){
            return res.status(500).send('error occured', err);
        }
        return res.send(row);
    });
});

// post request for creating new blog
app.post('/api/blogs', (req, res)=>{
    title= req.body.title;
    content= req.body.content;
    category= req.body.category;

    // inserting into database
    let sql = ("INSERT INTO blogs(title, content, category) VALUES (?, ?, ?);");
    db.run(sql, [title, content, category], (err)=>{
        if(err){
            return res.status(500).send('error occured', err);
        }
        return res.send("successfully inserted into blogs");
    });
});

// get all words starting with a or A for a particular postID
app.get('/api/blogs/start-a/:postID', (req, res) => {
    const postId = req.params.postID;
    db.get("SELECT * FROM blogs WHERE id=?", [postId], (err, row)=>{
        if(err){
            return res.status(500).send('error occured', err);
        }
        else if(row === undefined){
            return res.status(400).send('Not a valid PostID');
        }
        else {
            let str = row.content;
            const arr = str.split(" ");
            let requiredArr = [];
            for(let i=0; i<arr.length; i++){
                if( arr[i][0]=== 'a' || arr[i][0] === 'A'){
                    requiredArr.push(arr[i]);
                }
            }
            return res.send(requiredArr);
        }
    });
});

// patch request for replacing last three letters with * for all words starting with a or A
app.patch('/api/blogs/replace-a/:postID', (req, res) => {
    const postId = req.params.postID;
    db.get("SELECT * FROM blogs WHERE id=?", [postId], (err, row)=>{
        if(err){
            return res.status(500).send('error occured', err);
        }
        else if(row === undefined){
            return res.status(400).send('Not a valid Post ID');
        }
        else {
            let str = row.content;
            const arr = str.split(" ");
            let newStr = "";
            // pushing changes into new string newStr and updating the content in database
            for(let i=0; i<arr.length; i++){
                if( arr[i][0] === 'a' || arr[i][0] === 'A'){
                    if(arr[i].length == 1){
                        arr[i] = arr[i].slice(0, -1) + '*';
                    }
                    else if(arr[i].length == 2){
                        arr[i] = arr[i].slice(0, -2) + '**';
                    }
                    else{
                        arr[i] = arr[i].slice(0, -3) + '***';
                    }
                }
                if(i === arr.length-1){
                    newStr += arr[i]; 
                    continue;
                }
                newStr += arr[i] + " "; 
            }
            db.run("UPDATE blogs SET content=? WHERE id=?;", [newStr, postId], (err)=>{
                if(err){
                    return res.status(500).send('error occured', err);
                }
                return res.send("Replaced characters successfully!");
            });
        }
    });
});

// handling 404 error
app.use((req, res, next) => {
    res.status(404).send("This is not a correct request. Please check again");
});

// checking for server availability
app.listen(port, (err)=>{
    if(err){
        console.log('error in starting the server', err);
    }
    console.log('server running successfully on port', port);
});