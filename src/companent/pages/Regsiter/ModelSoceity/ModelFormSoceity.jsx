import React, { useState } from "react";
import "./Model.scss";
import axios from "axios";
import { BaseUrl, localUrl } from "../../../../api/URL";
const ModelFormSoceity = ({ info, open, setOpen }) => {
  const [validet, setValidet] = useState({
    nomSociety: "",
    numFiscal: "",
  });
  const [numFiscal, setNumeroFiscal] = useState(false);
  const [nomSociety, setNomSociety] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [file, setFile] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const uploadedPdfUrl = URL.createObjectURL(selectedFile);
      setPdfUrl(uploadedPdfUrl);
      console.log("Uploaded PDF:", uploadedPdfUrl);
    }
  };
  const regitserAsSoc = async () => {
    const data = { ...info, numFiscal: numFiscal, pdfs: [pdfUrl] };
    console.log(data);
    const res= await axios.post(`${BaseUrl}/auth/signup`)
    try {
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="">
      <div onClick={() => handleClose()} className="close-btn">
        <span>X</span>
      </div>
      <div className="society-form">
        <div className="input-list">
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
                opacity: !numFiscal && validet.numFiscal !== "" ? "0" : "100%",
              }}
            >
              Num Fiscal
            </span>
            <input
              type="text"
              name="fullname"
              onFocus={() => setNumeroFiscal(true)}
              onBlur={() => setNumeroFiscal(false)}
              onChange={(e) =>
                setValidet({ ...validet, numFiscal: e.target.value })
              }
              required
            />
          </div>
          <div className="inputitem ">
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
          <div className="inputitem file">
            <input
              type="file"
              name="nomSociety"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>
        <button onClick={regitserAsSoc}>Save</button>
      </div>
      {pdfUrl && (
        <div className="pdf-viewer">
          {/* Display the contents of the uploaded PDF file */}
          <iframe src={pdfUrl} width="100%" height="500px" title="PDF Viewer" />
        </div>
      )}
    </div>
  );
};

export default ModelFormSoceity;
