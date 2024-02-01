import axios from "axios";
import {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Product=()=>{
    const[products,setProducts] = useState(null);
    const[categories,setCategories]= useState(null);

    const[name,setName]= useState(null);
    const[price,setPrice]= useState(null);
    const[qty,setQty]= useState(0);
    const[category_id,setCategory_id]= useState(null);

    useEffect(()=>{
        getProducts();
        getCategories();
    },[])

    const navigate =useNavigate();

    const getProducts= async()=>{

        try{
            const response =await axios.get("http://localhost:8080/productss");
            setProducts(response.data);
        }catch(error){
            if(error.response.status===401){
                navigate("/login");
            }
        }
                 
    }

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

    const hadleName=(event)=>{
        setName(event.target.value);
    }

    const hadlePrice=(event)=>{
        setPrice(event.target.value);
    }

    const hadleQty=(event)=>{
        setQty(event.target.value);
    }

    const hadleCategory=(event)=>{
        setCategory_id(event.target.value);
    }

    const hadleSubmit= async (event)=>{
        event.preventDefault();

        const token = localStorage.getItem("token");
            
        axios.defaults.headers.common['Authorization'] =`Bearer ${token}`;

        const data={
            "name":name,
            "price":price,
            "qty":qty,
            "category_id":category_id
        }

        const response =await axios.post("http://localhost:8080/products",data);

        setProducts([...products,data]);

        getProducts();

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
                <li className="nav-item px-2"><Link to ="/products"><button className="btn btn-light">Products</button></Link></li>
                <li className="nav-item px-2"><Link to ="/users"><button className="btn btn-primary">Users</button></Link></li>

                    <li className="nav-item px-5">

                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </li>    
                </ul>
    </div>
            </div>
        </nav>

        <h1>Product</h1>
        <div className="row">
            <div className="col-md-7">                
                            <div class="row ">
                            {products && products.map(product=>(
                                
                                <div class="col-sm-3 py-2">
                                    <div class="card ">
                                    <div class="card-body py-2">
                                <div className="product-box px-2 py-2" key={product.id}>
                                <h5 class="card-title">{product.name}</h5>
                                <a href={`/products/${product.id}`} class="btn btn-info">Edit</a>
                                </div></div></div>
                            </div>
                            ))}
                              </div>
            </div>
            
            <div className="col-md-4">
                <form onSubmit={hadleSubmit}>
                <div className="form-group mb-1">
                    <label>Product Name</label>
                    <input className="form-control" type="text" required onChange={hadleName}></input>
                </div>

                <div className="form-group mb-1">
                    <label>Product price</label>
                    <input className="form-control" type="text" required onChange={hadlePrice}></input>
                </div>

                <div className="form-group mb-1">
                    <label>Product QTY</label>
                    <input className="form-control" type="text" required onChange={hadleQty}></input>
                </div>

                <div className="form-group mb-1">
                    <label>Category</label>
                    <select className="form-control" required  onChange={hadleCategory}>
                        <option>select Category</option>
                        {categories && categories.map((category)=>(
                        <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="py-3"><button className="btn btn-primary" type="submit">Save Product</button></div>
                </form>
            </div>
        </div>
        </>
    )
}
export default Product;