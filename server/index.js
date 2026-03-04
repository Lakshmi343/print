const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const Database = require('better-sqlite3');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
const db = new Database(path.join(__dirname, 'printing.db'));


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    logo TEXT DEFAULT '',
    address TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    email TEXT DEFAULT '',
    facebook TEXT DEFAULT '',
    twitter TEXT DEFAULT '',
    instagram TEXT DEFAULT '',
    linkedin TEXT DEFAULT '',
    privacy_link TEXT DEFAULT '/privacy-policy',
    terms_link TEXT DEFAULT '/terms',
    cta_section_image TEXT DEFAULT '',
    cta_section_text TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    link TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS hero (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    headline TEXT NOT NULL,
    subtext TEXT NOT NULL,
    cta_text TEXT DEFAULT 'Request a Quote',
    cta_link TEXT DEFAULT '/quote',
    bg_image TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS highlights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    icon TEXT NOT NULL,
    title TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    "order" INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    link TEXT DEFAULT '#',
    "order" INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    rating INTEGER NOT NULL,
    review TEXT NOT NULL,
    date TEXT DEFAULT (date('now')),
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS cta_buttons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    link TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS newsletter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// Seed initial data if empty
const adminCount = db.prepare('SELECT COUNT(*) as c FROM admins').get().c;
if (adminCount === 0) {
    const hashed = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO admins (email, password) VALUES (?, ?)').run('admin@print.com', hashed);

    db.prepare('INSERT INTO settings (logo, address, phone, email, facebook, twitter, instagram, linkedin, cta_section_text) VALUES (?,?,?,?,?,?,?,?,?)').run(
        '/logo.png',
        '123 Printing St, Ink City, PC 54321',
        '+1 234 567 890',
        'info@printshop.com',
        'https://facebook.com',
        'https://twitter.com',
        'https://instagram.com',
        'https://linkedin.com',
        'Professional printing solutions tailored to your needs. Fast turnaround, superior quality.'
    );

    db.prepare('INSERT INTO hero (headline, subtext, cta_text, cta_link) VALUES (?,?,?,?)').run(
        'Next-Generation Printing Solutions',
        'High-quality printing services for businesses and individuals. Fast, reliable, and affordable.',
        'Request a Quote',
        '/quote'
    );

    const insertMenu = db.prepare('INSERT INTO menu_items (label, link, "order") VALUES (?,?,?)');
    [['Home', '/'], ['Products', '/products'], ['Services', '/services'], ['About Us', '/about'], ['Contact', '/contact']].forEach(([l, h, o], i) => insertMenu.run(l, h, i + 1));

    const insertH = db.prepare('INSERT INTO highlights (icon, title, "order") VALUES (?,?,?)');
    ['🖨️,High Quality Printing,1', '⚡,Fast Turnaround,2', '💰,Best Prices,3', '🎨,Custom Designs,4'].forEach(s => {
        const [icon, title, order] = s.split(',');
        insertH.run(icon, title, parseInt(order));
    });

    const insertCat = db.prepare('INSERT INTO categories (name, slug, image, "order") VALUES (?,?,?,?)');
    [
        ['Business Cards', 'business-cards', 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&q=80', 1],
        ['Flyers & Posters', 'flyers-posters', 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80', 2],
        ['Banners', 'banners', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', 3],
        ['Brochures', 'brochures', 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80', 4],
        ['Stickers & Labels', 'stickers-labels', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', 5],
        ['T-Shirts', 't-shirts', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80', 6]
    ].forEach(r => insertCat.run(...r));

    const insertSvc = db.prepare('INSERT INTO services (title, image, description, link, "order") VALUES (?,?,?,?,?)');
    [
        ['Graphic Design', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', 'Professional design services tailored to your brand identity.', '/services/design', 1],
        ['Large Format Printing', 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=400&q=80', 'Stunning large-format prints for events, trade shows, and more.', '/services/large-format', 2],
        ['Offset Printing', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80', 'High-volume printing with exceptional color accuracy and quality.', '/services/offset', 3]
    ].forEach(r => insertSvc.run(...r));

    const insertTest = db.prepare('INSERT INTO testimonials (name, rating, review) VALUES (?,?,?)');
    [
        ['John Mitchell', 5, 'Absolutely fantastic quality! The business cards were perfect and delivered ahead of schedule.'],
        ['Sarah Williams', 5, 'Best printing company I have used. The team is professional and the results are stunning.'],
        ['Mike Johnson', 4, 'Great quality prints and competitive pricing. Will definitely use again for my next project.']
    ].forEach(r => insertTest.run(...r));

    const insertCTA = db.prepare('INSERT INTO cta_buttons (label, link, "order") VALUES (?,?,?)');
    [['Request a Quote', '/quote', 1], ['Visit Our Shops', '/shops', 2], ['Upload Your Files', '/upload', 3], ['Call Us', 'tel:+1234567890', 4]].forEach(r => insertCTA.run(...r));

    console.log('Database seeded successfully');
}

// Auth middleware
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch { res.status(401).json({ message: 'Invalid token' }); }
};

// PUBLIC ROUTES

// GET /api/public/home
app.get('/api/public/home', (req, res) => {
    res.json({
        settings: db.prepare('SELECT * FROM settings LIMIT 1').get(),
        hero: db.prepare('SELECT * FROM hero LIMIT 1').get(),
        menuItems: db.prepare('SELECT * FROM menu_items WHERE active=1 ORDER BY "order"').all(),
        highlights: db.prepare('SELECT * FROM highlights WHERE active=1 ORDER BY "order"').all(),
        categories: db.prepare('SELECT * FROM categories WHERE active=1 ORDER BY "order"').all(),
        services: db.prepare('SELECT * FROM services WHERE active=1 ORDER BY "order"').all(),
        testimonials: db.prepare('SELECT * FROM testimonials WHERE active=1 ORDER BY id DESC').all(),
        ctaButtons: db.prepare('SELECT * FROM cta_buttons WHERE active=1 ORDER BY "order"').all()
    });
});

// POST /api/public/newsletter
app.post('/api/public/newsletter', (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
        db.prepare('INSERT INTO newsletter (first_name, last_name, email) VALUES (?,?,?)').run(firstName, lastName, email);
        res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (e) {
        if (e.message.includes('UNIQUE')) return res.status(400).json({ message: 'Email already subscribed' });
        res.status(500).json({ message: e.message });
    }
});

// AUTH
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const admin = db.prepare('SELECT * FROM admins WHERE email=?').get(email);
    if (!admin || !bcrypt.compareSync(password, admin.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { email: admin.email } });
});

// ADMIN CRUD helper
const makeAdminCrud = (table, fields) => {
    app.get(`/api/admin/${table}`, auth, (req, res) => {
        res.json(db.prepare(`SELECT * FROM ${table} ORDER BY ${fields.sort || 'id'}`).all());
    });
    app.post(`/api/admin/${table}`, auth, (req, res) => {
        const keys = fields.cols;
        const vals = keys.map(k => req.body[k]);
        const stmt = db.prepare(`INSERT INTO ${table} (${keys.map(k => `"${k}"`).join(',')}) VALUES (${keys.map(() => '?').join(',')})`);
        const info = stmt.run(...vals);
        res.status(201).json(db.prepare(`SELECT * FROM ${table} WHERE id=?`).get(info.lastInsertRowid));
    });
    app.put(`/api/admin/${table}/:id`, auth, (req, res) => {
        const keys = fields.cols;
        const vals = keys.map(k => req.body[k]);
        db.prepare(`UPDATE ${table} SET ${keys.map(k => `"${k}"=?`).join(',')} WHERE id=?`).run(...vals, req.params.id);
        res.json(db.prepare(`SELECT * FROM ${table} WHERE id=?`).get(req.params.id));
    });
    app.delete(`/api/admin/${table}/:id`, auth, (req, res) => {
        db.prepare(`DELETE FROM ${table} WHERE id=?`).run(req.params.id);
        res.json({ message: 'Deleted' });
    });
};

makeAdminCrud('menu_items', { cols: ['label', 'link', 'order', 'active'], sort: '"order"' });
makeAdminCrud('highlights', { cols: ['icon', 'title', 'order', 'active'], sort: '"order"' });
makeAdminCrud('categories', { cols: ['name', 'image', 'slug', 'order', 'active'], sort: '"order"' });
makeAdminCrud('services', { cols: ['title', 'image', 'description', 'link', 'order', 'active'], sort: '"order"' });
makeAdminCrud('testimonials', { cols: ['name', 'rating', 'review', 'date', 'active'], sort: 'id DESC' });
makeAdminCrud('cta_buttons', { cols: ['label', 'link', 'order', 'active'], sort: '"order"' });

// Settings (singleton)
app.get('/api/admin/settings', auth, (req, res) => res.json(db.prepare('SELECT * FROM settings LIMIT 1').get()));
app.put('/api/admin/settings', auth, (req, res) => {
    const { logo, address, phone, email, facebook, twitter, instagram, linkedin, privacy_link, terms_link, cta_section_image, cta_section_text } = req.body;
    db.prepare(`UPDATE settings SET logo=?, address=?, phone=?, email=?, facebook=?, twitter=?, instagram=?, linkedin=?, privacy_link=?, terms_link=?, cta_section_image=?, cta_section_text=? WHERE id=1`)
        .run(logo, address, phone, email, facebook, twitter, instagram, linkedin, privacy_link, terms_link, cta_section_image, cta_section_text);
    res.json(db.prepare('SELECT * FROM settings LIMIT 1').get());
});

// Hero (singleton)
app.get('/api/admin/hero', auth, (req, res) => res.json(db.prepare('SELECT * FROM hero LIMIT 1').get()));
app.put('/api/admin/hero', auth, (req, res) => {
    const { headline, subtext, cta_text, cta_link, bg_image } = req.body;
    db.prepare('UPDATE hero SET headline=?, subtext=?, cta_text=?, cta_link=?, bg_image=? WHERE id=1').run(headline, subtext, cta_text, cta_link, bg_image);
    res.json(db.prepare('SELECT * FROM hero LIMIT 1').get());
});

// Newsletter submissions
app.get('/api/admin/newsletter', auth, (req, res) => {
    res.json(db.prepare('SELECT * FROM newsletter ORDER BY created_at DESC').all());
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
