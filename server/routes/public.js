const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');
const Highlight = require('../models/Highlight');
const Category = require('../models/Category');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const CTAButton = require('../models/CTAButton');
const MenuItem = require('../models/MenuItem');
const Setting = require('../models/Setting');
const Newsletter = require('../models/Newsletter');

// GET /api/public/home - Unified home data
router.get('/home', async (req, res) => {
    try {
        const [
            hero,
            highlights,
            categories,
            services,
            testimonials,
            ctaButtons,
            menuItems,
            settings
        ] = await Promise.all([
            Hero.findOne(),
            Highlight.find({ active: true }).sort('order'),
            Category.find({ active: true }).sort('order'),
            Service.find({ active: true }).sort('order'),
            Testimonial.find({ active: true }).sort('-date'),
            CTAButton.find({ active: true }).sort('order'),
            MenuItem.find({ active: true }).sort('order'),
            Setting.findOne()
        ]);

        res.json({
            hero,
            highlights,
            categories,
            services,
            testimonials,
            ctaButtons,
            menuItems,
            settings
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/public/newsletter
router.post('/newsletter', async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;

        // Check if duplicate
        const existing = await Newsletter.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        const subscription = new Newsletter({ firstName, lastName, email });
        await subscription.save();

        res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
