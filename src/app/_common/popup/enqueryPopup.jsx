"use client";
import React, { useState } from 'react';

const EnquiryPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    yourfirstname: '',
    yourlastname: '',
    youremail: '',
    yournumber: '',
    yourmessage: '',
  });

  const [statusMessage, setStatusMessage] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form data using FormData
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('yourfirstname', formData.yourfirstname);
    formDataToSend.append('yourlastname', formData.yourlastname);
    formDataToSend.append('youremail', formData.youremail);
    formDataToSend.append('yournumber', formData.yournumber);
    formDataToSend.append('yourmessage', formData.yourmessage);
    formDataToSend.append('_wpcf7_unit_tag', '414');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/contact-form-7/v1/contact-forms/414/feedback`, {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage('Enquiry sent successfully!');
      } else {
        setStatusMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className='popup-container popup'>
      <div className='popup-content'>
      <div className='form-top-bar'>
        <h2></h2>
        <button type='button' onClick={onClose}>Close</button>
      </div>
        <p>Please fill in your details:</p>
        <form onSubmit={handleSubmit}>
          <div className='container-for-four'>
            <div className='form-control'>
              <label htmlFor='yourfirstname'>First Name</label>
              <input
                type='text'
                id='yourfirstname'
                name='yourfirstname'
                value={formData.yourfirstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-control'>
              <label htmlFor='yourlastname'>Last Name</label>
              <input
                type='text'
                id='yourlastname'
                name='yourlastname'
                value={formData.yourlastname}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-control'>
              <label htmlFor='youremail'>Email Address</label>
              <input
                type='email'
                id='youremail'
                name='youremail'
                value={formData.youremail}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-control'>
              <label htmlFor='yournumber'>Mobile Number</label>
              <input
                type='tel' // Changed to 'tel' for mobile number
                id='yournumber'
                name='yournumber'
                value={formData.yournumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className='form-control'>
            <label htmlFor='yourmessage'>Your Message</label>
            <textarea
              id='yourmessage'
              name='yourmessage'
              value={formData.yourmessage}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type='submit'>Send Enquiry</button>
        </form>
        {statusMessage && <p>{statusMessage}</p>}
      </div>
    </div>
  );
};

export default EnquiryPopup;
