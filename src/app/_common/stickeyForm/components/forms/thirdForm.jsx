import React from 'react';

const ThirdForm = ({ formData, setFormData }) => {
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

  const handleSubmitOption3 = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('subject', 'Looking for Training');
    formDataToSend.append('name', formData.additionalFields?.option3?.name);
    formDataToSend.append('mobile-number', formData.additionalFields?.option3?.mobile);
    formDataToSend.append('email', formData.additionalFields?.option3?.email);
    formDataToSend.append('course', formData.additionalFields?.option3?.course);
    formDataToSend.append('schedule', formData.additionalFields?.option3?.schedule);
    formDataToSend.append('qualification', formData.additionalFields?.option3?.qualification);
    formDataToSend.append('additional-info', formData.additionalFields?.option3?.additionalInfo);
    formDataToSend.append('_wpcf7_unit_tag', '476'); 

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wp-json/contact-form-7/v1/contact-forms/476/feedback`,
        {
          method: 'POST',
          body: formDataToSend,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully for Training!', result);
      } else {
        const error = await response.json();
        console.error(`Error Option 3: ${error.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error(`Error Option 3: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitOption3}>
        <div className="form-group">
          <label>
            <span>Name:</span>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData?.additionalFields?.option3?.name || ''}
              onChange={(e) => handleFieldChange(e, 'option3')}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <span>Mobile Number:</span>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData?.additionalFields?.option3?.mobile || ''}
              onChange={(e) => handleFieldChange(e, 'option3')}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <span>Email:</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData?.additionalFields?.option3?.email || ''}
              onChange={(e) => handleFieldChange(e, 'option3')}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <span>Course Interested:</span>
            <input
              type="text"
              name="course"
              placeholder="Enter the course you are interested in"
              value={formData?.additionalFields?.option3?.course || ''}
              onChange={(e) => handleFieldChange(e, 'option3')}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <span>Preferred Schedule:</span>
            <input
              type="text"
              name="schedule"
              placeholder="Enter your preferred schedule"
              value={formData?.additionalFields?.option3?.schedule || ''}
              onChange={(e) => handleFieldChange(e, 'option3')}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <span>Qualification:</span>
            <input
              type="text"
              name="qualification"
              placeholder="Enter your qualification"
              value={formData?.additionalFields?.option3?.qualification || ''}
              onChange={(e) => handleFieldChange(e, 'option3')}
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
              value={formData?.additionalFields?.option3?.additionalInfo || ''}
              onChange={(e) => handleFieldChange(e, 'option3')}
            ></textarea>
          </label>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThirdForm;
