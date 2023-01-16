import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import { useContext } from 'react'
import AuthContext from './store/authContext'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header'
import Home from './components/Home'
import Auth from './components/Auth'
import Form from './components/Form'
import Profile from './components/Profile'





const App = () => {


  const authCtx = useContext(AuthContext)


  return (

    //creates a set of routes to be used in the app. It is using JS ternary operator to render different components based on if a token exists in the AuthContext or not. If they're authenticated, the right part will be rendered to each route. IF no authentication is found, the user will be redirected to the authentication page. 
  
  
    <div className='app'>
        <ToastContainer 
        position='top-center'
        autoClose={1500}
        transition={Zoom}
        />
     
      <Header/>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={!authCtx.token ? <Auth/> : <Navigate to='/'/>}/>
        <Route path='/form' element={authCtx.token ? <Form/> : <Navigate to='/auth'/>}/>
        <Route path='/profile' element={authCtx.token ?<Profile/> : <Navigate to='/auth'/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
  
    </div>
  )
}

export default App
