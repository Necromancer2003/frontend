import axios from "axios";
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Users=()=>{
    const [users,setUsers]=useState(null);
    useEffect(()=>{
        getUsers();
    },[])

    const navigate = useNavigate();

    const getUsers= async()=>{
        const token = localStorage.getItem("token");    
        axios.defaults.headers.common['Authorization'] =`Bearer ${token}`;
        try{
        const response = await axios.get('http://localhost:8080/users');
        setUsers(response.data);
        }catch(error){
            
        }
    }

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/login");
    }


    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item px-2"><Link to ="/"><button className="btn btn-primary">Home</button></Link></li>
                <li className="nav-item px-2"><Link to ="/checkout"><button className="btn btn-primary">Checkout</button></Link></li>
                <li className="nav-item px-2"><Link to ="/orders"><button className="btn btn-primary">Orders</button></Link></li>
                <li className="nav-item px-2"><Link to ="/categories"><button className="btn btn-primary">Categories</button></Link></li>
                <li className="nav-item px-2"><Link to ="/products"><button className="btn btn-primary">Products</button></Link></li>
                <li className="nav-item px-2"><Link to ="/users"><button className="btn btn-light">Users</button></Link></li>

                <li className="nav-item px-5">
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </li>    
                </ul>
    </div>
            </div>
        </nav>
            <h1 className="mb-4 mt-1">Users</h1> 
            <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user=>(
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td><button className="btn btn-warning">View</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>   

            
        </>
    )
}
export default Users;