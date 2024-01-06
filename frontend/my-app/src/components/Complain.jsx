import React, { useState } from 'react'
import Header from './Header'
import './Complain.css'
import axios from 'axios'
import App from '../App'
import ReactDOM from 'react-dom';

function Complain(props) {
    console.log(props)
    const [complainData,setComplaindata]=useState("")
    const [email,setEmail]=useState("")
    const getEmail=(e)=>{
        setEmail(e.target.value)
        console.log(email)
    }
    const getComplainData=(e)=>{
             setComplaindata(e.target.value)
             console.log(complainData)
    }

    const registerComplain=async (e)=>{
        e.preventDefault()
        if(complainData!=""){
            await axios.post('http://localhost:7000/registerComplain',{productId:props.product._id,complain:complainData,userId:props.userId,email:email})
            .then((res)=>{
                console.log(res)
                ReactDOM.render(<App user={props.user} userId={props.userId}/>,document.getElementById("root"))
            })
        }
    }
  return (
    <>
       <Header user={props.user} userId={props.userId}/>  
       <div className="container col-md-8 mx-auto border border-3 border-light bg-light margint paddingt nav3">
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div></div>
              <div></div>


        <form >
                   Complain Page for Product: {props.product.Name}
                   <div className="mb-3">
                        
                        <label for="formFile" className="form-label">E-Mail</label>
                        <input type="text" class="form-control" onChange={getEmail}></input>
                    </div>
                    <div className="mb-3">
                        
                        <label for="formFile" className="form-label">Write Complaint</label>
                        <input type="text" class="form-control" onChange={getComplainData}></input>
                    </div>

                   
                    <div className='text-center'>
                        <button type="submit" className="button-24 align-center margint" onClick={registerComplain}>Register Complain</button>
                    </div>
                </form>
                </div>
  
    </>
  )
}

export default Complain