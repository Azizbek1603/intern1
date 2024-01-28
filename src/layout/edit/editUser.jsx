import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
function Edit({id}){
    const [userData, setUserData] = useState("")
    const [value, setValue] = useState("")
    const handleEditUser = () => {
        axios(`https://dummyjson.com/users/${id}`, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userData: value
            })
        })
            .then(res => {
                console.log(res);
                if(res.status === 200){
                    toast.success("User edited Successfully")
                }
            })
            .then(console.log);
    }
    return (
        <>
            <select onChange={(e) => setUserData(e.target.value)}>
                <option value="" hidden>Select User Data</option>
                <option value="firstName">Name</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="birthDay">Birthday</option>
                <option value="company.department">Job</option>
            </select>
            <input type="text" placeholder='Enter value' onChange={(e) => setValue(e.target.value)} />
            <button onClick={() => handleEditUser()}>Save</button>
        </>
    )
}

export default Edit