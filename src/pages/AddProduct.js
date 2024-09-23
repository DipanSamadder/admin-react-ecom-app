import React, { useEffect, useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import { addProducts, resetState } from "../features/product/productSlice";
import { getBrands } from "../features/brand/brandSlice";
import { getProCate } from "../features/proCat/proCatSlice";
import { getAllUser } from "../features/customers/customerSlice";
import { Select } from 'antd';
import { getColorList } from "../features/color/colorSlice";
import { Image, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { uploadFile, deleteFile } from "../features/upload/uploadSlice";
import { ToastContainer, toast } from 'react-toastify';


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


export default function AddProduct() {
  const dispatch = useDispatch();
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
  const getBrandList = useSelector((state)=> state.brand.brands  || []);
  const getCateList = useSelector((state)=> state.pcat.data  || []);
  const customerList = useSelector((state) => state.customer.customers || []);
  const addPro = useSelector((state) => state.product || []);


  // Memoize derived data to prevent unnecessary re-renders
  const brandlist = useMemo(() => getBrandList.map((val) => ({
    key: val._id,
    value: val.title,
  })), [getBrandList]);

  const categoryList = useMemo(() => getCateList.map((val) => ({
    key: val._id,
    value: val.title,
  })), [getCateList]);

  const colorList = useMemo(() => getColorsList.map((val) => ({
    key: val._id,
    value: val.title,
  })), [getColorsList]);


  const authorList = useMemo(() => customerList.filter((val) => val.role === 'admin').map((val) => ({
    key: val._id,
    value: `${val.firstname} ${val.lastname}`,
  })), [customerList]);

  const [isHtmlView, setIsHtmlView] = useState(false); 
  const editorStyle = { height: "300px" };
  // Modules for ReactQuill
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  // Formats for ReactQuill
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "script",
    "indent",
    "direction",
    "color",
    "background",
    "align",
    "link",
    "image",
    "video",
  ];


  let schemaValidation = Yup.object({
    title: Yup.string().required('Title is required'),
    price: Yup.string().required('Price is required'),
    quantity: Yup.string().required('Quantity is required'),
    color: Yup.array().min(1, 'Select at last one color.').required('color is required'),
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  

  const formik = useFormik({
    initialValues: {
      title: '',
      shortDes: '',
      description: '',
      category: '',
      brand: '',
      color: '',
      price: '',
      quantity: '',
      author: '',
      status: '',
      metaDes: '',
      metaKey: '',
      metaTitle: '',
      indexed: '',
      images: [],
    },
    validationSchema: schemaValidation,
    onSubmit: (values,{resetForm}) => {
      values.images = fileList.map(file => file.uid);
      dispatch(addProducts(values));
     
    },
  });


  // Handle the toggle between editor and HTML view
  const handleToggleView = () => {
    setIsHtmlView(!isHtmlView);
  };


  // Handle File Upload using FormData
  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append('images', file);
    dispatch(uploadFile(formData))
      .then((response) => {
          // Assuming response.data contains the uploaded file details
          const uploadedFiles = response.payload.data; // Get the array of uploaded files
          const newFileList = uploadedFiles.map((uploadedFile) => ({
              uid: uploadedFile._id,
              name: file.name,
              status: 'done',
              url: uploadedFile.url,
              publicId: uploadedFile.publicId,
          }));

          // Update the fileList with new images
          setFileList(prevFileList => {
              // Remove the 'uploading' file and add the new files
              return prevFileList.filter(item => item.status !== 'uploading').concat(newFileList);
          });
          toast.success(`${file.name} ${response.payload.data.message}`);
      })
      .catch((response) => {
          toast.error(`${response.payload.data.message}`);
      });
  };


  // Handle File Delete using API
  const handleRemove = async (file) => {
    dispatch(deleteFile(file.publicId)) // Use the publicId or ID that your API requires
    .then(() => {
        const newFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(newFileList);
        toast.success(`${file.name} deleted successfully.`);

    })
    .catch(() => {
      toast.error('File deletion failed.');

    });
  };


useEffect(()=> {
  dispatch(getBrands());
  dispatch(getProCate());
  dispatch(getAllUser());
  dispatch(getColorList());

  if (addPro.isSuccess ===true && addPro.message !== undefined) {
    toast.success(addPro.message);
    formik.resetForm();
    dispatch(resetState()); // Reset state after success
  }

  
  if (addPro.isError ===true  && addPro.message !== undefined) {
    toast.error(addPro.message);
    dispatch(resetState()); // Reset state after error
  }
  
},[addPro, dispatch]);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <div>
      <h3 className="mb-5">Add Product</h3>
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
                    label="Blog Title"
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
                    label="Blog short des"
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
                  <div className="mb-1">
                    <button
                      type="button"
                      onClick={handleToggleView}
                      className="btn p-0"
                      style={{ fontSize: "10px" }}
                    >
                      {isHtmlView ? "Editor" : "HTML"}
                    </button>
                  </div>
                  {isHtmlView ? (
                    <textarea
                      className="form-control mb-5"
                      rows="10"
                      style={editorStyle}
                      onChange={(e) => formik.setFieldValue('description', e.target.value)}  // Manually setting field value
                      value={formik.values.description}
                      name="description"
                      placeholder="Start writing..."
                    />
                  ) : (
                    <ReactQuill
                      id="description"
                      className="mb-5"
                      name="description"
                      placeholder="Start writing..."
                      onChange={(value) => formik.setFieldValue('description', value)}  // Manually setting field value
                      value={formik.values.description}
                      style={editorStyle}
                      modules={modules}
                      formats={formats}
                      theme="snow"
                    />
                  )}
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
                  <label htmlFor="color" className="form-label">Color</label>

                  <Select id="color"
                      label="Color"
                      name="color"
                      allowClear
                      mode="multiple"
                      placeholder="Select colors"
                      value={formik.values.color} // Formik state value for the select
                      onChange={(value) => {formik.setFieldValue('color', value); }} // Update form value on change
                      style={{
                        width: '100%',
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
                    Publish
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
                    value={formik.values.indexed}
                  />
                </div>
                
              </div>
            </div>
            <div className="card border-0 p-4 mb-3">
              <h6>Product Images</h6>
              <div className="row">
                <div className="col-md-12">
           
                <Upload

                    customRequest={handleUpload}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onRemove={handleRemove} 
                    onChange={handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{
                        display: 'none',
                      }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                      }}
                      src={previewImage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
