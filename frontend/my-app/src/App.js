import React ,{useEffect, useState} from 'react'
import './App.css';
import Medicine from'./components/Medicine';
import Stationery from './components/Stationery'
import Groceries from './components/Groceries'
import Clothings from './components/Clothings'
import Profile from './components/Profile';
import Header from './components/Header'
import ReactDOM from 'react-dom';
import axios from 'axios';
import ProductBoxes from './components/OwnerProductBoxes';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route,Routes ,Link} from 'react-router-dom';
import Login from './Login';

const App=(props)=> {
  const [data,setData]=useState([])
  useEffect(async ()=>{
    await axios.get('http://localhost:7000/getallProducts')
    .then((res)=>{
      setData(res.data)
      console.log(res.data)
    })
  },[])
  const user=props.user;
  const userId=props.userId;
  console.log(props)
   
   const medicine=()=>{
    console.log("med")

      ReactDOM.render(
       
       <Medicine user={props.user} userId={props.userId}  />
        ,document.getElementById("root")
      )
}      
   
   const stationery=()=>{
    console.log("stat")
    ReactDOM.render( 
        
      <Stationery user={props.user} userId={props.userId}/>
      
,document.getElementById('root'))
  }
  const clothings=()=>{
    console.log("cloth")
    ReactDOM.render( 
        
      <Clothings user={props.user} userId={props.userId}/>
      
,document.getElementById('root'))
  }
  const groceries=()=>{
     console.log("groceries")
     ReactDOM.render( 
        
      <Groceries user={props.user} userId={props.userId}/>
      
,document.getElementById('root'))
  }
  return (
    <>
    <Header user={user} userId={userId}/>
    <div className="App">
     
    <div className="med button-app" onClick={(medicine)} > 
    Medicine
     
    </div>
    <div className="stat button-app" onClick={stationery}>
      Stationery
    </div>
    <div className="clot button-app" onClick={clothings} >
     Clothings
    </div>
    <div className="groc button-app" onClick={groceries}>
   Groceries
    </div>
    </div>
     
    </>
  );
}

export default App;
