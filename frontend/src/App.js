import React from 'react'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import {Outlet, useLocation} from 'react-router-dom' 
import Footer from './components/Footer'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SearchBox from './components/SearchBox'

const App = () => {

  const url = useLocation();
  const adminUrl = url.pathname.includes('/admin')

  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          {!adminUrl && <SearchBox />}
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
