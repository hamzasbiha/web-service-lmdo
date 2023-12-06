import React, { useState } from "react";
import "./Setting.scss";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { updateUser } from "../../../../redux/client/ClientSlice";
const Setting = () => {
  const dispatch = useDispatch();
  const [accType, setAccType] = useState("");
  const user = useSelector((state) => state.user.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let updateduser = Object.fromEntries(formData);
    console.log(accType)
    const userUpd = {
      ...updateduser,
      accountType: accType,
    };
    let token = sessionStorage.getItem("access");
    console.log(userUpd);
    dispatch(updateUser({ token: token, user: userUpd }));
  };
  const handleChange = (event) => {
    setAccType(event.target.value);
  };
  return (
    <div className="setting">
      <h1>Gere vtore compte</h1>
      <form onSubmit={handleSubmit}>
        <div className="col">
          <div className="row">
            <label>FullName</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              defaultValue={user.fullname}
            />
          </div>
          <div className="row">
            <label>email</label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={user.email}
            />
          </div>
          <div className="row">
            <label>mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*******"
              required
            />
          </div>
        </div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            accountType
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            onChange={handleChange}
            value={accType} // Use the accType state as the value
            defaultValue={user.accountType}
          >
            <MenuItem value={"Personal"}>Personal</MenuItem>
            <MenuItem value={"Society"}>company</MenuItem>
          </Select>
        </FormControl>
        <div className="btn">
          <button>Update</button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
