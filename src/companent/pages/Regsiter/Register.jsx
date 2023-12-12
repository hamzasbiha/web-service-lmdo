import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { BaseUrl, localUrl } from "../../../api/URL";
import { current } from "@reduxjs/toolkit";
import ModelFormSoceity from "./ModelSoceity/ModelFormSoceity";
import { dark } from "@mui/material/styles/createPalette";
import { pdf } from "@react-pdf/renderer";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const Register = () => {
  const navgation = useNavigate();
  const [accounteTypes, setAccounteTypes] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validet, setValidet] = useState({
    fullName: "",
    email: "",
    password: "",
    lastname: "",
    confiPass: "",
    phone: "",
    nomSociety: "",
    numFiscal: "",
  });
  const [fullName, setFullName] = useState(false);
  const [emailfocused, setEmailFocused] = useState(false);
  const [password, setPassword] = useState(false);
  const [confiPass, setConfiPass] = useState(false);
  const [phone, setPhone] = useState(false);
  const [nomSociety, setNomSociety] = useState(false);
  const [numFiscal, setNumFiscal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const navigation = useNavigate();
  const handleAccountType = (event) => {
    setAccounteTypes(event.target.value);
  };
  const handleSubmite = async (e) => {
    e.preventDefault();
    const Formdata = new FormData(e.currentTarget);
    const data = Object.fromEntries(Formdata);
    const userData = { ...data, accountType: accounteTypes };
    console.log(userData.file)
    const type = userData.accountType;

    if (type === "Personal" || type === "Society") {
      const res = await axios
        .post(`${BaseUrl}/auth/signup`, userData)
        .then((res) => res.data)
        .catch((error) => {
          console.log(error);
        });
      // navgation("/connexion");
      const token = res.accesToken
      const format = new FormData()
      format.append('file', userData.file)
      const resPdf = await axios.post(
        `${BaseUrl}/auth/upload`,
        format,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(resPdf)
    } else {
      alert("Invalid account type selected.");
    }
  };


  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      const user = {
        fullname: userInfo.data.name,
        email: userInfo.data.email,
        accountType: "Personal",
      };
      const myResponse = await axios.post(`${BaseUrl}/auth/google`, user);
      sessionStorage.setItem("access", myResponse.data.accesToken);
      let isNew = myResponse.data.isNew;
      console.log(isNew);
      !isNew ? navgation("/") : navgation("/type");
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Register">
      <form onSubmit={handleSubmite}>
        <h1>s'inscrire</h1>
        <div className="input-list">
          <div className="inputitem">
            <span
              style={{
                transform: fullName
                  ? "translateX(10px) translateY(-17px) "
                  : "",
                fontSize: fullName ? "1.05em" : "",
                padding: fullName ? "0 10px" : "",
                color: fullName ? "#343a40" : "",
                transition: "all 0.3s ease",
                opacity: !fullName && validet.fullName !== "" ? "0" : "100%",
              }}
            >
              fullname
            </span>
            <input
              type="text"
              name="fullname"
              onFocus={() => setFullName(true)}
              onBlur={() => setFullName(false)}
              onChange={(e) =>
                setValidet({ ...validet, fullName: e.target.value })
              }
              required
            />
          </div>
          <div className="inputitem">
            <span
              style={{
                transform: emailfocused
                  ? "translateX(10px) translateY(-17px) "
                  : "",
                fontSize: emailfocused ? "1.05em" : "",
                padding: emailfocused ? "0 10px" : "",
                color: emailfocused ? "#343a40" : "",
                transition: "all 0.3s ease",
                opacity: !emailfocused && validet.email !== "" ? "0" : "100%",
              }}
            >
              Email
            </span>
            <input
              type="email"
              name="email"
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              onChange={(e) =>
                setValidet({ ...validet, email: e.target.value })
              }
              required
            />
          </div>
          <div className="inputitem">
            <span
              style={{
                transform: password
                  ? "translateX(10px) translateY(-17px) "
                  : "",
                fontSize: password ? "1.05em" : "",
                padding: password ? "0 10px" : "",
                color: password ? "#343a40" : "",
                transition: "all 0.3s ease",
                opacity: !password && validet.password !== "" ? "0" : "100%",
              }}
            >
              Password
            </span>
            <input
              autoComplete="current-password"
              type={!showPassword ? `password` : "text"}
              name="password"
              onFocus={() => setPassword(true)}
              onBlur={() => setPassword(false)}
              onChange={(e) =>
                setValidet({ ...validet, password: e.target.value })
              }
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
              title="Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long."
              required
            />
          </div>
          <div className="inputitem">
            <span
              style={{
                transform: confiPass
                  ? "translateX(10px) translateY(-17px) "
                  : "",
                fontSize: confiPass ? "1.05em" : "",
                padding: confiPass ? "0 10px" : "",
                color: confiPass ? "#343a40" : "",
                transition: "all 0.3s ease",
                opacity: !confiPass && validet.confiPass !== "" ? "0" : "100%",
              }}
            >
              Confirem Password
            </span>
            <input
              type={!showPassword ? `password` : "text"}
              name="password"
              onFocus={() => setConfiPass(true)}
              onBlur={() => setConfiPass(false)}
              onChange={(e) =>
                setValidet({ ...validet, confiPass: e.target.value })
              }
              required
            />
          </div>
          <div className="inputitem">
            <span
              style={{
                transform: phone ? "translateX(10px) translateY(-17px) " : "",
                fontSize: phone ? "1.05em" : "",
                padding: phone ? "0 10px" : "",
                color: phone ? "#343a40" : "",
                transition: "all 0.3s ease",
                opacity: !phone && validet.phone !== "" ? "0" : "100%",
              }}
            >
              Phone
            </span>
            <input
              type="text"
              name="phonenumber"
              onFocus={() => setPhone(true)}
              onBlur={() => setPhone(false)}
              onChange={(e) =>
                setValidet({ ...validet, phone: e.target.value })
              }
              required
            />
          </div>
          {accounteTypes === "Society" && (
            <>
              <div className="inputitem">
                <span
                  style={{
                    transform: nomSociety
                      ? "translateX(10px) translateY(-17px) "
                      : "",
                    fontSize: nomSociety ? "1.05em" : "",
                    padding: nomSociety ? "0 10px" : "",
                    color: nomSociety ? "#343a40" : "",
                    transition: "all 0.3s ease",
                    opacity:
                      !nomSociety && validet.nomSociety !== "" ? "0" : "100%",
                  }}
                >
                  Nom Society
                </span>
                <input
                  type="text"
                  name="nomSociety"
                  onFocus={() => setNomSociety(true)}
                  onBlur={() => setNomSociety(false)}
                  onChange={(e) =>
                    setValidet({ ...validet, nomSociety: e.target.value })
                  }
                  required
                />
              </div>
              <div className="inputitem">
                <span
                  style={{
                    transform: numFiscal
                      ? "translateX(10px) translateY(-17px) "
                      : "",
                    fontSize: numFiscal ? "1.05em" : "",
                    padding: numFiscal ? "0 10px" : "",
                    color: numFiscal ? "#343a40" : "",
                    transition: "all 0.3s ease",
                    opacity:
                      !numFiscal && validet.numFiscal !== "" ? "0" : "100%",
                  }}
                >
                  Num Fiscal
                </span>
                <input
                  type="text"
                  name="numFiscal"
                  onFocus={() => setNumFiscal(true)}
                  onBlur={() => setNumFiscal(false)}
                  onChange={(e) =>
                    setValidet({ ...validet, numFiscal: e.target.value })
                  }
                  required
                />
              </div>
              <div className="input-item-file">
                <input
                  name="file"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </>
          )}
        </div>
        <div className="inputitemCheckbox">
          <input type="checkbox" onClick={togglePasswordVisibility} />
          Show password ?
        </div>
        <div className="radio">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              accounteType
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="accounteType"
              onChange={handleAccountType}
              value={accounteTypes}
            >
              <MenuItem value={"Personal"}>personal</MenuItem>
              <MenuItem value={"Society"}>society</MenuItem>
            </Select>
          </FormControl>
        </div>
        <button>Connexion</button>
        <span className="or">
          <div className="center">Or</div>
        </span>
        <GoogleButton onClick={() => googleLogin()} />
        <div className="navgationto">
          <span>Anciens clients ? </span>
          <Link className="link" to={"/connexion"}>
            <span className="linkpage">Connectez-vous</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
