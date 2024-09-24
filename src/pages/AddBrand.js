import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import CustomUpload from "../components/CustomUpload";
import { addBrand, resetbrandState } from "../features/brand/brandSlice";
import { getAllUser } from "../features/customers/customerSlice";

export default function AddBrand() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newBrand = useSelector((state) => state.brand);
  const customerList = useSelector((state) => state.customer.customers || []);

  const { isSuccess, isError, createBrandData, message } = newBrand;
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
  let schemaValidation = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      shortDes: "",
      author: "",
      status: "",
      metaDes: "",
      metaKey: "",
      metaTitle: "",
      indexed: "",
      images: [],
    },
    validationSchema: schemaValidation,
    onSubmit: (values) => {
      values.images = fileList.map((file) => file.uid);
      dispatch(addBrand(values));
    },
  });

  useEffect(() => {
    dispatch(getAllUser());
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
  }, [
    isSuccess,
    isError,
    resetbrandState,
    createBrandData,
    message,
    dispatch,
    navigate,
  ]);
  return (
    <div>
      <h3 className="mb-5">Add Brand</h3>
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
