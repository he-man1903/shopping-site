import React, { useState} from "react";
import ReactStars from "react-rating-stars-component";
import ReactDOM from "react-dom";
import OwnerApp from "../OwnerApp";
import axios, { Axios } from "axios";
import { Button } from "react-bootstrap";
import "./OwnerViewProduct.css"

const OwnerViewProduct = (props) => {
  console.log(props);
  const [count, setCount] = useState(props.url.Count);
  const [category, setCategory] = useState(props.url.Category);
  const [price, setPrice] = useState(props.url.Price);
  const [name, setName] = useState(props.url.Name);
  const [picture, setPicture] = useState(props.url.ImageUrl);
  const homePage = () => {
    ReactDOM.render(
      <OwnerApp user={props.user} userId={props.userId} />,
      document.getElementById("root")
    );
  };
  const updateProduct = () => {
    let div01 = document.querySelector(".div-01");
    let div02 = document.querySelector(".div-02");
    div01.style.display = "none";
    setName(props.url.Name);
    setPrice(props.url.Price);
    setCategory(props.url.Category);
    div02.style.display = "block";
  };
  const updateItem = async (e) => {
    
  };
  const saveImg = (e) => {
    setPicture(e.target.files[0]);
    console.log("picture: ", picture);
  };
  const Cat = (e) => {
    setCategory(e.target.value);
  };
  const Price = (e) => {
    setPrice(e.target.value);
  };
  const Count = (e) => {
    setCount(e.target.value);
  };
  const Name = (e) => {
    setName(e.target.value);
  };
const update=async (e)=>{
  e.preventDefault()
  console.log(count+" "+category+" "+price+" "+picture)
  const formData = new FormData()
        
        
        console.log(props.url._id)
        const updateData={name:name,count:count,price:price,productId:props.url._id,category:category}
     await axios.post('http://localhost:7000/updateProduct', updateData)
     .then((res)=>{
       console.log(res)
       ReactDOM.render(<OwnerApp user={props.user} userId={props.userId}/>,document.getElementById('root'))
     })   
}
const deleteProduct=async ()=>{
        await axios.post("http://localhost:7000/deleteProduct",{productId:props.url._id})
        .then((res)=>{
          console.log(res.data)
          ReactDOM.render(
            <OwnerApp user={props.user} userId={props.userId} />,
            document.getElementById("root")
          );})
}
  return (
    <>
      <div className="nav1">
        <div className="ow">
          <h2>Hello, {props.user}</h2>
        </div>
        <button className="button-24 bb" onClick={homePage}>
          Owner Home Page
        </button>
        
        {(() => {
          if (props.user) {
            console.log("logged in");
            return <button className="logout button-24 bb1">Logout</button>;
          } else if (props.user === undefined) {
            console.log("logged out");
            return <button className="login bb1">LogIn/SignIn</button>;
          }
        })()}
      </div>
    
      <div class="ro center div-01">
        <div class="cent">
          {" "}
          <div className="ratingSoFar">
            {" "}
            <div className="cusRating">Customers Ratings So far</div>
            <span>
              <ReactStars
                id="rate0"
                count={5}
                isHalf={true}
                size={24}
                edit={false}
                activeColor="#ffd700"
                value={props.url.Rating / props.url.RatingCount}
              />
            </span>
          </div>
          <img src={props.url.ImageUrl} width="200px" height="300px" />
          <div>Price: {props.url.Price}</div>
          <div>Available Items: {props.url.Count}</div>
          <Button variant='warning' onClick={updateProduct} >Update this product</Button>
          <Button variant="danger" style={{'margin-left':"20px"}} onClick={deleteProduct}> Delete</Button>
          <div></div>
        </div>
        <div>
          <p>Comments</p>
          {
           
          props.url.Comment.map((i, j) => {
            
            return (
              <>
                <div className="commentSec">
                  {(()=>{
                    if(props.userName){
                      return(
                        <>
                         <div>{props.userName[j]}</div>
                  <ReactStars
                    count={5}
                    isHalf={true}
                    size={15}
                    edit={false}
                    activeColor="#ffd700"
                    value={i.rating}
                  />
                  
                  <div>{i.rating}</div>

                  <div>{i.comment}</div>
                        </>
                      )
                    }
                  })}
                 
                </div>
              </>
            );
            })}
            
            </div>
      </div>
      <div className="container col-md-8 mx-auto border border-3 border-light bg-light margint paddingt div-02">
        <form onSubmit={updateItem} encType="multipart/form-data">
          <select
            className="form-select"
            aria-label="Select a catagory"
            name="category"
            value={category}
            required
            onChange={Cat}
          >
            <option selected>Choose Category</option>
            <option value="groc">Groceries</option>
            <option value="cloth">Clothings</option>
            <option value="med">Medicine</option>
            <option value="stat">Stationary</option>
          </select>
          <div className="mb-3">
            <label for="name" className="form-label">
              Name Of The Product
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={Name}
            />
          </div>
          <div className="mb-3">
            <label for="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={Price}
            />
          </div>
          <div className="mb-3">
            <label for="count" className="form-label">
              Count
            </label>
            <input
              type="number"
              className="form-control"
              id="count"
              value={count}
              onChange={Count}
            />
          </div>
          <div className="mb-3">
            <label for="formFile" className="form-label">
              Add Image
            </label>
            <input type="file" class="form-control" onChange={saveImg}></input>
          </div>
          <div className="text-center">
            <button type="submit" className="button-24 align-center margint" onClick={update}>
              Update Product
            </button>
          </div>
        </form>
        <div id="succ" className="text-center">
          <h4 className="text-success">Product Updated!</h4>
        </div>
      </div>
    </>
  )
};

export default OwnerViewProduct;
