import React, { useState, useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DarkModeToggle } from './DarkModeToggle';
import { ColorSchemeContext } from '../Platform/ColorScheme';

//Creates the Navbar shown on all pages

export function NavbarLocal(props) {
  const [history, setHistory] = useState(props.history);
  // var isActive = this.context.router.route.location.pathname
  const activePage = window.location.href;
  const { colorScheme, setColorScheme } = useContext(ColorSchemeContext);
  // handle class names if this is the active page for styling
  let homeClassName = activePage.endsWith('/')
    ? 'nav-link--active'
    : 'nav-link';

  let dashboardClassName = activePage.endsWith('/page')
    ? 'nav-link--active'
    : 'nav-link';

  let feedClassName = activePage.endsWith('/feed')
    ? 'nav-link--active'
    : 'nav-link';

  let userSearchClassName = activePage.endsWith('/user-search')
    ? 'nav-link--active'
    : 'nav-link';

  let pageRevisionsClassName = activePage.endsWith('/page-revisions')
    ? 'nav-link--active'
    : 'nav-link';

  let aboutUsClassName = activePage.endsWith('/about-page')
    ? 'nav-link--active'
    : 'nav-link';
  let githubClassName = activePage.endsWith('/ksknc')
    ? 'nav-link--active'
    : 'nav-link';
  let variantName = 'light';
  let backgroundName = 'light';
  // Toggle dark mode
  if (colorScheme === 'dark') {
    homeClassName += ' dark';
    dashboardClassName += ' dark';
    feedClassName += ' dark';
    userSearchClassName += ' dark';
    pageRevisionsClassName += ' dark';
    aboutUsClassName += ' dark';
    githubClassName += ' dark';
    variantName = 'dark';
    backgroundName = 'dark';
  }

  return (
    <div>
      <Navbar variant={variantName} bg={backgroundName}>
        <Navbar.Collapse>
          <Navbar.Brand>WikiData Live</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/" className={homeClassName}>
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/page" className={dashboardClassName}>
              Dashboard
            </Nav.Link>

            <Nav.Link as={Link} to="/feed" className={feedClassName}>
              Feed
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/user-search"
              className={userSearchClassName}
            >
              User Search
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/page-revisions"
              className={pageRevisionsClassName}
            >
              Page Revisions
            </Nav.Link>

            <Nav.Link as={Link} to="/about-page" className={aboutUsClassName}>
              About Us
            </Nav.Link>

            <a
              as={Link}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Group29-TCD/Software-Engineering"
              className={githubClassName}
            >
              Github Project
            </a>
            <DarkModeToggle />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarLocal;
