import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home=()=>{
    useEffect(()=>{
    },[])

    const navigate = useNavigate();

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
                <li className="nav-item px-2"><Link to ="/"><button className="btn btn-light">Home</button></Link></li>
                <li className="nav-item px-2"><Link to ="/checkout"><button className="btn btn-primary">Checkout</button></Link></li>
                <li className="nav-item px-2"><Link to ="/orders"><button className="btn btn-primary">Orders</button></Link></li>
                <li className="nav-item px-2"><Link to ="/categories"><button className="btn btn-primary">Categories</button></Link></li>
                <li className="nav-item px-2"><Link to ="/products"><button className="btn btn-primary">Products</button></Link></li>
                
                <li className="nav-item px-5">
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </li>    
                </ul>
    </div>
            </div>
        </nav>
            <h1>Home</h1>                   
            
        </>
    )
}
export default Home;