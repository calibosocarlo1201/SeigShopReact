import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link} from 'react-router-dom'
import CheckouSteps from '../components/CheckoutSteps'
import { Col, Row } from 'react-bootstrap'

const PlaceOrderScreen = () => {

    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate()
    useEffect(() => {
        if(!cart.shippingAddress.address){
            navigate('/shipping');
        }else if(!cart.paymentMethod){
            navigate('/payment');
        }
    } , [cart.shippingAddress.address, cart.paymentMethod, navigate])

  return (
    <>
      <CheckouSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>Column</Col>
        <Col md={4}>Column</Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
