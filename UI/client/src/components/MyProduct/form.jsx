import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  FaCircleArrowLeft,
  FaCirclePlus,
  FaPenToSquare,
} from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import useEth from "../../contexts/EthContext/useEth";

function AddProduct() {
  let params = useParams();
  // const { state: { contract, accounts } } = useEth();
  const [isDisabled, setDisabled] = useState(true);
  const [PreImage, setPreImage] = useState("");
  const [Code, setCode] = useState();
  const [SKUsnum, setSKUsnum] = useState("");
  const [Status, setStatus] = useState(1);
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  let navigate = useNavigate();

  // ------ Formik ------
  const [initialValues, setInitialValues] = useState({
    images: "",
    product: "",
    color: "",
    brand: "",
    category: "",
    price: "",
    qty: "",
    skus: "",
    code: "",
    details: "",
    status: Status,
  })

  useEffect(() => {
    if (params.id) {
      axios.get("http://localhost:4000/my-product/" + params.id)
        .then(({ data }) => {
          setInitialValues(data.message);
          setCode(data.message.code);
          setSKUsnum(data.message.skus);
          setPreImage("http://localhost:4000/images/my_products/" + data.message.images);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [])

  const validationSchema = yup.object({
    images: yup
      .mixed()
      .test(
        "size",
        "Upload less than 1 MB file.",
        (value) => {
          if (initialValues.images) {
            return true
          } else if (!value || value.size >= 1048576) {
            return false
          }
          return true
        }
      )
      .test(
        "type",
        "Upload only .jpg, .jpeg, .png",
        (value) => {
          if (initialValues.images) {
            return true
          } else if (!value || !SUPPORTED_FORMATS.includes(value.type)) {
            return false
          }
          return true
        }
      )
      .required("You need to provide a file"),
    product: yup
      .string()
      .min(3, "greter then 3 char.")
      .max(100, "less then 15 char.")
      .required("Product name is required."),
    color: yup.string().required("Product color is required."),
    brand: yup.string().required("Brand name is required."),
    category: yup.string().required("Category name is required."),
    price: yup
      .string()
      .required("Price is required.")
      .matches(
        /^[0-9]*$/,
        "Please add only numbers"
      ),
    qty: yup
      .number("Allow only number.")
      .required("Qty is required")
      .positive("Allow only positive number."),
    code: yup
      .number("Allow only number.")
      .required("Code is required")
      .positive("Allow only positive number."),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      if (typeof values.images == "string") {
        delete values.images
      }
      await axios({
        method: 'post',
        url: params.id ? 'http://localhost:4000/add-product/' + params.id : 'http://localhost:4000/add-product',
        data: values,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((response) => {
          // await contract.methods.write(response.data.data._id).send({ from: accounts[0] });
          navigate('/my-product')
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const GenerateCode = () => {
    setCode(Math.floor(Math.random() * 10000000000));
  };

  const GenerateSKUs = () => {
    if (values.product) {
      let pro_string = values.product.substring(0, 3);
      let pro_skus = Math.floor(Math.random() * 1000);
      let pro_sku2 = Math.floor(Math.random() * 10000);
      setSKUsnum(pro_string.toUpperCase() + "-" + pro_skus + "-" + pro_sku2);
    }
  };

  const fileChangeHandler = (event) => {
    setFieldValue("images", event.target.files[0]);
    if (event.target.files && event.target.files.length) {
      setPreImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <>
      <div className="content-header">
        <h1>Add Product</h1>
        <Link className="btn btn-secondary" to={"/my-product"}>
          <FaCircleArrowLeft color="#fff" size={18} />
          &nbsp;&nbsp;Back
        </Link>
      </div>

      <section className="content mb-4">
        <Card>
          <Card.Body className="p-3 border-2 border-secondary-subtle">
            <form onSubmit={handleSubmit} autoComplete="off">
              {errors.images && touched.images ? (
                <span
                  className="required-lable"
                  style={{ display: "block", textAlign: "center" }}
                >
                  {errors.images}
                </span>
              ) : null}
              <div for="product-img" className="product-images">
                {values.images ? (
                  <img src={PreImage} alt="Default Images" />
                ) : (
                  <img
                    src="/images/product-default.jpg"
                    alt="Default Images"
                  />
                )}
                <label className="product-img-icon">
                  <FaPenToSquare size={22} color="#e3e3e3" className="icon" />
                  <input
                    id="product-img"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={fileChangeHandler}
                  />
                </label>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>
                    Product Name<span className="required-lable">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    name="product"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.product}
                  />
                  {errors.product && touched.product ? (
                    <span className="required-lable">{errors.product} </span>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label>
                    Color<span className="required-lable">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter color"
                    name="color"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.color}
                  />
                  {errors.color && touched.color ? (
                    <span className="required-lable">{errors.color} </span>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label>
                    Product Brand<span className="required-lable">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="brand"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.brand}
                  >
                    <option value="">Select Brand</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  {errors.brand && touched.brand ? (
                    <span className="required-lable">{errors.brand} </span>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label>
                    Product Category<span className="required-lable">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category}
                  >
                    <option value="">Select Category</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  {errors.category && touched.category ? (
                    <span className="required-lable">{errors.category} </span>
                  ) : null}
                </div>
                <div className="col-md-3 mb-3">
                  <label>
                    Product Price<span className="required-lable">*</span>
                  </label>
                  <input
                    className="form-control"
                    placeholder="00.0"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                  {errors.price && touched.price ? (
                    <span className="required-lable">{errors.price} </span>
                  ) : null}
                </div>
                <div className="col-md-3 mb-3">
                  <label>
                    Product Quantity<span className="required-lable">*</span>
                  </label>
                  <input
                    className="form-control"
                    placeholder="QTY"
                    name="qty"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.qty}
                  />
                  {errors.qty && touched.qty ? (
                    <span className="required-lable">{errors.qty} </span>
                  ) : null}
                </div>
                <div className="col-md-3 mb-3">
                  <label>Product SKUs</label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      placeholder="SKUs (PRO-XX0000XX)"
                      disabled
                      readOnly
                      name="skus"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={(values.skus = SKUsnum)}
                    />
                    {
                      !params.id && <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={GenerateSKUs}
                        disabled={values.product ? false : true}
                      >
                        Generate
                      </button>
                    }
                    
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label>
                    Product Code<span className="required-lable">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      placeholder="XXX-XXXXX-XX"
                      disabled
                      readOnly
                      name="code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={(values.code = Code)}
                    />
                    {
                      !params.id && <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={GenerateCode}
                      >
                        Generate
                      </button>
                    }
                    
                  </div>
                  {errors.code && touched.code ? (
                    <span className="required-lable">{errors.code} </span>
                  ) : null}
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-lable">Product details</label>
                  {/* <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Product details..."
                    name="details"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.details}
                  /> */}
                  <CKEditor
                    editor={ClassicEditor}
                    data={values.details}
                    config={{
                      placeholder: 'Enter text here...',
                      // toolbar: ['bold', 'italic']
                    }}                    
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setFieldValue("details", data)
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <p className="mt-3 mb-1">Product Status</p>
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      value={(values.status = Status)}
                      onClick={(e) => {
                        setDisabled(false);
                        setStatus(0);
                      }}
                      disabled={!isDisabled}
                    >
                      Disabled
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      value={(values.status = Status)}
                      onClick={(e) => {
                        setDisabled(true);
                        setStatus(1);
                      }}
                      disabled={isDisabled}
                    >
                      Enabled
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-secondary float-lg-end px-4">
                  <FaCirclePlus />
                  &nbsp;&nbsp;Add
                </button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </section>
    </>
  );
}

export default AddProduct;
