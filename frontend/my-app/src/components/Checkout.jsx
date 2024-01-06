import React ,{useEffect, useState} from 'react'
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import "./Checkout.css"
import ReactDOM from 'react-dom';
import App from '../App';
import axios from 'axios';
import Header from './Header';
const Checkout=(props)=>{
    var totalamount=0
    const [data,setData]=useState([])
    const [address,setaddress]=useState('')
    const [modeOfPayemnt,setModeOfPayment]=useState('')
    console.log(props)
    useEffect(async ()=>{
        console.log("checkout componet")
        await axios.post('http://localhost:7000/getUserAddress',{userId:props.userId})
        .then((res)=>{
            console.log(res.data)
            setData(res.data)
        })
    },[])
    const showAddress=(e)=>{
        console.log(e.target.value)
        setaddress(e.target.value)
    }
    const modeOfPayment=(e)=>{
        console.log(e.target.value)
        setModeOfPayment(e.target.value)
    }
    const checkOut=async ()=>{
        alert('Check Out')
        console.log('ccc')
        await axios.post('http://localhost:7000/checkOut',{userId:props.userId,productId:props.urls,deliveryAddress:address,modeOfPayemnt:modeOfPayemnt})
            .then((res)=>{
                console.log(res)
                ReactDOM.render(
                    <App urls={props.url} user={props.user} userId={props.userId}/>,document.getElementById("root")
                )
            }
            )
            
           
            
    }
    const [sdkReady, setSdkReady] = useState(false);
    useEffect(() => {
        const addPayPalScript = async () => {
          const { paydata } = await Axios.get("/api/config/paypal");
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src = `https://www.paypal.com/sdk/js?client-id=${paydata}`;
          script.async = true;
          script.onload = () => {
            setSdkReady(true);
          };
          document.body.appendChild(script);
        };
            if (!window.paypal) {
              addPayPalScript();
            } else {
              setSdkReady(true);
            }
        }, [sdkReady]);

    const successPaymentHnadler = () => {
        // TODO: dispatch pay order
      };
  return (<>
  {/* <App user={props.user} userId={props.userId}/> */}
  <Header user={props.user} userId={props.userId} />
  <div className='container con'>
  <div className="card card-body">
   <label htmlFor='address'>Deliver To :</label>
      <select name="address" id="address" >
       {data.map((i,j)=>{
          const address=i.Street+" "+i.Zip+" "+i.City+" "+i.State+" "+i.Country
          return(
              <>    
              <option value={address}>{address}</option>
              </>
          )
      })}

    </select>
    </div>  
    <div className='bot'> 
  <div className='orderSummary card card-body col-2' >
       {props.urls.map((i,j)=>{
           totalamount=totalamount+Number(i.Price)
           return(
               <>
                    <div className='orderSummaryList'>  {j+1}.
                        <div className='ListName'>
                           { i.Name}
                        </div>
                        <div className='ListPrice'>
                            {i.Price}
                        </div>
                    </div>
               </>
           )

       })}
       <hr></hr>
       <div className='orderSummaryList'>
                        <div className='ListName'>
                            Total
                        </div>
                        <div className='ListPrice'>
                            {totalamount}
                        </div>
                    </div>
   </div>
   
    
    
      <div className='col-1 card card-body'>
                    <PayPalButton
                      amount={totalamount}
                      onSuccess={checkOut}
                    ></PayPalButton>
                    </div>
        </div>

    </div>
   


  </>
  );
}

export default Checkout;
