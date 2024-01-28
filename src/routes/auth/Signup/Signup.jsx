import "../auth.scss"
import authImage from "../../../assets/login.png"
import axios from "axios"
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom";
const Signup = () => {

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleCreateUser = (e) => {
        e.preventDefault();
        axios.post("https://api.escuelajs.co/api/v1/users", {
            "email" : `${email}`,
            "name" : `${name}`,
            "password" : `${password}`,
            "avatar" : `${avatar}`,
            "role": `${role}`
        })
        .then(response => {
            if(response.status === 201){
              toast.success('You registered succesfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                navigate("/login")
            }
        })
          .catch(error => {
            console.log(error);
            toast.error(error.response.data.message[0])
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
                <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Name" required onChange={(e) => setName(e.target.value)} />
                <label htmlFor="image">Image</label>
                    <input type="url" id="image" placeholder="Image url addess" required onChange={(e) => setAvatar(e.target.value)} />
                <label htmlFor="password">Password</label>
                    <input required type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <select onChange={(e) => setRole(e.target.value)}>
                    <option value="" hidden >Select role...</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                </select>
                <button onClick={handleCreateUser}>Sign up</button>
            </form>
            <p>Already have an account? <Link to={"/login"}> Login </Link></p>
        </div>
    </div>
  )
}

export default Signup