import React ,{useEffect} from 'react'
import './ProductBoxes.css'
import ReactStars from "react-rating-stars-component";
import App from '../App'
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {Card,ListGroup,ListGroupItem} from 'react-bootstrap'
import ReactDOM from 'react-dom';
import axios from 'axios';
import ViewProduct from './ViewProduct';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const ProductBoxes=(props)=>{
    console.log(props)
    const user=props.user;
  const userId=props.userId;

  const viewProduct=async (ImageUrl)=>{
   await axios.post('http://localhost:7000/getUserName',{productId:ImageUrl._id})
   .then((res)=>{
     console.log(res.data)
    ReactDOM.render( 
        
      <ViewProduct user={props.user} url={ImageUrl} userName={res.data}  userId={props.userId}/>
      
      ,document.getElementById('root')) 
   })
       
   
   
  }
    const addToCart=async (e)=>{
        console.log(e.target.value)
        if(props.userId){
            await axios.post('http://localhost:7000/addToCart',{userId:userId,productId:e.target.value})
            .then((res)=>{
                console.log(res)
            })
            alert("added to cart")
        }
          else if(props.userId===undefined){
              alert("Login First")
          }
           
        
        
        //console.log(e.target.value)
        
    }

  return (<>
      {
          console.log(props.urls.length)
      }<div>
        <div class="ro center">
          {props.urls.map((i,j)=>{
              
              return (<><div class="cent">
                  <img src={i.ImageUrl} alt={j+1}  width="200px" height="300px"/>
                  <h5>{i.Name}</h5>
                  <div className='side'>
                      <span ><ReactStars
                    count={5}
                    isHalf={true}
                    size={24}
                    edit={false}
                    activeColor="#ffd700"
                    value={i.Rating/i.RatingCount}
                    /></span>
                    <div className='price'>${i.Price}</div>
                  </div>
                  
                  <div class="details">
                      <div className='view'><VisibilityIcon onClick={()=>viewProduct(i)}/>
                      </div>
                      <div >
                      <button className='button-24' value={i._id} onClick={addToCart}>Add to Cart</button>
                      </div>
                      
                  </div>
                  </div>
                  
              </>)
              
              })
      }
      </div>
    </div>
     </>
  );
}

export default ProductBoxes;
