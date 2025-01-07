import React, { useState } from 'react';
import Image from 'next/image';

const ContactPopup = ({ isOpen, onClose, serviceNames, selectedService }) => {
    const [formData, setFormData] = useState({
        service: selectedService || '',
        name: '',
        email: '',
        number: '',
        message: ''
    });
    const [statusMessage, setStatusMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('service', formData.service);
        formDataToSend.append('your-name', formData.name);
        formDataToSend.append('your-email', formData.email);
        formDataToSend.append('your-number', formData.number);
        formDataToSend.append('your-message', formData.message);
        formDataToSend.append('_wpcf7_unit_tag', '478');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/contact-form-7/v1/contact-forms/478/feedback`, {
                method: 'POST',
                body: formDataToSend,
            });

            const result = await response.json();

            if (response.ok) {
                setStatusMessage('Enquiry sent successfully!');
                setFormData({ service: '', name: '', email: '', number: '', message: '' });
            } else {
                setStatusMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setStatusMessage(`Error: ${error.message}`);
        }
    };

    if (!isOpen) return null;

    return (
        <div className='service-popup'>
            <div className="popup-overlay">
                <div className="popup-content">
                    <button className="close-btn" onClick={onClose}>
                        <Image
                            src="/images/123.png"
                            layout="responsive"
                            width={100}
                            height={100}
                        />
                    </button>
                    <h2>Contact Our Experts</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="service">Select a Service</label>
                            <select
                                id="service"
                                name="service"
                                required
                                value={formData.service}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Select a Service
                                </option>
                                {serviceNames.map((service, index) => (
                                    <option key={index} value={service}>
                                        {service}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="number">Number</label>
                            <input
                                type="text"
                                id="number"
                                name="number"
                                required
                                value={formData.number}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                required
                                value={formData.message}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                    </form>
                    {statusMessage && <p className="status-message">{statusMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default ContactPopup;