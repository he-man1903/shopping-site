'use strict'

const User = require('../models/user.js')
const Owner=require('../models/owner.js')
const obj={"title":'India',"content":'The best country'}
const jwt=require('jsonwebtoken')  
const user = require('../models/user.js')
const Product = require('../models/product.js')
const product = require('../models/product.js')
const nodemailer = require("nodemailer");


exports.getHome = (req,res)=>{
   
        res.send("hello")

    
   
    
}

exports.register=(req,res)=>{
    console.log(req.body)
    var user=new User({
        Email:req.body.regData.regEmail,
        Name:req.body.regData.regName,
        Password:req.body.regData.regPassword
    })
    User.findOne({Email:req.body.regData.regEmail},(err,obj)=>{
       if(!obj){
        user.save((err)=>{
            if(!err)
            {
                console.log("saved in user database")
                
            }
            else{
                console.log(err)
                
            }
        })
       // let resObj={status:true}
        res.send(obj)
        }
        else{
            //let resObj={status:false}
            res.send(obj)
        }
    
    })
    
}

exports.userLoginConf=(req,res)=>{
    console.log(req.body)
    User.findOne({Email:req.body.loginData.email,Password:req.body.loginData.password},(err,obj)=>{
       let r={Obj:obj}
        console.log(obj)
        
        res.send(obj)
        if(err){
            res.send("wrong email or password. Please Check!!!!")
        }
    })

}

exports.ownerLoginConf=(req,res)=>{
    console.log(req.body)
    Owner.findOne({Email:req.body.OwnerLoginData.email},(err,obj)=>{
       let r={Obj:obj}
        console.log(obj)
        
        res.send(obj)
    })
}

exports.storeRegister=(req,res)=>{
    console.log(req.body)
    var owner=new Owner({
        Email:req.body.StoreRegData.regEmail,
        Name:req.body.StoreRegData.regName,
        Password:req.body.StoreRegData.regPassword
    })
    Owner.findOne({Email:req.body.StoreRegData.regEmail},(err,obj)=>{
       if(!obj){
        owner.save((err)=>{
            if(!err)
            {
                console.log("saved in user database")
                
            }
            else{
                console.log(err)
                
            }
        })
       // let resObj={status:true}
        res.send(obj)
        }
        else{
            //let resObj={status:false}
            res.send(obj)
        }
    
    })
    
}

exports.uploadProductImages=(req,res)=>{
    
    var userId=req.body.userId
    console.log(req.body)
    var imageUrl='http://localhost:7000/'+req.file.path
    var product= new Product({
        Category:req.body.category,
        Price:req.body.price,
        ImageUrl:imageUrl,
        Count:req.body.count,
        Name:req.body.name
    })
    Product.findOne({ImageUrl:imageUrl},(err,obj)=>{
        if(!obj){
         product.save((err)=>{
             if(!err)
             {   
                 console.log("saved in product database")
                 Owner.findOneAndUpdate({_id:userId},{ $push: { Products: product._id} },(err,obj1)=>{
                    if(!err){
                        console.log(obj1)
                        res.send("ok")
                    }
                    else{
                        console.log(err) 
                    }
                })
                
                
             }
             else{
                 console.log(err)
                 
             }
         })
         
        // let resObj={status:true}
         
         }
         
     
     })
   
    
}

exports.getProductImages=(req,res)=>{
       var userId = req.body.userId;
       
        var product=[]
        //  Owner.findOne({_id:userId},(err,obj)=>{
        //         //console.log(obj.Products)
        //         var a=obj.Products
        //         console.log("a"+a)
        //         obj.Products.map((i,j)=>{
        //             product.push(j);
        //         })
        //     })
        
        
        // console.log("product list")
        // console.log(product)
        // var imageURLS=[]

        // Product.find({ _id: {$in: product } },(err,obj11)=>{
            
        //     console.log(obj11)
        // })
       
            // Owner.aggregate([
               
            //     {
                    
            //         $lookup: {
            //             from: "Product",
            //             localField: "Products",
            //             foreignField: "_id",
            //             as: "products_available"
            //           }
            //         }
                    
                
            // ]).then(result=>{console.log(result)})

            Owner.findOne({id:req.body.userId},(err,obj)=>{
        
                if(obj){
                    
                    Product.find({_id:{$in:obj.Products}},(err,obj1)=>{
                             console.log(obj1)
                             res.send(obj1)
                            })
                        }
                       
                       
                    })
           
        
            
}


