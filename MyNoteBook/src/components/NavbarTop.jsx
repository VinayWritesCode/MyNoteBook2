import React from 'react';
import { Container,Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useHistory} from "react-router-dom";



export default function NavbarTop() {
    let location = useLocation();
    React.useEffect(() => {
    }, [location]);

    const history = useHistory();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        history.push("/login");
    }
    return (
        <div>

            <Navbar collapseOnSelect expand="lg" variant="dark" style={{ backgroundColor: "transparent" }}>
                <Container>
                    <Navbar.Brand to="/">MyNoteBook</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`} style={{ textDecoration: "none", marginTop: "0.56em"}}>Home </Link>
                            <Link to="/About" className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} style={{ textDecoration: "none", marginTop: "0.56em" }}>About </Link>
                            <NavDropdown title="Dropdown" className="my-2" id="collasible-nav-dropdown">
                                <NavDropdown.Item >Action</NavDropdown.Item>
                                <NavDropdown.Item >Another action</NavDropdown.Item>
                                <NavDropdown.Item>Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>{!localStorage.getItem('token') ?
                        <Nav className="mb-2">
                            <Link to="/login" className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}  style={{ textDecoration: "none" }}>Login </Link>
                            <Link to="/signup" className={`nav-link ${location.pathname === "/signup" ? "active" : ""}`}  style={{ textDecoration: "none" }}>
                                Sign Up
                            </Link>
                            </Nav> : <Button variant="dark" onClick={handleLogout}>
                                <div className="text-primary "> Logout </div>
                            </Button> }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
