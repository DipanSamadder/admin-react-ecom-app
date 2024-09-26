import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import { createColor, resetColorData } from "../features/color/colorSlice";
import { getAllUser } from "../features/customers/customerSlice";

export default function AddColor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerList = useSelector((state) => state.customer.customers || []);
  const [toastMessage, setTostMessage] = useState(false);
  const newColor = useSelector((state: any) => state.color);
  const { isSuccess, isError, createColorData, message } = newColor;

  const statusList = [
    { key: true, value: "Publish" },
    { key: false, value: "Private" },
  ];

  let schemaValidation = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      colorCode: "",
      author: "",
      status: "",
    },
    validationSchema: schemaValidation,
    onSubmit: (values) => {
      setTostMessage(true);

      dispatch(createColor(values));
    },
  });

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  useEffect(() => {
    if (toastMessage) {
      console.log(toastMessage);

      if (isSuccess && createColorData) {
        setTostMessage(false);
        toast.success(message);
        formik.resetForm();
        // Delay navigation by 3 seconds
        setTimeout(() => {
          navigate("/admin/color-list");
          dispatch(resetColorData());
        }, 3000); // 3000 milliseconds = 3 seconds
      }

      if (isError) {
        toast.error(message);
        dispatch(resetColorData());
      }
    }
  }, [
    isSuccess,
    isError,
    createColorData,
    message,
    resetColorData,
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
      <h3 className="mb-5">Add Color</h3>
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
                    id="colorCode"
                    label="Color Code"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.colorCode}
                  />
                  <small className="text-danger">
                    {formik.touched.colorCode && formik.errors.colorCode ? (
                      <div>{formik.errors.colorCode}</div>
                    ) : null}
                  </small>
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
          </div>
        </div>
      </form>
    </div>
  );
}