exports.getMedicineProducts=(req,res)=>{
    var imageUrl=[]
    Product.find({Category:"med"},(err,obj)=>{
        
        res.send(obj)
        
    })
}
exports.getClothingsProducts=(req,res)=>{
    var imageUrl=[]
    Product.find({Category:"cloth"},(err,obj)=>{
        
        res.send(obj)
        
    })
}
exports.getGroceriesProducts=(req,res)=>{
    var imageUrl=[]
    Product.find({Category:"groc"},(err,obj)=>{
        
        res.send(obj)
        
    })
}
exports.getStationariesProducts=(req,res)=>{
    var imageUrl=[]
    Product.find({Category:"stat"},(err,obj)=>{
        
        res.send(obj)
        
    })
}

exports.addToCart=(req,res)=>{
    console.log(req.body)
    User.findOneAndUpdate({_id:req.body.userId,Cart:{$nin:[req.body.productId]}},{ $push: { Cart: req.body.productId} },(err,obj)=>{
        res.send({status:"OK"})
    })
}

exports.getCartProducts=(req,res)=>{
    
    console.log(req.body)
    User.findOne({_id:req.body.userId},(err,obj)=>{
        
        if(obj){
            Product.find({_id:{$in:obj.Cart}},(err,obj1)=>{
                console.log(obj1)
                
                res.send(obj1)
               })

               
        }
        else if(!obj){
            res.status(404)
        }
       
            })
            
            
           }
        

    
    
    exports.postComm=(req,res)=>{
        console.log(req.body)
        
        Product.findOneAndUpdate({_id:req.body.productId},{$push: {"Comment": {userId: req.body.userId,user:req.body.user, comment: req.body.comment, rating:req.body.rating}},$inc:{Rating:req.body.rating,RatingCount:1}},(err,obj)=>{
            
            console.log(obj)
    
        })

        res.send("ok")
    

    }

exports.removeFromCart=(req,res)=>{
    console.log(req.body)
    User.updateOne({_id:req.body.userId},{ $pull: { Cart:req.body.productId} },(err,obj)=>{
        console.log(obj)
        res.send({status:"OK"})
    })
}

exports.getallProducts=(req,res)=>{
    //var array=['med','groc','stat','cloth']
   
    Product.find({Category:{$in:['med','groc','stat','cloth']}},(err,obj)=>{
        console.log(obj)
        res.send(obj)
    })

}

exports.checkOut=(req,res)=>{
    console.log(req.body)
    let arr=[]
    req.body.productId.map((i,j)=>{
        arr.push(i._id)
    })
    User.findOneAndUpdate({_id:req.body.userId},{$push:{OrderHistory:{"ProductId":arr,"DeliveredAddress":req.body.deliveryAddress,"ModeOfPayment":req.body.modeOfPayment}},$pull: {Cart: {$exists: true}}},(err,obj)=>{
        console.log(obj)
         res.status(200)
    })
    
}

exports.getOrderedData=(req,res)=>{
    console.log("orderHistory")
    User.findOne({_id:req.body.userId},(err,obj)=>{
        console.log(obj.OrderHistory)
        let arr=[]
        obj.OrderHistory.map((i,j)=>{
            let arr2=[]
            arr2=i.ProductId
            arr2.map((a,b)=>{
                arr.push(a)
            })
        })
        console.log(arr)
        if(obj){
            Product.find({_id:{$in:arr}},(err,obj1)=>{
               // console.log(obj1)
                res.send(obj1)
            })
        }
    })
}

exports.getAddress=(req,res)=>{
    console.log(req.body)
    User.findOne({_id:req.body.userId},(err,obj)=>{
        console.log(obj)
        res.send(obj.Address)
    })
}

