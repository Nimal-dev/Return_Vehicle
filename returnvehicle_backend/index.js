const express =require('express')
const db=require('./db')
var bodyParser=require('body-parser')
var cors=require('cors')
const session = require('express-session');
const app=express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())
app.use(session({
    secret: 'your-secret-key',  // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set secure to true if using HTTPS
}));


const port=4000
db()
const truckRouter=require('./truckowners/truck.router')

const goddownRouter=require('./Goddowns/Goddown.router')

app.get('/',(req,res)=>{res.send('loaded')})
app.use('/truck',truckRouter)
app.use('/goddown',goddownRouter)

app.listen(port,()=>{console.log('server is running')})
