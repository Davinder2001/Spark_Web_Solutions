'use client';
import { createContext, useState, useEffect } from 'react';

// Create the context
export const SectorDataContext = createContext(undefined);

// Provider component
export const SectorDataProvider = ({ children }) => {
    const [pagesDataApi, setPagesDataApi] = useState([]); // Data from first API (Pages)
    const [testimonialsApi, setTestimonialsApi] = useState(null); // Data from second API (Testimonials)
    const [postDataApi, setPostDataApi] = useState(null); // Data from third API (Posts)

    const [loading, setLoading] = useState({
        pages: true,
        testimonials: true,
        posts: true,
    });

    const [errors, setErrors] = useState({
        pages: null,
        testimonials: null,
        posts: null,
    });

    // Consolidate API calls into one useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pagesResponse, testimonialsResponse, postsResponse] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/pages?&fields=acf&acf_format=standard`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/testimonial?&fields=acf&acf_format=standard`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/posts?&fields=acf&acf_format=standard`),
                ]);

                // Check if responses are ok
                if (!pagesResponse.ok) throw new Error('Failed to fetch pages data');
                if (!testimonialsResponse.ok) throw new Error('Failed to fetch testimonials data');
                if (!postsResponse.ok) throw new Error('Failed to fetch posts data');

                // Parse JSON data
                const [pagesData, testimonialsData, postsData] = await Promise.all([
                    pagesResponse.json(),
                    testimonialsResponse.json(),
                    postsResponse.json(),
                ]);

                // Set state with fetched data
                setPagesDataApi(pagesData);
                setTestimonialsApi(testimonialsData);
                setPostDataApi(postsData);

                // Update loading state
                setLoading({ pages: false, testimonials: false, posts: false });
            } catch (err) {
                // Handle errors
                setErrors({
                    pages: err.message.includes('pages') ? err.message : null,
                    testimonials: err.message.includes('testimonials') ? err.message : null,
                    posts: err.message.includes('posts') ? err.message : null,
                });

                // Update loading state
                setLoading({ pages: false, testimonials: false, posts: false });
            }
        };

        fetchData();
    }, []);

    return (
        <SectorDataContext.Provider
            value={{
                pagesDataApi,
                testimonialsApi,
                postDataApi,
                loading,
                errors,
            }}
        >
            {children}
        </SectorDataContext.Provider>
    );
};
