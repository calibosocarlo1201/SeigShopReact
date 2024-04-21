import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductScreen = () => {
    const {id: productId} = useParams();
    const [product, setProduct] = useState({});
    
    useEffect(() => {
      const fetrchProduct = async () => {
        const {data} = await axios.get(`/api/products/${productId}`);
        setProduct(data);
      }

      fetrchProduct();
    }, [productId]);

  return (
    <>
    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
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
                <ListGroup.Item>Price: ${product.description}</ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Add to Cart</Button>
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}></Col>
      </Row>
    </>
  )
}

export default ProductScreen
