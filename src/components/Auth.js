import {useState} from 'react'
import axios from 'axios'
import { useContext } from 'react'
import AuthContext from '../store/authContext'


 
const Auth = () => {

    //this is a form for registering and logging in users. AuthContext is a state object to store token, expiration time and userId information after successful authentication. 

   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)

   const authCtx = useContext(AuthContext)
 
   const submitHandler = (e) => {

    //Handles the post request sent to the server and calling the login methodd from the AuthContext store to the authentication information after successful authentication.


       e.preventDefault()

       const body = {
        username,
        password
       }

       console.log('submitHandler called - this is the components/auth.js')
       
    //    const baseURL = 'https://socialmtn.devmountain.com'

       axios
       .post(register ? `/register` : `/login` , body)
       console.log(register, 'this is the post request for the register or login.')
       // This is registering true or false correctly. 
    //    .post(register ? `${baseURL}/register` : `${baseURL}/login` , body)

       .then((res) => {
        console.log(res.data, '1')

        authCtx.login(res.data.token, res.data.exp, res.data.userId)
        console.log(res.data, '2')
        // console.log(authCtx)
        // console.log(authCtx.login)
    })
        //Cleares the username and password fields if there is an error in authentication. 
       .catch ((err) => {
        setUsername('')
        setPassword('')
        console.log(err, 'this is at the catch')

        
       })

    
   }

 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
               type='text' //this shows the text
               placeholder='username'
               value={username}
               onChange={(e) => setUsername(e.target.value)}
                   className='form-input'/>

               <input
               type='password' //this puts the dots so you cannot see the password
               placeholder='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
                   className='form-input'/>

               <button className='form-btn'>{register ? 'Sign Up' : 'Login'}</button>
               
           </form>
           <button className='form-btn' onClick={() => setRegister(!register)}>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth