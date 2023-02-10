import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'

import Header from '../../element/Header';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';

function IndexUser() {

    const [dataUser, setDataUser] = useState([])

    useEffect(() => {
        fetchDataUser()
    }, [])

    const fetchDataUser = async () => {
        await axios.get(`http://127.0.0.1:8000/api/user`).then(({ data }) => {
            setDataUser(data)
        })

    }

    const deleteUser = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
        }).then((result) => {
            return result.isConfirmed
        });

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://127.0.0.1:8000/api/user/destroy/${id}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            fetchDataUser()
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: 'error'
            })
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
                                <h1 class="m-0">Data User</h1>
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
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-header">
                                        <div className='d-flex align-items-center'>
                                            <h2 className="card-title">List Data User</h2>
                                            <Link to={'user/create'} className="btn btn-primary btn-round ml-auto">
                                                <i className='fa fa-plus'></i>
                                                &nbsp; Tambah Data
                                            </Link>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <table id="example1" class="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Nama</th>
                                                    <th>Email</th>
                                                    <th>Level</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    dataUser.length > 0 && (
                                                        dataUser.map((row, key) => (
                                                            <tr key={key}>
                                                                <td>{key + 1}</td>
                                                                <td>{row.name}</td>
                                                                <td>{row.email}</td>
                                                                <td>{row.level}</td>
                                                                <td>
                                                                    <Link to={`/user/edit/${row.id}`} className="btn btn-xs btn-warning"><i className='fa fa-edit'></i> Edit</Link> &nbsp;
                                                                    <Button className="btn btn-xs btn-danger" onClick={() => deleteUser(row.id)}><i className='fa fa-trash mr-1'></i>
                                                                        Hapus
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )
                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Nama</th>
                                                    <th>Email</th>
                                                    <th>Level</th>
                                                    <th>Action</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
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
export default IndexUser;