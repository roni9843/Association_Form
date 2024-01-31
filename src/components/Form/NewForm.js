import React, { useState } from "react";
import styled from "styled-components";
import NewImageAndCrop from "../../services/NewImageAndCrop";
import "./NewForm.css";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
`;

const ErrorText = styled.div`
  color: red;
  margin-top: 5px;
`;

const NewForm = () => {
  // ? main state
  const [formData, setFormData] = useState({
    userName: "",
    userNumber: "",
    userFathersName: "",
    userMothersName: "",
  });

  const [blood, setBlood] = useState("");

  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorForDup, setErrorForDup] = useState("");

  const [errors, setErrors] = useState({
    userName: "",
    userImage: "",
    userBloodGroup: "",
    userNidCardImageLink: "",
    userNumber: "",
    userFathersName: "",
    userFathersNiDCardImageLink: "",
    userMothersName: "",
    userMothersNidCardImageLink: "",
    NomineeNidCardImageLink: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear validation errors when user starts typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      userName: "",
      userImage: "",
      userBloodGroup: "",
      userNidCardImageLink: "",
      userNumber: "",
      userFathersName: "",
      userFathersNiDCardImageLink: "",
      userMothersName: "",
      userMothersNidCardImageLink: "",
      NomineeNidCardImageLink: "",
    };

    // Validate userName
    if (!formData.userName.trim()) {
      newErrors.userName = "Please enter your name";
      isValid = false;
    }

    // Validate userNumber
    if (!formData.userNumber.trim()) {
      newErrors.userNumber = "Please enter your number";
      isValid = false;
    }

    // Validate userFathersName
    if (!formData.userFathersName.trim()) {
      newErrors.userFathersName = "Please enter your father's name";
      isValid = false;
    }

    // Validate userMothersName
    if (!formData.userMothersName.trim()) {
      newErrors.userMothersName = "Please enter your mother's name";
      isValid = false;
    }

    // Validate blood
    if (!blood.trim()) {
      newErrors.userBloodGroup = "Please enter your blood group";
      isValid = false;
    }

    // Validate userImageLink
    if (!userImageLink.trim()) {
      newErrors.userImage = "Please submit your picture";
      isValid = false;
    }

    // Validate userNidImageLink
    if (!userNidImageLink.trim()) {
      newErrors.userNidCardImageLink = "Please submit your NID picture";
      isValid = false;
    }

    // Validate userFatherImageLink
    if (!userFatherImageLink.trim()) {
      newErrors.userFathersNiDCardImageLink =
        "Please submit your father's NID picture";
      isValid = false;
    }

    // Validate userMotherImageLink
    if (!userMotherImageLink.trim()) {
      newErrors.userMothersNidCardImageLink =
        "Please submit your mother's NID picture";
      isValid = false;
    }

    // Validate userNomineeImageLink
    if (!userNomineeImageLink.trim()) {
      newErrors.NomineeNidCardImageLink =
        "Please submit your nominee's NID picture";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userValidationInput = await validateForm();

    console.log("hlww45r ", userValidationInput);
    if (userValidationInput === false) {
      // If validation fails, don't proceed with the submission
      return;
    }

    const data = {
      userName: formData.userName,
      userImage: userImageLink,
      userBloodGroup: blood,
      userNidCardImageLink: userNidImageLink,
      userNumber: formData.userNumber,
      userFathersName: formData.userFathersName,
      userFathersNiDCardImageLink: userFatherImageLink,
      userMothersName: formData.userMothersName,
      userMothersNidCardImageLink: userMotherImageLink,
      NomineeNidCardImageLink: userNomineeImageLink,
    };

    console.log("hlww ", data, userValidationInput);

    try {
      setLoading(true);

      const response = await fetch("http://localhost:4000/postForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Handle error accordingly
      setErrorForDup("Error submitting form data. Please try again.");
      setTimeout(() => {
        setErrorForDup("");
        setLoading(false);
      }, 5000);
    }
  };

  // ^ user image state
  const [userImageLink, setUserImageLink] = useState("");
  const [userImageLoading, setUserImageLoading] = useState(false);
  // ? upload the user image
  const uploadUserImage = async (props) => {
    setUserImageLoading(true);
    const awaitForUserImage = await uploadImage(props);
    setUserImageLoading(false);
    setUserImageLink(awaitForUserImage.data.url);
  };

  // ^ user NID image state
  const [userNidImageLink, setUserNidImageLink] = useState("");
  const [userNidImageLoading, setUserNidImageLoading] = useState(false);
  // ? upload the user image
  const uploadUserNidImage = async (props) => {
    console.log(props);
    setUserNidImageLoading(true);
    const awaitForUserImage = await uploadImage(props);
    setUserNidImageLoading(false);
    setUserNidImageLink(awaitForUserImage.data.url);
  };

  // ^ user Father NID image state
  const [userFatherImageLink, setUserFatherImageLink] = useState("");
  const [userFatherImageLoading, setUserFatherImageLoading] = useState(false);
  // ? upload the user image
  const uploadUserFatherImage = async (props) => {
    setUserFatherImageLoading(true);
    const awaitForUserImage = await uploadImage(props);
    setUserFatherImageLoading(false);
    setUserFatherImageLink(awaitForUserImage.data.url);
  };

  // ^ user Mother NID image state
  const [userMotherImageLink, setUserMotherImageLink] = useState("");
  const [userMotherImageLoading, setUserMotherImageLoading] = useState(false);
  // ? upload the user image
  const uploadUserMotherImage = async (props) => {
    setUserMotherImageLoading(true);
    const awaitForUserImage = await uploadImage(props);
    setUserMotherImageLoading(false);
    setUserMotherImageLink(awaitForUserImage.data.url);
  };

  // ^ user Mother NID image state
  const [userNomineeImageLink, setUserNomineeImageLink] = useState("");
  const [userNomineeImageLoading, setUserNomineeImageLoading] = useState(false);
  // ? upload the user image
  const uploadUserNomineeImage = async (props) => {
    setUserNomineeImageLoading(true);
    const awaitForUserImage = await uploadImage(props);
    setUserNomineeImageLoading(false);
    setUserNomineeImageLink(awaitForUserImage.data.url);
  };

  // !! don't touch
  // ? upload the image
  const uploadImage = async (props) => {
    const apiUrl = "https://api.imgbb.com/1/upload";
    const apiKey = "b7424c6aa6bf3ab8f5c2a405e70531a2";

    const formData = new FormData();
    formData.append("key", apiKey);
    formData.append("image", props);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      return result;
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  // ? for clean all field
  const clearAllValue = () => {
    setFormData({
      studentName: "",
      dateOfBirth: "",
      fathersName: "",
      session: "",
      mothersName: "",
      father_pesha: "",
      present_address: "",
      permanent_address: "",
      ovivhaboker_nam: "",
      ovivhaboker_thikana: "",
      class: "",
      previous_school: "",
      previous_school_place: "",
      others_bro_sis: "",
      others_bro_sis_name: "",
      others_bro_sis_class: "",
      others_bro_sis_sec: "",
      dhromo: "",
      nationality: "",
      birth_certificate_number: "",
      studentRoll: "",
      studentBloodGrp: "",
    });

    document.getElementById("uploadCaptureInputFile").value = "";

    // now create a success msg ..when submit btn click and success then show success msg..but success message should show only 10s
  };

  const [isDisplay, setIsDisplay] = useState(true);

  return (
    <FormContainer
      style={{ display: `${isDisplay === "none" ? "none" : "block"}` }}
    >
      <h2 style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
        নতুন সোনাকান্দা যুব সমাজ
      </h2>
      <Form onSubmit={handleSubmit}>
        <form className="px-3">
          {/* Your other form inputs */}
          {/* ... */}

          <div className=" mt-3">
            <NewImageAndCrop
              uploadUserImage={uploadUserImage}
              userImageLink={userImageLink}
              setUserImageLink={setUserImageLink}
              userImageLoading={userImageLoading}
              title={"Your Image : "}
              ratioHeigh={5}
              ratioWidth={5}
              idNumber={"userImageInput"}
            ></NewImageAndCrop>
            <ErrorText>{errors.userImage}</ErrorText>
          </div>

          {/* Student Name */}
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Your name :
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              aria-describedby="userName"
              value={formData.userName}
              onChange={handleInputChange}
            />
            <ErrorText>{errors.userName}</ErrorText>
          </div>

          {/* Student Blood Group */}
          <div className="mb-3">
            <label htmlFor="studentBloodGrp" className="form-label">
              Blood Group :
            </label>
            <select
              className="form-select"
              aria-label="Select Blood Group"
              onChange={(e) => setBlood(e.target.value)}
            >
              <option disabled selected>
                Select Blood Group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B">B</option>
              <option value="B+">B+</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <ErrorText>{errors.userBloodGroup}</ErrorText>
          </div>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Your Number :
            </label>
            <input
              type="number"
              className="form-control"
              id="userNumber"
              name="userNumber"
              aria-describedby="userName"
              value={formData.userNumber}
              onChange={handleInputChange}
            />
            <ErrorText>{errors.userNumber}</ErrorText>
          </div>

          {/* Class */}
          <div className="mb-3">
            <div className=" mt-3">
              <NewImageAndCrop
                uploadUserImage={uploadUserNidImage}
                userImageLink={userNidImageLink}
                setUserImageLink={setUserNidImageLink}
                userImageLoading={userNidImageLoading}
                title={"Your NID card image : "}
                ratioHeigh={2.5}
                ratioWidth={3}
                idNumber={"userNIDInput"}
              ></NewImageAndCrop>
              <ErrorText>{errors.userNidCardImageLink}</ErrorText>
            </div>
          </div>

          {/* Session */}
          <div className="mb-3">
            <label htmlFor="userFathersName" className="form-label">
              Father's name :
            </label>
            <input
              type="text"
              className="form-control"
              id="userFathersName"
              name="userFathersName"
              aria-describedby="userFathersName"
              value={formData.userFathersName}
              onChange={handleInputChange}
            />
            <ErrorText>{errors.userFathersName}</ErrorText>
          </div>

          <div className="mb-3">
            <div className=" mt-3">
              <NewImageAndCrop
                uploadUserImage={uploadUserFatherImage}
                userImageLink={userFatherImageLink}
                setUserImageLink={setUserFatherImageLink}
                userImageLoading={userFatherImageLoading}
                title={"Your father's NID card image : "}
                ratioHeigh={2.5}
                ratioWidth={3}
                idNumber={"userNIDInput"}
              ></NewImageAndCrop>
              <ErrorText>{errors.userFathersNiDCardImageLink}</ErrorText>
            </div>
          </div>

          {/* Student Roll */}
          <div className="mb-3">
            <label htmlFor="userMothersName" className="form-label">
              Mother's name :
            </label>
            <input
              type="text"
              className="form-control"
              id="userMothersName"
              name="userMothersName"
              aria-describedby="userMothersName"
              value={formData.userMothersName}
              onChange={handleInputChange}
            />
            <ErrorText>{errors.userMothersName}</ErrorText>
          </div>
          <div className="mb-3">
            <div className=" mt-3">
              <NewImageAndCrop
                uploadUserImage={uploadUserMotherImage}
                userImageLink={userMotherImageLink}
                setUserImageLink={setUserMotherImageLink}
                userImageLoading={userMotherImageLoading}
                title={"Your mother's NID card image : "}
                ratioHeigh={2.5}
                ratioWidth={3}
                idNumber={"userNIDInput"}
              ></NewImageAndCrop>
              <ErrorText>{errors.userMothersNidCardImageLink}</ErrorText>
            </div>
          </div>
          <div className="mb-3">
            <div className=" mt-3">
              <NewImageAndCrop
                uploadUserImage={uploadUserNomineeImage}
                userImageLink={userNomineeImageLink}
                setUserImageLink={setUserNomineeImageLink}
                userImageLoading={userNomineeImageLoading}
                title={"Nominee's NID card image : "}
                ratioHeigh={2.5}
                ratioWidth={3}
                idNumber={"userNIDInput"}
                setIsDisplay={setIsDisplay}
              ></NewImageAndCrop>
              <ErrorText>{errors.NomineeNidCardImageLink}</ErrorText>
            </div>
          </div>
        </form>

        {showSuccessMessage && (
          <div className="success-message">Form submitted successfully!</div>
        )}
        {errorForDup && <div className="error-message">{errorForDup}</div>}

        {loading ? (
          "Loading..."
        ) : (
          <SubmitButton className="m-3" type="submit">
            {" "}
            Submit{" "}
          </SubmitButton>
        )}
      </Form>
    </FormContainer>
  );
};

export default NewForm;
