import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Header from '../../element/Header';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';

function UpdateUser() {

    const history = useHistory();

    const { id } = useParams()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [level, setLevel] = useState("")
    const [validationError, setValidationError] = useState({})

    useEffect(() => {
        fetchDataUser()
    }, [])

    const fetchDataUser = async () => {
        await axios.get(`http://127.0.0.1:8000/api/user/show/${id}`).then(({ data }) => {
            const { name, email, level } = data.user
            setName(name)
            setEmail(email)
            setLevel(level)
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: 'success'
            })
        })
    }

    const updateUser = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PATCH');
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('level', level)

        await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`, formData).then(({ data }) => {
            Swal.fire({
                icon: 'success',
                text: data.message
            })
            history.push('/user');
        }).catch(({ response }) => {
            if (response.status === 442) {
                setValidationError(response.data.errors)
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
    }

    return (
        <div class="wrapper">
            <Header />
            <Sidebar />
            <div class="content-wrapper">
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0">Update Data User</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><Link to={"#"}>Home</Link></li>
                                    <li class="breadcrumb-item active">User</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card card-primary">
                                    <div class="card-header">
                                        <h3 class="card-title">Update Data User</h3>
                                    </div>
                                    {
                                        Object.keys(validationError).length > 0 && (
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="alert alert-danger">
                                                        <ul className="mb-0">
                                                            {
                                                                Object.entries(validationError).map(([key, value]) => (
                                                                    <li key={key}>{value}</li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <form onSubmit={updateUser} class="form-horizontal">
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label for="name">Nama User</label>
                                                <input type="text" name="name" class="form-control" id="name" placeholder="Masukan Nama.." value={name} onChange={(event) => {
                                                    setName(event.target.value)
                                                }} required />
                                            </div>
                                            <div class="form-group">
                                                <label for="email">Email User</label>
                                                <input type="email" name="email" class="form-control" id="email" placeholder="Masukan Email.." value={email} onChange={(event) => { setEmail(event.target.value) }} required />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Password</label>
                                                <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Masukan Password.." value={password} onChange={(event) => { setPassword(event.target.value) }} required />
                                            </div>
                                            <div class="form-group">
                                                <label for="level">Level User</label>
                                                <select class="form-control" value={level} onChange={(event) => { setLevel(event.target.value) }} required>
                                                    <option value={''} hidden>-- Pilih Level --</option>
                                                    <option value={'admin'}>Admin</option>
                                                    <option value={'user'}>User</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="card-footer">
                                            <button type="submit" class="btn btn-primary float-right ml-2"><i className='fa fa-save mr-1'></i> Update</button>
                                            <Link to={'/user'} type="submit" class="btn btn-danger float-right mr-2"><i className='fa fa-undo mr-1'></i> Cancel</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
export default UpdateUser;