import axios from "axios";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Login =()=>{

    const [username, setUsername] =useState("");
    const [password, setPassword] =useState("");
    const navigate=useNavigate();

    const handleUsername=(event)=>{
        setUsername(event.target.value);
    }

    const handlePassword=(event)=>{
        setPassword(event.target.value);
    }

    const handleLogin= async (event)=>{
        event.preventDefault();

        const data={
            "username":username,
            "password":password,
        }

        const response =await axios.post("http://localhost:8080/auth/login",data);

        if(response.status===200){
            localStorage.setItem("token",response.data);
            
            axios.defaults.headers.common['Authorization'] =`Bearer ${response.data}`;

            navigate("/");
        }else{
            console.log("Login errer");
        }

    }

    return( 
        <div className="login-box">
            <div className="text-center mb-5">
                <h1>Login</h1>
            </div>
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <input type="text" className="form-control" onChange={handleUsername} placeholder="Username" required/>
                </div>
                <div className="form-group mb-3">
                    <input type="password" className="form-control" onChange={handlePassword} placeholder="Password" required/>
                </div>
                <div className="py-10">
                <button type="submit" className="btn btn-primary col-md-6">Login</button>
                <Link to ="/register"><button type="register" className="btn btn-primary col-md-6">Register Here</button></Link>
                </div>
                <div className="py-3"><Link to ="/guest_home"><button type="button" className="btn btn-warning col-md-12">Guest</button></Link></div>
                
            </form>
        </div>
    )
}

export default Login;