import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { publicApi } from '../utils/api';

export default function PlaceholderPage() {
    const location = useLocation();
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        publicApi.getHome().then(setPageData).catch(console.error);
    }, []);

    const pageName = location.pathname.substring(1)
        .split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Page';

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header data={pageData} />

            <main style={{ flex: 1, padding: '120px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontFamily: 'Poppins, sans-serif', fontWeight: 900, marginBottom: '20px' }}>
                    {pageName} <span style={{ color: 'var(--primary)' }}>Coming Soon</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', lineHeight: 1.6, marginBottom: '32px' }}>
                    We're currently working on this page. Check back soon for updates to our {pageName.toLowerCase()} section!
                </p>
                <Link to="/" className="btn-primary" style={{ display: 'inline-flex', padding: '14px 32px' }}>
                    Return to Homepage
                </Link>
            </main>

            <Footer data={pageData} />
        </div>
    );
}
