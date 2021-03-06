import React, { useState } from "react";
import PropTypes from "prop-types";

import AuthFormWrapper from "../shared/AuthFormWrapper";
import UIFormInput from "../shared/UIFormInput";

const LoginPage = ({ onHandleChange, handleLoginClick, ...rest }) => {
  const [type, setType] = useState("password");
  const env = process.env.NODE_ENV;

  return (
    <AuthFormWrapper
      dataTestId="login-page"
      buttonText="Log In"
      handleClick={handleLoginClick}
      authCta="Can't log in? Sign up for an account"
      redirect="/signup"
      {...rest}
    >
      <UIFormInput
        autoFocus
        placeholder="Email"
        type="email"
        name="email"
        onChange={(e) => onHandleChange(e)}
        defaultValue={env === "development" ? "test@testing.com" : ""}
        input
      />

      <UIFormInput
        iconProps={{
          name: type === "password" ? "eye" : "hide",
          link: true,
          onClick: () => setType(type === "password" ? "text" : "password"),
        }}
        defaultValue={env === "development" ? "testing123" : ""}
        placeholder="Password"
        name="password"
        type={type}
        onChange={(e) => onHandleChange(e)}
        dataTestId="password-input-field"
        input
      />
    </AuthFormWrapper>
  );
};

LoginPage.propTypes = {
  handleLoginClick: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired,
};

export default LoginPage;
