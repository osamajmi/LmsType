import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

const Home = () => {

    const [studentData , setStudentData] = React.useState([]);
    const [count , setCount] = React.useState(0);


    const studentsData = ()=>{

        axios.get("https://lmstype.onrender.com/Users")
        .then(res=>{
          setStudentData(res.data)
          setCount(res.data.length)
        //   console.log(res.data)
        })
          
  
     }

    const deleteStudent = (id) => {

       axios.delete(`https://lmstype.onrender.com/User/${id}`)
       .then((response) => {
        toast.success(" ✔ Student deleted successfully");
        console.log(response.data);
        studentsData();
       
       })
       .catch((error) => {
        console.error(error);
       })
    // alert(id)
      
       
        
    }
    

 


   useEffect(() => {

    studentsData();
   
   }, []);

    return (
        < >
        <h1 className='d-none d-md-block'>Welcome to Dashboard</h1>

       
        <div className="row">
            <div className="col-md-3">
                <div className="stat-card">
                    <div className="stat-text">Total Students</div>
                    <div className="stat-digit">{count}</div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stat-card">
                    <div className="stat-text">Total Teachers</div>
                    <div className="stat-digit">50</div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stat-card">
                    <div className="stat-text">Active Courses</div>
                    <div className="stat-digit">20</div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stat-card">
                    <div className="stat-text">New Enrollments</div>
                    <div className="stat-digit">30</div>
                </div>
            </div>
        </div>

       
        <div className="card">
            <div className="card-header">
                Recent Activity
            </div>
            <div className="card-body">
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>User ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                      {
                              studentData.map((data, index) => (
                                <tr key={data.id}>
                                  <td>{index+1}</td> 
                                  <td>{data.name}</td>
                                  <td><img src={`https://lmstype.onrender.com/uploads/${data.profileImage}`} alt="User"/></td>
                                  <td>{data.userId}</td>
                                  <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(data.userId)}>Delete</button>
                                  </td>
                                </tr>
                              ))
                      }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}

export default Home;
