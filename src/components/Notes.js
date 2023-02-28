import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/NoteContext";
import AddNotes from "./AddNotes";
import NoteItem from "./NoteItem";

const Notes = () => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNote,editNote,showAlert } = context;
  const ref  = useRef(null);
  const closeRef  = useRef(null);
  const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
  //  .log(notes.notes)
  //  notes.map(note=>.log(note))

  useEffect(() => {

     const token  = localStorage.getItem('token');
    if(token){
      getNote(token);
    
    }
    else{
    
   
    navigate("/login");
    
    }
        // eslint-disable-next-line
  }, []);


  const updateNote = (currentNote)=>{
    
  ref.current.click();
  setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  

  }

  

  const handleChange = (e)=>{
      setNote({...note,[e.target.name]:e.target.value});
  }
  const handleupdate = ()=>{
     closeRef.current.click();
     
     editNote(note.id,note.etitle,note.edescription,note.etag);
     showAlert("Note updated succcessfully!","success")
  }

  return (
    <>
      <AddNotes />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Bringing our form for editing the title,decription,tag */}

              <form className="container my-2">
                <div className="mb-3">
                  <label htmlFor="Title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value = {note.etitle}
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value ={note.edescription}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value ={note.etag}
                    onChange={handleChange}
                  />
                </div>

                
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button type="button" disabled={note.etitle.length<3 | note.edescription.length<5} className="btn btn-primary" onClick={handleupdate} >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <div className="container">
          {notes.length===0 && <h4 style={{textAlign:'center',marginTop:'4px'}}>No notes to display</h4>}
        </div>
        
        {notes&&
        notes.map((note) => {
          return (
            // return (
            <NoteItem key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
