import { Link, useNavigate, useParams } from "react-router-dom"
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../slices/userApiSlice";
import { useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const UserEditScreen = () => {

    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {id: userId} = useParams();

    const {data: user, isLoading, error, refetch} = useGetUserDetailsQuery(userId);
    const [updateUser, {isLoading: loadingUpdate}] = useUpdateUserMutation();
    
    const navigate = useNavigate();

    const updateUserHandler = async (e) => {
      e.preventDefault();
      const updatedUser = {
        userId,
        name,
        email,
        isAdmin
      }

      const result = await updateUser(updatedUser);

      if(result.error){
        toast.error(result.error.message)
      }else{
        toast.success('User Updated Successfully');
        refetch();
        navigate('/admin/user-list');
      }
    }

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

  return (
    <>
      <Link to='/admin/user-list' className="btn btn-light my-3">Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? <Loader /> : error ? (<Message variant='danger'>{error}</Message>) : (
          <Form onSubmit={updateUserHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin" className="my-2">
                <Form.Check type="checkbox" label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary' className="my-2">Submit</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
