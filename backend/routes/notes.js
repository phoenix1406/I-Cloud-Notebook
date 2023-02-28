const express = require('express');
const Note  = require('../modules/Notes');
const fetchuser = require('../Middleware/fetchuser');
const router = express.Router();
const {body,validationResult} = require('express-validator');



// CRUD OPERATIONS IN NOTES
// ROUTE 01 :GETTING ALL THE NOTES USING 'get/api/notes/fetchallnotes :read all notes
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes  = await Note.find({user: req.user.id}); //the middleware function  will fetch the userid from auth-token 
        res.json(notes);                                 //and now here we are searching for that user id in our notes database created by mongoose model and we are finally sending it to our server
    } catch (error) {
        res.status(500).send('Internal Server Error!')
        
    }
 
})


// Route 02 :Creating end point for genrating notes for my different users using /api/notes/addnote :creating notes login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Enter a valid description').isLength({min:6})
],async (req,res)=>{
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors  :errors.array()})
    }
    try{
      const {title,description,tag} = req.body;
      const newNote   =await Note.create({
        title: title,
        description :description,
        tag:tag,
        user : req.user.id // We are storing user id in the user itself
      })
      res.json({newNote})
    }
    catch(err){
       console.error(err.message);
       res.status(500).json({errors:err});
    }
})
// Route 03: creating a new endpoint for updating an existing notes using /api/auth/updatenote/:id update :login required

router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    try{
         const newNote  = {};
    const{title,description,tag} = req.body;
      if(title){
    newNote.title = title
      }
      if(description){
    newNote.description = description
      }
      if(tag){
    newNote.tag = tag
      }
 

      const userid  = req.user.id;
      let noteExist  = await Note.findOne({_id:req.params.id,user:userid})
    // let note  =await Note.findById(req.params.id);
 
    //  checking if whether note exist 
      if(!noteExist){
        return res.status(404).json({error:'Note Doesnot Exist'});
      }
    //   checking whether if only the owner of the particular note is deleting it 
      if(noteExist.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    noteExist = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json({noteExist});
}
    catch(err){
    console.error(err.message);
    res.status(500).send('Internal Server Error')
    }
})

//Route 04 : creating an end point for deleting note using 'api/notes/deletenote   login required

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
   const errors  = validationResult(req);
   if(!errors.isEmpty()){
    res.status(400).json({errors:errors.array()})
   }

   try{
    let note  =await Note.findById(req.params.id);


    if(!note){
        return res.status(404).json({error:'Note Doesnot Exist'});
      }
      if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed")
    }
     note = await Note.findByIdAndDelete(req.params.id);
     res.status(200).json({"success" : 'Your Note has been deleted'})
    
   }
   catch(err){
    console.error(err.message);
    res.status(500).send('Internal server error!');
   }
})


module.exports = router;