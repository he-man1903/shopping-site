import React ,{useState,useEffect} from 'react'
import './Medicine.css';
import App from '../App'
import './Cart.css'
import Header from './Header';
import ProductBoxes from './ProductBoxes';
import CartProductBoxes from './CartProductBoxes';
import axios from 'axios';
import ReactDOM from 'react-dom';

const Cart=(props)=>{
  const [data,setData]= useState([])
     
    console.log(props)
    useEffect( ()=>{
      axios.post('http://localhost:7000/getCartProducts',{userId:props.userId})
                  .then((res)=>{
                            console.log(res.data)
  
                            setData(res.data)
                            
                            
                  })
    },[])
  return (<>
  {/* <App user={props.user} userId={props.userId}/> */}
  <Header user={props.user} userId={props.userId} />
  <div className='con'>
    <h3>
      Your Cart
    </h3>
    <div >
      
    <CartProductBoxes urls={data} user={props.user} userId={props.userId}/>
    </div>
    </div>
    </>
  );
}

export default Cart;
