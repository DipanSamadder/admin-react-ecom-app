import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import CustomUpload from "../components/CustomUpload";
import { getAllUser } from "../features/customers/customerSlice";

import {
  createProCate,
  getACate,
  resetProCateState,
  updateProCate,
} from "../features/proCat/proCatSlice";

export default function AddCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getEditID = location.pathname.split("/")[3];
  const [action, setAction] = useState("Add");
  const [fileList, setFileList] = useState([]);
  const customerList = useSelector((state) => state.customer.customers || []);

  const [toastMessage, setTostMessage] = useState(false);
  const newCate = useSelector((state: any) => state.pcat);

  const {
    isSuccess,
    isError,
    createProCateData,
    message,
    editProCateData,
    updateProCateData,
  } = newCate;

  const defaultData = editProCateData || updateProCateData;
  console.log(defaultData);

  useEffect(() => {
    if (getEditID === undefined) {
      setAction("Add");
      formik.resetForm();
      setFileList([]);
      dispatch(resetProCateState());
    }
  }, [getEditID, resetProCateState]);

  useEffect(() => {
    if (getEditID !== undefined) {
      dispatch(getACate(getEditID));
      setAction("Update");
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
      indexed: getEditID !== undefined ? defaultData?.indexed || "" : "",
      images: showImage !== undefined ? showImage : [] || [],
    },
    validationSchema: schemaValidation,
    enableReinitialize: true,
    onSubmit: (values) => {
      values.images = fileList.map((file) => ({
        public_id: file.uid,
        url: file.url,
      }));
      if (getEditID === undefined) {
        setTostMessage(true);
        dispatch(createProCate(values));
      } else {
        values._id = getEditID;
        setTostMessage(true);
        dispatch(updateProCate(values));
      }
    },
  });

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  useEffect(() => {
    if (
      getEditID !== undefined &&
      showImage.length > 0 &&
      fileList.length === 0
    ) {
      setFileList(showImage);
    }
    if (toastMessage) {
      if (isSuccess && updateProCateData && message !== null) {
        setTostMessage(false);
        toast.success(message);
        // Delay navigation by 3 seconds
        setTimeout(() => {
          navigate("/admin/category-list");
          dispatch(resetProCateState());
        }, 3000); // 3000 milliseconds = 3 seconds
      }

      if (isError) {
        toast.error(message);
        dispatch(resetProCateState());
      }
    }
  }, [
    isSuccess,
    isError,
    updateProCateData,
    message,
    resetProCateState,
    toastMessage,
    navigate,
    dispatch,
  ]);

  useEffect(() => {
    if (toastMessage) {
      if (isSuccess && createProCateData) {
        setTostMessage(false);
        toast.success(message);
        formik.resetForm();
        // Delay navigation by 3 seconds
        setTimeout(() => {
          navigate("/admin/category-list");
          dispatch(resetProCateState());
        }, 3000); // 3000 milliseconds = 3 seconds
      }

      if (isError) {
        toast.error(message);
        dispatch(resetProCateState());
      }
    }
  }, [
    isSuccess,
    isError,
    createProCateData,
    message,
    resetProCateState,
    toastMessage,
    navigate,
    dispatch,
  ]);

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

  return (
    <div>
      <h3 className="mb-5">{action} Category</h3>
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
                    label="Category Name"
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
                    label="About Category"
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
                    label="Indexed"
                    labelShow={false}
                    dataOption={selectIndex}
                    onChange={formik.handleChange}
                    value={formik.values.indexed}
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
