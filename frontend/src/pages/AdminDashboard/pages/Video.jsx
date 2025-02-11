import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import  * as yup from 'yup';

const Video = () => {

 const [categoires ,setCetogories] = React.useState([]);
 const [videos ,setVideos] = React.useState([]);

 const [getdata , set_id] = React.useState([]);
 const [msgerr, setmsg] = React.useState('');
 const [danger,setdanger] = React.useState('');


const CatData = ()=>{
    axios.get("https://lmstype.onrender.com/categories")
   .then((response)=>{
      
    
      setCetogories([{cat_id:-1 ,name : "Select categori"},...response.data]);

    // console.log(response.data)
   })
   .catch((error)=>{
    console.log(error);

   })
   videoData();
}

const videoData = ()=>{

    axios.get('https://lmstype.onrender.com/allVideo')
    .then((response)=>{
        setVideos(response.data);
        set_id(response.data)

    })
      
}

const isValidId = (e)=>{
    var id  = parseInt(e.target.value)
     
    for (const value of getdata) {
        
        if(value.cat_id === id){
              setmsg("id already exits")
              setdanger("text-danger")
              break;
        }
        else{
          setmsg("")
          setdanger("")
        }

      
      
    }

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
                file: null, 
                cat_id: null, 
            },
            validationSchema: yup.object({
                id: yup.number().required("Please enter id"),
                title: yup.string().required("Please enter title"),
                description: yup.string().required("Please enter description"),
                file: yup.mixed().required("Please enter file"), 
                cat_id: yup.number().required("Please enter category").nullable(), 
            }),
            onSubmit: (values) => {
                // console.log(values); 
              
                const formData = new FormData();
                formData.append("id", values.id);
                formData.append("title", values.title);
                formData.append("description", values.description);
                formData.append("videoFile", values.file);
                formData.append("cat_id", values.cat_id);
        
               
                axios.post("https://lmstype.onrender.com/addVideo", formData)
                    .then((response) => {
                        // console.log(response.data);
                        toast.success("✔ Add Successful!");
                        videoData();
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            },
        });
        

    function handelDelete(item){
        axios.delete(`https://lmstype.onrender.com/deleteVid/${item}`)
        .then((response)=>{
            // console.log(response.data);
             toast.success("Delete Successful!");
            videoData();
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0]; 
        formik.setFieldValue("file", file);  
    };


    const handleCatchange = (event) => {
        const value = event.target.value ? parseInt(event.target.value) : null;
        formik.setFieldValue("cat_id",value)

    }
    return (
        <div>
           
          

<div className="container mt-3">
        <form onSubmit={formik.handleSubmit}>
                <div className="row g-3 align-items-center">
                
                    <div className="col-md-6">
                        <label htmlFor="id" className="form-label fw-bold">ID:</label>
                        <input type="number" id="id" name="id" className="form-control" placeholder="Enter ID" onKeyUp={isValidId} onChange={formik.handleChange}/>
                        <span className='text-danger'>{formik.errors.id}</span>
                        <span className={danger}>{msgerr}</span>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label fw-bold">Course</label>
                        <input type="text" id="title" name="title" className="form-control" placeholder="Enter Title"  onChange={formik.handleChange}/>
                        <span className='text-danger'>{formik.errors.title}</span>
                    </div>
                </div>
                <div className="row g-3 align-items-center">
                
                <div className="col-md-6 mt-4">
                    <label htmlFor="description" className="form-label fw-bold">Teacher</label>
                    <input type="text" id="description" name="description" className="form-control" placeholder="Enter description"  onChange={formik.handleChange}/>
                    <span className='text-danger'>{formik.errors.description}</span>
                </div>
                <div className="col-md-6">
                    <label htmlFor="file" className="form-label fw-bold">file:</label>
                    <input type="file" id="file" name="file" className="form-control" placeholder="Enter file" onChange={handleFileChange} />
                    <span className='text-danger'>{formik.errors.file}</span>
                </div>
            </div>
            <div className="row g-3 align-items-center">
                
                <div className="col-md-6">
                    <label htmlFor="id" className="form-label fw-bold"> Select you Category:</label>
                    <select name="cat_id" id="" className='form-select' onChange={handleCatchange}>
                        {
                                categoires.map(item=><option key={item.cat_id} value={item.cat_id}>{item.name}</option>)
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
                        <th>Course</th>
                        <th>Teacher</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {
                        videos.map((item,index)=><tr key={item.id}>
                            <td>{index+1}</td>
                            <td>
                            <video controls width="200" height="150">
                                <source src={`https://lmstype.onrender.com/uploads/video/${item.videoFile}`} type="video/mp4"/>
                               
                            </video>

                            </td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.cat_id}</td>
                            <td>  <button className="btn btn-danger btn-sm" onClick={()=>handelDelete(item.id)}>
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
