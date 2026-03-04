const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Setting = require('./models/Setting');
const Hero = require('./models/Hero');
const MenuItem = require('./models/MenuItem');
const Highlight = require('./models/Highlight');
const Category = require('./models/Category');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');
const CTAButton = require('./models/CTAButton');

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Promise.all([
            User.deleteMany({}),
            Setting.deleteMany({}),
            Hero.deleteMany({}),
            MenuItem.deleteMany({}),
            Highlight.deleteMany({}),
            Category.deleteMany({}),
            Service.deleteMany({}),
            Testimonial.deleteMany({}),
            CTAButton.deleteMany({})
        ]);

        // Admin User
        await User.create({
            email: 'admin@print.com',
            password: 'admin123'
        });
        console.log('Admin user seeded');

        // Site Settings
        await Setting.create({
            logo: 'https://via.placeholder.com/150x50?text=PRINT+LOGO',
            footer: {
                address: '123 Printing St, Ink City, PC 54321',
                phone: '+1 234 567 890',
                email: 'info@printshop.com',
                socialLinks: {
                    facebook: 'https://facebook.com',
                    twitter: 'https://twitter.com',
                    linkedin: 'https://linkedin.com'
                }
            }
        });

        // Hero Section
        await Hero.create({
            headline: 'Next-Generation Printing Solutions',
            subtext: 'High-quality printing services for businesses and individuals. Fast, reliable, and affordable.',
            ctaText: 'Request a Quote',
            ctaLink: '/quote'
        });

        // Highlights
        await Highlight.insertMany([
            { icon: 'FaPrint', title: 'High Quality', order: 1 },
            { icon: 'FaClock', title: 'Fast Delivery', order: 2 },
            { icon: 'FaDollarSign', title: 'Best Prices', order: 3 }
        ]);

        // Menu Items
        await MenuItem.insertMany([
            { label: 'Home', link: '/', order: 1 },
            { label: 'Products', link: '/products', order: 2 },
            { label: 'Services', link: '/services', order: 3 },
            { label: 'About Us', link: '/about', order: 4 },
            { label: 'Contact', link: '/contact', order: 5 }
        ]);

        // Categories
        await Category.insertMany([
            { name: 'Business Cards', slug: 'business-cards', image: 'https://via.placeholder.com/300x200?text=Business+Cards', order: 1 },
            { name: 'Flyers & Posters', slug: 'flyers-posters', image: 'https://via.placeholder.com/300x200?text=Flyers', order: 2 },
            { name: 'Banners', slug: 'banners', image: 'https://via.placeholder.com/300x200?text=Banners', order: 3 }
        ]);

        // Services
        await Service.insertMany([
            { title: 'Graphic Design', description: 'Professional design services for your brand.', image: 'https://via.placeholder.com/300x200?text=Design', order: 1 },
            { title: 'Large Format Printing', description: 'Big prints for big ideas.', image: 'https://via.placeholder.com/300x200?text=Large+Format', order: 2 }
        ]);

        // Testimonials
        await Testimonial.insertMany([
            { name: 'John Doe', rating: 5, review: 'Fantastic quality and very fast service!' },
            { name: 'Jane Smith', rating: 4, review: 'Great prints, exactly what I needed.' }
        ]);

        // CTA Buttons (Quick actions)
        await CTAButton.insertMany([
            { label: 'Visit Our Shops', link: '/shops', order: 2 },
            { label: 'Upload Your Files', link: '/upload', order: 3 },
            { label: 'Call Us', link: 'tel:+1234567890', order: 4 }
        ]);

        console.log('Database seeded successfully!');
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seed();
