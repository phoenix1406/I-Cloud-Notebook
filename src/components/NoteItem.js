import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/NoteContext';

const NoteItem = (props) => {
   const {note,updateNote} = props;
   const context = useContext(noteContext);
   const {deleteNote,showAlert} = context;

   const handleClick = ()=>{
    var result = window.confirm('Do you really want to delete your note ?');
    if(result){
    deleteNote(note._id);
    showAlert("Note deleted successfully!","danger");
    }
   }
 
  
    return (
    <>
<div className='col-md-3'>
<div className="card my-2" >
 
  <div className="card-body">
    <div className="d-flex align-items-center">
    
    <h5 className="card-title">{note.title}</h5> 
    <div style={{marginLeft:'auto'}}>
    <i className="fa-solid fa-trash-can mx-2" onClick={handleClick}></i>
    <i className="fa-solid fa-user-pen mx-2" onClick ={()=>{updateNote(note)}}></i>
    </div>
    </div>
   
    <p className="card-text">{note.description}</p>
   
  </div>
</div>
      </div>
</>
  )
}

export default NoteItem
