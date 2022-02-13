import { useContext, useEffect } from 'react'
import cookie from 'react-cookies'
import { AuthContext } from '../Context/AuthContext'
import {GoogleLogout} from 'react-google-login'
import Dashboard from './Dashboard'
import { Link, Outlet, useNavigate } from 'react-router-dom'
export default function Home(){
    const {user, setUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        cookie.remove('userId')
        setUser(null)
        navigate('/')
    }

    return (
        <div>
            <div className='bg-lime-700 text-white py-1.5 px-3 align-middle flex justify-between'>
                <Link to='/dashboard' className='text-lg'>Online Compiler</Link>
                <div>
                    <Link to='/' className='mx-4 text-sm hover:text-white'>Profile</Link>
                    <Link to='/' className='mx-4 text-sm hover:text-white'>Rooms</Link>
                    <GoogleLogout
                        render={renderProps => (
                            <button className='mx-2 bg-white text-lime-600 p-1 rounded-sm px-3 text-sm' onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</button>
                        )}
                        clientId={process.env.REACT_APP_CLIENT_ID}
                        onLogoutSuccess={handleLogout}
                    >
                    </GoogleLogout>
                </div>
            </div>
            <Outlet />
        </div>
    )
}