import axios from 'axios';
import { useFormik } from 'formik';
import React, { useCallback, useEffect } from 'react';
import * as yup from 'yup'


const Categories = () => {

   const [categoires ,setCetogories] = React.useState([]);

//    const CatData = useCallback(async ()=>{

//        try{
//              const response = await axios.get('http://localhost:5000/categories')
//              setCetogories(response.data)
//        }
//        catch(err){
//         console.log(err);
//        }
//    },[])

 const CatData = ()=>{
         axios.get("http://localhost:5000/categories")
        .then((response)=>{
            setCetogories(response.data)
        })
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
           const res = await axios.post('http://localhost:5000/addCat',values);
        //    window.location.reload()
            console.log(res)
            CatData()
        }
    })
    const handelDelete =  (cat_id)=>{

       console.log(cat_id)
       axios.delete(`http://localhost:5000/deleteCat/${cat_id}`)
       .then(res => console.log(res.data))
       .catch(err => console.log(err))

       CatData();
      

    }

    return (

        <div>
             <form onSubmit={formik.handleSubmit}>
               

               <div className="d-flex gap-4">
               <div className="mb-3">
                   <label for="category" className='form-label'>Categories ID </label>
                   <input type="text" className="form-control" id="category" name="cat_id" onChange={formik.handleChange}/>
                   <span className='text-danger'>{formik.errors.cat_id}</span>
                </div>

                <div className="mb-3">
                   <label for="category" className='form-label'>Categories Name </label>
                   <input type="text" className="form-control" id="name" name="name" onChange={formik.handleChange}/>
                   <span className='text-danger'>{formik.errors.name}</span>
                </div>

               
               </div>
               

               <button type='submit' className='btn btn-info w-25'>Add Categories</button>
             </form>

             <div className='mt-5'>
                <table class="table table-striped table-hover" style={{"height":'200px', "overflowY":'scroll'}}>
                <thead>
                        <tr>
                            <th>Categories_id</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                </thead> 
                <tbody>
                    {
                            categoires.map(item=>
                                <tr key={item.cat_id}>
                                    <td>{item.cat_id}</td>
                                    <td>{item.name}</td>
                                    <td><span className='bi bi-trash btn-danger' onClick={()=>handelDelete(item.cat_id)}></span></td>
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
