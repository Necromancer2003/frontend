import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home=()=>{
    const [products,setProducts]=useState(null);
    useEffect(()=>{
        getProducts();
    },[])

    const navigate = useNavigate();

    const getProducts= async()=>{
        try{
        const response = await axios.get('http://localhost:8080/productss');
        setProducts(response.data);
        }catch(error){
            if(error.response.status===401){
                navigate("/login");
            }
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
                <li className="nav-item px-2"><Link to ="/"><button className="btn btn-light">Home</button></Link></li>
                <li className="nav-item px-2"><Link to ="/checkout"><button className="btn btn-primary">Checkout</button></Link></li>
                <li className="nav-item px-2"><Link to ="/orders"><button className="btn btn-primary">Orders</button></Link></li>
                <li className="nav-item px-2"><Link to ="/categories"><button className="btn btn-primary">Categories</button></Link></li>
                <li className="nav-item px-2"><Link to ="/products"><button className="btn btn-primary">Products</button></Link></li>
                <li className="nav-item px-2"><Link to ="/users"><button className="btn btn-primary">Users</button></Link></li>

                <li className="nav-item px-5">
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </li>    
                </ul>
    </div>
            </div>
        </nav>
            <h1 className="mb-4 mt-1">Available Products</h1> 
            <div class="row">
                    {products && products.map(product=>{
 
                        if (product.qty > 0) {
                            return (
                                <div class="col-sm-2">    
                            <div className="card card-body py-2 " key={product.id}>
                                <h5 class="card-title card card-body py-2 bg-info text-white">{product.name}</h5>
                                <h6 className="card-text px-4">Stock: {product.qty}</h6>
                                <h6 className="card-text px-4">Rs: {product.price}</h6>
                            </div></div>
                            );
                        } else {
                            return (
                                <div class="col-sm-2">    
                            <div className="card card-body py-2" key={product.id}>
                                <h5 class="card-title card card-body py-2 bg-info text-white">{product.name}</h5>
                                <h6 className="card-text px-4 text-danger">Out of Stock</h6>
                                <h6 className="card-text px-4">Rs: {product.price}</h6>
                            </div></div>
                            );
                        }
                        })}</div>      

            
        </>
    )
}
export default Home;