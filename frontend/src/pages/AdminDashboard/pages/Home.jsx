import axios from 'axios';
import React, { useCallback, useEffect } from 'react';

const Home = () => {

    const [studentData , setStudentData] = React.useState([]);
    const [count , setCount] = React.useState(0);
    const deleteStudent = async (id) => {

       
        
        try{
            const res = await axios.delete(`https://127.0.0.1:5000/User/${id}`)
            console.log(res.data);
            
           
        }
        catch(error){
            console.log(error);
        }

    }

   const studentsData = useCallback( async ()=>{

        const data = await axios.get("http://127.0.0.1:5000/Users")
        setStudentData(data.data)
        setCount(data.data.length)

   },[])


   useEffect(() => {
    studentsData();
   
   }, [studentsData]);

    return (
        < >
        <h1>Welcome to Dashboard</h1>

       
        <div class="row">
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-text">Total Students</div>
                    <div class="stat-digit">{count}</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-text">Total Teachers</div>
                    <div class="stat-digit">50</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-text">Active Courses</div>
                    <div class="stat-digit">20</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-text">New Enrollments</div>
                    <div class="stat-digit">30</div>
                </div>
            </div>
        </div>

       
        <div class="card">
            <div class="card-header">
                Recent Activity
            </div>
            <div class="card-body">
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
                                studentData.map(data=>
                                <tr key={data.id}>
                                    <td>{count-1}</td>
                                    <td>{data.name}</td>
                                    <td><img src={`http://127.0.0.1:5000/uploads/${data.profileImage}`} alt="User"/></td>
                                    <td>{data.userId}</td>
                                    <td><button class="btn btn-danger btn-sm" onClick={() => deleteStudent(data.id)}>Delete</button></td>
                                </tr>)
                      }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}

export default Home;
