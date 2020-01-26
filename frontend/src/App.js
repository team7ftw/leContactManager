import React, { Component } from "react";

// Router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

// Page components
import ContactList from './components/contact-list.component';
import NewContact from './components/new-contact.component';
import AccountSettings from './components/account-settings.component';

// Custom styles
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar bg="transparent" expand="lg" className="py-3" variant="dark">
            <Link to="/" className="navbar-brand">Le Contact Manager</Link>
            <Navbar.Toggle aria-controls="navMenu" />
            <Navbar.Collapse id="navMenu">
              <Nav className="mr-auto">
                <Link to="/" className="nav-link">Contacts</Link>
                <Link to="/create" className="nav-link">Create New</Link>
                <Link to="/acount" className="nav-link">Acount</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <br />
          <Route path="/" exact component={ ContactList } />
          <Route path="/create" exact component={ NewContact } />
          <Route path="/acount" exact component={ AccountSettings } />
        </div>
      </Router>
    );
  }
}

export default App;