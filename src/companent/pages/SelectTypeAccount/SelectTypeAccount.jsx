import "./SelectTypeAccount.scss";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SelectTypeAccount = () => {
  const [open, setOpen] = useState(true);
  const [type, setType] = useState("");
  const navgation = useNavigate();

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleClose = () => {
    if (type === "Personal") {
      navgation("/");
      setOpen(false);
    } else {
      if (type === "Society") {
        navgation("/society");
      }
    } // setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Button onClick={handleOpen}>Show backdrop</Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <div className="modal">
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" required>
                Accounte type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="type"
                onChange={handleChange}
              >
                <MenuItem value={"Personal"}>Personal</MenuItem>
                <MenuItem value={"Society"}>Society</MenuItem>
              </Select>
              <Button onClick={() => handleClose()}>Apply</Button>
            </FormControl>
          </Box>
        </div>
      </Backdrop>
    </div>
  );
};
