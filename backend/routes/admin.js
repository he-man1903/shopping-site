const express = require('express')
const router = express.Router()
const path = require('path')
const adminController = require('../controller/adminController')
var multer= require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now()+'_'+file.originalname)
    }
  })

  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage, fileFilter })

router.get('/', adminController.getHome);

router.post('/userRegistration',adminController.register)

router.post('/userLoginConf',adminController.userLoginConf)

router.post('/OwnerLoginConf',adminController.ownerLoginConf);

router.post('/OwnerRegistration',adminController.storeRegister)

router.post('/uploadProductImages',upload.single('imageTitle'),adminController.uploadProductImages)

router.post('/getProductImages',adminController.getProductImages)
router.get('/getMedicineProducts',adminController.getMedicineProducts)

router.get('/getStationaryProducts',adminController.getStationariesProducts)
router.get('/getGroceriesProducts',adminController.getGroceriesProducts)
router.get('/getClothingsProducts',adminController.getClothingsProducts)
router.post('/addToCart',adminController.addToCart)


router.post('/getCartProducts',adminController.getCartProducts)

router.post('/postComm',adminController.postComm)


router.post('/addAddressToUser',adminController.addAddressToUser)
router.post('/removeFromCart',adminController.removeFromCart)
router.get('/getallProducts',adminController.getallProducts)
router.post("/checkOut",adminController.checkOut)
router.post("/getOrderedData",adminController.getOrderedData)
router.post('/getAddress',adminController.getAddress)
router.post('/getUserAddress',adminController.getUserAddress)

router.post('/getUserName',adminController.getUserName)
router.post('/updateProduct',adminController.updateProduct)
router.post('/deleteProduct',adminController.deleteProduct)


router.post('/getOTP',adminController.getOTP)
router.post('/registerComplain',adminController.registerComplain)

router.post('/resetPassword',adminController.resetPassword)
module.exports = router
