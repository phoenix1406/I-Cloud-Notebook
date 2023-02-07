import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/NoteContext'

const Alert = (props) => {
  const context = useContext(noteContext);
  const {alert} = context;
   
  const capitalize = (word)=>{
    if(word==='danger' || word==='warning' ){
      word = "alert"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <>
    <div style={{height:'50px'}}>
     {alert && <div className={`alert alert-${alert.type} alert-primary alert-dismissible fade show`} role="alert">
     <strong>{capitalize(alert.type)}</strong>: {alert.message}
     <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
}
    </div>
    </>
   
  )
}

export default Alert
