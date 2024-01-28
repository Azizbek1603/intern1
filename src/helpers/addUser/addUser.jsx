import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./addUser.scss"
import axios from 'axios';
import { toast } from "react-toastify"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddUser() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleCreateUser = (e) => {
        e.preventDefault();
        axios.post("https://api.escuelajs.co/api/v1/users", {
            "email": `${email}`,
            "name": `${name}`,
            "password": `${password}`,
            "avatar": `${avatar}`,
            "role": `${role}`
        })
            .then(response => {
                console.log(response);
                if (response.status === 201) {
                    toast.success('You registered succesfully');
                    handleClose()
                }
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response.data.message[0])
            })
    }
    return (
        <div>
            <Button onClick={handleOpen} style={{ color: "white" }}>+ Add User</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create User
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <span className='form' type='submit'>
                            <label htmlFor="email">Email</label>
                            <input required type="email" id='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
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
                            <button onClick={handleCreateUser}>Add</button>
                        </span>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}