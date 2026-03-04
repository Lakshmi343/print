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

    return (
        <>
            <Header data={homeData} />
            <main style={{ paddingTop: '100px', minHeight: '80vh' }}>
                <div className="container" style={{ padding: '80px 24px' }}>
                    {category ? (
                        <>
                            <div style={{ marginBottom: '48px' }}>
                                <div className="section-tag">{category.name}</div>
                                <h1 className="section-title" style={{ marginTop: '16px', textAlign: 'left' }}>
                                    {category.name} <span>Products</span>
                                </h1>
                            </div>
                            <div style={{
                                background: 'var(--bg-card)', border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                                maxWidth: '600px', marginBottom: '32px'
                            }}>
                                <img src={category.image} alt={category.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '600px' }}>
                                Browse our selection of premium {category.name.toLowerCase()} with custom branding options.
                                High quality materials, fast turnaround, and competitive pricing.
                            </p>
                            <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
                                <a href="/quote" className="btn-primary">Request a Quote →</a>
                                <a href="/products" className="btn-outline">View All Products</a>
                            </div>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '80px 0' }}>
                            <span style={{ fontSize: '3rem' }}>🔍</span>
                            <h2 style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>Category not found</h2>
                            <a href="/products" className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>Browse All Products</a>
                        </div>
                    )}
                </div>
            </main>
            <Footer data={homeData} />
        </>
    );
}
