const connectToMongo = require('./db');
const cors  =require('cors');

connectToMongo();
const express = require('express');
const app = express();
app.use(cors());
const port = 5000;

app.use(express.json());//Middle ware to use req.body to get body data

//creating routes for our application 
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.listen(port,()=>{
    console.log(`App listening at http://localhost:${port}`)
})




