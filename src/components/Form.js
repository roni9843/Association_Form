import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ImageCrop from "./ImageCrop";

import ReactToPrint from "react-to-print";
import IdCrad from "./IdCrad";

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

const StudentForm = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    fathersName: "",
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

  // ? student image
  const [student_image, setStudent_image] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateAge = () => {
    // You can implement the age calculation logic here based on the date of birth
    // Update the state with the calculated age
  };

  useEffect(() => {
    calculateAge();
  }, [formData.dateOfBirth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    console.log(formData);
  };

  let componentRef = useRef();

  return (
    <FormContainer>
      <div className="p-2">
        <ImageCrop setStudent_image={setStudent_image}></ImageCrop>
      </div>

      <Form onSubmit={handleSubmit}>
        {/* Add your form fields here */}

        <form className="p-3 ">
          <div className="mb-3">
            <label for="studentName" className="form-label">
              ছাত্র / ছাত্রীর নাম :
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              name="studentName"
              aria-describedby="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName2" className="form-label">
              পিতার নাম :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName2"
              name="fathersName"
              aria-describedby="studentName2"
              value={formData.fathersName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName3" className="form-label">
              মাতার নাম :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName3"
              name="mothersName"
              aria-describedby="studentName3"
              value={formData.mothersName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName4" className="form-label">
              পেশা :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName4"
              name="father_pesha"
              aria-describedby="studentName4"
              value={formData.father_pesha}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName5" className="form-label">
              বর্তমান ঠিকানা :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName5"
              name="present_address"
              aria-describedby="studentName5"
              value={formData.present_address}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName6" className="form-label">
              স্থায়ী ঠিকানা :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName6"
              name="permanent_address"
              aria-describedby="studentName6"
              value={formData.permanent_address}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName7" className="form-label">
              অভিভাবকের নাম ( পিতার অবর্তমানে ) :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName7"
              name="ovivhaboker_nam"
              aria-describedby="studentName7"
              value={formData.ovivhaboker_nam}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName8" className="form-label">
              ঠিকানা :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName8"
              name="ovivhaboker_thikana"
              aria-describedby="studentName8"
              value={formData.ovivhaboker_thikana}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName9" className="form-label">
              কোন শ্রেণিতে ভর্তি হতে ইচ্ছুক :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName9"
              name="class"
              aria-describedby="studentName9"
              value={formData.class}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName10" className="form-label">
              অন্য কোন স্কুলে পরে থাকেল সেই স্কুলের নাম :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName10"
              name="previous_school"
              aria-describedby="studentName10"
              value={formData.previous_school}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName12" className="form-label">
              ঠিকানা :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName12"
              name="previous_school_place"
              aria-describedby="studentName12"
              value={formData.previous_school_place}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName11" className="form-label">
              অন্য কোন ভাই / বোন স্কুলে পড়ে :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName11"
              name="others_bro_sis"
              aria-describedby="studentName11"
              value={formData.others_bro_sis}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label for="studentName13" className="form-label">
              নাম :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName13"
              name="others_bro_sis_name"
              aria-describedby="studentName13"
              value={formData.others_bro_sis_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName14" className="form-label">
              শ্রেণি :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName14"
              aria-describedby="studentName14"
              name="others_bro_sis_class"
              value={formData.others_bro_sis_class}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName15" className="form-label">
              শাখা :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName15"
              name="others_bro_sis_sec"
              aria-describedby="studentName15"
              value={formData.others_bro_sis_sec}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName16" className="form-label">
              জন্ম তারিখ :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName16"
              name="dateOfBirth"
              aria-describedby="studentName16"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName17" className="form-label">
              ধর্ম :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName17"
              name="dhromo"
              aria-describedby="studentName17"
              value={formData.dhromo}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName18" className="form-label">
              জাতীয়তা :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName18"
              name="nationality"
              aria-describedby="studentName18"
              value={formData.nationality}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentName19" className="form-label">
              জন্ম নিবন্ধন নং :
            </label>
            <input
              type="email"
              className="form-control"
              id="studentName19"
              name="birth_certificate_number"
              aria-describedby="studentName19"
              value={formData.birth_certificate_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentBloodGrp" className="form-label">
              রক্ত গ্রুপ :
            </label>
            <input
              type="text"
              className="form-control"
              id="studentBloodGrp"
              name="studentBloodGrp"
              aria-describedby="studentBloodGrp"
              value={formData.studentBloodGrp}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label for="studentRoll" className="form-label">
              রোল :
            </label>
            <input
              type="number"
              className="form-control"
              id="studentRoll"
              name="studentRoll"
              aria-describedby="studentRoll"
              value={formData.studentRoll}
              onChange={handleInputChange}
            />
          </div>
        </form>

        <SubmitButton className="m-3" type="submit">
          Submit
        </SubmitButton>
      </Form>

      <div style={{ display: "flex", paddingBottom: "100px" }}>
        <div>
          <div className="p-2" ref={(el) => (componentRef = el)}>
            <IdCrad formData={formData} student_image={student_image} />
          </div>
        </div>

        <div className="p-2">
          <ReactToPrint
            trigger={() => {
              return <SubmitButton type="submit">Print</SubmitButton>;
            }}
            content={() => componentRef}
            //   documentTitle="new document"
            //   pageStyle="print"
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default StudentForm;
