
import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

// Styling
import "./Footer.css";
import "./Footer.pushdown.css"

export default function Footer() {
        return (
            <footer data-component="Footer" id="footer" className="footer section container-fluid">
                <Navbar bg='dark' variant='dark' expand='lg'>
                    <Container fluid>
                        <Nav.Link className="text-bold" as={Link} to="/upload">Upload</Nav.Link>
                        <Nav.Link className="text-bold" as={Link} to="/test-param/3">Test: Component with ID</Nav.Link>
                        <Nav.Link className="text-bold" as={Link} to="/test-param/me">Test: Component me</Nav.Link>
                        <a target="_blank" href="https://github.com/Siphon880gh/reprint/" className="text-bold nav-link">Github</a>
                        <span className="text-bold text-white nav-link">Reprint © 2021</span>
                    </Container>
                </Navbar>
            </footer>
        )
}

export function FooterPushDown() {
    return (
        <div className="footer-pushdown">
        </div>
    )
}

