import React from 'react';
import noteContext from '../context/NoteContext';
import {useState,useContext} from 'react';


const AddNotes = () => {

    const context = useContext(noteContext);
    const {addNote,showAlert} = context;

    const [note,setNote] = useState({title:"",description:"",tag:""})
    // const [note,setNote] = useState({})

   const handleChange = (e)=>{
    // setNote(note => ({...note,[e.target.name]:e.target.value}))
    setNote( {...note,[e.target.name]:e.target.value})
      //  setNote({...note,{e.target.name:e.target.value}});
   }
   const handleClick=(e)=>{
  
    addNote(note.title,note.description,note.tag);
    e.preventDefault();
    setNote({title:"",description:"",tag:""})
    showAlert("Note added Successfully!","success");
   }


  return (
    <>
    <div>
      <div className='container my-3'>
      <h2> Add a Note</h2>
    </div>

    <form className='container my-2'>
  <div className="mb-3">
    <label htmlFor="Title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" value ={note.title} name="title" aria-describedby="emailHelp" onChange={handleChange}/>

  </div>
  <div className="mb-3">
    <label htmlFor="Description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" value ={note.description}name="description" onChange={handleChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="Tag" className="form-label">Status</label>
    <input type="text" className="form-control" id="tag" value ={note.tag} name="tag" onChange={handleChange}/>
  </div>
  
  <button disabled={note.title.length<3 | note.description.length<5} type="submit" className="btn btn-primary" onClick = {handleClick}>Create Note</button>
</form>
  <div className="container my-3" >
    <h2 style = {{textAlign:'center'}}>Your Notes</h2>
    </div>
    </div>
    </>
  )
}

export default AddNotes;
