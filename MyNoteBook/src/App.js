import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import NavbarTop from './components/NavbarTop';
import NoteState from './reactContext/notes/NoteState';
import AlertCom from './components/AlertCom';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div style={{ backgroundColor: "#330033" }}>
      <NoteState>
        <Router>
          <div style={{ top: "0px", position: "sticky", zIndex: "500" }}>
            <NavbarTop />
            < AlertCom />
          </div>

          <div className="container">
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/About">
                <About />
              </Route>
              <Route path="/">
                <Home />
              </Route>

              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </div>
        </Router>

        <Footer />
      </NoteState>
    </div>
  );
}

export default App;
