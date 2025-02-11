
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

const Register = () => {

        const [errMsg,setErrmsg] = React.useState('');
        const [userId ,setUserID] = React.useState([])
        const [color ,setcolor] = React.useState('')

        const users =  useCallback( async ()=>{
            try {
                const response = await axios.get('http://localhost:5000/Users')
                return setUserID(response.data);
            }
            catch(err){
                console.log(err);
            }
        },[])

        useEffect(()=>{
            users();
        },[users])

function validateUserID(e){
            
        const userValue =  e.target.value.trim();
        const isValid =  userId.find(user=>user.userId === userValue);

        if(isValid){
           
            setErrmsg('User ID already exists');
            setcolor('text-danger')
           
        }
        else{
           setErrmsg(' user ID is available');
           setcolor('text-success')
        }
              
        }
 function colorBlur(){
    setcolor('')
    setErrmsg('');
 }

    const formik = useFormik({
        initialValues: {
            userId: '',
            name: '',
            file: '',
            password: '',
            email: '',
            phone: '',


        },
        validationSchema: yup.object({
            userId: yup.string().required("please enter your user id"),
            name: yup.string().required("please enter your name"),
            file: yup.string().required("please enter your file"),
            password: yup.string().required("please enter your password"),
            email: yup.string().email("please enter your email"),
            phone: yup.string().required("please enter your phone"),


        }),
        onSubmit: async (values) => {

            const formData = new FormData();
            formData.append("userId", values.userId);
            formData.append("name", values.name);
            formData.append("password", values.password);
            formData.append("email", values.email);
            formData.append("phone", values.phone);
            formData.append("file", values.file);
            try{
                const res = await axios.post('http://localhost:5000/registerStd', formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
               if(res.status === 200){
                    alert('Registration Successfull')
                    window.location.href = '/login'

               }
              
            }catch(err){
                console.log(err);
                
            }
          
             
        }
    })

    return (
        <div className="authincation ">
        <div className="container-fluid">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-6">
                    <div className="authincation-content">
                        <div className="row no-gutters">
                            <div className="col-xl-12">
                                <div className="auth-form">
                                    <h4 className="text-center mb-4">Sign up your account</h4>
                                    <form onSubmit={formik.handleSubmit}>
                                       
                                        <div className="form-group mb-3">
                                            <label className='mb-2'><strong>UserId</strong></label>
                                            <input type="text" className="form-control" placeholder="userId" name ="userId" onBlur={colorBlur} onKeyUp={validateUserID} onChange={formik.handleChange}/>
                                            <span className="text-danger">{formik.errors.userId}</span>
                                            <span className={color}>{errMsg}</span>

                                        </div>
                                        <div className="form-group mb-3">
                                            <label className='mb-2'><strong>Name</strong></label>
                                            <input type="text" className="form-control" placeholder="username" name ="name" onChange={formik.handleChange}/>
                                            <span className="text-danger">{formik.errors.name}</span>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className='mb-2'><strong>Profile Pic</strong></label>
                                            <input type="file" className="form-control" name ="file" onChange={formik.handleChange}/>
                                            <span className="text-danger">{formik.errors.file}</span>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className='mb-2'><strong>Password</strong></label>
                                            <input type="password" className="form-control"  name='password'onChange={formik.handleChange}/>
                                            <span className="text-danger">{formik.errors.password}</span>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className='mb-2'><strong>Email</strong></label>
                                            <input type="email" className="form-control" placeholder="hello@example.com" name='email'onChange={formik.handleChange}/>
                                            <span className="text-danger">{formik.errors.email}</span>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className='mb-2'><strong>Phone</strong></label>
                                            <input type="text" className="form-control" placeholder="+91 9191919191" name='phone'onChange={formik.handleChange}/>
                                            <span className="text-danger">{formik.errors.phone}</span>
                                        </div>
                                       
                                        <div className="text-center mt-4 w-100">
                                            <button type="submit" className="btn btn-primary btn-block w-100 p-2">Sign me up</button>
                                        </div>
                                    </form>
                                    <div className="new-account mt-3">
                                        <p>Already have an account? <Link className="text-primary" to={'/Login'} >Sign in</Link></p>
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

export default Register;
