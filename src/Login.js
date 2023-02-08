import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setmail] = useState("");
    const [password, setpassword] = useState("");
    const [validation, setvalidation] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/home');
        }
    }, []);

    const loginHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);

        await axios.post('http://127.0.0.1:8000/api/login', formData)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                history.push('/home');
            })
            .catch((error) => {
                setvalidation(error.response.data);
            })
    };

    return (
        <div class="login-page">
            <div class="login-box">
                <div class="card card-outline card-primary">
                    <div class="card-header text-center">
                        <Link to={"/"} class="h1"><b>SIRARM</b></Link>
                    </div>
                    <div class="card-body">
                        <p class="login-box-msg">Sign in to start your session</p>

                        {
                            validation.message && (
                                <div className="alert alert-danger">
                                    {validation.message}
                                </div>
                            )
                        }

                        <form onSubmit={loginHandler} >
                            <div class="input-group mb-3">
                                <input type="email" class="form-control" placeholder="Email" value={email} onChange={(e) => setmail(e.target.value)} />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="password" class="form-control" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div>
    );
}
export default Login;