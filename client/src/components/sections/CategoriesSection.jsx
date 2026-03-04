import { Link } from 'react-router-dom';

export default function CategoriesSection({ categories }) {
    if (!categories || categories.length === 0) return null;

    return (
        <section className="categories-section">
            <div className="container">
                <div className="section-header">
                    <div className="section-tag">Our Products</div>
                    <h2 className="section-title">Browse by <span>Category</span></h2>
                    <p className="section-desc">Explore our wide range of printing products designed to make your brand stand out.</p>
                </div>

                <div className="categories-grid">
                    {categories.map(cat => (
                        <Link key={cat.id} to={`/category/${cat.slug}`} className="category-card">
                            <div className="cat-image-wrap">
                                <img src={cat.image} alt={cat.name} className="cat-image" />
                                <div className="cat-overlay" />
                                <div className="cat-hover-badge">View Products →</div>
                            </div>
                            <div className="cat-info">
                                <h3 className="cat-name">{cat.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <style>{`
        .categories-section {
          padding: 100px 0;
          background: var(--bg-dark);
        }
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .category-card {
          display: block;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border);
          transition: var(--transition);
          position: relative;
        }
        .category-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(232,160,0,0.15);
        }
        .cat-image-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .cat-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .category-card:hover .cat-image { transform: scale(1.08); }
        .cat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
          transition: opacity 0.3s;
        }
        .cat-hover-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--primary);
          color: #000;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 50px;
          opacity: 0;
          transform: translateY(-4px);
          transition: all 0.3s;
        }
        .category-card:hover .cat-hover-badge { opacity: 1; transform: none; }
        .cat-info {
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cat-name {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        @media (max-width: 900px) {
          .categories-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .categories-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </section>
    );
}
