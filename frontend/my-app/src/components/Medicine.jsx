import React ,{useEffect, useState} from 'react'
import './Medicine.css';
import App from '../App'
import ProductBoxes from './ProductBoxes';
import ReactDOM from 'react-dom';
import axios from 'axios';
const Medicine=(props)=>{
  console.log(props)
 
  const [data,setData]=useState([])
  useEffect( ()=>{
    axios.get('http://localhost:7000/getMedicineProducts')
                .then((res)=>{
                          //console.log(res.data)

                          setData(res.data)
                })
  },[])
  return (<>
  <App user={props.user} userId={props.userId}/>
    <div class="prime">
     Medicine
    </div>
   <ProductBoxes urls={data} user={props.user}  userId={props.userId}/>
    <div>
         
    </div>

  </>
  );
}

export default Medicine;
