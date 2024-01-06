import React, { useEffect } from "react";
import App from "../App";
import { useState } from "react";
import { Button } from "react-bootstrap";
import HomeApp from "../HomeApp";
import "./Profile.css";
import axios from "axios";
import ReactDOM from 'react-dom';
import ProductBoxes from "./ProductBoxes";
import Header from "./Header";
const FormGroup = (props)=>{
  const user = props.user;
  const userId = props.userId;
  
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zip: "",
    state: "",
    country: "",
  });
  const getAddressData = (e) => {
    const { name, value } = e.target;
    setAddress((data) => ({
      ...data,
      [name]: value,
    }));
    console.log(address);
  };
  const addAddressToUser = async () => {
    console.log("button clicked");
    await axios
      .post("http://localhost:7000/addAddressToUser", {
        userId: userId,
        address: address,
      })
      .then((res) => {
        console.log(res.data);
        ReactDOM.render( 
        
          <App user={props.user} userId={props.userId}/>
          
    ,document.getElementById('root'))
      });
  };
  return(
    <div class="form-group">
        <input
          type="street"
          class="form-control"
          id="autocomplete"
          name="street"
          value={address.street}
          placeholder="Street"
          onChange={getAddressData}
        />

        <input
          type="city"
          class="form-control"
          id="inputCity"
          name="city"
          value={address.city}
          placeholder="City"
          onChange={getAddressData}
        />

        <input
          type="state"
          class="form-control"
          id="inputState"
          name="state"
          value={address.state}
          placeholder="State"
          onChange={getAddressData}
        />

        <input
          type="zip"
          class="form-control"
          id="inputZip"
          name="zip"
          value={address.zip}
          placeholder="Zip"
          onChange={getAddressData}
        />

        <input
          type="county"
          class="form-control"
          id="inputCounty"
          name="country"
          value={address.country}
          placeholder="County"
          onChange={getAddressData}
        />

        <div>
          <Button onClick={addAddressToUser}>Add Address</Button>
        </div>
      </div>
  );
}
const AddresssView = (props)=>{
  console.log(props)
  return(<>
      {props.addr.map((i,j)=>{
        return(<><div className="addbox">
          <div>
            {i.Street} {i.City}
          </div>
          <div>{i.State}  {i.Zip}  {i.Country}</div>
          </div>
        </>)
      })}
  </>)
}
const NoOrder=()=>{
  return(<>
  <div className="noOrder">
    No product has been Bought!!!!
  </div>
  </>)
}
const Profile = (props) => {
  console.log("ordered product button clicked")
  const [ordered,setOrdered]= useState([])
  const [savedAddress,setSavedAddress]=useState([])
  useEffect(async ()=>{
   await axios.post('http://localhost:7000/getOrderedData',{userId:props.userId})
    .then((res)=>{
      console.log(res.data)
      setOrdered(res.data)
    })
  },[])
  console.log(props);
  const user = props.user;
  const userId = props.userId;
  const logout = () => {
    ReactDOM.render(<HomeApp />, document.getElementById("root"));
  };
  const addressf =async  () => {
    await axios.post('http://localhost:7000/getAddress',{userId:props.userId})
    .then((res)=>{
      console.log(res.data)
      setSavedAddress(res.data)
       
    })
    let add = document.querySelector('.profileContent');
    ReactDOM.render(<><FormGroup user={props.user} userId={props.userId}/>
                       <AddresssView addr={savedAddress}/>
      </>,add);
  };
  const orderHistory = async () => {
    await axios.post('http://localhost:7000/getOrderedData',{userId:props.userId})
    .then((res)=>{
      
      setOrdered(res.data)
      console.log(res.data)
      console.log(ordered.length)
      let add = document.querySelector('.profileContent');
       if(ordered.length===0){
        ReactDOM.render(<NoOrder/>,add);
      
       }
       else{
      ReactDOM.render(<ProductBoxes user={props.user} userId={props.userId} urls={ordered}/>,add);
       }
    })
      
     
    
    
  };

  return (
    <>
      <Header user={user} userId={userId} />
      <div className="mainProfile">
        <div className="profile">
          <img src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=170667a&w=0&h=kEAA35Eaz8k8A3qAGkuY8OZxpfvn9653gDjQwDHZGPE=" />
          <div>Name-{user}</div>
          <div>userId={userId}</div>
          <div className="but-profile">
          <button className="button-profile" onClick={orderHistory}>Order History</button>
          <button className="button-profile" onClick={addressf}>Address</button>
          <button className="button-profile" onClick={logout}>Logout</button>
          </div>
        </div>
        <div>

        <div className="profileContent"></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
