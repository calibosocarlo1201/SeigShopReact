import {Link, useParams, useNavigate} from 'react-router-dom'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useState } from 'react';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductScreen = () => {
    const {id: productId} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1)

    const {data: product, isLoading, error} = useGetProductDetailsQuery(productId);

    const addToCartHandler = () => {
      dispatch(addToCart({...product}, qty ));
      navigate('/cart')
    }

    return (
      <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <Row>
          <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={5}>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</ListGroup.Item>
                  <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                  <ListGroup.Item>
                      <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                  </ListGroup.Item>
                  
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Select as="select" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                      <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                        {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                  </ListGroup.Item>
              </ListGroup>
          </Col>
          <Col md={3}></Col>
        </Row>
      )}
    
    </>
  )
}

export default ProductScreen
