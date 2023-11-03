import logo from './logo.svg';
import "./envision.png";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Signup2 from './components/Signup2';
import Home from './components/Home';
import Login2 from './components/Login2';
import Jobs from './components/Jobs';
import Home2 from "./components/Jobs2"
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import Navbar from './components/Navbar';
import { useState } from 'react';
import './App.css';
import Searchbar from './components/Searchbar'
import Jobs2 from './components/Jobs2';
import Cards from './components/Cards'
import {
  MDBNavbarBrand,
} from 'mdb-react-ui-kit';


function App() {
    const commands = [
        {
            command: ["Go to *", "Open * "],
            callback: (redirectPage) => setRedirectUrl(redirectPage),
        },
    ];
    

    const {transcript} = useSpeechRecognition({ commands });
    const [redirectUrl, setRedirectUrl] = useState("");
    const [results, setResults] = useState([]);
    const pages = ['home', 'login' , 'register', 'jobs'];
    const urls = {
      home: "/",
      login: "/login2",
      register: "/signup2",
      jobs: "/jobs"
    }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null;
    }
    let redirect = "";

    if (redirectUrl) {
      if (pages.includes(redirectUrl)) {
        redirect = <Navigate to={urls[redirectUrl]} />;
      } else {
        redirect = <p>Could not find page: {redirectUrl}</p>;
      }
    }
    
  return (
      <div className="App">
        {/* <MDBNavbarBrand href='#'>
            <img
              src={require('./envision.png')}
              className='img' 
            />
             <p id="transcript"> 
            <button class="button1" onClick={SpeechRecognition.startListening}>Click me</button> </p>
          </MDBNavbarBrand> */}
            
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login2" element={<Login2 />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/signup2" element={<Signup2 />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs2" element={<Jobs2 />} />

        </Routes>

        {redirect}
      </BrowserRouter>

    </div>
  );
}
export default App;