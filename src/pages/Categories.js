import axios from "axios";
import {useState, useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";

import Home from "./Home";

const Categories=()=>{
    const[categories,setCategories]= useState(null);
    const[catname,setCatname]= useState(null);

    useEffect(()=>{
        getCategories();
    },[])

    const navigate =useNavigate();

    const getCategories=async()=>{

        try{
            const response =await axios.get("http://localhost:8080/categoriesal");
            setCategories(response.data);
        }catch(error){
            if(error.response.status===401){
                navigate("/login");
            }
        }        
    }

    const hadlecatName=(event)=>{
        setCatname(event.target.value);
    }

    const hadleSubmit= async (event)=>{
        event.preventDefault();

        const token = localStorage.getItem("token");
            
        axios.defaults.headers.common['Authorization'] =`Bearer ${token}`;

        const data={
            "name":catname,
        }

        const response =await axios.post("http://localhost:8080/categories",data);
        setCategories([...categories,data]);

        document.getElementById('catn').value = null;

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
                <li className="nav-item px-2"><Link to ="/categories"><button className="btn btn-light">Categories</button></Link></li>
                <li className="nav-item px-2"><Link to ="/products"><button className="btn btn-primary">Products</button></Link></li>
                <li className="nav-item px-2"><Link to ="/users"><button className="btn btn-primary">Users</button></Link></li>

                <li className="nav-item px-5">

                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </li>    
                </ul>
    </div>
            </div>
        </nav>

        <h1>Categories</h1>
        <div className="row">
                <div className="col-md-7">
                    <div className="row">
                        {categories && categories.map(categories=>(
                            <div class="col-sm-3 py-2">
                                <div class="card ">
                                    <div class="card-body py-2">
                                        <div className="product-box px-2 py-2" key={categories.id}>
                                            <h5 className="card-title">{categories.name}</h5>
                                            <a href={`/category/${categories.id}`} class="btn btn-primary">Show Items</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

                <div className="col-md-4">
                <form onSubmit={hadleSubmit}>
                <div className="form-group mb-1">
                    <label>Category Name</label>
                    <input className="form-control" type="text" id="catn" required onChange={hadlecatName}></input>
                </div>
                <div className="py-3"><button className="btn btn-primary" type="submit">Save Category</button></div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Categories;