import React ,{useState,useEffect} from 'react'
import './Medicine.css';
import App from '../App'
import './Clothings.css'
import ProductBoxes from './ProductBoxes';

import axios from 'axios';
import ReactDOM from 'react-dom';
const Clothings=(props)=>{
    console.log(props)
    const [data,setData]=useState([])
    useEffect(async ()=>{
      await axios.get('http://localhost:7000/getclothingsProducts')
                  .then((res)=>{
                            //console.log(res.data)
                            setData(res.data)
               })
    },[])
  return (<>
  <App user={props.user} userId={props.userId}/>
  <div class="prime">
     Clothings
    </div>
    <ProductBoxes urls={data} user={props.user} userId={props.userId}/>
    </>
  );
}

export default Clothings;
