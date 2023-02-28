const mongoose = require('mongoose');
<<<<<<< HEAD
// const mongoURI = 'mongodb://localhost:27017/iBook?directConnection=true&readPreference=primary';
const mongoURI = 'mongodb+srv://Chirag:Chirag2001@cluster0.huvd5gq.mongodb.net/?retryWrites=true&w=majority';
=======
const mongoURI = 'mongodb://localhost:27017/iBook?directConnection=true&readPreference=primary';
>>>>>>> 38e0a4cd97a6bf16715862ec9957c723580fddda
// We are connecting our database to our backend
const connectToMongo = ()=>{
  mongoose.connect(mongoURI,()=>{
    console.log('Connected to mongoose Sucessfully!')
  })
}

module.exports = connectToMongo;