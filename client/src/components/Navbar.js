import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, Form, FormControl, Button } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Reprint
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar-main' />
          <Navbar.Collapse id='navbar-main'>
            <Nav className='ml-auto'>
              <Form inline>
                <FormControl type="text" placeholder="Search by author..." className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Nav.Link as={Link} to='/about'>About NFTs</Nav.Link>
              {/* if user is logged in, show Add Post and Favorites link. Otherwise show Login/Sign up */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/post/new'>
                    Add Post
                  </Nav.Link>
                  <Nav.Link as={Link} to='/favorites'>
                    Favorites
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
          </Navbar.Collapse>

          {Auth.loggedIn() ? (
            <>
              <Navbar.Toggle aria-controls='navbar-user' />
              <Navbar.Collapse id='navbar-user'>
                <Nav className='ml-auto'>
                  <Nav.Link as={Link} to='/profile/me'>Profile</Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          ) : (
            <></>
          )}
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
