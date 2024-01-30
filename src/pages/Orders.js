import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Orders=()=>{

    const [items,setItems]=useState(null);
    const navigate = useNavigate();

    const getALLOrders =async()=>{
        const response =await axios.get('http://localhost:8080/orders');
        setItems(response.data);
    }

    useEffect(()=>{
        getALLOrders();
    },[]);

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
        <h1>Orders</h1>
        <table className="table table-stripped">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Order Time</th>
                            <th>Tax</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map(items=>(
                            <tr key={items.id}>
                                <td>{items.id}</td>
                                <td>{items.ordertime}</td>
                                <td>{items.tax}</td>
                                <td>{items.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </>
        
    )
}

export default Orders;