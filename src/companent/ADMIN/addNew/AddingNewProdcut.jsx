import React, { useEffect, useState } from "react";
import defImage from "../../../assets/gif/default.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DriveFolderUpload from "@mui/icons-material/DriveFolderUpload";
import { useDispatch } from "react-redux";
import { addProductApi } from "../../../redux/products/productSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "react-toastify/dist/ReactToastify.css";
import "./Add.scss";
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
const AddingNewProdcut = () => {
  const token = sessionStorage.getItem("access");
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [published, setPublished] = React.useState("");
  const [Category, setCategory] = useState("");
  const [selectedimg, setSelectedImage] = useState(0);
  const [ArraImage, setArraImage] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    // If upload is complete, set progress to 100%
    if (uploadProgress === 100) {
      setProgress(100);
    }
  }, [uploadProgress]);
  
  const handleFileChange = (e) => {
    const files = e.target.files;
    const selectedFileArray = Array.from(files);
    console.log(files);
    setSelectedFiles(selectedFileArray);
  };
  const handleChange = (event) => {
    setPublished(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const stock = formData.get("stock");
    const porductVal = Object.fromEntries(formData);
    const finalVal = {
      ...porductVal,
      category: Category,
      images: ArraImage,
      published: published,
      stock: parseInt(stock),
    };
    dispatch(addProductApi({ token: token, product: finalVal })).then(
      (action) => {
        if (action.type === "product/create/fulfilled") {
          toast.success("Product Has Been Added", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Something Went wrong come back later !", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    );
  };
  const handleImageUpload = async () => {
    try {
      const uploadedImages = [];
      for (const [index, file] of selectedFiles.entries()) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "bgze1za2");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/drywnffrv/image/upload",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );
        uploadedImages.push(response.data.secure_url);
      }
      setArraImage(uploadedImages);
    } catch (error) {
      console.error(`Error uploading images to Cloudinary:`, error);
    }
  };
  useEffect(() => {
    if (selectedFiles.length > 0) {

      handleImageUpload();
    }
  }, [selectedFiles]);

  return (
    <div className="add">
      <div className="add-container">
        <ToastContainer />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom-add">
          <div className="left-add">
            <div className="mainimg">
              {progress > 10 ? <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}><CircularProgressWithLabel value={uploadProgress} /></div> : <img
                alt=""
                src={
                  ArraImage && ArraImage.length !== 0
                    ? ArraImage[selectedimg]
                    : defImage
                }
              />}
            </div>
            <div className="row-imgs">
              {progress > 10 ? (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}> <CircularProgressWithLabel value={progress} /></div>
              ) : (
                ArraImage?.length !== 0 ? (
                  ArraImage.map((item, index) => (
                    <div key={index}>
                      <img
                        alt=""
                        src={item}
                        onClick={() => setSelectedImage(index)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="row-imgs">
                    <img alt="" src={defImage} />
                    <img alt="" src={defImage} />
                    <img alt="" src={defImage} />
                  </div>
                )
              )}

            </div>
          </div>
          <div className="right-add">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Upload : <DriveFolderUpload className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="images"
                  multiple
                  style={{
                    display: "none",
                  }}
                  onChange={handleFileChange}
                />
              </div>
              <div className="formInput">
                <label>title</label>
                <input type="text" id="title" name="title" />
              </div>
              <div className="formInput">
                <label>description</label>
                <textarea
                  rows="5"
                  cols="33"
                  type="text"
                  id="content"
                  name="content"
                />
              </div>
              <div className="formInput">
                <label>Market</label>
                <input type="text" id="market" name="market" />
              </div>
              <div className="formInput">
                <label>type food</label>
                <input type="text" id="typefood" name="typefood" />
              </div>
              <div className="formInput">
                <label>Qunatite</label>
                <input type="text" id="quantity" name="quantity" />
              </div>
              <div className="formInput">
                <label>Price For Company</label>
                <input
                  type="text"
                  id="priceForCompany"
                  name="priceForCompany"
                />
              </div>
              <div className="formInput">
                <label>Price For Personal</label>
                <input
                  type="text"
                  id="priceForPersonal"
                  name="priceForPersonal"
                />
              </div>
              <div className="formInput">
                <label>stock</label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="stock"
                  name="stock"
                />
              </div>
              <div className="formInput">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={Category}
                    onChange={handleCategoryChange}
                    label="Age"
                  >
                    <MenuItem value={"Chats"}>Chats</MenuItem>
                    <MenuItem value={"Chien"}>Chien</MenuItem>
                    <MenuItem value={"Oiseaux"}>Oiseaux</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Visiblity
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={published}
                    onChange={handleChange}
                    label="Age"
                  >
                    <MenuItem value={"Private"}>private</MenuItem>
                    <MenuItem value={"Public"}>publish</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddingNewProdcut;
