import React from "react";
import CustomInput from "../components/CustomInput";

const Reset = () => {
  return (
    <div
      className="w-100 bg-body-tertiary d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div
        className="shadow-sm bg-white p-4 border rounded"
        style={{ minWidth: "400px" }}
      >
        <h1 className="mb-0">Reset Password</h1>
        <div className="fs-exact-14 text-muted mt-2 pt-1 mb-2 pb-2">
          Enter your new password
        </div>
        <form>
          <CustomInput
            type="password"
            id="password"
            label="Password"
            labelShow={false}
          />
          <div className="mb-4 row py-2 flex-wrap">
            <div className="col-auto d-flex align-items-center">
              <a href="auth-forgot-password.html">Login</a>
            </div>
          </div>
          <button type="submit" className="w-100 btn btn-success mb-2">
            Success
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
