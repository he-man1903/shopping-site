const request=require('supertest')
const app=require('../index')

// test("register the customer",async()=>{
//     await request(app).post('/userRegistration')
//     .send({
//         regData:{
//             regEmail:"mm@gmil.com",
//             regName:"Mridul",
//             regPassword:"123"
//         }
//     }).expect(200)
// })

// test("login user",async()=>{
//     await request(app).post('/userLoginConf')
//     .send({
//         loginData:{
//             email:"aa@gmil.com"
//         }
//     }).expect(200)
// })

// test("register Owner",async()=>{
//     await request(app).post('/OwnerRegistration')
//     .send({
//         StoreRegData:{
//             regEmail:"genraltores@gmail.com",
//             regName:"Mayank",
//             regPassword:"123"
//         }
//     }).expect(200)
// })

// test("login owner",async()=>{
//     await request(app).post('/ownerLoginConf')
//     .send({
//         OwnerLoginData:{
//             email:"aa@gmil.com"
//         }
//     }).expect(200)
// })

 
// test("getProductImages",async()=>{
//     await request(app).post('/getProductImages')
//     .send({
//         userId:"123"
//     }).expect(200)
// })


// test("getMedicineProducts",async()=>{
//     await request(app).get('/getMedicineProducts').expect(200)
// })

// test("getClothingsProducts",async()=>{
//     await request(app).get('/getClothingsProducts').expect(200)
// })

// test("getGroceriesProducts",async()=>{
//     await request(app).get('/getGroceriesProducts').expect(200)
// })

// test("getStationaryProducts",async()=>{
//     await request(app).get('/getStationaryProducts').expect(200)
// })

// test("addToCart",async()=>{
//     await request(app).post('/addToCart')
//     .send({
        
//     }).expect(200)
// })

// test("getCartProducts",async()=>{
//     await request(app).post('/getCartProducts')
//     .send({
//         userId:"123"
//     }).expect(200)
// })

// //getallProducts

// test("postComm",async()=>{
//     await request(app).post('/postComm')
//     .send({
        
//     }).expect(200)
// })

// test("removeFromCart",async()=>{
//     await request(app).post('/removeFromCart')
//     .send({
        
//     }).expect(200)
// })

// test("getallProducts",async()=>{
//     await request(app).get('/getallProducts').expect(200)
// })

// test("checkOut",async()=>{
//     await request(app).post('/checkOut')
//     .send({
          
//     })
//     .expect(500)
// })




// test("getOrderedData",async()=>{
//     await request(app).post('/getOrderedData')
//     .send({
          
//     }).expect(200)
// })



// test("deleteProduct",async()=>{
//     await request(app).post('/deleteProduct')
//     .send({
          
//     }).expect(200)
// })
// //getAddress

// // test("addAddressToUser",async()=>{
// //     await request(app).post('/addAddressToUser')
// //     .send({
          
// //     })
// //     .expect(500)
// // })




// // test("getUserAddress",async()=>{
// //     await request(app).post('/getUserAddress')
// //     .send({
          
// //     })
// //     .expect(500)
// // })




// test("updateProduct",async()=>{

//     await request(app).post('/updateProduct')
//     .send({
        
          
//     }).expect(200)
// })