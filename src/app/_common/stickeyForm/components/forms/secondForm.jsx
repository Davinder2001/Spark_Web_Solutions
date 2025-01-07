import React from "react";

const SecondForm = ({ formData, setFormData }) => {
  const handleFieldChange = (e, formType) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      additionalFields: {
        ...prev.additionalFields,
        [formType]: {
          ...prev.additionalFields[formType],
          [name]: files ? files[0] : value,
        },
      },
    }));
  };

  const handleSubmitOption2 = async (e) => {
    e.preventDefault();



    const formDataToSend = new FormData();
    formDataToSend.append("your-subject", 'Join Our Team');
    formDataToSend.append("your-name", formData.additionalFields?.option2?.name);
    formDataToSend.append("your-email", formData.additionalFields?.option2?.email);
    formDataToSend.append("current-location", formData.additionalFields?.option2?.location);
    formDataToSend.append("status", formData.additionalFields?.option2?.status);
    formDataToSend.append("resume", formData.additionalFields?.option2?.resume);
    formDataToSend.append("additional-info", formData.additionalFields?.option2?.additionalInfo);
    formDataToSend.append("_wpcf7_unit_tag", "467");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wp-json/contact-form-7/v1/contact-forms/467/feedback`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        const error = await response.json();
        console.error("Error submitting form:", error);
        alert("Failed to submit the form. Please check the input data.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmitOption2}>
      <div className="form-group">
        <label>
          <span>Name:</span>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData?.additionalFields?.option2?.name || ""}
            onChange={(e) => handleFieldChange(e, "option2")}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          <span>Email Address:</span>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData?.additionalFields?.option2?.email || ""}
            onChange={(e) => handleFieldChange(e, "option2")}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          <span>Current Location:</span>
          <input
            type="text"
            name="location"
            placeholder="Enter your current location"
            value={formData?.additionalFields?.option2?.location || ""}
            onChange={(e) => handleFieldChange(e, "option2")}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          <span>Current Status:</span>
          <select
            name="status"
            value={formData?.additionalFields?.option2?.status || ""}
            onChange={(e) => handleFieldChange(e, "option2")}
          >
            <option value="" disabled>
              Select your status
            </option>
            <option value="experienced">Experienced</option>
            <option value="fresher">Fresher</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label>
          <span>Resume:</span>
          <input
            type="file"
            name="resume"
            onChange={(e) => handleFieldChange(e, "option2")}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          <span>Additional Information:</span>
          <textarea
            name="additionalInfo"
            placeholder="Provide any additional information"
            rows="4"
            value={formData?.additionalFields?.option2?.additionalInfo || ""}
            onChange={(e) => handleFieldChange(e, "option2")}
          ></textarea>
        </label>
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default SecondForm;
