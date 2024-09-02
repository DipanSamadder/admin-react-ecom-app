import React from "react";
import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";

const Login = () => {
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
        <div className="fs-exact-14 text-muted mt-2 pt-1 mb-2 pb-2">
          Log in to your account to continue.
        </div>
        <form>
          <CustomInput
            type="email"
            id="email"
            label="Email"
            labelShow={false}
          />
          <CustomInput
            type="password"
            id="password"
            label="Password"
            labelShow={false}
          />
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
          <Link to="/admin" className="w-100 btn btn-success mb-2">
            Success
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
