const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Testing JWT Server')
})

// login route
app.post('/login', (req, res) =>{
    const user = req.body;
    res.send({success: true})
    console.log(user);
})


app.listen(port, (req, res) =>{
    console.log(" Listening to port ", port);
});