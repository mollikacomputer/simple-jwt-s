const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors());
app.use(express());

app.get('/', (req, res) => {
    res.send('Testing JWT Server')
})

app.listen(port, (req, res) =>{
    console.log(" Listening to port ", port);
});