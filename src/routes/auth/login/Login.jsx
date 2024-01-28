import React from 'react'
import "../auth.scss"
import axios from "axios"
import {toast} from "react-toastify";
import authImage from "../../../assets/login.png"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginUser = (e) => {
        e.preventDefault();
        axios.post("https://api.escuelajs.co/api/v1/auth/login", {
            "email" : `${email}`,
            "password" : `${password}`
        })
        .then(response => {
            console.log(response);
            if(response.status === 201){
                toast.success('You logged in succesfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                localStorage.setItem("token", response.data.access_token)
                navigate("/")
            }
        })
          .catch(error => {
            console.log(error);
            toast.error(error.response.data.message)
        })
    }
  return (
    <div className='auth'>
        <img src={authImage} alt="" />
        <div className="authdiv">
            <h1>Вход в систему</h1>
            <form type = 'submit'>
                <label htmlFor="email">Email</label>
                    <input required type="email" id='email'  placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                    <input required type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLoginUser}>Login</button>
            </form>
            <p>Don't have an account? <Link to={"/signup"}> Sign up </Link></p>
        </div>
    </div>
  )
}

export default Login