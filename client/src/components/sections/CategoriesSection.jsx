import { Link } from 'react-router-dom';

export default function CategoriesSection({ categories, settings }) {
  if (!categories || categories.length === 0) return null;

  const title = settings?.category_title || 'Custom Printing Made Simple and Reliable';
  const description = settings?.category_description || 'Looking for a print shop that brings your ideas to life? You’re in the right place. We offer digital printing services tailored for startups, contractors, and small businesses—making your project seamless from design to print and delivery.';

  return (
    <section className="categories-section">
      <div className="container">
        {/* Heading Model */}
        <div className="category-header">
          <div className="cat-title-col">
            <h2 className="cat-main-title">
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
          <div className="cat-desc-col">
            <p className="cat-main-desc">{description}</p>
          </div>
        </div>

        {/* Grid Model - 5 Columns */}
        <div className="cat-grid-5">
          {categories.map(cat => (
            <Link key={cat.id} to={`/category/${cat.slug}`} className="cat-item-minimal">
              <div className="cat-img-square">
                <img src={cat.image} alt={cat.name} />
              </div>
              <h3 className="cat-label-bold">{cat.name.toUpperCase()}</h3>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
                .categories-section {
                    padding: 80px 0;
                    background-color: #ffffff;
                }
                .category-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 60px;
                    gap: 40px;
                }
                .cat-title-col {
                    flex: 1.2;
                }
                .cat-main-title {
                    font-family: 'Inter', sans-serif;
                    font-size: 2.8rem;
                    font-weight: 800;
                    line-height: 1.1;
                    color: #111111;
                    letter-spacing: -0.01em;
                }
                .cat-desc-col {
                    flex: 1;
                    padding-top: 10px;
                }
                .cat-main-desc {
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    line-height: 1.6;
                    color: #666666;
                    font-weight: 400;
                    margin-bottom: 20px;
                }
                .cat-heading-img-wrap {
                    width: 100%;
                    max-width: 400px;
                    aspect-ratio: 16/9;
                    overflow: hidden;
                    border-radius: 8px;
                    background-color: #f5f5f5;
                }
                .cat-heading-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .cat-grid-5 {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 30px 20px;
                }
                .cat-item-minimal {
                    display: flex;
                    flex-direction: column;
                    text-decoration: none;
                }
                .cat-img-square {
                    aspect-ratio: 1/1;
                    background-color: #efefef;
                    overflow: hidden;
                    margin-bottom: 15px;
                }
                .cat-img-square img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    background-color: #d8d8d8;
                    transition: transform 0.4s ease;
                }
                .cat-item-minimal:hover img {
                    transform: scale(1.05);
                }
                .cat-label-bold {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #000000;
                    line-height: 1.3;
                    letter-spacing: 0.02em;
                }

                @media (max-width: 1100px) {
                    .cat-grid-5 { grid-template-columns: repeat(4, 1fr); }
                    .cat-main-title { font-size: 2.2rem; }
                }
                @media (max-width: 900px) {
                    .category-header { flex-direction: column; gap: 20px; }
                    .cat-grid-5 { grid-template-columns: repeat(3, 1fr); }
                }
                @media (max-width: 600px) {
                    .cat-grid-5 { grid-template-columns: repeat(2, 1fr); }
                    .cat-main-title { font-size: 1.8rem; }
                }
            `}</style>
    </section>
  );
}
