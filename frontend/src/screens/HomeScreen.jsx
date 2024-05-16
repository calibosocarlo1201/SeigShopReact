import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';

const HomeScreen = () => {

  const {pageNumber, keyword} = useParams();
  const {data, isLoading, error} = useGetProductsQuery({pageNumber, keyword});

  return (
    <>
      {isLoading ?
        (<Loader />
        ) : error ? (
          <Message>{error?.data?.message || error.error}</Message>
        ) : (
          <>
            <h1>Latest Products</h1>
            <Row>
              {data.products.map((p) => (
                  <Col sm={12} md={6} lg={4} xl={3} key={p._id} >
                      <Product product={p} />
                  </Col>
              ))}
            </Row>
            <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
          </>
        )}
      
    </>
  )
}

export default HomeScreen
