import React ,{useState,useEffect} from 'react'
import './CartProductBox.css'
import ReactStars from "react-rating-stars-component";
import App from '../App'
import ReactDOM from 'react-dom';
import Checkout from './Checkout';
import axios from 'axios';
import Cart from './Cart.jsx'
import ViewProduct from './ViewProduct';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Button } from 'react-bootstrap';
const CartProductBoxes=(props)=>{
    console.log(props)
    let amount =0
    const [amt,setAmt]=useState([])
    const [quan,setQuan]=useState([])
    const user=props.user;
  const userId=props.userId;
  const [refresh,setRefresh]=useState(0)
  // useEffect(()=>{
  //   ReactDOM.render(
  //     <App user={props.user} userId={props.userId}/>
  // ,document.getElementById('root')
  // )
  // },[refresh])
  const viewProduct=(ImageUrl)=>{
    
    ReactDOM.render( 
        
        <ViewProduct user={props.user} url={ImageUrl}  userId={props.userId}/>
        
  ,document.getElementById('root'))
  }
   const checkOut=async ()=>{
    // alert('Check Out')
    // await axios.post('http://localhost:7000/checkOut',{userId:userId,productId:props.urls})
    //     .then((res)=>{
    //         console.log(res)
    //         ReactDOM.render(
    //             <Checkout urls={props.url} user={props.user} userId={props.userId}/>,document.getElementById("root")
    //         )
    //     }
    //     )
    if(props.urls.length>0){
    ReactDOM.render(
                     <Checkout urls={props.urls} user={props.user} userId={props.userId}/>,document.getElementById("root")
                )
    }else{
      alert("Your Cart is Empty! Please Add some Products")
    }
   }
    const removeFromCart=async (e)=>{
         
            await axios.post('http://localhost:7000/removeFromCart',{userId:userId,productId:e.target.value})
        .then((res)=>{
            console.log(res)
             
                ReactDOM.render(
                  <App user={props.user} userId={props.userId}/>
              ,document.getElementById('root')
              )
         })
        

        
        //console.log(e.target.value)
        
    }
  return (<>
      {
          console.log(props.urls.length)
      }
      {props.urls.map((i,j)=>{
        var temp=Number(i.Price)
        amount=amount+temp
        amt.push(Number(i.Price))
      })}
     
        <div class="ro center">
         {props.urls.map((i,j)=>{
            quan.push(1)
              return (<><div class="cent">
                  <img src={i.ImageUrl} alt={j+1}  width="200px" height="300px"/>
                  <h5>{i.Name}</h5>
                  <div>
                      <span><ReactStars
                    count={5}
                    isHalf={true}
                    size={24}
                    edit={false}
                    activeColor="#ffd700"
                    value={i.Rating/i.RatingCount}
                    /></span>
                    <span>{parseFloat(i.Rating/i.RatingCount).toFixed(2)}</span>
                  </div>
                  {/* <input type='number' value={quan[j]} name="quantity" ></input>
                  */}
                  <div>
                      <button className='button-24 mar' onClick={()=>viewProduct(i)}>
                          View Product
                      </button>
                      <button className='button-24 mar' value={i._id} onClick={removeFromCart}>
                          remove from Cart
                      </button>
                      
                  </div>
                  </div>
                  <div>
    
                      
                  </div>

                    </>)
              
              })
      }
      </div>
      <div className='text-center'>
      <button type="button" className='button-24 mar' onClick={checkOut} >Proceed To Checkout</button>
      </div>
            
     </>
  );
}

export default CartProductBoxes;
