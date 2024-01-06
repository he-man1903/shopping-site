import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import Login from './Login'
import HomeApp from './HomeApp';
import OwnerProfile from './components/OwnerProfile';
import './components/Header.css'
import axios from 'axios';
import OwnerProductBoxes from './components/OwnerProductBoxes'
import './OwnerApp.css'
const OwnerApp = (props) => {
    var photo = ''
    console.log(props)
    const [data, setData] = useState([]);
    const [count, setCount] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [picture, setPicture] = useState(null);
    console.log(props)
    const logout = () => {

        ReactDOM.render(
            <HomeApp />
            , document.getElementById('root')
        )
    }
    const login = () => {
        ReactDOM.render(
            <Login />
            , document.getElementById('root')
        )
    }

    const cart = () => {
        console.log("open cart")
    }
    const profile = () => {
        console.log("profile")
        let nav2=document.querySelector('.nav2');
        let nav3=document.querySelector('.nav3');
        let nav4=document.querySelector('.nav4');
        nav2.style.display='none';
        nav3.style.display='none';
        nav4.style.display='block';
        
    }
    const addItems = () => {
        console.log("profile")
        let nav2 = document.querySelector('.nav2');
        nav2.style.display = 'none';
        let nav4=document.querySelector('.nav4');
        nav4.style.display='none';
        let nav3 = document.querySelector('.nav3');
        nav3.style.display = 'block';
        // ReactDOM.render(
        // <OwnerApp user={props.user} userId={props.userId}/>
        // ,document.getElementById('root'))
    }
    const Refresh = async () => {
        console.log("refreshed button clicekd")
        let nav3 = document.querySelector('.nav3');
        nav3.style.display = 'none';
        let nav4=document.querySelector('.nav4');
        nav4.style.display='none';
        let nav2 = document.querySelector('.nav2');
        nav2.style.display = 'block';
        await axios.post('http://localhost:7000/getProductImages', { userId: props.userId })
            .then((res) => {
                console.log(res)
                setData(res.data)
            })
    }
    const saveImg = (e) => {
        setPicture(e.target.files[0]);

        console.log('picture: ', picture);
    }
    var refresh = 1;
    const saveItem = async (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append('imageTitle', picture, picture.name)
        formData.append('userId', props.userId)
        formData.append('category', category)
        formData.append('price', price)
        formData.append('count', count)
        formData.append('name', name)
        let succ=document.getElementById('succ');
        succ.style.display='block';
        setTimeout(()=>{
            succ.style.display='none';
        },1000);
        await axios.post('http://localhost:7000/uploadProductImages', formData)
            .then((res) => {
                console.log(res);
                if (refresh == 1) {
                    refresh = 0
                }
                else {
                    refresh = 1
                }
            })
        
    }
    const Cat = (e) => {
        //console.log(e.target.value)
        setCategory(e.target.value)
    }
    const Price = (e) => {
        //console.log(e.target.value)
        setPrice(e.target.value)
    }
    const Count = (e) => {
        //console.log(e.target.value)
        setCount(e.target.value)
    }
    const Name = (e) => {
        //console.log(e.target.value)
        setName(e.target.value)
    }
    return (
        <>
            <div className='nav1' >
                <div className='ow' >
                    <h2>Hello, {props.user}</h2>
                </div>
                <button className="button-24 bb" onClick={addItems}>add items</button>
                <button className="button-24 bb" onClick={Refresh}>View Product</button>
                {/* <button className="button-24 bb" onClick={profile}>My Profile</button> */}
                {(() => {
                    if (props.user) {
                        console.log("logged in")
                        return (
                            <button className='logout button-24 bb1' onClick={logout}>Logout</button>
                        )
                    }
                    else if (props.user === undefined) {
                        console.log("logged out")
                        return (
                            <button className='login bb1' onClick={login}>LogIn/SignIn</button>)
                    }
                })()}
            </div>
            <div className="container col-md-8 mx-auto border border-3 border-light bg-light margint paddingt nav3">
                <form onSubmit={saveItem} encType="multipart/form-data">
                    <select className="form-select" aria-label="Select a catagory" name='category' required onChange={Cat}>
                        <option selected>Choose Category</option>
                        <option value="groc">Groceries</option>
                        <option value="cloth">Clothings</option>
                        <option value="med">Medicine</option>
                        <option value="stat">Stationary</option>
                    </select>
                    <div className="mb-3">
                        <label for="name" className="form-label">Name Of The Product</label>
                        <input type="text" className="form-control" id="name" onChange={Name} />
                    </div>
                    <div className="mb-3">
                        <label for="price" className="form-label">Price</label>
                        <input type="number" className="form-control" id='price' onChange={Price} />
                    </div>
                    <div className="mb-3">
                        <label for="count" className="form-label">Count</label>
                        <input type="number" className="form-control" id="count" onChange={Count} />
                    </div>
                    <div className="mb-3">
                        <label for="formFile" className="form-label">Add Image</label>
                        <input type="file" class="form-control" onChange={saveImg}></input>
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="button-24 align-center margint">Add Product</button>
                    </div>
                </form>
                <div id="succ" className='text-center'><h4 className='text-success'>Product Added!</h4></div>
            </div>
            <div className="nav2">
                <h3>My Products</h3>
                <OwnerProductBoxes urls={data} user={props.user}  userId={props.userId} />
            </div>
            <div className="nav4">
                 <OwnerProfile user={props.user} userId={props.userId} />
            </div>
        </>
    );

}

export default OwnerApp;