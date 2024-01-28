import { useState, useEffect } from "react"
import "./table.scss"
import axios from "axios"
import { toast } from "react-toastify"
import { MdEdit, MdDelete } from "react-icons/md";
import Modal from '../../modal/Modal';
import AddPhone from "../../helpers/phone/addPhone";
const Table = () => {
    const [data, setData] = useState([])
    const [phone, setPhone] = useState([localStorage.getItem("new") ? localStorage.getItem("new") : []])
    const handleDeleteUser = (id) => {
        axios(`https://dummyjson.com/users/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success("User Deleted Successfully")
                }
            })
    }
    useEffect(() => {
        const handleLoginUser = () => {
            axios("https://dummyjson.com/users")
                .then(response => {
                    setData(response.data.users);
                })
                .catch(error => {
                    console.log(error);
                })
        }
        handleLoginUser()
    }, [])
    const handleAddPhone = (userPhone) => {
        if (!phone.includes(userPhone)) {
            setPhone([...phone, userPhone])
        }
    }
    console.log(phone);
    return (
        <>
            <div className='table'>
                <table>
                    <tbody>
                        <tr className="tr1">
                            <th>ID</th>
                            <th>ФИО водителя</th>
                            <th>Номер телефона</th>
                            <th>Birthday</th>
                            <th>Тип пользователя</th>
                            <th>Email</th>
                            <th>Change</th>
                        </tr>
                        {
                            data?.map((data, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data.firstName + " " + data.lastName}</td>
                                    <td className="phone">
                                        <button className="minus">-</button>
                                        {data.phone}
                                        <div className="plus" onClick={() => handleAddPhone(data.phone)}><AddPhone phone={data.phone} /></div>
                                    </td>
                                    <td>{data.birthDate}</td>
                                    <td>{data.company.department}</td>
                                    <td>{data.email}</td>
                                    <td className="buttons">
                                        <div className="buttonFunc"> <MdEdit /> <Modal id={data.id} /></div>
                                        <button className="buttonFunc" onClick={() => handleDeleteUser(data.id)}><MdDelete />DELETE</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default Table