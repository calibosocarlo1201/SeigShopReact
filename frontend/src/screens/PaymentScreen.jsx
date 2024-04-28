import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../slices/cartSlice'

const PaymentScreen = () => {

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;

    useEffect(() => {
        console.log(cart)
        if(!shippingAddress){
            navigate('/shipping');
        }
    } ,[shippingAddress, navigate, cart]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group >
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' className='my-2' label='PayPal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)} />
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
  )
}

export default PaymentScreen
