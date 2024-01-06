import React ,{useState,useEffect} from 'react'

import './Groceries.css'
import axios from 'axios';
import ProductBoxes from './ProductBoxes';

import App from '../App'
import ReactDOM from 'react-dom';
const Groceries=(props)=>{
    console.log(props)
    const [data,setData]=useState([])
    useEffect(async ()=>{
      await axios.get('http://localhost:7000/getGroceriesProducts')
                  .then((res)=>{
                            //console.log(res.data)
                            setData(res.data)
               
                  })
    },[])
  return (<>
  <style>{'body { background-color: }'}</style>
  <App user={props.user} userId={props.userId}/>
    <div className='prime'>
     Groceries
    </div>
    <ProductBoxes urls={data} user={props.user} userId={props.userId}/>
    </>
  );
}

export default Groceries;
