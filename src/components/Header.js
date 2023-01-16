import {NavLink} from 'react-router-dom'

import logo from '../assets/dm-logo-white.svg'

import { useContext } from 'react'

import AuthContext from '../store/authContext'

import {  toast } from "react-toastify";

const Header = () => {

    const authCtx = useContext(AuthContext)

    const styleActiveLink = ({ isActive }) => {
        return {
            color: isActive ? '#f57145' : ''
        }
    }

    return (
        <header className='header flex-row'>
            <div className='flex-row'>
                <img src={logo} alt='dm-logo' className='logo'/>
                <h2>Social Mountain</h2>
            </div>

            <nav> { authCtx.token ? (
                <ul className='main-nav'>
                    <li>
                        <NavLink style={styleActiveLink} to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink style={styleActiveLink} to='/profile'>Profile</NavLink>
                    </li>
                    <li>
                        <NavLink style={styleActiveLink} to='/form'>Add Post</NavLink>
                    </li>
                    <li>
                    <button className='logout-btn' onClick={() => { authCtx.logout(); toast('You have successfully logged out!'); }}>Logout</button>
                    </li>
                    </ul>
                ) : ( <ul className='main-nav'>
                    <li>
                        <NavLink style={styleActiveLink} to='/'>Home</NavLink>
                    </li>

                    <li>
                        <NavLink style={styleActiveLink} to='/auth'>Login or Register</NavLink>
                    </li>
                </ul>
            )
                }
            </nav>
        </header>
    )
}

export default Header

//could not get toast to work on an onclick. It would either logout or notify. I tried to add a delay but it still did not work so I had to use a standard alert. 