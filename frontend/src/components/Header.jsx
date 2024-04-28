import React from 'react'
import {Navbar, Nav, Container, Badge, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/userApiSlice'
import {logout} from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
//import { Link } from 'react-router-dom'
// import logo from '../assets/logo.png'

const Header = () => {

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApliCall] = useLogoutMutation();
  
  const logoutHandler = async () => {
    try {
      await logoutApliCall().unwrap();
      dispatch(logout());
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

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
                      <Nav.Link ><FaShoppingCart />
                      Cart
                      {cartItems.length > 0 && (
                        <Badge pill bg='success' style={{marginLeft: '5px'}}>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</Badge>
                      )}
                      </Nav.Link>
                    </LinkContainer>
                    { userInfo ? (
                      <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <LinkContainer to='/login'>
                        <Nav.Link><FaUser /> Sign In</Nav.Link>
                      </LinkContainer>
                    )}
                    
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
