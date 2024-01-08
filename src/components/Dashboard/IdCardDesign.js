import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import logo from "../../logo/photo_2024-01-06_19-21-29.png";

export default function IdCardDesign({
  student_image,
  name,
  roll,
  student_class,
  session,
  studentBloodGrp,
}) {
  const imageRef = useRef(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const [isDownload, setIsDownload] = useState(false);

  const fetchFun = async () => {};

  const [rowImage, setRowImage] = useState("");

  const handleDownloadMain = async () => {
    if (imageLoaded) {
      try {
        const response = await fetch(student_image);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        console.log(response);
        console.log(blob);
        console.log(blobUrl);
        setRowImage(blobUrl);

        setIsDownload(true);

        setTimeout(() => {
          idDownload();
        }, 500);
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
  };

  // download the id
  const idDownload = async () => {
    // Get the reference to the div element
    const divToDownload = document.getElementById(
      `table-container-main${student_image}`
    );

    // Use html2canvas to convert the div to an image with higher quality
    const canvas = await html2canvas(divToDownload, { scale: 3 }); // Increase the scale for higher resolution

    // Convert the canvas content to a data URL
    const dataUrl = canvas.toDataURL("image/jpeg");

    // Create a temporary link element
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${name}_c_${student_class}_r_${roll}.jpg`; // Specify the desired file name

    // Trigger a click on the link to start the download
    a.click();
  };

  return (
    <div>
      <div id={`table-container-main${student_image}`}>
        <IdCard>
          <div className="body ">
            <div>
              <div
                style={{
                  textAlign: "center",
                  paddingTop: "10px",
                  paddingBottom: "2px",
                }}
              >
                <img src={logo} alt="logo" style={{ width: "50px" }} />
              </div>
              <div>
                <h6
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Merriweather', serif",
                    fontWeight: "bold",
                  }}
                >
                  Natun Sonakanda High School
                </h6>
              </div>
              <div>
                <h6
                  style={{
                    fontSize: "9px",
                    fontFamily: "'Merriweather', serif",
                    textAlign: "center",

                    marginTop: "-5px",
                  }}
                >
                  Natun Sonakanda, Ruhitpur,
                </h6>
              </div>
              <div>
                <h6
                  style={{
                    fontSize: "9px",
                    fontFamily: "'Merriweather', serif",
                    textAlign: "center",
                    marginTop: "-5px",
                  }}
                >
                  Keranigonj, Dhaka-1310
                </h6>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    margin: "0 15px",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontWeight: "bold",
                        fontFamily: "'Merriweather', serif",
                        fontSize: "15px",
                      }}
                    >
                      Student
                    </h3>
                  </div>
                  <div>
                    {isDownload ? (
                      <img
                        //  ref={imageRef}
                        style={{
                          width: "55px",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "1px solid black",
                        }}
                        src={rowImage}
                        alt=""
                      />
                    ) : (
                      <img
                        onLoad={handleImageLoad}
                        ref={imageRef}
                        style={{
                          width: "55px",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "1px solid black",
                        }}
                        src={student_image}
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#ACEFFF",
                  //  backgroundColor: "red",
                  margin: "5px 0px",
                  textAlign: "center",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Merriweather', serif",
                      fontSize: "14px",
                      padding: "3px",
                    }}
                  >
                    {name}
                  </h3>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'Merriweather', serif",
                  fontSize: "10px",
                  paddingLeft: "15px",
                  fontWeight: "bold",
                }}
              >
                <div>
                  <span>Class</span>
                  <span
                    style={{
                      paddingLeft: "36px",
                    }}
                  >
                    : {student_class}
                  </span>
                </div>
                <div>
                  <span>Roll</span>
                  <span
                    style={{
                      paddingLeft: "42px",
                    }}
                  >
                    : {roll}
                  </span>
                </div>
                <div>
                  <span>Session</span>
                  <span
                    style={{
                      paddingLeft: "25px",
                    }}
                  >
                    : {session}
                  </span>
                </div>
                <div>
                  <span>Blood Group</span>
                  <span
                    style={{
                      paddingLeft: "0px",
                    }}
                  >
                    : {studentBloodGrp}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </IdCard>
      </div>
      <div className="p-2">
        <button onClick={handleDownloadMain}>Download</button>
      </div>
    </div>
  );
}

const IdCard = styled.form`
  .body {
    margin: 0;
    padding: 0;
    display: flex;
    /* align-items: center; */
    justify-content: center;
    width: 2in;
    height: 3.2in;
    background-color: #eaf9fe;
    font-family: Arial, sans-serif;
  }
`;
