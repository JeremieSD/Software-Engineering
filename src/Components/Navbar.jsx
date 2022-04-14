import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//Creates the Navbar shown on all pages

class NavbarLocal extends Component {
  constructor(props) {
    super(props);
    this.state = { history: this.props.history };
  }
  render() {
    // var isActive = this.context.router.route.location.pathname
    const activePage = window.location.href;
    return (
      <Navbar>
        <Navbar.Brand>WikiData Live</Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link
              as={Link}
              to="/"
              className={
                activePage.endsWith('/') ? 'nav-link--active' : 'nav-link'
              }
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/page"
              className={
                activePage.endsWith('/page') ? 'nav-link--active' : 'nav-link'
              }
            >
              Dashboard
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/feed"
              className={
                activePage.endsWith('/feed') ? 'nav-link--active' : 'nav-link'
              }
            >
              Feed
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/user-search"
              className={
                activePage.endsWith('/user-search')
                  ? 'nav-link--active'
                  : 'nav-link'
              }
            >
              User Search
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/page-revisions"
              className={
                activePage.endsWith('/page-revisions')
                  ? 'nav-link--active'
                  : 'nav-link'
              }
            >
              Page Revisions
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/about-page"
              className={
                activePage.endsWith('/about-page')
                  ? 'nav-link--active'
                  : 'nav-link'
              }
            >
              About Us
            </Nav.Link>

            <a
              as={Link}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/JeremieSD/Software-Engineering"
              className={
                activePage.endsWith('/ksknc') ? 'nav-link--active' : 'nav-link'
              }
            >
              Github Project
            </a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavbarLocal;
