const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    logo: { type: String, default: '' },
    address: String,
    phone: String,
    email: String,
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    privacy_link: { type: String, default: '/privacy-policy' },
    terms_link: { type: String, default: '/terms' },
    cta_section_image: { type: String, default: '' },
    cta_section_text: { type: String, default: '' },
    category_title: { type: String, default: 'Custom Printing Made Simple and Reliable' },
    category_description: { type: String, default: 'Looking for a print shop that brings your ideas to life? ...' },
    category_image: { type: String, default: '' },
    services_title: { type: String, default: 'Complete Print & Design Solutions' },
    services_description: { type: String, default: 'We offer professional printing, copying, design, and bindery services...' },
    services_image: { type: String, default: '' },
    testimonials_title: { type: String, default: 'What Our Customers Say' },
    testimonials_description: { type: String, default: '' },
    testimonials_image: { type: String, default: '' },
    cta_title: { type: String, default: 'Need Reliable & Budget-Friendly Printing?' },
    cta_description: { type: String, default: 'We’re here to make your next project simple, smooth, and hassle-free.' },
    newsletter_title: { type: String, default: 'Subscribe for exclusive deals and printing updates in your inbox.' },
    newsletter_description: { type: String, default: '' },
    newsletter_image: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Setting', SettingSchema);
