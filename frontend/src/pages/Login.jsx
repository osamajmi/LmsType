
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useFormik} from 'formik';
import  * as yup from 'yup';
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();
    const formik = useFormik({

        initialValues :{
            userId : '',
            password : '',
        },
        validationSchema : yup.object({
            userId : yup.string().required('Please enter your user id'),
            password : yup.string().required('Please enter your password'),
        
        }),
        onSubmit : (values) => {
            console.log(values);
            axios.post("http://127.0.0.1:5000/Login",values)
            .then(response => {
                console.log(response.data);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role",response.data.role)
                if(response.data.role === "admin"){
                    navigate("/AdminDashBoard")
                }
                if(response.data.role === "student"){
                    navigate("/StudentDashboard")
                }
            })
            .catch(error => {
                console.log(error);
            })
        }

    })
    
    return (
    <div className="authincation ">
        <div className="container-fluid ">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-6">
                    <div className="authincation-content">
                        <div className="row no-gutters">
                            <div className="col-xl-12">
                                <div className="auth-form">
                                    <h4 className="text-center mb-4">Sign in your account</h4>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="form-group mb-3">
                                            <label className='mb-2'><strong>UserId</strong></label>
                                            <input type="text" className="form-control" name='userId' onChange={formik.handleChange}/>
                                            <span className='text-danger'>{formik.errors.userId}</span>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className='mb-2'><strong>Password</strong></label>
                                            <input type="password" className="form-control" name='password' onChange={formik.handleChange}/>
                                            <span className='text-danger'>{formik.errors.password}</span>
                                        </div>
                                        <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                            <div className="form-group">
                                                <div className="form-check ml-2">
                                                    <input className="form-check-input" type="checkbox" id="basic_checkbox_1"/>
                                                    <label className="form-check-label" for="basic_checkbox_1">Remember me</label>
                                                </div>
                                            </div>
                                           
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary btn-block w-100 p-2">Sign me in</button>
                                        </div>
                                    </form>
                                    <div className="new-account mt-3">
                                        <p>Don't have an account? <Link className="text-primary" to={'/Register'}>Sign up</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Login;
