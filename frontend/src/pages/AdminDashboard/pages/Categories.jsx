import axios from 'axios';
import { useFormik } from 'formik';
import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup'


const Categories = () => {

   const [categoires ,setCetogories] = React.useState([]);
   const [getdata , set_id] = React.useState([]);

   const [msgerr, setmsg] = React.useState('');
   const [danger,setdanger] = React.useState('');

 const CatData = ()=>{
         axios.get("https://lmstype.onrender.com/categories")
        .then((response)=>{
            setCetogories(response.data)
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
    CatData()
    
   }, []);


    const formik = useFormik({
        initialValues: {
            cat_id:'',
            name: ''

        },
        validationSchema : yup.object({
            cat_id: yup.number().required("please enter id "),
            name: yup.string().required("please enter the categories")
        }),
        onSubmit : async (values)=>{
            console.log(values)
           const res = await axios.post('https://lmstype.onrender.com/addCat',values);
        
            toast.success("✔ Add Successful!");
            CatData();
        }
    })
    const handelDelete =  (cat_id)=>{

       console.log(cat_id)
       axios.delete(`https://lmstype.onrender.com/deleteCat/${cat_id}`)
       .then(res =>{console.log(res.data)
         toast.success("Delete Successful!");
         CatData();
       })
       .catch(err => console.log(err))

      
      

    }

    return (

        <div>
             <form onSubmit={formik.handleSubmit}>
               

               <div className="d-flex gap-4">
               <div className="mb-3">
                   <label forhtml="category" className='form-label'>Categories ID </label>
                   <input type="text" className="form-control" id="category" name="cat_id" onKeyUp={isValidId} onChange={formik.handleChange}/>
                   <span className='text-danger'>{formik.errors.cat_id}</span>
                   <span className={danger}>{msgerr}</span>
                </div>

                <div className="mb-3">
                   <label forhtml="category" className='form-label'>Categories Name </label>
                   <input type="text" className="form-control" id="name" name="name"  onChange={formik.handleChange}/>
                   <span className='text-danger'>{formik.errors.name}</span>
                </div>

               
               </div>
               

               <button type='submit' className='btn btn-info w-25'>Add Categories</button>
             </form>

             <div className='mt-5'>
                <table className="table table-striped table-hover" style={{"height":'200px', "overflowY":'scroll'}}>
                <thead>
                        <tr>
                            <th>Srno</th>
                            <th>Categories_id</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                </thead> 
                <tbody>
                    {
                            categoires.map((item,index)=>
                                <tr key={item.cat_id}>
                                    <td>{index+1}</td>
                                    <td>{item.cat_id}</td>
                                    <td>{item.name}</td>
                                    <td><button className='btn btn-danger btn-sm bi bi-trash ' onClick={()=>handelDelete(item.cat_id)}> Delete</button></td>
                                </tr>
                            )

                    }
                </tbody>
                </table>
             </div>

        </div>
    );
}

export default Categories;
