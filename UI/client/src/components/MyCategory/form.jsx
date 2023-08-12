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
import Select from 'react-select';

function AddCategory() {
    let navigate = useNavigate();
    let params = useParams();
    const [isDisabled, setDisabled] = useState(true);
    const [Status, setStatus] = useState(1);
    const [Brands, setBrands] = useState([]);
    const [defaultOption, setdefaultOption] = useState([]);

    const GetBrandOption = () => {
        axios.get("http://localhost:4000/my-brand/")
            .then(({ data }) => {
                setBrands(data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (params.id) {
            axios.get("http://localhost:4000/my-category/" + params.id)
                .then(({ data }) => {
                    setdefaultOption(data.message.brand.length ? data.message.brand.map((ele) => ({ value: ele._id, label: ele.brand })) : []);
                    setInitialValues(data.message);
                })
                .catch((error) => {
                    console.log(error);
                })
            GetBrandOption();
        } else {
            GetBrandOption();
        }
    }, []);


    const [initialValues, setInitialValues] = useState({
        brand: "",
        category: "",
        status: Status,
    });
    
    
    const validationSchema = yup.object({
        category: yup.string().required("Category name is required."),
        brand: yup
            .array(
                yup.object({
                    value: yup.string(),
                    label: yup.string(),
                }),
            )
            .min(1).required("Please select any one")
    });

    const {
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        setFieldValue
    } = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            const copyVal = {...values}
            console.log("copyVal", copyVal);
            if (copyVal.brand && copyVal.brand.length) {
                copyVal.brand = copyVal.brand.map((ele) => ele.value ? ele.value : ele)
            }
            console.log(copyVal);
            await axios({
                method: 'post',
                url: params.id ? 'http://localhost:4000/add-category/' + params.id : 'http://localhost:4000/add-category',
                data: copyVal,
            })
                .then((response) => {
                    // await contract.methods.write(response.data.data._id).send({ from: accounts[0] });
                    navigate('/my-category')
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    });
    const options = Brands && Brands.length ? Brands.map((el) => ({ value: el._id, label: el.brand })) : []
    console.log("values", values);
    return (
        <>
            <div className="content-header">
                <h1>Add Category</h1>
                <Link className="btn btn-secondary" to={"/my-category"}>
                    <FaCircleArrowLeft color="#fff" size={18} />
                    &nbsp;&nbsp;Back
                </Link>
            </div>

            <section className="content mb-4">
                <Card>
                    <Card.Body className="p-3 border-2 border-secondary-subtle">
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>
                                        Category Name<span className="required-lable">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter name"
                                        name="category"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.category}
                                    />
                                    {errors.category && touched.category ? (
                                        <span className="required-lable">{errors.category} </span>
                                    ) : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>
                                        Category Brand<span className="required-lable">*</span>
                                    </label>
                                    <Select
                                        // value={defaultOption[0]}
                                        value={defaultOption}
                                        isMulti
                                        options={options}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={(e) => {setFieldValue("brand", e); setdefaultOption(e)}}
                                    />
                                    {errors.brand && touched.brand ? (
                                        <span className="required-lable">{errors.brand} </span>
                                    ) : null}
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p className="mt-3 mb-1">Category Status</p>
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
    )
}

export default AddCategory;