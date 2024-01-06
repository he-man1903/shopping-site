import React ,{useState,useEffect} from 'react'
import './Medicine.css';
import App from '../App'
import axios from 'axios';
import './Stationery.css'
import ProductBoxes from './ProductBoxes';

import ReactDOM from 'react-dom';
const Stationery=(props)=>{
    console.log(props)
    const [data,setData]=useState([])
    useEffect(async ()=>{
      await axios.get('http://localhost:7000/getStationaryProducts')
                  .then((res)=>{
                    setData(res.data)
                  })
    },[])
  return (<>
  <App user={props.user} userId={props.userId}/>
    <div className='prime'>
     Stationery
    </div>
    <ProductBoxes urls={data} user={props.user}  userId={props.userId}/>
    </>
  );
}

export default Stationery;
