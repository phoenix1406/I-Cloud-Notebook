const mongoose = require('mongoose');


// const mongoURI = 'mongodb+srv://Chirag:Chirag2001@cluster0.huvd5gq.mongodb.net/?retryWrites=true&w=majority';

// const mongoURI = 'mongodb://localhost:27017/iBook?directConnection=true&readPreference=primary';


const mongoURI = 'mongodb://localhost:27017/iBook?directConnection=true&readPreference=primary';

// We are connecting our database to our backend
const connectToMongo = ()=>{
  mongoose.connect(mongoURI,()=>{
    console.log('Connected to mongoose Sucessfully!')
  })
}

module.exports = connectToMongo;