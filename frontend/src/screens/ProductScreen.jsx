import {Link, useParams, useNavigate} from 'react-router-dom'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useState } from 'react';
import { addToCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'

const ProductScreen = () => {
    const {id: productId} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const {data: product, isLoading, error, refetch} = useGetProductDetailsQuery(productId);

    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation();

    const {userInfo} = useSelector(state => state.auth);

    const addToCartHandler = () => {
      dispatch(addToCart({...product, qty}));
      navigate('/cart');
    }

    const submitReviewHandler = async (e) => {
      e.preventDefault();

      try {
        await createReview({productId, comment, rating}).unwrap();
        refetch();
        toast.success('Review Submitted');
        setRating(0);
        setComment('');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }

    return (
      <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={6}>
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
          </Row>
          <Row className='review'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews.</Message>}
              <ListGroup>
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating}></Rating>
                    <p>{review.createdAt}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a review</h2>
                  {loadingProductReview && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId='rating' className='my-2'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)} >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as='textarea' rows='3' value={comment} onChange={(e) => setComment(e.target.value)} >
                        </Form.Control>
                      </Form.Group>
                      <Button disabled={loadingProductReview} type='submit' variant='primary'>Submit</Button>
                    </Form>
                  ) : (<Message>Please <Link to='/login'>Sign In</Link> to write a review</Message>)}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    
    </>
  )
}

export default ProductScreen
