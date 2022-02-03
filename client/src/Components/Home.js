import { useContext } from 'react'
import cookie from 'react-cookies'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
export default function Home(){
    const {user, setUser} = useContext(AuthContext)
    const handleClick = () => {
        cookie.remove('userId')
        setUser(null)
    }
    return (
        <div>
            This is the homepage.
            <br/>
            <Link to='/prompt'>Problem 1</Link><br/>
            <button type="button" onClick={handleClick}>Logout</button>
        </div>
    )
}