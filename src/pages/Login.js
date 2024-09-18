import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {useDispatch, useSelector} from 'react-redux';
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let schemaValidation = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schemaValidation,
    onSubmit: values => {
      dispatch(login(values));

    },
  });

  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth);
  useEffect(()=>{


    if(!user == null || isSuccess){
      navigate('admin');
    }
    
  },[user,isSuccess]);
  return (
    <div
      className="w-100 bg-body-tertiary d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div
        className="shadow-sm bg-white p-4 border rounded"
        style={{ minWidth: "400px" }}
      >
        <h1 className="mb-0">Sign In</h1>
        <div className="text-danger">
          {isError === true && message !== null ? message : ""}
        </div>
        <div className="fs-exact-14 text-muted mt-2 pt-1 mb-2 pb-2">
          Log in to your account to continue.
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="email"
            id="email"
            name="email"
            label="Email"
            labelShow={false}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <small className="text-danger">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
          </small>
          <CustomInput
            type="password"
            id="password"
            label="Password"
            name="password"
            labelShow={false}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <small className="text-danger">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
          </small>
          <div className="mb-4 row py-2 flex-wrap">
            <div className="col-auto me-auto">
              <label className="form-check mb-0">
                <input type="checkbox" className="form-check-input" />
                <span className="form-check-label">Remember me</span>
              </label>
            </div>
            <div className="col-auto d-flex align-items-center">
              <a href="auth-forgot-password.html">Forgot password?</a>
            </div>
          </div>
          <button type="submit"  className="w-100 btn btn-success mb-2">
            Success
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
