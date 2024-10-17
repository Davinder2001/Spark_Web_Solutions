'use client';
import { useContext, useState } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';

const FormSection = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'contact-us')?.acf;

    // State for form input values, including phone number
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
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

        // Create a FormData object
        const formDataToSend = new FormData();
        formDataToSend.append('yourname', formData.name);
        formDataToSend.append('youremail', formData.email);
        formDataToSend.append('yournumber', formData.phone);
        formDataToSend.append('yourmessage', formData.message);
        formDataToSend.append('_wpcf7_unit_tag', 289);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/contact-form-7/v1/contact-forms/289/feedback`, {
                method: 'POST',
                body: formDataToSend, // Send FormData object
            });

            const result = await response.json();
    
            if (response.ok) {
                alert(result.message)
            } else {
                setStatusMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setStatusMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>{mainData?.page_title}</h2>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
            <Image 
            src={mainData?.main_image} 
            alt="Main Image" 
            layout="responsive" 
            width={100} 
            height={50} 
           
            />

            {/* Status Message */}
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
};

export default FormSection;
