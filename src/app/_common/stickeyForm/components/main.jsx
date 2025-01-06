import React from 'react'
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


const Main = () => {
  return (
    <div>
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
    </div>
  )
}

export default Main