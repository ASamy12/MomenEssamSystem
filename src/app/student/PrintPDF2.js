"use client";

import React, { useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { useReactToPrint } from "react-to-print";
import maleImage from "./assets/male.png";

const StudentIDCard = ({ students, onClose }) => {
  const componentRef = useRef();
  console.log("st", students);

  const print = useReactToPrint({
    contentRef: componentRef,
  });
  const handlePrint = () => {
    console.log(componentRef.current);
    print();
  };
  const buttonBaseStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    margin: "10px",
    border: "none",
  };

  const printButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#007bff",
    color: "#fff",
  };

  const closeButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#dc3545",
    color: "#fff",
  };

  return (
    <div>
      <button onClick={handlePrint} style={printButtonStyle}>
        Print/Download as PDF
      </button>
      <button onClick={onClose} style={closeButtonStyle}>
        Close
      </button>
      <div ref={componentRef} id="dev">
        {students.map((student) => (
          <div
            key={student.id}
            style={{
              width: "1024px",
              height: "512px",
              backgroundImage: `url(${maleImage.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
              marginBottom: "280px",
              fontFamily: "'Cairo', Arial, sans-serif", // Use Google Font
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "40px",
                left: "240px",
                color: "black",
                fontSize: "28px",
                // direction: "rtl", // Right-to-left text direction for Arabic
              }}
            >
              {student.name}
            </div>
            <div
              style={{
                position: "absolute",
                top: "130px",
                left: "350px",
                color: "black",
                fontSize: "40px",
              }}
            >
              {student.id}
            </div>
            <div style={{ position: "absolute", top: "270px", left: "400px" }}>
              <QRCode value={String(student.id)} size={200} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentIDCard;
