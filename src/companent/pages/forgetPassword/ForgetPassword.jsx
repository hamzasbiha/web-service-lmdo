import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./ForgetPassword.scss";
import { RestPassword, verifyUsere } from "../../../redux/client/ClientSlice";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [linkExpired, setLinkExpired] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      dispatch(verifyUsere(tokenParam)).then((type) => {
        console.log(type);
        if (type.type === "verify-user/rejected") {
          setLinkExpired(true);
        } else {
          if (type.type === "verify-user/fullfiled") {
            setLinkExpired(false);
          }
        }
      });
    }
  }, [dispatch, linkExpired]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const handleSubmit = () => {
    dispatch(RestPassword({ token, password }));
    // Optionally, you can navigate here after password reset is initiated
    navigation("/connexion");
  };
  return (
    <div className="forget-form">
      {linkExpired ? (
        <div className="forget-form">
          <h1>This Link Has Been expired</h1>
        </div>
      ) : (
        <>
          <h1>Reset Password</h1>
          <div className="form">
            <div className="input-item">
              <div>
                <label>New Password</label>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="input-item">
              <div>
                <label>Confirm Password</label>
              </div>
              <input
                type="password"
                id="confirm"
                name="confirm"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            {passwordMatch ? null : (
              <div className="error-message">Passwords do not match.</div>
            )}
            {linkExpired && (
              <div className="error-message">The reset link has expired.</div>
            )}
            <div className="btn">
              <button onClick={handleSubmit}>Reset Password</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ForgetPassword;