exports.addAddressToUser=(req,res)=>{
    console.log(req.body)
    User.findOneAndUpdate({_id:req.body.userId},{$push:{Address:{"Street":req.body.address.street,"City":req.body.address.street,
    "State":req.body.address.state,"Zip":req.body.address.zip,"Country":req.body.address.country }}},(err,obj)=>{
        console.log(obj)
        res.send("ok")
    })
}


exports.getUserAddress=(req,res)=>{
    console.log(req.body)
    console.log("hi")

    User.findOne({_id:req.body.userId},(err,obj)=>{
        res.send(obj.Address)
    })
}


exports.getUserName=(req,res)=>{
    console.log(req.body.productId)
    var arr=[]
    Product.findOne({_id:req.body.productId},(err,obj)=>{
        console.log(obj.Comment)
        res.send(obj.Comment)
        })
        
       
       

        
    
    
}


exports.updateProduct=(req,res)=>{
    console.log(req.body)
    Product.findOneAndUpdate({_id:req.body.productId},{$set:{Name:req.body.name,Count:req.body.count,
        Price:req.body.price}},(err,obj)=>{
        console.log(obj)
        res.send(200)
       })
  

    
}

exports.deleteProduct=(req,res)=>{
    console.log(req.body)
    Product.findOneAndDelete({_id:req.body.productId},(err,obj)=>{
        console.log(obj)
        res.send(200)
       })
  

    
}

async function mail() {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "dmega2301@gmail.com",
          pass: "<your password>",
        },
      });
    
      let mailOptions = {
        from: "dmega2301@gmail.com",
        to: req.body.email,
    
        subject: "Stay Alert!!!!",
        text: 'Nearby dangerous areas-->',
          html: html
      };
    
      transporter.sendMail(mailOptions, (err, email) => {
        if (err) {
          console.log("err is ", err);
          res.json({
            status: "fail",
          });
        } else {
          console.log(email);
          res.json({
            status: "success",
          });
        }
      });
      res.send("done")
  }

exports.registerComplain=(req,res)=>{
    console.log(req.body)
    var userName=''
    var productName=''
    User.findOne({_id:req.body.userId},(err,obj)=>{
        userName=obj.Name
        if(obj){
            Product.findOne({_id:req.body.productId},(err,obj1)=>{
                productName=obj1

            })
        }
    })
 
    let html=` `
     let v=`<div style="background-color:aqua">ProductId:${req.body.productId} </div> <div style="background-color:red">complaint:${req.body.complain}</div> <div style="background-color:yellow">userId:${req.body.userId} </div> <div style="background-color:orange"></div><br>`
    console.log(v)
    html+=v;
   

    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "mridulmayank027@gmail.com",
          pass: "kkcc jkpn ayxj rsie",
        },
      });
    
      let mailOptions = {
        from: req.body.email,
        to: "mridulmayank007@gmail.com",
    
        subject: "Stay Alert!!!!",
        text: 'Nearby dangerous areas-->',
          html: html
      };
      
      transporter.sendMail(mailOptions, (err, email) => {
        if (err) {
          console.log("err is ", err);
          res.json({
            status: "fail",
          });
        } else {
          console.log(email);
          res.json({
            status: "success",
          });
        }
      });
      res.send("done")


}


exports.getOTP=(req,res)=>{
    console.log(req.body)
    let rand=Math.floor((Math.random() * 10000) + 1);
    console.log(rand)
    var html=`<div>OTP:${rand}</div>`
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "mridulmayank027@gmail.com",
          pass: "kkcc jkpn ayxj rsie",
        },
      });
    
      let mailOptions = {
        from: req.body.email,
        to: "mridulmayank007@gmail.com",
    
        subject: "Stay Alert!!!!",
        text: 'Nearby dangerous areas-->',
          html: html
      };
      
      transporter.sendMail(mailOptions, (err, email) => {
        if (err) {
          console.log("err is ", err);
          res.json({
            status: "fail",
          });
        } else {
          console.log(email);
          res.json({
            status: "success",
          });
        }
      });
      res.send({rand})

}


exports.resetPassword=(req,res)=>{
    console.log(req.body)
    User.findOneAndUpdate({Email:req.body.email},{$set:{Password:req.body.password}},(err,obj)=>{
        res.send('ok')
    })

}