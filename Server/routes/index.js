var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
var url = require('url');
let authorization = require('../middleware/authentication');

// Import models...
let AUTH = require('../model/users');
let MYPRODUCT = require('../model/MyProducts');
let MYCATEGORY = require('../model/MyCategory');
const { default: mongoose } = require('mongoose');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'images', 'my_products'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

// Sign-Up 
router.post('/signup', async function (req, res, next) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    userData = await AUTH.create(req.body);
    res.status(200).json({
      status: 200,
      message: "Thank you for registering."
    });
  } catch (error) {
    res.status(404).json({
      status: 400,
      message: error.message,
    });
  }
});

// Sign-In
router.post('/signin', async function (req, res, next) {
  try {
    let loginUserData = await AUTH.findOne({ email: req.body.email });
    let pass = await bcrypt.compare(req.body.password, loginUserData.password);
    if (!pass) {
      throw new Error('password is not valid.');
    }
    const token = await jwt.sign({ id: loginUserData._id }, "auth_session_id", { expiresIn: '1h', algorithm: 'HS256' });
    res.status(200).json({
      status: 200,
      token: token
    });
  } catch (error) {
    res.status(404).json({
      status: 400,
      message: error.message,
    });
  }
});

// Home
router.get('/home', authorization.Authentication, async function (req, res, next) {
  try {
    res.status(200).json({
      status: 200,
      message: req.user
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    })
  }
});

// ------------------ My Product ---------------------

// Get Product Data
router.get('/my-product/:id?', async function (req, res, next) {
  try {
    let myProduct;
    let DataCount;
    let pageCount = req.query.page;
    console.log(req.query);
    if (req.params.id || req.query.view) {
      myProduct = await MYPRODUCT.findById(req.params.id ? req.params.id : req.query.view);
    } else {
      DataCount = await MYPRODUCT.count();
      myProduct = await MYPRODUCT.find().skip((pageCount - 1) * 5).limit(5);
    }

    res.status(200).json({
      status: 200,
      message: myProduct,
      data: DataCount
    })
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    })
  }
})

// Added new Product
router.post('/add-product/:id?', upload.single('images'), async function (req, res, next) {
  let newData = { ...req.body }
  let data;
  try {
    // if (req.params.id) {
    //   req.file ? newData.images = req.file.filename : ''
    //   data = await MYPRODUCT.findOneAndUpdate({ _id: req.params.id }, newData)
    // } else {
    //   newData.images = req.file.filename
    //   let totalCount = await MYPRODUCT.count();
    //   data = await MYPRODUCT.create(newData);
    // }

    if (req.file) {
      newData.images = req.file.filename
    }
    let id = !req.params.id ? new mongoose.Types.ObjectId() : req.params.id
    data = await MYPRODUCT.findByIdAndUpdate(id,
      { $set: newData },
      { upsert: true }
    );

    res.status(200).json({
      status: true,
      message: 'Your product has been added.',
      data
    })
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message
    })
  }
})

// Delete product
router.get('/delete-product', async function (req, res, next) {
  try {
    const productId = req.query.delete;
    const data = await MYPRODUCT.findOneAndDelete({ _id: productId });
    res.status(200).json({
      status: 200,
      message: 'Product deleted successfully.',
      data
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
});

// ----------------------------------------------------

// ------------------- My Category --------------------

// Get Category Data
router.get('/my-category/:id?', async function (req, res, next) {
  try {
    let myCategory;
    let DataCount;
    let pageCount = req.query.page;
    console.log();
    if (req.params.id) {
      myCategory = await MYCATEGORY.findById(req.params.id);
    } else {
      DataCount = await MYCATEGORY.count();
      myCategory = await MYCATEGORY.find().skip((pageCount - 1) * 5).limit(5);
    }
    console.log(myCategory);

    res.status(200).json({
      status: 200,
      message: myCategory,
      data: DataCount
    })
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    })
  }
})

// Added new Category
router.post('/add-category/:id?', async function (req, res, next) {
  try {
    let id = !req.params.id ? new mongoose.Types.ObjectId() : req.params.id
    const data = await MYCATEGORY.findByIdAndUpdate(id,
      { $set: req.body },
      { upsert: true }
    );
    res.status(200).json({
      status: 200,
      data,
      message: "Your category has been added."
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: error.message,
    });
  }
});

// Delete category
router.get('/delete-category', async function (req, res, next) {
  try {
    const categoryId = req.query.product;
    const data = await MYCATEGORY.findOneAndDelete({ _id: categoryId });
    console.log(data);
    res.status(200).json({
      status: 200,
      message: 'Category deleted successfully.',
      data
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
});

// ----------------------------------------------------

module.exports = router;