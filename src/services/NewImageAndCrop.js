import React, { useState } from "react";
import Cropper from "react-easy-crop";
import "react-image-crop/dist/ReactCrop.css";

const NewImageAndCrop = ({
  uploadUserImage,
  userImageLink,
  setUserImageLink,
  userImageLoading,
  title,
  ratioHeigh,
  ratioWidth,
  idNumber,
  setIsDisplay,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState("");

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);

    setCroppedAreaPixels(croppedAreaPixels);
  };

  // ... (previous code)

  const showCroppedImage = async () => {
    try {
      const croppedImageBlob = await getCroppedImgBlob(
        image,
        croppedAreaPixels
      );
      const croppedImageBase64 = await convertBlobToBase64(croppedImageBlob);

      uploadUserImage(croppedImageBase64);
    } catch (e) {
      console.error(e);
    }
  };

  const getCroppedImgBlob = (url, pixelCrop) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
          img,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        canvas.toBlob((blob) => {
          resolve(blob);
        });
      };
      img.src = url;
    });

  const convertBlobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  // ... (remaining code)

  const handleKeyDown = (event) => {
    if (event.key === "d" || event.key === "D") {
      showCroppedImage();
      setImage("");
    }
  };

  const handleCancel = () => {
    setUserImageLink("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels("");
    setImage("");
    //   document.getElementById("uploadCaptureInputFile").value = "";
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="mb-3">
        <label for="formFile" className="form-label">
          {title}
        </label>
        {!userImageLink && !userImageLoading && (
          <input
            className="form-control"
            type="file"
            id={idNumber}
            accept=".jpg, .jpeg, .png"
            onChange={(e) => {
              scrollToTop();
              setTimeout(() => {
                setImage(URL.createObjectURL(e.target.files[0]));
              }, 1000);
              setTimeout(() => {
                scrollToTop();
              }, 1000);

              //  scrollToTop();
            }}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>

      {image && (
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={ratioWidth / ratioHeigh}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      )}
      {image && (
        <div
          style={{
            position: "fixed",
            top: 30,
          }}
        >
          <div>
            <button
              className="btn btn-success m-2 "
              onClick={() => {
                showCroppedImage();
                setImage("");
              }}
            >
              Crop
            </button>
            <button
              className="btn btn-danger m-2 "
              onClick={() => {
                handleCancel();
                document.getElementById(idNumber).value = "";
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {userImageLoading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      <div className=" ">
        {userImageLink && (
          <img
            src={userImageLink}
            alt=""
            style={{ width: "200px", borderRadius: "10px" }}
          />
        )}
        <div>
          {userImageLink && (
            <button className="btn btn-danger mt-2 " onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewImageAndCrop;
