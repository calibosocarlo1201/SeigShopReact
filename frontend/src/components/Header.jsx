import React from 'react'
import {Navbar, Nav, Container, Badge} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
//import { Link } from 'react-router-dom'
// import logo from '../assets/logo.png'

const Header = () => {

  const { cartItems } = useSelector((state) => state.cart);

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
                    <LinkContainer to='/cart'>
                      <Nav.Link to="/cart" ><FaShoppingCart />
                      Cart
                      {cartItems.length > 0 && (
                        <Badge pill bg='success' style={{marginLeft: '5px'}}>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</Badge>
                      )}
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to=''>
                      <Nav.Link to="/cart" ><FaUser /> Sign In</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
