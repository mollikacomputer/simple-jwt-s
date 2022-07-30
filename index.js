const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express());

app.get('/', (req, res) => {
    res.send('Testing JWT Server')
})

// login route
app.post('/login', (req, res) =>{
    const user = req.body;
    console.log(user);
    res.send({success: true});
});

app.listen(port, (req, res) =>{
    console.log(" Listening to port ", port);
});