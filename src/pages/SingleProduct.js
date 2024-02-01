import axios from "axios";
import { useEffect, useState } from "react";
import {Link ,useNavigate, useParams } from "react-router-dom";


const SingleProduct=()=>{
    const params=useParams();
    const [product,setProducts]=useState(null);
    const[categories,setCategories]= useState(null);
    const[update,upitem]=useState(null);


    var[category_id,setCategory_id]= useState(null);

    useEffect(()=>{
        getProductById();
        getCategories();
        
    },[])

    const navigate =useNavigate();

    const getProductById= async()=>{
        const token = localStorage.getItem("token");
            
        axios.defaults.headers.common['Authorization'] =`Bearer ${token}`;

        const response =await axios.get(`http://localhost:8080/products/${params.id}`);
        setProducts(response.data);

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

    const hadleCategory=(event)=>{
        setCategory_id(event.target.value);
    }

    const handledelete = async()=>{

        const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/item/${params.id}`);
      alert("Item Deleted Successfully")
      navigate("/products");
    } catch (error) {
        alert("Delete All the Orders Before Deleting Items")
        console.error("Error:", error);
    }

    };

    const hadleSubmit= async (event)=>{
        event.preventDefault();

        try{
        const token = localStorage.getItem("token");
            
        axios.defaults.headers.common['Authorization'] =`Bearer ${token}`;

        const pname = document.getElementById("pname");
        const pnameValue = pname.value;

        const pprice = document.getElementById("pprice");
        const ppriceValue = pprice.value;

        const pstock = document.getElementById("pstock");
        const pstockValue =pstock.value;

        if(category_id===null){
            category_id=product.category.id
        }

        const data={
            "name":pnameValue,
            "price":ppriceValue,
            "qty":pstockValue,
            "category_id":category_id
        }

        const response =await axios.put(`http://localhost:8080/products/${product.id}`,data);
        alert("Item Update Successfully")
        upitem([...update,data]);
        
    }catch(errer){
        navigate(`/products/${product.id}`);
    }

    




    }

    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item px-2"><Link to ="/products"><button className="btn btn-primary">&#60;Back</button></Link></li>
                   
                </ul>
    </div>
            </div>
        </nav>

        {product && 
        <div className="login-box">
        <div className="text-center mb-5">
                <form onSubmit={hadleSubmit}>
                <div className="form-group mb-1">
                    <label>Product Name</label>
                    <input className="form-control" type="text" id="pname" defaultValue={product.name}  required ></input>
                </div>

                <div className="form-group mb-1">
                    <label>Product price</label>
                    <input className="form-control" type="text" id="pprice" defaultValue={product.price}  required ></input>
                </div>

                <div className="form-group mb-1">
                    <label>Product Stock</label>
                    <input className="form-control" type="text" id="pstock" defaultValue={product.qty}  required ></input>
                </div>

                <div className="form-group mb-1 dropdown">
                    <label>Category</label>
                    <select className="form-control dropdown-toggle" required  onChange={hadleCategory}>
                        <option>{product.category.name}</option>
                        {categories && categories.map((category)=>(
                        <option className="dropdown-item" key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="row"><div className="py-3"><button className="btn btn-warning col-md-6" type="submit">Update Item</button></div><div className="py-3"><button className="btn btn-danger col-md-6" type="button" onClick={handledelete}>Delete Item</button></div></div>
                </form>
            </div></div>
            }
        </>
    )
}

export default SingleProduct;