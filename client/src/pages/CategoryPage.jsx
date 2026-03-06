import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { publicApi } from '../utils/api';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function CategoryPage() {
    const { slug } = useParams();
    const [homeData, setHomeData] = useState(null);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        publicApi.getHome().then(data => {
            setHomeData(data);
            const cat = data?.categories?.find(c => c.slug === slug);
            setCategory(cat);
            setLoading(false);
        });
    }, [slug]);

    if (loading) return <div className="loading" style={{ minHeight: '100vh' }}><div className="spinner" /></div>;

    const settings = homeData?.settings || {};
    const title = settings?.category_title || 'Custom Printing Made Simple and Reliable';
    const description = settings?.category_description || 'Looking for a print shop that brings your ideas to life? You’re in the right place. We offer digital printing services tailored for startups, contractors, and small businesses—making your project seamless from design to print and delivery.';

    return (
        <>
            <Header data={homeData} />
            <main style={{ paddingTop: '80px', minHeight: '80vh', backgroundColor: '#ffffff' }}>
                <div className="container" style={{ padding: '80px 0' }}>
                   
                    <div className="category-header-split" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '80px', gap: '60px' }}>
                        <div style={{ flex: 1.2 }}>
                            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.1, color: '#111', letterSpacing: '-0.02em' }}>
                                {title.includes('Simple') ? (
                                    <>
                                        {title.split('Simple')[0]}
                                        <br />
                                        Simple
                                        {title.split('Simple')[1]}
                                    </>
                                ) : title}
                            </h2>
                        </div>
                        
                    </div>

                    {category ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                            <div style={{
                                background: '#111', border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '4px', overflow: 'hidden',
                                aspectSquare: '1/1'
                            }}>
                                <img src={category.image} alt={category.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                            </div>

                            <div>
                                <h1 style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '3.5rem',
                                    fontWeight: 800,
                                    color: '#111',
                                    lineHeight: 1.1,
                                    marginBottom: '24px'
                                }}>
                                    {category.name.toUpperCase()}
                                </h1>
                                <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '40px', maxWidth: '500px' }}>
                                    Elevate your brand with our premium {category.name.toLowerCase()} solutions.
                                    Built for durability and designed for maximum impact, making your business stand out from the competition.
                                </p>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <Link to="/quote" className="btn-primary" style={{ padding: '14px 32px', borderRadius: '40px', fontWeight: 600 }}>Get Started →</Link>
                                    <Link to="/" className="btn-outline" style={{ padding: '14px 32px', borderRadius: '40px', color: '#111', border: '1px solid #ddd' }}>Back to Categories</Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '80px 0' }}>
                            <span style={{ fontSize: '3rem' }}>🔍</span>
                            <h2 style={{ marginTop: '16px', color: '#111' }}>Category not found</h2>
                            <Link to="/" className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>Back to Home</Link>
                        </div>
                    )}
                </div>
            </main>
            <Footer data={homeData} />
        </>
    );
}
