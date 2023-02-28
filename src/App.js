
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {


 


  return (
  <>
    <NoteState>
  <Router>
    <Navbar/>
    <Alert/>
    <div className='container'>
    <Routes>
      <Route exact path="/" element={<Home/>}></Route>
      <Route exact path="/social" element={<About/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path="/signUp" element={<SignUp/>}></Route>
     
    </Routes>
    </div>
  
   </Router>
   </NoteState>
  </>
      
  );
}

export default App;
