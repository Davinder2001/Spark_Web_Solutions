import React, { useState } from 'react';
import Image from 'next/image';
import SecondForm from './components/forms/secondForm' 
import ThirdForm from './components/forms/thirdForm'

const StickeyForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    step1: '',
    additionalFields: {},
  });



  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Redirect to the "Our Services" page for option 1
    if (name === 'step1') {
      if (value === 'option1') {
        window.location.href = '/our-services';
      } else {
        setTimeout(() => {
          setCurrentStep(2);
        }, 300);
      }
    }
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
            <Image
              src="/images/123.png"
              layout="responsive"
              width={100}
              height={100}
            />
          </button>
        </div>
      </div>

      {/* Step 1 */}
      {currentStep === 1 && (
        <div className="step">
          <h3>What brings you to our website today?</h3>
          <div className="form-group">
            <div className="option-container">
              <label>
                <span>Looking for Web Solutions?</span>
                <input
                  type="radio"
                  name="step1"
                  value="option1"
                  checked={formData.step1 === 'option1'}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="option-container">
              <label>
                <span>Join Our Team</span>
                <input
                  type="radio"
                  name="step1"
                  value="option2"
                  checked={formData.step1 === 'option2'}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="option-container">
              <label>
                <span>Looking for Training</span>
                <input
                  type="radio"
                  name="step1"
                  value="option3"
                  checked={formData.step1 === 'option3'}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </div>
      )}



      {/* Step 2 */}
      {currentStep === 2 && (
        <>
        
          {formData.step1 === 'option2' && (
            <SecondForm formData={formData} setFormData={setFormData} />
          )}
          {formData.step1 === 'option3' && (
            <ThirdForm formData={formData} setFormData={setFormData} />
          )}
        </>
      )}
    </div>
  );
};

export default StickeyForm;
