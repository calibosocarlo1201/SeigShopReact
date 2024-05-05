import { Link, useNavigate, useParams } from "react-router-dom"
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from "../../slices/productsApiSlice";
import { useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductEditScreen = () => {

    const [name,setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const {id: prodId} = useParams()

    const {data: product, isLoading, error} = useGetProductDetailsQuery(prodId);
    const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload}] = useUploadProductImageMutation();
    
    const navigate = useNavigate();

    const updateProductHandler = async (e) => {
      e.preventDefault();
      const updatedProduct = {
        prodId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }

      const result = await updateProduct(updatedProduct);
      if(result.error){
        toast.error(result.error)
      }else{
        toast.success('Product Updated Successfully');
        navigate('/admin/product-list');
      }
    }

    useEffect(() => {
        if(product){
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const uploadFileHandler = async (e) => {
      const formData = new FormData();
      formData.append('image',e.target.files[0]);
      try {
        const res = await uploadProductImage(formData).unwrap()
        toast.success(res.message);
        setImage(res.image);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }

  return (
    <>
      <Link to='/admin/product-list' className="btn btn-light my-3">Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? <Loader /> : error ? (<Message variant='danger'>{error}</Message>) : (
          <Form onSubmit={updateProductHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Image</Form.Label>
              <Form.Control type='text' placeholder="Enter Image url" value={image} onChange={(e) => setImage} ></Form.Control>
              <Form.Control type='file' label='Choose File' onChange={uploadFileHandler} />
            </Form.Group>
            {loadingUpload && <Loader />}

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control type="text" placeholder="Enter Brand" value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control type="number" placeholder="Enter Stock Count" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className="my-2">Submit</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
