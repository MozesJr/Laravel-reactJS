import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function Sidebar() {

    const [user, setUser] = useState({});
    const history = useHistory();
    const token = localStorage.getItem("token");

    const fetchData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.get('http://127.0.0.1:8000/api/datauser')
            .then((response) => {
                setUser(response.data);
            })
    }

    useEffect(() => {
        if (!token) {
            history.push('/');
        }

        fetchData();
    }, []);

    const logoutHandler = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.post('http://127.0.0.1:8000/api/logout')
            .then(() => {
                localStorage.removeItem('token');
                history.push('/');
            });
    };

    return (
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <Link to={"/"} class="brand-link">
                <img src="/assets/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"></img>
                <span class="brand-text font-weight-light">SIRARM</span>
            </Link>
            <div class="sidebar">
                <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                        <img src="/assets/dist/img/user2-160x160.jpg" alt="AdminLTE Logo" class="brand-image img-circle elevation-3 App-logo"></img>
                    </div>
                    <div class="info">
                        <Link to={"/"} class="d-block">{user.name}</Link>
                    </div>
                </div>
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li class="nav-item menu-open">
                            <Link to={"/"} class="nav-link active">
                                <i class="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                </p>
                            </Link>
                        </li>
                        {(() => {
                            if (user.level === 'admin') {
                                return (
                                    <li class="nav-item">
                                        <Link to={"/Tables"} class="nav-link">
                                            <i class="nav-icon fas fa-table"></i>
                                            <p>
                                                Tables
                                            </p>
                                        </Link>
                                    </li>
                                );
                            }
                        })()}
                        <li class="nav-header">EXAMPLES</li>
                        <li class="nav-item">
                            <Link to={"/"} class="nav-link">
                                <i class="nav-icon far fa-calendar-alt"></i>
                                <p>
                                    Calendar
                                    <span class="badge badge-info right">2</span>
                                </p>
                            </Link>
                        </li>
                        <li class="nav-header">Exit</li>
                        <li class="nav-item">
                            <Link onClick={logoutHandler} class="nav-link">
                                <i class="nav-icon fas fa-lock"></i>
                                <p>
                                    Logout
                                </p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
export default Sidebar;