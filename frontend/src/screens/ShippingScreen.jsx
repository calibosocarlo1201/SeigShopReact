import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddres } from '../slices/cartSlice';

const ShippingScreen = () => {

    const { shppingAdress } = useSelector((state) => state.cart);

    const [address, setAddres] = useState(shppingAdress?.address || '' );
    const [city, setCity] = useState(shppingAdress?.city || '');
    const [postalCode, setPostalCode] = useState(shppingAdress?.postalCode || '');
    const [country, setCountry] = useState(shppingAdress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSaveShipping = (e) => {
        //e.prevent.Default();
        dispatch(saveShippingAddres({address, city, postalCode, country}));
        navigate('/payment');
    }

    return (
        <FormContainer>
        <h1>Shipping Info</h1>

        <Form onSubmit={handleSaveShipping} >
            <Form.Group controlId='address' className='my-3'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='Enter Adress' value={address} onChange={(e) => setAddres(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='city' className='my-3'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='postal-code' className='my-3'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type='text' placeholder='Enter Postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='country' className='my-3'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' placeholder='Enter Country' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
            </Form.Group>

            <Button variant='primary' type='submit' className='mt-2' >Continue</Button>
        </Form>
        </FormContainer>
    )
}

export default ShippingScreen
