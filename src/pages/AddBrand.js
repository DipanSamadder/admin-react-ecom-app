import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import CustomUpload from "../components/CustomUpload";
import {
  addBrand,
  getABrand,
  resetbrandState,
  updateBrand,
} from "../features/brand/brandSlice";
import { getAllUser } from "../features/customers/customerSlice";

export default function AddBrand() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getEditID = location.pathname.split("/")[3];

  const newBrand = useSelector((state) => state.brand);
  const customerList = useSelector((state) => state.customer.customers || []);
  const [toastMessage, setTostMessage] = useState(false);
  const {
    isSuccess,
    isError,
    createBrandData,
    message,
    editData,
    updatedData,
  } = newBrand;

  const defaultData = editData ? editData : updatedData;
  console.log(defaultData);

  useEffect(() => {
    if (getEditID === undefined) {
      formik.resetForm();
      setFileList([]);
    }
  }, [getEditID]);

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

  const [fileList, setFileList] = useState([]);
  const authorOptions = useMemo(
    () =>
      customerList
        .filter((val) => val.role === "admin")
        .map((val) => ({
          key: val._id,
          value: `${val.firstname} ${val.lastname}`,
        })),
    [customerList]
  );

  console.log(fileList);

  let schemaValidation = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
  });

  const showImage =
    getEditID !== undefined && defaultData?.images
      ? defaultData.images.map((img) => ({
          publicId: img.public_id,
          url: img.url,
          status: "done",
          uid: img.public_id,
          name: img.url,
        }))
      : [];

  useEffect(() => {
    if (getEditID !== undefined) {
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
  }, [getEditID, defaultData]);

  const formik = useFormik({
    initialValues: {
      title: getEditID !== undefined ? defaultData?.title || "" : "",
      shortDes: getEditID !== undefined ? defaultData?.shortDes || "" : "",
      author: getEditID !== undefined ? defaultData?.author || "" : "",
      status: getEditID !== undefined ? defaultData?.status || "" : "",
      metaDes: getEditID !== undefined ? defaultData?.metaDes || "" : "",
      metaKey: getEditID !== undefined ? defaultData?.metaKey || "" : "",
      metaTitle: getEditID !== undefined ? defaultData?.metaTitle || "" : "",
      isIndexed: getEditID !== undefined ? defaultData?.isIndexed || "" : "",
      images: showImage !== undefined ? showImage : [] || [],
    },
    validationSchema: schemaValidation,
    enableReinitialize: true,
    onSubmit: (values) => {
      values.images = fileList.map((file) => ({
        public_id: file.uid, // Assuming `uid` is the identifier for public_id
        url: file.url, // Assuming `publicId` is the URL or file path
      }));
      if (getEditID !== undefined) {
        values.brand_id = getEditID;
        setTostMessage(true);
        dispatch(updateBrand(values));
      } else {
        setTostMessage(true);
        dispatch(addBrand(values));
      }
    },
  });

  useEffect(() => {
    if (
      getEditID !== undefined &&
      showImage.length > 0 &&
      fileList.length === 0
    ) {
      setFileList(showImage);
    }
    if (toastMessage) {
      if (isSuccess && updatedData && message !== null) {
        setTostMessage(false);
        toast.success(message);
        setTimeout(function () {
          navigate("/admin/brand-list");
        }, 1000);
        dispatch(resetbrandState());
      }
      if (isError) {
        toast.error(message);
      }
    }
  }, [
    isSuccess,
    isError,
    updatedData,
    message,
    resetbrandState,
    dispatch,
    showImage,
    setFileList,
    getEditID,
  ]);

  useEffect(() => {
    dispatch(getAllUser());
    if (toastMessage) {
      if (isSuccess && createBrandData && message !== null) {
        toast.success(message);
        setFileList([]);
        formik.resetForm();
        setTimeout(function () {
          navigate("/admin/brand-list");
          dispatch(resetbrandState());
        }, 3000);
      }
      if (isError) {
        toast.error(message);
        dispatch(resetbrandState());
      }
    }
  }, [
    isSuccess,
    isError,
    resetbrandState,
    createBrandData,
    message,
    dispatch,
    navigate,
  ]);

  useEffect(() => {
    if (getEditID !== undefined) {
      dispatch(getABrand(getEditID));
    }
  }, [dispatch, getABrand, getEditID]);

  return (
    <div>
      <h3 className="mb-5">{getEditID !== undefined ? "Edit" : "Add"} Brand</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="card border-0 p-4 mb-3">
              <h6>Title</h6>
              <div className="row">
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="title"
                    label="Brand Name"
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
                    label="About Brand"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.shortDes}
                  />
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
                    label="Meta Key"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.metaKey}
                  />
                </div>
                <div className="col-md-12">
                  <CustomSelect
                    id="isIndexed"
                    label="Select Indexed"
                    labelShow={false}
                    dataOption={selectIndex}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.isIndexed}
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
                    labelShow={true}
                    dataOption={authorOptions}
                    onChange={formik.handleChange}
                    value={formik.values.author}
                  />

                  <small className="text-danger">
                    {formik.touched.author && formik.errors.author ? (
                      <div>{formik.errors.author}</div>
                    ) : null}
                  </small>
                </div>
                <div className="col-md-12">
                  <CustomSelect
                    id="status"
                    label="Status"
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
                    {getEditID !== undefined ? "Update" : "Publish"}
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
              <h6 className="mb-2">Category Images</h6>
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
