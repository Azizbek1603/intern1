import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./addPhone.scss"
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

export default function AddPhone(props) {
    const [ newPhone, setNewPhone ] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const handleNewPhone = () => {
        console.log(newPhone);
        handleClose()
    }
  return (
    <div>
      <Button onClick={handleOpen}>+</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Phone Number
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input type="number" className='new-phone' placeholder='Enter new number' onChange={(e) => setNewPhone(e.target.value)}/>
            <button className='new-phone__save' onClick={() => handleNewPhone()}>Save</button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
