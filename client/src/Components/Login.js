import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
import GoogleLogin from "react-google-login"
const cookie = require('react-cookies')

export default function Login(){
    const navigate = useNavigate()
    const [data, setData] = useState({
        id: '',
        password: ''
    })
    const {user, setUser} = useContext(AuthContext)
    const responseGoogle = (res) => {
        axios
        .post('/user', {
            googleId: res.googleId,
            name: res.Du.tf,
            firstName: res.Du.VX,
            email: res.Du.tv 
        })  
        .then((res) => {
            setUser(res.data)
            cookie.save('userId', res.data.googleId)
            navigate('/dashboard');
        })    
    }

    return(
        <div>
            <p>Login</p>
            <div>
                <GoogleLogin
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    )
}