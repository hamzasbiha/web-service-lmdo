import React from "react";
import "./formsociety.scss";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import { Box, FormControl, InputLabel, TextField, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SocietyForm = () => {
  const [open, setOpen] = useState(true);
  const [type, setType] = useState("");
  const navgation = useNavigate();
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleClose = () => {
    navgation("/");
    setOpen(false);
  };
  console.log(type);
  return (
    <div className="form-society">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <div className="modal">
          <Box sx={{ minWidth: 180, gap: 25, alignItems: "center" }}>
            <FormControl sx={{ minWidth: 250 }} fullWidth>
              <TextField
                id="outlined-basic"
                label="Num fiscal"
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>
          </Box>
          <Button variant="contained" onClick={() => handleClose()}>
            Apply
          </Button>
        </div>
      </Backdrop>
    </div>
  );
};

export default SocietyForm;
