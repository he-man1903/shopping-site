import React, { useState } from 'react'
import ReactDom from 'react-dom'
import App from './App'
import OwnerApp from './OwnerApp'
import axios from 'axios'
import './Login.css'
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap'
import { BrowserRouter, Link, Route, Router, useHistory, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Header from './components/Header'
import { ListItemSecondaryAction } from '@material-ui/core'
var r = [];
var user = '', userId = ''
const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [regData, setRegData] = useState({ regEmail: '', regPassword: '', regName: '' })

  const [OwnerLoginData, setOwnerLoginData] = useState({ email: '', password: '' })
  const [StoreRegData, setStoreRegData] = useState({ regEmail: '', regPassword: '', regName: '' })


  const [n, setName] = useState(" ")
  const [customer, setCustomer] = useState(1)


  const getData = (e) => {
    const { name, value } = e.target;
    setLoginData((data) => ({
      ...data, [name]: value
    }))
    console.log(loginData)
  }

  const getOwnerData = (e) => {
    const { name, value } = e.target;
    setOwnerLoginData((data) => ({
      ...data, [name]: value
    }))
    console.log(OwnerLoginData)
  }

  const getRegData = (e) => {
    const { name, value } = e.target;
    setRegData((data) => ({
      ...data, [name]: value
    }))
    console.log(regData)
  }
  const getStoreRegData = (e) => {
    const { name, value } = e.target;
    setStoreRegData((data) => ({
      ...data, [name]: value
    }))
    console.log(StoreRegData)
  }
  const login = async () => {
    console.log(loginData)
    await axios.post('http://localhost:7000/userLoginConf', { loginData })
      .then((res) => {
        console.log(res.data._id)
        user = res.data.Name

        userId = res.data._id
        if(res.data){
        ReactDOM.render(
           
          <App user={res.data.Name} userId={res.data._id} />

          , document.getElementById('root'))
        }
        else{
          alert("Incorrect Email or Password!")
        }
      })
  }
  const ownerLogin = async () => {
    console.log(loginData)
    await axios.post('http://localhost:7000/OwnerLoginConf', { OwnerLoginData })
      .then((res) => {
        console.log(res.data._id)
        user = res.data.Name

        userId = res.data._id
        if(res.data){
        ReactDOM.render(

          <OwnerApp user={res.data.Name} userId={res.data._id} />

          , document.getElementById('root'))
        }
        else{
          alert("Incorrect Email or Password!")
        }
      })
  }
  const getCustomerLogin = () => {
    setCustomer(1)
  }
  const userForgetpass=()=>{
    let e1=document.getElementById("c");
    let e2=document.getElementById("fu");
    e1.style.display='none';
    e2.style.display='block';

    let b1=document.getElementById("cust");
    let b2=document.getElementById("str");
    b2.style.backgroundColor='rgb(255 255 255)';
    b1.style.backgroundColor='#FF4742';
    b2.style.color = '#FF4742';
    b1.style.color ='rgb(255 255 255)';
  }
  const [otp,setOtp]=useState(0)
  const ownerForgetpass=()=>{

  }
  const userResetPassword=async ()=>{
       console.log(Number(otp))
       console.log(rand)
         if(rand==otp){
             await axios.post('http://localhost:7000/resetPassword',{email:loginData.email,password:loginData.password})
             .then((res)=>{
               console.log(res.data)
               alert("password Changed")
               
             })
         }
         else{
          alert('wrong otp')
         }
  }
  const [rand,setRand]=useState(0)
  const getOTPData=(e)=>{
    setOtp(e.target.value)
    console.log(otp)
  }

  const getOTP=async ()=>{
      await axios.post('http://localhost:7000/getOTP',{email:loginData.email})
      .then((res)=>{
        console.log(res.data)
        setRand(res.data.rand)
        
      })
      

  }
  const register = async () => {
    console.log("clicked reg button")
    await axios.post("http://localhost:7000/userRegistration", { regData })
      .then((res) => {
        console.log(res)
      })
      alert("Customer Registered Successfully!")
  }
  const registerOwner = async () => {
    console.log("clicked reg button")
    await axios.post("http://localhost:7000/OwnerRegistration", { StoreRegData })
      .then((res) => {
        console.log(res)
      })
      alert("Seller Registered Successfully!")
  }
  const custo = (e)=>{
    let e1=document.getElementById("c");
    let e2=document.getElementById("s");
    let fu=document.getElementById('fu');
    fu.style.display='none';
    e1.style.display='block';
    e2.style.display='none';
    let b1=document.getElementById("cust");
    let b2=document.getElementById("str");
    b1.style.backgroundColor='rgb(255 255 255)';
    b2.style.backgroundColor='#FF4742';
    b1.style.color = '#FF4742';
    b2.style.color ='rgb(255 255 255)';
  }
  const own =(e)=>{
    let e1=document.getElementById("c");
    let e2=document.getElementById("s");
    let fu=document.getElementById('fu');
    fu.style.display='none';
    e1.style.display='none';
    e2.style.display='block';
    let b1=document.getElementById("cust");
    let b2=document.getElementById("str");
    b2.style.backgroundColor='rgb(255 255 255)';
    b1.style.backgroundColor='#FF4742';
    b2.style.color = '#FF4742';
    b1.style.color ='rgb(255 255 255)';
  }
  const cf=(e)=>{
    let ncb=document.getElementById("ncb");
    let acb=document.getElementById("acb");
    let cr=document.getElementById('cr');
    let cl=document.getElementById('cl');
    if(e.target.id=='ncb'){
      cl.style.display='none';
      cr.style.display='block';
      ncb.style.backgroundColor='rgb(255 255 255)';
      acb.style.backgroundColor='#FF4742';
      ncb.style.color = '#FF4742';
      acb.style.color ='rgb(255 255 255)';
    }else if(e.target.id=='acb'){
      cr.style.display='none';
      cl.style.display='block';
      acb.style.backgroundColor='rgb(255 255 255)';
      ncb.style.backgroundColor='#FF4742';
      acb.style.color = '#FF4742';
      ncb.style.color ='rgb(255 255 255)';
    }
  }
  const sf=(e)=>{
    let nsb=document.getElementById("nsb");
    let asb=document.getElementById("asb");
    let sr=document.getElementById('sr');
    let sl=document.getElementById('sl');
    if(e.target.id=='nsb'){
      sl.style.display='none';
      sr.style.display='block';
      nsb.style.backgroundColor='rgb(255 255 255)';
      asb.style.backgroundColor='#FF4742';
      nsb.style.color = '#FF4742';
      asb.style.color ='rgb(255 255 255)';
    }else if(e.target.id=='asb'){
      sr.style.display='none';
      sl.style.display='block';
      asb.style.backgroundColor='rgb(255 255 255)';
      nsb.style.backgroundColor='#FF4742';
      asb.style.color = '#FF4742';
      nsb.style.color ='rgb(255 255 255)';
    }
  }
  return (<>
  <Header user={undefined} userId={undefined}/>
    <div className='main'>
      <div className='p'>
      <button id='cust' className='button-24 b' onClick={custo}>Customer</button>
      <button id='str' className='button-24 b' onClick={own}>Store Owner</button>
      </div>
      <div className='customer col-md-8 mx-auto' id='fu'>
        <h3><strong>Customer</strong></h3>
        <div className='cont col-md-8 mx-auto'>

          <div>

            <div className='col-md-8 mx-auto'>

              <div className="form-outline mb-4">
                <input placeholder='E-mail' name='email' value={loginData.email} onChange={(e) => getData(e)} type="email" id="form2Example1" className="col-sm-2 form-control" />
                
              </div>
              <div className="form-outline mb-4">
                <input placeholder='new Password' name='password' value={loginData.password} onChange={(e) => getData(e)} type="password" id="form2Example1" className="col-sm-2 form-control" />
                
              </div>

      
               <Button onClick={getOTP}>Get OTP</Button>
              <div className="form-outline mb-4">
                <input placeholder='OTP' name='OTP' value={otp.password} onChange={(e) => getOTPData(e)}  id="form2Example2" className="form-control" />
                {/* <label class="form-label" for="form2Example2">Password</label> */}
              </div>
              <div className="form-outline mb-4">

                <button className="button-24" onClick={userResetPassword}>Reset Password</button>

              </div>

            </div>
          </div>
        </div>
        
      </div>
      <div className='customer col-md-8 mx-auto' id='c'>
        <h3><strong>Customer</strong></h3>
        <button className='button-24 b' id='ncb' onClick={cf}>New Customer</button>
        <button className='button-24 b' id='acb' onClick={cf}>Already A Customer</button>
        <div className='cont col-md-8 mx-auto' id='cl'>

          <div className="login">

            <div className='col-md-8 mx-auto'>

              <div className="form-outline mb-4">
                <input placeholder='E-mail' name='email' value={loginData.email} onChange={(e) => getData(e)} type="email" id="form2Example1" className="col-sm-2 form-control" />
                {/* <label className="form-label" for="form2Example1">Email address</label> */}
              </div>

              <div className="form-outline mb-4">
                <input placeholder='Password' name='password' value={loginData.password} onChange={(e) => getData(e)} type="password" id="form2Example2" className="form-control" />
                {/* <label class="form-label" for="form2Example2">Password</label> */}
              </div>
              <div className="form-outline mb-4">

                <button className="button-24 b" onClick={login}>Login</button>

                <button className="button-24 b" onClick={userForgetpass}>forget password</button>
              </div>

            </div>
          </div>
        </div>
        
        <div className='register col-md-8 mx-auto mb-2' id='cr'>
          <div className='col-md-8 mx-auto'>
            <div className="form-outline mb-4">
              <input placeholder='Email' name="regEmail" value={regData.regEmail} onChange={getRegData} type="email" id="form2Example1" className="col-sm-2 form-control" />
              {/* <label className="form-label" for="form2Example1">Email address</label> */}
            </div>
            <div className="form-outline mb-4">
              <input placeholder='Name' name='regName' value={regData.regName} onChange={getRegData} type="text" id="form2Example1" className="col-sm-2 form-control" />
              {/* <label className="form-label" for="form2Example1">Email address</label> */}
            </div>
            <div className="form-outline mb-4">
              <input placeholder='Password' name='regPassword' value={regData.regPassword} onChange={getRegData} type="password" id="form2Example1" className="col-sm-2 form-control" />
              {/* <label className="form-label" for="form2Example1">Email address</label> */}
            </div>
            <button className="button-24" onClick={register}>Register</button>
          </div>

        </div>
      </div>

      <div className='storeOwner col-md-8 mx-auto' id='s'>
        <h3><strong>Store Owners</strong></h3>
        <button className='button-24 b' id='nsb' onClick={sf}>New Seller</button>
        <button className='button-24 b' id='asb' onClick={sf}>Already A Seller</button>
        <div className='cont col-md-8 mx-auto' id='sl'>

          <div className="login col-md-8 mx-auto">
            <div className="form-outline mb-4">
              <input placeholder='E-mail' name='email' value={OwnerLoginData.email} onChange={(e) => getOwnerData(e)} type="email" id="form2Example1" className="col-sm-2 form-control" />
              {/* <label className="form-label" for="form2Example1">Email address</label> */}
            </div>
            <div className="form-outline mb-4">
              <input placeholder='Password' name='password' value={OwnerLoginData.password} onChange={(e) => getOwnerData(e)}  type="password" id="form2Example1" className="col-sm-2 form-control" />
              {/* <label className="form-label" for="form2Example1">Email address</label> */}
            </div>
                        
            <button className="button-24 b" onClick={ownerLogin}>Login</button>
             
            <button className="button-24 b" onClick={ownerForgetpass}>forget password</button>


          </div>

        </div>
        <div className='register col-md-8 mx-auto mt-3 mb-3' id='sr'>
          <div className="col-md-8 mx-auto">
            <div className="form-outline mb-4">
              <input placeholder='Email' name="regEmail" value={StoreRegData.regEmail} onChange={getStoreRegData} type="email" id="form2Example1" className="col-sm-2 form-control" />
              {/* <label className="form-label" for="form2Example1">Email address</label> */}
            </div>
            <div className="form-outline mb-4">
              <input placeholder='Name' name='regName' value={StoreRegData.regName} onChange={getStoreRegData} type="text" id="form2Example1" className="col-sm-2 form-control" />
              {/* <label className="form-label" for="form2Example1">Email address</label> */}
            </div>
            <div className="form-outline mb-4">
              <input placeholder='Password' name='regPassword' value={StoreRegData.regPassword} onChange={getStoreRegData} type="password" id="form2Example1" className="col-sm-2 form-control" />
              {/* <label className="form-label" for="form2Example1">Email address</label> */}
            </div>

            <button className="button-24" onClick={registerOwner} >Register</button>
          </div>
        </div>
      </div>

    </div>
  </>
  )
}

export default Login
export { user, userId }



/**
 <div className="login">
               
               <input placeholder='E-mail' name='email' value={loginData.email} onChange={(e)=>getData(e)}></input>
               
               <input placeholder='Password' name='password' value={loginData.password} onChange={(e)=>getData(e)}></input>
               <BrowserRouter>
               <Link to='/app'>
               <button onClick={login}>Login</button>
               </Link></BrowserRouter>
            
             </div>
             
              </div>
              <div className='register'>
                <input placeholder='Email' name="regEmail" value={regData.regEmail} onChange={getRegData}></input>
                <input placeholder='Name'  name='regName' value={regData.regName} onChange={getRegData}></input>
                <input placeholder='Password'  name='regPassword' value={regData.regPassword} onChange={getRegData}></input>
                <button onClick={register}>Register</button>
              
              </div> */