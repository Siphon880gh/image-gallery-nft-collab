import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import {
  Navbar,
  Nav,
  Modal,
  Tab,
  Form,
  Button,
} from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import SearchButton from "../assets/searchIconBox.png";
import AddPostIcon from "../assets/thickAddIcon.png";
import FaveBoxIcon from "../assets/heartBoxIcon.png";
import ProfileIcon from "../assets/profileBoxLogo.png";
import LogoutIcon from "../assets/logoutIcon.png";
import LoginSignupIcon from "../assets/signupLoginBox.png";
import NoftLogo from "../assets/noftFULL2.png";
import Auth from "../utils/auth";
import "./Navbar.css";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const initialState = "";
  const [searchFilter, setSearchFilter] = useState(initialState);

  const onSearch = (event) => {
    let isAutotypeWorthy = event.target.value.length > 0;
    if (isAutotypeWorthy) {
      setSearchFilter({
        ...searchFilter,
        searchFilter: event.target.value,
      })
    } else {
      setSearchFilter({
        ...searchFilter,
        searchFilter: "UNIQUE_STRING_THAT_CANT_SEARCH",
      });
    }
  };

  return (
    <>
      <Navbar className="site-navbar" bg="dark" variant="dark" expand="lg">
          <Navbar.Brand as={Link} to="/">
            <img
              src={NoftLogo}
              width="120"
              height="50"
              className="d-inline-block align-top"
              alt="Noft Custom Logo"
            />
          </Navbar.Brand>
          <Form inline>
            <div className="searchWrapper">
              <Form.Group className="flex-fill-in" controlId="searchInput">
                {/* <Form.Label className="mr-3">Search for a User</Form.Label> */}
                <div className="overlay-under-wrapper">
                  <Form.Control onInput={onSearch} autoComplete="off" />
                  <Search searchFilter={searchFilter}></Search>
                </div>
              </Form.Group>
            </div>
              <img
                src={SearchButton}
                style={{width:"30px", height:"30px"}}
                className="d-inline-block align-top ml-2 mt-1"
                alt="Search Button"
              />
          </Form>
          <Navbar.Toggle aria-controls="navbar-main" />
          <Navbar.Collapse id="navbar-main">
            <Nav className="ml-auto">
              {/* if user is logged in, show Add Post and Favorites link. Otherwise show Login/Sign up */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/post/new">
                    <img
                      src={AddPostIcon}
                      width="50"
                      height="50"
                      className="d-inline-block align-top"
                      alt="Add New NoFT"
                    />
                  </Nav.Link>
                  <Nav.Link as={Link} to="/favorites">
                    <img
                      src={FaveBoxIcon}
                      width="50"
                      height="50"
                      className="d-inline-block align-top"
                      alt="Favorite NoFTs Icon"
                    />
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile/">
                    <img
                      src={ProfileIcon}
                      width="50"
                      height="50"
                      className="d-inline-block align-top"
                      alt="Go To Profile Logo"
                    />
                  </Nav.Link>
                  <Nav.Link onClick={() => setShowLogoutModal(true)}><img
                    src={LogoutIcon}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="Logout Logo"
                  /></Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  <img
                    src={LoginSignupIcon}
                    width="140"
                    height="50"
                    className="d-inline-block align-top"
                    alt="Signup or Login Logo"
                  />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      {/* {Starting the modal for Logout} */}
      <Modal
        size='lg'
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        aria-labelledby='logout-modal'>
        <Modal.Header closeButton>
          <Modal.Title id='logout-modal'>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Not yet!
          </Button>
          <Button variant="primary" onClick={Auth.logout}>
            I want to logout!
          </Button>
        </Modal.Footer>
      </Modal >
      {/* {Starting the modal for Logout} */}
      <Modal
        size='lg'
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        aria-labelledby='logout-modal'>
        <Modal.Header closeButton>
          <Modal.Title id='logout-modal'>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Not yet!
          </Button>
          <Button variant="primary" onClick={Auth.logout}>
            I want to logout!
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
};

export default AppNavbar;
