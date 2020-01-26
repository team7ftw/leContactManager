import React, { Component } from "react";

// Router
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

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
          <Navbar bg="transparent" expand="lg" className="py-3 px-0" variant="dark">
            <Link to="/" className="navbar-brand">Le Contact Manager</Link>
            <Navbar.Toggle aria-controls="navMenu" />
            <Navbar.Collapse id="navMenu">
              <ul className="nav nav-pills ml-auto">
                <Nav.Item>
                  <NavLink exact to="/" className="nav-link">Contacts</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/create" className="nav-link">Create New</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/acount" className="nav-link">Acount</NavLink>
                </Nav.Item>
              </ul>
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