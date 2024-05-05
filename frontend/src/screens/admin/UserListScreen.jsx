import React from 'react'
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/userApiSlice'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Button, Table } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

const UserListScreen = () => {

    const {data: users, isLoading, error, refetch} = useGetUsersQuery();
    
    const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

    const deleteHandler = async (userId) => {
        if(window.confirm('Are you sure you wan to delete this user?')){
          try {
              const {data: delUser} = await deleteUser(userId);
              toast.success(delUser.message);
              refetch();
          } catch (err) {
            toast.error('Admin cannot be deleted');
          }
    }
  }

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{console.log(error)}</Message> : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name }</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? <FaCheck style={{color: 'green'}} /> : (<FaTimes style={{color: 'red'}} />)}</td>
                <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}><Button variant='light' className='btn-sm' ><FaEdit /></Button></LinkContainer>
                    <Button onClick={() => deleteHandler(user._id)} style={{color: 'white'}} ><FaTrash /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen