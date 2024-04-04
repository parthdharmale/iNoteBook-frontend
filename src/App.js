// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  // const [userAuthToken, setuserAuthToken] = useState("");
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="Welcome to iNotebook" />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home isSignedUp={isSignedUp}  />}
              ></Route>
              <Route path="/about" element={<About />}></Route>
              <Route
                path="/login"
                element={<Login setIsSignedUp={setIsSignedUp}  />}
              ></Route>
              <Route
                path="/signup"
                element={<Signup setIsSignedUp={setIsSignedUp} />}
              ></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
