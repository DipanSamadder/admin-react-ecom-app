import { Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomEditor from "../components/CustomEditor";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import CustomUpload from "../components/CustomUpload";
import { getBrands } from "../features/brand/brandSlice";
import { getColorList } from "../features/color/colorSlice";
import { getAllUser } from "../features/customers/customerSlice";
import { getProCate } from "../features/proCat/proCatSlice";
import {
  addProducts,
  getAProducts,
  updateProducts,
} from "../features/product/productSlice";
export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [action, setAction] = useState("Add");
  const getEditId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getEditId !== undefined) {
      setAction("Update");
    } else {
      setAction("Add");
    }
  }, [getEditId]);

  const selectIndex = [
    { key: "Index", value: "Index" },
    { key: "No Index", value: "No Index" },
    { key: "Index Follow", value: "Index Follow" },
    { key: "No Index No Follow", value: "No Index No Follow" },
  ];
  const statusList = [
    { key: true, value: "Publish" },
    { key: false, value: "Private" },
  ];

  const getColorsList = useSelector((state) => state.color.data || []);
  const getBrandList = useSelector((state) => state.brand.data || []);
  const getCateList = useSelector((state) => state.pcat.data || []);
  const customerList = useSelector((state) => state.customer.customers || []);
  const addPro = useSelector((state) => state.product || []);
  const {
    isSuccess,
    isError,
    message,
    createProducts,
    editProData,
    updateProData,
  } = addPro;
  const [toastMessage, setTostMessage] = useState(false);
  const defaultData = editProData || "";
  console.log(defaultData);

  useEffect(() => {
    if (getEditId !== undefined) {
      dispatch(getAProducts(getEditId));
    }
  }, [dispatch, getEditId]);

  // Memoize derived data to prevent unnecessary re-renders
  const brandlist = useMemo(
    () =>
      getBrandList.map((val) => ({
        key: val._id,
        value: val.title,
      })),
    [getBrandList]
  );

  const categoryList = useMemo(
    () =>
      getCateList.map((val) => ({
        key: val._id,
        value: val.title,
      })),
    [getCateList]
  );

  const colorList = useMemo(
    () =>
      getColorsList.map((val) => ({
        key: val._id,
        value: val.title,
      })),
    [getColorsList]
  );

  const authorList = useMemo(
    () =>
      customerList
        .filter((val) => val.role === "admin")
        .map((val) => ({
          key: val._id,
          value: `${val.firstname} ${val.lastname}`,
        })),
    [customerList]
  );

  let schemaValidation = Yup.object({
    title: Yup.string().required("Title is required"),
    price: Yup.string().required("Price is required"),
    quantity: Yup.string().required("Quantity is required"),
    color: Yup.array()
      .min(1, "Select at last one color.")
      .required("color is required"),
  });

  const [fileList, setFileList] = useState([]);
  const showImage =
    getEditId !== undefined && defaultData?.images
      ? defaultData.images.map((img) => ({
          publicId: img.public_id,
          url: img.url,
          status: "done",
          uid: img.public_id,
          name: img.url,
        }))
      : [];

  useEffect(() => {
    if (getEditId !== undefined) {
      if (defaultData?.images) {
        const updatedImages = defaultData.images.map((img) => ({
          publicId: img.public_id,
          url: img.url,
          status: "done",
          uid: img.public_id,
          name: img.url,
        }));
        setFileList(updatedImages);
      }
    } else {
      setFileList([]);
    }
  }, [getEditId, defaultData]);

  const formik = useFormik({
    initialValues: {
      title: getEditId !== undefined ? defaultData?.title || "" : "",
      shortDes: getEditId !== undefined ? defaultData?.shortDes || "" : "",
      description:
        getEditId !== undefined ? defaultData?.description || "" : "",
      category: getEditId !== undefined ? defaultData?.category || "" : "",
      brand: getEditId !== undefined ? defaultData?.brand || "" : "",
      color: getEditId !== undefined ? defaultData?.color || "" : "",
      price: getEditId !== undefined ? defaultData?.price || "" : "",
      quantity: getEditId !== undefined ? defaultData?.quantity || "" : "",
      author: getEditId !== undefined ? defaultData?.author || "" : "",
      status: getEditId !== undefined ? defaultData?.status || "" : "",
      metaDes: getEditId !== undefined ? defaultData?.metaDes || "" : "",
      metaKey: getEditId !== undefined ? defaultData?.metaKey || "" : "",
      metaTitle: getEditId !== undefined ? defaultData?.metaTitle || "" : "",
      indexed: getEditId !== undefined ? defaultData?.indexed || "" : "",
      images: showImage !== undefined ? showImage : [] || [],
    },
    validationSchema: schemaValidation,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      values.images = fileList.map((file) => ({
        public_id: file.uid,
        url: file.url,
      }));
      setTostMessage(true);
      if (getEditId === undefined) {
        dispatch(addProducts(values));
      } else {
        values._id = getEditId;
        dispatch(updateProducts(values));
      }
    },
  });

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProCate());
    dispatch(getAllUser());
    dispatch(getColorList());
    if (toastMessage) {
      if (isSuccess && createProducts) {
        toast.success(message);
        formik.resetForm();
        setTostMessage(false);
        setTimeout(navigate("/admin/product-list"), 3000);
      }

      if (isError === true && message !== undefined) {
        setTostMessage(false);
        toast.error(message);
      }
    }
  }, [isSuccess, isError, message, createProducts, toastMessage, dispatch]);

  useEffect(() => {
    if (toastMessage) {
      if (isSuccess && updateProData && message !== undefined) {
        setTostMessage(false);
        toast.success(message);
        formik.resetForm();
        setTimeout(navigate("/admin/product-list"), 1000);
      }

      if (isError === true && message !== undefined) {
        setTostMessage(false);
        toast.error(message);
      }
    }
  }, [isSuccess, isError, message, updateProData, toastMessage, dispatch]);

  return (
    <div>
      <h3 className="mb-5">{action} Product</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="card border-0 p-4 mb-3">
              <h6>Title</h6>
              <div className="row">
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="title"
                    name="title"
                    label="Product Title"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />

                  <small className="text-danger">
                    {formik.touched.title && formik.errors.title ? (
                      <div>{formik.errors.title}</div>
                    ) : null}
                  </small>
                </div>
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="shortDes"
                    label="Product short des"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.shortDes}
                  />
                </div>
              </div>
            </div>
            <div className="card border-0 px-4 pt-4 pb-5 mb-3">
              <h6>Description</h6>
              <div className="row">
                <div className="col-md-12">
                  <CustomEditor
                    EditorId="description"
                    name="description"
                    placeholder="Start writing..."
                    onChange={(value) =>
                      formik.setFieldValue("description", value)
                    }
                    editorValue={formik.values.description}
                  />
                </div>
              </div>
            </div>
            <div className="card border-0 p-4 mb-3">
              <h6>Product Details</h6>
              <div className="row">
                <div className="col-md-4">
                  <CustomSelect
                    id="category"
                    label="Category"
                    name="category"
                    labelShow={true}
                    dataOption={categoryList}
                    onChange={formik.handleChange}
                    value={formik.values.category}
                  />
                </div>
                <div className="col-md-4">
                  <CustomSelect
                    id="brand"
                    label="Brand"
                    name="brand"
                    labelShow={true}
                    dataOption={brandlist}
                    onChange={formik.handleChange}
                    value={formik.values.brand}
                  />
                </div>
                <div className="col-md-4">
                  <div className="mt-3">
                    <label htmlFor="color" className="form-label">
                      Color
                    </label>

                    <Select
                      id="color"
                      label="Color"
                      name="color"
                      allowClear
                      mode="multiple"
                      placeholder="Select colors"
                      value={formik.values.color} // Formik state value for the select
                      onChange={(value) => {
                        formik.setFieldValue("color", value);
                      }} // Update form value on change
                      style={{
                        width: "100%",
                      }}
                      options={colorList.map((item) => ({
                        value: item.key,
                        label: item.value,
                      }))}
                    />

                    <small className="text-danger">
                      {formik.touched.color && formik.errors.color ? (
                        <div>{formik.errors.color}</div>
                      ) : null}
                    </small>
                  </div>
                </div>
                <div className="col-md-4">
                  <CustomInput
                    type="text"
                    id="price"
                    name="price"
                    label="Price"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.price}
                  />

                  <small className="text-danger">
                    {formik.touched.price && formik.errors.price ? (
                      <div>{formik.errors.price}</div>
                    ) : null}
                  </small>
                </div>
                <div className="col-md-4">
                  <CustomInput
                    type="text"
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                  />

                  <small className="text-danger">
                    {formik.touched.quantity && formik.errors.quantity ? (
                      <div>{formik.errors.quantity}</div>
                    ) : null}
                  </small>
                </div>
                <div className="col-md-4">
                  <CustomInput
                    type="text"
                    id="tags"
                    name="tags"
                    label="Tags"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.tags}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 p-4 mb-3">
              <h6>Publish</h6>
              <div className="row">
                <div className="col-md-12">
                  <CustomSelect
                    id="author"
                    label="Author"
                    name="author"
                    labelShow={true}
                    dataOption={authorList}
                    onChange={formik.handleChange}
                    value={formik.values.author}
                  />
                </div>
                <div className="col-md-12">
                  <CustomSelect
                    id="status"
                    label="Status"
                    name="status"
                    labelShow={true}
                    dataOption={statusList}
                    onChange={formik.handleChange}
                    value={formik.values.status}
                  />
                </div>

                <div className="col-md-12 d-md-flex justify-content-between ">
                  <button
                    type="submit"
                    className="btn btn-success custom_button text-white mt-3"
                  >
                    {action}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary custom_button text-white mt-3"
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger custom_button text-white mt-3"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="card border-0 p-4 mb-3">
              <h6>SEO</h6>
              <div className="row">
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="metaTitle"
                    name="metaTitle"
                    label="Meta Title"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.metaTitle}
                  />
                </div>
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="metaDes"
                    name="metaDes"
                    label="Meta Des"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.metaDes}
                  />
                </div>
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="metaKey"
                    name="metaKey"
                    label="Meta Key"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.metaKey}
                  />
                </div>
                <div className="col-md-12">
                  <CustomSelect
                    id="isIndexed"
                    label="Indexed"
                    name="indexed"
                    labelShow={false}
                    dataOption={selectIndex}
                    onChange={formik.handleChange}
                    value={formik.values.isIndexed}
                  />
                </div>
              </div>
            </div>
            <div className="card border-0 p-4 mb-3">
              <h6>Product Images</h6>
              <div className="row">
                <div className="col-md-12">
                  <CustomUpload fileList={fileList} setFileList={setFileList} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
