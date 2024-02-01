import axios from "axios";
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Guest_Home=()=>{
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

    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary nav justify-content-end">
           
                <ul className="nav justify-content-end">
                
                
                <li className="nav-item px-1"><Link to ="/login"><button className="btn btn-primary px-5  py-2">Login</button></Link></li>
                <li className="nav-item px-4"><Link to ="/register"><button className="btn btn-primary px-4  py-2">Register</button></Link></li>
                   
                </ul>
    
           
        </nav>

        <h1>Available Products</h1>
        
            <div class="row py-4 ">
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
export default Guest_Home;