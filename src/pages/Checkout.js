import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Checkout=()=>{

    const [products,setProducts]=useState(null);
    const [orderProducts,setOrderProducts]=useState([]);
    const [total,setTotal]=useState(0);
    const [tax,setTax]=useState(0);

    const navigate=useNavigate();

    const handlePrint = () => {
        window.print();
      };

    
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

    const createOrder= async()=>{
        const productIds =orderProducts.map(obj=>obj.id);
        const data ={
            item : productIds
        }

        const response = await axios.post('http://localhost:8080/orders',data);
            if(response.status==201){  
                alert("Order Created!");
                setOrderProducts([]);
                setTax(0);
                setTotal(0);
                getProducts();
            }
        

    }

    //const updatedOrderProducts = orderProducts.filter(product => product.id !== productIdToRemove);
    

    useEffect(()=>{
        getProducts();
    },[]);

    useEffect(()=>{
        setTax((total/100)*15);
    },[total]);

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
                <li className="nav-item px-2"><Link to ="/checkout"><button className="btn btn-light">Checkout</button></Link></li>
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

        <div className="container-fluid">
            <div className="row">
                    <div className="col-md-7">
                    <h2>Products</h2>
                    <div class="row ">
                    {products && products.map(product=>{
 
                        if (product.qty > 0) {
                            return (
                                <div class="col-sm-3 py-2">    
                            <div className="card card-body py-2" key={product.id}>
                                <h5 class="card-title ">{product.name}</h5>
                                <p className="card-text px-2 py-2">Rs: {product.price}</p>
                                <button className="btn btn-primary" onClick={() => {
                                
                                setOrderProducts([...orderProducts, product]);

                                
                                let currentTotal = total;
                                currentTotal += product.price;
                                setTotal(currentTotal);
                                }}>Add To Order</button>
                            </div></div>
                            );
                        } else {
                            return null;
                        }
                        })}</div>
                </div>




                <div className="col-md-5">
                <h2>Order</h2>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Product ID</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderProducts && orderProducts.map(product=>(
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                    <thead className="thead-light">
                            <tr>
                                <th colSpan={2}>
                                    Total
                                </th>
                                <th>
                                    {total}
                                </th>
                            </tr>
                            <tr>
                                <th colSpan={2}>
                                    Tax
                                </th>
                                <th>
                                    {tax}
                                </th>
                            </tr>
                    </thead>
                </table>
                <button className="btn btn-secondary"onClick={createOrder}>Complete Order</button>
                </div></div>            
        </div>
        </>
    )
}
export default Checkout;