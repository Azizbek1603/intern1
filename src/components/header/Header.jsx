import React from 'react'
import "./header.scss"
import { Link } from 'react-router-dom'
import AddUser from '../../helpers/addUser/addUser'
const Header = () => {
  return (
    <header>
        <p>All Users</p>
        {
            localStorage.getItem("token") ?
            <div className='btn'><AddUser/></div>
            :
            <Link className='link' to={"/signup"}>Sign up</Link>
        }
    </header>
  )
}

export default Header