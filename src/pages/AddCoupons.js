import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import {
  createCoupons,
  getACoupons,
  resetCoupon,
  updateCoupons,
} from "../features/coupon/couponSlice";
import { getAllUser } from "../features/customers/customerSlice";

export default function AddCoupons() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getEditId = location.pathname.split("/")[3];
  const [action, setAction] = useState("Add");
  const customerList = useSelector((state) => state.customer.customers || []);
  const [toastMessage, setTostMessage] = useState(false);
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    createCouponData,
    message,
    EditCouponData,
    UpdateCouponData,
  } = newCoupon;
  useEffect(() => {
    if (getEditId !== undefined) {
      dispatch(getACoupons(getEditId));
      setAction("Update");
    } else {
      setAction("Add");
    }
  }, [dispatch, getACoupons, getEditId]);

  const defaultData = EditCouponData || UpdateCouponData;
  const statusList = [
    { key: true, value: "Publish" },
    { key: false, value: "Private" },
  ];

  let schemaValidation = Yup.object({
    name: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: getEditId !== undefined ? defaultData?.name || "" : "",
      expiry: getEditId !== undefined ? defaultData?.expiry || "" : "",
      discount: getEditId !== undefined ? defaultData?.discount || "" : "",
      author: getEditId !== undefined ? defaultData?.author || "" : "",
      status: getEditId !== undefined ? defaultData?.status || "" : "",
    },
    validationSchema: schemaValidation,
    enableReinitialize: true,
    onSubmit: (values) => {
      setTostMessage(true);
      if (getEditId !== undefined) {
        values._id = getEditId;
        dispatch(updateCoupons(values));
      } else {
        dispatch(createCoupons(values));
      }
    },
  });

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  useEffect(() => {
    if (toastMessage) {
      if (isSuccess && UpdateCouponData && message !== null) {
        setTostMessage(false);
        toast.success(message);
        formik.resetForm();
        // Delay navigation by 3 seconds
        setTimeout(() => {
          navigate("/admin/coupon-list");
          dispatch(resetCoupon());
        }, 1000); // 3000 milliseconds = 3 seconds
      }

      if (isError && message !== null) {
        toast.error(message);
        dispatch(resetCoupon());
      }
    }
  }, [
    formik,
    isSuccess,
    isError,
    UpdateCouponData,
    message,
    toastMessage,
    navigate,
    dispatch,
  ]);
  useEffect(() => {
    if (toastMessage) {
      if (isSuccess && createCouponData) {
        setTostMessage(false);
        toast.success(message);
        formik.resetForm();
        // Delay navigation by 3 seconds
        setTimeout(() => {
          navigate("/admin/coupon-list");
          dispatch(resetCoupon());
        }, 1000); // 3000 milliseconds = 3 seconds
      }

      if (isError) {
        toast.error(message);
        dispatch(resetCoupon());
      }
    }
  }, [
    formik,
    isSuccess,
    isError,
    createCouponData,
    message,
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
      <h3 className="mb-5">Add Coupon</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="card border-0 p-4 mb-3">
              <h6>Title</h6>
              <div className="row">
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="name"
                    label="Coupon Name"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <small className="text-danger">
                    {formik.touched.name && formik.errors.name ? (
                      <div>{formik.errors.name}</div>
                    ) : null}
                  </small>
                </div>
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="expiry"
                    label="Expiry"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.expiry}
                  />
                </div>
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="discount"
                    label="Discount Amount"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.discount}
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
          </div>
        </div>
      </form>
    </div>
  );
}
