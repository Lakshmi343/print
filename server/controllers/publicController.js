const Newsletter = require('../models/Newsletter');
const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');
const Service = require('../models/Service');
const Highlight = require('../models/Highlight');
const Testimonial = require('../models/Testimonial');
const CTAButton = require('../models/CTAButton');
const Settings = require('../models/Setting');
const Hero = require('../models/Hero');

exports.subscribeNewsletter = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
        await Newsletter.create({ firstName, lastName, email });
        res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (e) {
        if (e.code === 11000) return res.status(400).json({ message: 'Email already subscribed' });
        res.status(500).json({ message: e.message });
    }
};

exports.getHome = async (req, res) => {
    const [
        menuItems, categories, services, highlights,
        testimonials, ctaButtons, settings, hero
    ] = await Promise.all([
        MenuItem.find({ active: { $ne: false } }).sort({ order: 1 }),
        Category.find({ active: { $ne: false } }).sort({ order: 1 }),
        Service.find({ active: { $ne: false } }).sort({ order: 1 }),
        Highlight.find({ active: { $ne: false } }).sort({ order: 1 }),
        Testimonial.find({ active: { $ne: false } }).sort({ date: -1 }),
        CTAButton.find({ active: { $ne: false } }).sort({ order: 1 }),
        Settings.findOne(),
        Hero.findOne()
    ]);

    res.json({
        settings: settings || {},
        hero: hero || {},
        menuItems: menuItems.map(d => ({ ...d.toObject(), id: d._id })),
        categories: categories.map(d => ({ ...d.toObject(), id: d._id })),
        services: services.map(d => ({ ...d.toObject(), id: d._id })),
        highlights: highlights.map(d => ({ ...d.toObject(), id: d._id })),
        testimonials: testimonials.map(d => ({ ...d.toObject(), id: d._id })),
        ctaButtons: ctaButtons.map(d => ({ ...d.toObject(), id: d._id }))
    });
};
