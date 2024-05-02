import React from 'react'
import { useGetProductsQuery, useCreateProductMutation } from '../../slices/productsApiSlice'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import {toast} from 'react-toastify'

const ProductListScreen = () => {

    const {data: products, isLoading, error, refetch} = useGetProductsQuery();

    const [createProduct, {isLoading: loadingCreateProduct, error: errCreateProduct}] = useCreateProductMutation();

    const handleCreateProduct = async () => { 
        try {
            const { data } = await createProduct();
            console.log(data);
            refetch();
            toast.success('Product created successfully');
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }

    return (
        <>
            <Row>
                <Col><h1>Products</h1></Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3' onClick={handleCreateProduct}><FaEdit /> Create Product</Button>
                </Col>
            </Row>
            {loadingCreateProduct && <Loader />}
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.length === 0 ? (
                            <tr><td colSpan={6}></td></tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`} ><Button variant='light' className='btn-sm mx-2'><FaEdit /></Button></LinkContainer>
                                        <Button variant='light' className='btn-sm'><FaTrash /></Button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    )
}

export default ProductListScreen