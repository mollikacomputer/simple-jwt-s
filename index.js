const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 5000;

// function for middleware

const verifyJWT = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    console.log('inside verify token', authHeader);
    if(!authHeader){
        return res.status(401).send({message:'unauthorized'});
    }
    const token = authHeader.split(' ')[1];
    jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err){
        return res.status(403).send({message: 'forbidden'})
    }
    req.decoded= decoded;
    next();
    })
}

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Testing JWT Server')
})

// login route
app.post('/login', (req, res) =>{
    const user = req.body;
    console.log(user);
    if(user.email ==='user@gmail.com' && user.password === '123456'){
        // for JWT access token
        const accessToken = jwt.sign(
            {email: user.email}, 
            process.env.ACCESS_TOKEN_SECRET, 
            {expiresIn:'1h'}
            )
        res.send({
            success: true,
            accessToken: accessToken
        })
    }else{
        res.send({success: false})
    }
});

app.get('/orders', verifyJWT, (req, res) => {
    // for test get token local storage to server
    // console.log(req.headers.authorization);
    res.send([{id:1, item: 'sunglass'}, {id:2, item: 'moonglass'} ])
})

app.listen(port, (req, res) =>{
    console.log(" Listening to port ", port);
});

// create jwt web token 
//1st step require('crypto').randomBytes(64)
//2nd step require('crypto').randomBytes(64).toString()
// 3rd step require('crypto').randomBytes(64).toString('hex')