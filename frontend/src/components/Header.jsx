import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
// import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
              <Navbar.Brand >
                  <strong>SeigShop</strong>
                  {/* <img src={logo} alt='SeigShop Logo' /> */}
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle area-controls="basic-navbar-nav" />
            <Navbar.Collapse id="baic-navbar-nav">
                <Nav className='ms-auto'>
                    <Nav.Link href="/cart" ><FaShoppingCart /> Cart</Nav.Link>
                    <Nav.Link href="/cart" ><FaUser /> Sign In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
