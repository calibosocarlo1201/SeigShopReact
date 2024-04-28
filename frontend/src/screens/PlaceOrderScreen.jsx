import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link} from 'react-router-dom'
import CheckouSteps from '../components/CheckoutSteps'
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap'
import {toast} from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import { clearCartItems } from '../slices/cartSlice'

const PlaceOrderScreen = () => {

    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [createOrder, { isLoading, error}] = useCreateOrderMutation();

    useEffect(() => {
        if(!cart.shippingAddress.address){
            navigate('/shipping');
        }else if(!cart.paymentMethod){
            navigate('/payment');
        }
    } , [cart.shippingAddress.address, cart.paymentMethod, navigate])

    const placeOrderHandler = async () => {
      try {
        const res = await createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemPrice: cart.itemPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice
        }).unwrap();

        dispatch(clearCartItems());
        navigate(`/order/${res._id}`);
      } catch (error) {
        toast.error(error);
      } 
    }

  return (
    <>
      <CheckouSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>

          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Address:</strong></p>
              {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode} {cart.shippingAddress.country}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p><strong>Method:</strong> {cart.paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup>
                  {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}><Image src={item.image} alt={item.name} fluid></Image></Col>
                          <Col><Link to={`/product/${item._id}`}>{item.name}</Link></Col>
                          <Col md={4}>{item.qty} x ${item.price} = ${item.qty * item.price}</Col>
                        </Row>
                      </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>

        </Col>
        <Col md={4}>
          <Card>
            <ListGroup varian='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items: </Col>
                  <Col>${cart.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              { error && <Message variant='danger'>{error}</Message>}
              <ListGroup.Item>
                <Button className='btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrderHandler} >Place Order</Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen