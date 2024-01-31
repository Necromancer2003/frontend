import axios from "axios";
import { useState, useEffect} from "react"
import { Link, useNavigate, useParams } from "react-router-dom";

const Category=()=>{ 
    const params =useParams();
    const [category,setCategory]=useState(null);
    const [products,setProducts]=useState(null);
   
    useEffect(()=>{
        getCategory();
        getProductByCategory();
    },[])

    const navigate = useNavigate();

    const getCategory= async()=>{

        try{
            const response =await axios.get(`http://localhost:8080/categories/${params.id}`);
            setCategory(response.data);
        }catch(error){
            if(error.response.status===401){
                navigate("/login");
            }
        }
    }

    const getProductByCategory=async()=>{

        try{
            const response =await axios.get(`http://localhost:8080/categories/${params.id}/products`);
            setProducts(response.data);
        }catch(error){
            if(error.response.status===401){
                navigate("/login");
            }
        }
    }

    const hadleSubmit=async(event)=>{
        event.preventDefault();

        try{
            const catname = document.getElementById("catname");
            const catnameValue = catname.value;

            const data={
                "name":catnameValue
            }

            const response =await axios.put(`http://localhost:8080/categories/${category.id}`,data);
            getCategory();
            alert("Category Update Successfully")
            navigate(`/category/${category.id}`);
        }catch(error){
            navigate(`/category/${category.id}`);
        }

    }

    const handledelete = async()=>{

        const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/categories/${category.id}`);
      alert("Category Deleted Successfully")
      navigate("/categories");
    } catch (error) {
        alert("Delete All the Items Before Deleting Category")
        console.error("Error:", error);
    }

    };


    return(
        <>
        {category &&
        <h1 className="text-center">{category.name}</h1>
        }
        <div className="row">
        <div className="col-md-7">                
                            <div class="row ">
                            {products && products.map(product=>(
                                
                                <div class="col-sm-3 py-2">
                                    <div class="card ">
                                    <div class="card-body py-2">
                                <div className="product-box px-2 py-2" key={product.id}>
                                <h5 class="card-title">{product.name}</h5>
                                <a href={`/products/${product.id}`} class="btn btn-primary">Edit</a>
                                </div></div></div>
                            </div>
                            ))}
                              </div>
            </div>
            {category &&
        <div className="col-md-4">
            <form onSubmit={hadleSubmit}>
            <div className="form-group mb-1">
                <div><label>Category Name</label></div>
                <div><input className="form-control" type="text" id="catname" defaultValue={category.name}  required ></input></div>
                <div className="py-3"><button className="btn btn-primary col-md-6 " type="submit">Update Category</button></div>
                <div className="py-3"><button className="btn btn-danger col-md-6 " type="button" onClick={handledelete}>Delete Category</button></div>
            </div></form>
        </div>}
            
            </div>
        </>
    )
}
export default Category;