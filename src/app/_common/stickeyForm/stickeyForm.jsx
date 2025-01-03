import React, { useState } from 'react';

const StickeyForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    step1: '',
    step2: '',
    name: '',
    email: '',
    message: '',
  });
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add logic to handle form submission, such as API calls.
  };

  return (
    <div className="stickey-form">
      <div className="form-header">
        <div className="headings">
            <h2>Welcome To</h2>
            <h5>Spark Web Solutions</h5>
        </div>
        <div className="close-popup">
          <button className="close-button" onClick={onClose}>
          &times;
        </button>
        </div>
      </div>

      {/* Step 1 */}
      {currentStep === 1 && (
        <div className="step">
          <h3>What brings you to our website today? </h3>
          <div className="form-group">
            <div className="option-container">
            <label>
              <input
                type="radio"
                name="step1"
                value="option1"
                checked={formData.step1 === 'option1'}
                onChange={handleChange}
              />
              Option 1
            </label>
            </div>
            <div className="option-container">
            <label>
              <input
                type="radio"
                name="step1"
                value="option2"
                checked={formData.step1 === 'option2'}
                onChange={handleChange}
              />
              Option 2
            </label>
            </div>
            <div className="option-container">
            <label>
              <input
                type="radio"
                name="step1"
                value="option3"
                checked={formData.step1 === 'option3'}
                onChange={handleChange}
              />
              Option 3
            </label>
          </div>
          </div>
          <button className="next-button" onClick={handleNextStep} disabled={!formData.step1}>
            Next
          </button>
        </div>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <div className="step">
          <h3>Select Another Option</h3>
          <div className="form-group">
            <label>
              <input
                type="radio"
                name="step2"
                value="optionA"
                checked={formData.step2 === 'optionA'}
                onChange={handleChange}
              />
              Option A
            </label>
            <label>
              <input
                type="radio"
                name="step2"
                value="optionB"
                checked={formData.step2 === 'optionB'}
                onChange={handleChange}
              />
              Option B
            </label>
            <label>
              <input
                type="radio"
                name="step2"
                value="optionC"
                checked={formData.step2 === 'optionC'}
                onChange={handleChange}
              />
              Option C
            </label>
          </div>
          <button className="prev-button" onClick={handlePreviousStep}>
            Previous
          </button>
          <button className="next-button" onClick={handleNextStep} disabled={!formData.step2}>
            Next
          </button>
        </div>
      )}

      {/* Step 3 */}
      {currentStep === 3 && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              required
            />
          </div>
          <button className="prev-button" onClick={handlePreviousStep} type="button">
            Previous
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default StickeyForm;
