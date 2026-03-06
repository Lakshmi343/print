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
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dynamic-printing');
        console.log('Connected to MongoDB for seeding...');


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


        await User.create({
            email: 'admin@print.com',
            password: 'admin123'
        });
        console.log('Admin user seeded');


        await Setting.create({
            logo: '', 
            address: '123 Print Avenue, Suite 456, Creative City, ZIP 78910',
            phone: '403-230-4649',
            email: 'info@printshop.com',
            facebook: 'https://facebook.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
            linkedin: 'https://linkedin.com',
            privacy_link: '/privacy-policy',
            terms_link: '/terms'
        });


        await Hero.create({
            headline: 'Next-Generation Printing Solutions',
            subtext: 'High-quality printing services for businesses and individuals. Fast, reliable, and affordable.',
            ctaText: 'Request a Quote',
            ctaLink: '/quote'
        });


        await Highlight.insertMany([
            { icon: '🎧', title: 'Excellent Customer Service', order: 1 },
            { icon: '🎖️', title: 'High-Quality Printing', order: 2 },
            { icon: '🛒', title: 'Convenient Online Ordering', order: 3 },
            { icon: '💨', title: 'Fast Production Time', order: 4 }
        ]);


        await MenuItem.insertMany([
            { label: 'Digital Printing', link: '/digital-printing', order: 1 },
            { label: 'Large Format', link: '/large-format', order: 2 },
            { label: 'Print & Scan', link: '/print-scan', order: 3 },
            { label: 'Blueprint Printing', link: '/blueprint-printing', order: 4 },
            { label: 'Graphic Design', link: '/graphic-design', order: 5 },
            { label: 'Upload File', link: '/upload-file', order: 6 }
        ]);


        await Category.insertMany([
            { name: 'Business Cards', slug: 'business-cards', image: 'https://via.placeholder.com/300x200?text=Business+Cards', order: 1 },
            { name: 'Flyers & Posters', slug: 'flyers-posters', image: 'https://via.placeholder.com/300x200?text=Flyers', order: 2 },
            { name: 'Banners', slug: 'banners', image: 'https://via.placeholder.com/300x200?text=Banners', order: 3 }
        ]);


        await Service.insertMany([
            { title: 'Graphic Design', description: 'Professional design services for your brand.', image: 'https://via.placeholder.com/300x200?text=Design', order: 1 },
            { title: 'Large Format Printing', description: 'Big prints for big ideas.', image: 'https://via.placeholder.com/300x200?text=Large+Format', order: 2 }
        ]);


        await Testimonial.insertMany([
            { name: 'John Doe', rating: 5, review: 'Fantastic quality and very fast service!' },
            { name: 'Jane Smith', rating: 4, review: 'Great prints, exactly what I needed.' }
        ]);


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
