import React ,{useEffect} from 'react'
import './OwnerProductBoxes.css'
import ReactStars from "react-rating-stars-component";
import App from '../App'
import ReactDOM from 'react-dom';
import axios from 'axios';
import OwnerApp from '../OwnerApp';
import ViewProduct from './ViewProduct';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import OwnerViewProduct from './OwnerViewProduct';
const ProductBoxes=(props)=>{
    console.log(props)
    const user=props.user;
  const userId=props.userId;

  const viewProduct=(ImageUrl)=>{
    
    ReactDOM.render( 
        
        <OwnerViewProduct user={props.user} url={ImageUrl}  userId={props.userId}/>
        
  ,document.getElementById('root'))
  }
    
        
        
      
  return (<>
  
      {
          console.log(props.urls.length)
      }
      <div className="ro center">
         { props.urls.map((i,j)=>{
              
              return (<><div class="cent">
                  <p>{i.Name}</p>
                  <img src={i.ImageUrl} alt={j+1}  width="200px" height="300px"/>
                  <div>
                      <span><ReactStars
                    count={5}
                    isHalf={true}
                    size={24}
                    edit={false}
                    activeColor="#ffd700"
                    value={i.Rating/i.RatingCount}
                    /></span>
                    <span>{i.Rating/i.RatingCount}</span>
                  </div>
                  
                  <div>
                      <button className='button-24 mar' onClick={()=>viewProduct(i)}>
                          View/update Product
                      </button>
                     
                  </div>
                  </div>
              </>)
              
              })
      }
      </div>

     </>
  );
}

export default ProductBoxes;
