var express = require('express');
const { default: mongoose } = require('mongoose');
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
let MYBRAND = require('../model/MyBrand');

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

const limit = 10;

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
router.get('/my-product/:id?', authorization.Authentication,async function (req, res, next) {
  try {
    let myProduct;
    let DataCount;
    let pageCount = req.query.page;
    let search = req.query.search;
    if (req.params.id || req.query.view) {
      myProduct = await MYPRODUCT.findById(req.params.id ? req.params.id : req.query.view).populate([{
        path: 'category',
        model: 'my_category',
        select: { 'category': 1 },
      }, {
        path: 'brand',
        model: 'my_brand',
        select: { 'brand': 1 },
      }]);
    } else if (req.query.search && pageCount) {
      DataCount = await MYPRODUCT.find({
        $or: [{ product: { $regex: search, $options: 'i' } }]
      }).count();
      myProduct = await MYPRODUCT.find({
        $or: [{ product: { $regex: search, $options: 'i' }}]
      }).populate([{
        path: 'category',
        model: 'my_category',
        select: { 'category': 1 },
      }, {
          path: 'brand',
          model: 'my_brand',
          select: { 'brand': 1 },
        }]).skip((pageCount - 1) * limit).limit(limit).sort({'product': 1});
    } else {
      DataCount = await MYPRODUCT.count();
      myProduct = await MYPRODUCT.find().populate([{
        path: 'category',
        model: 'my_category',
        select: { 'category': 1 },
      }, {
        path: 'brand',
        model: 'my_brand',
        select: { 'brand': 1 },
      }]).skip((pageCount - 1) * limit).limit(limit).sort({ 'product': 1 });
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
    if (req.params.id) {
      req.file ? newData.images = req.file.filename : ''
      data = await MYPRODUCT.findOneAndUpdate({ _id: req.params.id }, newData)
    } else {
      newData.images = req.file.filename
      let totalCount = await MYPRODUCT.count();
      data = await MYPRODUCT.create(newData);
    }

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
    let search = req.query.search;
    if (req.params.id) {
      myCategory = await MYCATEGORY.findById(req.params.id).populate(['brand']);
    } else if (pageCount && search) {
      DataCount = await MYCATEGORY.find({
        $or: [{ category: { $regex: search, $options: 'i' } }]
      }).count();
      myCategory = await MYCATEGORY.find({
        $or: [{ category: { $regex: search, $options: 'i' } }]
      }).populate(['brand']).skip((pageCount - 1) * limit).limit(limit).sort({ category: 1 });
    } else if (pageCount) {
      DataCount = await MYCATEGORY.count();
      myCategory = await MYCATEGORY.find().populate(['brand']).skip((pageCount - 1) * limit).limit(limit).sort({ 'category': 1 });
    } else if (req.query.b_id) {
      myCategory = await MYCATEGORY.find({
        brand: { $in: req.query.b_id }
      });
    }
    else {
      myCategory = await MYCATEGORY.find().select(['category', '_id']);
    }
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
    const categoryId = req.query.delete;
    const data = await MYCATEGORY.findOneAndDelete({ _id: categoryId });
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

// ------------------- My Brand -----------------------

// Get brand data
router.get('/my-brand/:id?', async function (req, res, next) {
  let myBrand;
  let DataCount;
  let pageCount = req.query.page;
  let search = req.query.search;
  try {
    if (req.params.id) {
      myBrand = await MYBRAND.findById(req.params.id);
    } else if (pageCount && search) {
      DataCount = await MYBRAND.find({
        $or: [{ brand: { $regex: search, $options: 'i' } }]
      }).count();
      myBrand = await MYBRAND.find({
        $or: [{ brand: { $regex: search, $options: 'i' } }]
      }).skip((pageCount - 1) * limit).limit(limit).sort({ brand: 1 });
    } else if (pageCount) {
      DataCount = await MYBRAND.count();
      myBrand = await MYBRAND.find().skip((pageCount - 1) * limit).limit(limit).sort({ brand: 1 });
    } else {
      myBrand = await MYBRAND.find().select(['brand', '_id']).sort({brand: 1});
    }
    res.status(200).json({
      status: 200,
      message: myBrand,
      data: DataCount
    })
  } catch (error) {
    res.status(404).json({
      status: 400,
      data: error.message
    })

  }
})

// Added new brand
router.post('/add-brand/:id?', async function (req, res, next) {
  try {
    let id = !req.params.id ? new mongoose.Types.ObjectId() : req.params.id
    const data = await MYBRAND.findByIdAndUpdate(id,
      { $set: req.body },
      { upsert: true }
    );
    res.status(200).json({
      status: 200,
      data,
      message: "Your brand has been added."
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    });
  }
})

// Delete category
router.get('/delete-brand', async function (req, res, next) {
  try {
    const brandId = req.query.delete;
    const data = await MYBRAND.findOneAndDelete({ _id: brandId });
    res.status(200).json({
      status: 200,
      message: 'Brand deleted successfully.',
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