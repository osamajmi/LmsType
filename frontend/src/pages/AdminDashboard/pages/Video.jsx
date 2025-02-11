import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import  * as yup from 'yup';

const Video = () => {

 const [categoires ,setCetogories] = React.useState([]);
 const [videos ,setVideos] = React.useState([]);


const CatData = ()=>{
    axios.get("http://localhost:5000/categories")
   .then((response)=>{
      
      response.data.unshift("Select categori")
      setCetogories(response.data)
       
    // console.log(response.data)
   })
   .catch((error)=>{
    console.log(error);

   })
   videoData();
}

const videoData = ()=>{

    axios.get('http://localhost:5000/allVideo')
    .then((response)=>{
        setVideos(response.data)
    })
      
}

        useEffect(() => {

          CatData();
          videoData();

        }, []);


        const formik = useFormik({
            initialValues: {
                id: "",
                title: "",
                description: "",
                file:"",
                category:""
                },
            validationSchema : yup.object({

                id: yup.number().required("Please enter id"),
                title: yup.string().required("Please enter title"),
                description: yup.string().required("Please enter description"),
                file: yup.string().required("Please enter file"),
                category: yup.string().required("Please enter category"),

            }),
            onSubmit:(values)=>{
                
                const formData = new FormData();
                formData.append("id", values.id);
                formData.append("title", values.title);
                formData.append("description", values.description);
                formData.append("file", values.file);
                formData.append("category", values.category);
                

                console.log(values);
                axios.post("http://localhost:5000/addVideo",formData)
                .then((response)=>{
                    console.log(response.data);

                })
                videoData()
            }
        
        })

    return (
        <div>
           
          

<div className="container mt-3">
        <form onSubmit={formik.handleSubmit}>
                <div className="row g-3 align-items-center">
                
                    <div className="col-md-6">
                        <label htmlFor="id" className="form-label fw-bold">ID:</label>
                        <input type="number" id="id" name="id" className="form-control" placeholder="Enter ID"  onChange={formik.handleChange}/>
                        <span className='text-danger'>{formik.errors.id}</span>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label fw-bold">Title:</label>
                        <input type="text" id="title" name="title" className="form-control" placeholder="Enter Title"  onChange={formik.handleChange}/>
                        <span className='text-danger'>{formik.errors.title}</span>
                    </div>
                </div>
                <div className="row g-3 align-items-center">
                
                <div className="col-md-6 mt-4">
                    <label htmlFor="description" className="form-label fw-bold">description:</label>
                    <input type="text" id="description" name="description" className="form-control" placeholder="Enter description"  onChange={formik.handleChange}/>
                    <span className='text-danger'>{formik.errors.description}</span>
                </div>
                <div className="col-md-6">
                    <label htmlFor="file" className="form-label fw-bold">file:</label>
                    <input type="file" id="file" name="file" className="form-control" placeholder="Enter file" onChange={formik.handleChange} />
                    <span className='text-danger'>{formik.errors.file}</span>
                </div>
            </div>
            <div className="row g-3 align-items-center">
                
                <div className="col-md-6">
                    <label htmlFor="id" className="form-label fw-bold"> Select you Category:</label>
                    <select name="category" id="" className='form-select' onChange={formik.handleChange}>
                        {
                                categoires.map(item=><option value={item.cat_id}>{item.name}</option>)
                        }
                    </select>
                    <span className='text-danger'>{formik.errors.category}</span>
                </div>
            
                
            </div>
            <div className="col-md-6 mt-2">
                <button type='submit' className='btn btn-primary w-100'>Submit</button>
                </div>
        </form>
        <h1 className='text-center mt-4'> video uploaded </h1>
        <div className="container mt-4">
            <table className="table table-bordered table-striped">
                <thead className="table-dark text-center">
                    <tr>
                        <th>SR No</th>
                        <th>Video</th>
                        <th>title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {
                        videos.map(item=><tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                            <video controls width="200" height="150">
                                <source src={`http://127.0.0.1:5000/uploads/video/${item.videoFile}`} type="video/mp4"/>
                               
                            </video>

                            </td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.name}</td>
                            <td>  <button className="btn btn-danger btn-sm">
                                <i className="bi bi-trash"></i> Delete
                            </button></td>
                        </tr>)
                    }
                   
                </tbody>
            </table>
        </div>

</div>

        </div>
    );
}

export default Video;
