const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./db');

const bcrypt = require('bcryptjs');
const Admin = require('./models/User');
const MenuItem = require('./models/MenuItem');
const Settings = require('./models/Setting');
const Hero = require('./models/Hero');

// Routes defined in separate files
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const seedAdmin = async () => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const hashed = bcrypt.hashSync('admin123', 10);
            await Admin.create({ email: 'admin@print.com', password: hashed });
            console.log('Admin account (admin@print.com) seeded successfully.');
        }

        const menuCount = await MenuItem.countDocuments();
        if (menuCount === 0) {
            await MenuItem.insertMany([
                { label: 'Home', link: '/', order: 1 },
                { label: 'Products', link: '/products', order: 2 },
                { label: 'Services', link: '/services', order: 3 },
                { label: 'About Us', link: '/about', order: 4 },
                { label: 'Contact', link: '/contact', order: 5 }
            ]);
            console.log('Menu items seeded successfully.');
        }

        const settingsCount = await Settings.countDocuments();
        if (settingsCount === 0) {
            await Settings.create({
                logo: '/logo.png', address: '123 Printing St, Ink City', phone: '+1 234 567 890',
                email: 'info@printshop.com', cta_section_text: 'Professional printing solutions.'
            });
        }

        const heroCount = await Hero.countDocuments();
        if (heroCount === 0) {
            await Hero.create({
                headline: 'High-Quality Custom Printing, Delivered Fast',
                subtext: 'From business cards to banners, we bring your ideas to life with precision and speed.',
                cta_text: 'Instant Pricing & Order Online',
                cta_link: '/quote'
            });
        }

    } catch (err) {
        console.error('Error seeding data:', err);
    }
};
seedAdmin();

// Set up base API paths
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

app.get('/', (req, res) => {
    res.send('Server is running with MongoDB (SQLite removed).');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
