
import NoteContext  from './NoteContext';
import {useState} from 'react'


const NoteState = (props)=>{
  
const initialnotes = [
    // {
    //     "_id": "63ce5363f88d568685ab5638",
    //     "user": "63c9358f60507fbd7a158462",
    //     "title": "third Cloud Note",
    //     "description": "This is all about my learning of  backend development an this is my first note",
    //     "tag": "person",
    //     "date": "2023-01-23T09:29:07.716Z",
    //     "__v": 0
    //   },
    //   {
    //     "_id": "63cf960720108ae108731019",
    //     "user": "63c9358f60507fbd7a158462",
    //     "title": "fourth Cloud Note",
    //     "description": "This is all about my learning of  backend development an this is my first note",
    //     "tag": "tech",
    //     "date": "2023-01-24T08:25:43.543Z",
    //     "__v": 0
    //   },
    //   {
    //     "_id": "63cf960720108ae108731019",
    //     "user": "63c9358f60507fbd7a158462",
    //     "title": "fourth Cloud Note",
    //     "description": "This is all about my learning of  backend development an this is my first note",
    //     "tag": "tech",
    //     "date": "2023-01-24T08:25:43.543Z",
    //     "__v": 0
    //   },
    //   {
    //     "_id": "63cf960720108ae108731019",
    //     "user": "63c9358f60507fbd7a158462",
    //     "title": "fourth Cloud Note",
    //     "description": "This is all about my learning of  backend development an this is my first note",
    //     "tag": "tech",
    //     "date": "2023-01-24T08:25:43.543Z",
    //     "__v": 0
    //   },
    //   {
    //     "_id": "63cf960720108ae108731019",
    //     "user": "63c9358f60507fbd7a158462",
    //     "title": "fourth Cloud Note",
    //     "description": "This is all about my learning of  backend development an this is my first note",
    //     "tag": "tech",
    //     "date": "2023-01-24T08:25:43.543Z",
    //     "__v": 0
    //   },
    //   {
    //     "_id": "63cf960720108ae108731019",
    //     "user": "63c9358f60507fbd7a158462",
    //     "title": "fourth Cloud Note",
    //     "description": "This is all about my learning of  backend development an this is my first note",
    //     "tag": "tech",
    //     "date": "2023-01-24T08:25:43.543Z",
    //     "__v": 0
    //   },
    //   {
    //     "_id": "63cf960720108ae108731019",
    //     "user": "63c9358f60507fbd7a158462",
    //     "title": "fourth Cloud Note",
    //     "description": "This is all about my learning of  backend development an this is my first note",
    //     "tag": "tech",
    //     "date": "2023-01-24T08:25:43.543Z",
    //     "__v": 0
    //   },
    //   {
    //     "_id": "63cf960720108ae108731019",
    //     "user": "63c9358f60507fbd7a158462",
    //     "title": "fourth Cloud Note",
    //     "description": "This is all about my learning of  backend development an this is my first note",
    //     "tag": "tech",
    //     "date": "2023-01-24T08:25:43.543Z",
    //     "__v": 0
    //   },
    //   {
    //     "_id": "63cf960720108ae108731019",
    //     "user": "63c9358f60507fbd7a158462",
    //     "title": "fourth Cloud Note",
    //     "description": "This is all about my learning of  backend development an this is my first note",
    //     "tag": "tech",
    //     "date": "2023-01-24T08:25:43.543Z",
    //     "__v": 0
    //   },
    //   {
    //     "_id": "63cf960720108ae108731019",
    //     "user": "63c9358f60507fbd7a158462",
    //     "title": "fourth Cloud Note",
    //     "description": "This is all about my learning of  backend development an this is my first note",
    //     "tag": "tech",
    //     "date": "2023-01-24T08:25:43.543Z",
    //     "__v": 0
    //   },
    //   {
    //     "_id": "63cf960720108ae108731019",
    //     "user": "63c9358f60507fbd7a158462",
    //     "title": "fourth Cloud Note",
    //     "description": "This is all about my learning of  backend development an this is my first note",
    //     "tag": "tech",
    //     "date": "2023-01-24T08:25:43.543Z",
    //     "__v": 0
    //   }
    ]
    const [notes,setNotes] = useState(initialnotes);
    const host  = 'http://localhost:5000';



    const getNote  =async (token)=>{
      const response  = await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers: {
          'Content-type':'application/json',
          'auth-token': token
          // 'auth-token' : token,
        },

      });
      const json = await response.json();
     
      setNotes(json);
    }

      const addNote = async (title,description,tag)=>{
       //API CALL FROM BACKEND TO ALSO ADD OUR NOTE IN BACKEND
  
       const response  = await fetch(`${host}/api/notes/addnote`,{
         
        method:'POST',
        headers: {
          'Content-Type':'application/json',
          'auth-token': localStorage.getItem('token'),
          


        },
        body: JSON.stringify({title,description,tag}),
      });
      var json = await response.json();
       console.log(json);
      
      


      //  logic to add a note
        const note  = {
        "_id": "63cf960720108ae108731019",
        "user": "63c9358f60507fbd7a158462",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-01-24T08:25:43.543Z",
        "__v": 0
       }
       setNotes(notes.concat(note));  
      }


      const deleteNote = async (id)=>{

        const response  = await fetch(`${host}/api/notes/deletenote/${id}`,{
         
          method:'DELETE',
          headers: {
            'Content-Type':'application/json',
            'auth-token': localStorage.getItem('token'),
  
          },
         
        });
  
        const json  = await response.json();
        console.log(json);

        //logic for deleting note from frontend
        const newNotes =  notes.filter((notes)=>{
                  return (notes._id!==id)
        })
        setNotes(newNotes);
      
      }

    
      const editNote = async (id,title,description,tag)=>{
      const response  = await fetch(`${host}/api/notes/updatenote/${id}`,{
         
        method:'PUT',
        headers: {
          'Content-Type':'application/json',
          'auth-token': localStorage.getItem('token')

        },
        body: JSON.stringify({title,description,tag}),
      });

      const json  = await response.json();
      console.log(json);
      
      //  logic to update note in front end

      const newNote  = JSON.parse(JSON.stringify(notes));
      // console.log(newNote);

       for(let i=0;i<newNote.length;i++){
        if(newNote[i]._id===id){
          newNote[i].title = title;
          newNote[i].description = description;
          newNote[i].tag = tag;
         break;
        }

      }
      setNotes(newNote);
    }
    const [alert,setAlert] = useState(null);
    const showAlert = (message,type)=>{
      setAlert({
        message:message,
        type:type
      })
      setTimeout(()=>{
        setAlert(null)
      },2000)
    }

   return(
    <>
     <NoteContext.Provider value = {{notes,addNote,editNote,deleteNote,getNote,showAlert,alert}}>
        {props.children}
     </NoteContext.Provider>
    </>
   )
}
export default NoteState; 
