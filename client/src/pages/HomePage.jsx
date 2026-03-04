import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import ServicesSection from '../components/sections/ServicesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTAPanel from '../components/sections/CTAPanel';
import Newsletter from '../components/sections/Newsletter';
import { publicApi } from '../utils/api';

export default function HomePage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        publicApi.getHome()
            .then(setData)
            .catch(e => setError(e.message || 'Failed to load'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="loading" style={{ minHeight: '100vh', flexDirection: 'column', gap: '16px' }}>
            <div className="spinner" />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading...</p>
        </div>
    );

    if (error) return (
        <div className="loading" style={{ minHeight: '100vh', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '3rem' }}>⚠️</span>
            <p style={{ color: '#f44336' }}>Backend not reachable. Make sure the server is running on port 5000.</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Run: <code>node index.js</code> in the <code>/server</code> folder</p>
        </div>
    );

    return (
        <>
            <Header data={data} />
            <main>
                <HeroSection hero={data?.hero} highlights={data?.highlights} />
                <CategoriesSection categories={data?.categories} />
                <ServicesSection services={data?.services} />
                <TestimonialsSection testimonials={data?.testimonials} />
                <CTAPanel ctaButtons={data?.ctaButtons} settings={data?.settings} />
                <Newsletter />
            </main>
            <Footer data={data} />
        </>
    );
}
