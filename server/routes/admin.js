const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Newsletter = require('../models/Newsletter');
const Setting = require('../models/Setting');
const MenuItem = require('../models/MenuItem');
const Hero = require('../models/Hero');
const Highlight = require('../models/Highlight');
const Category = require('../models/Category');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const CTAButton = require('../models/CTAButton');

// Helper to create CRUD routes
const createCrud = (model, name) => {
    router.get(`/${name}`, auth, async (req, res) => {
        try {
            const items = await model.find().sort(model.schema.paths.order ? 'order' : '-createdAt');
            res.json(items);
        } catch (err) { res.status(500).json({ message: err.message }); }
    });

    router.post(`/${name}`, auth, async (req, res) => {
        try {
            const item = new model(req.body);
            await item.save();
            res.status(201).json(item);
        } catch (err) { res.status(400).json({ message: err.message }); }
    });

    router.put(`/${name}/:id`, auth, async (req, res) => {
        try {
            const item = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(item);
        } catch (err) { res.status(400).json({ message: err.message }); }
    });

    router.delete(`/${name}/:id`, auth, async (req, res) => {
        try {
            await model.findByIdAndDelete(req.params.id);
            res.json({ message: 'Deleted successfully' });
        } catch (err) { res.status(400).json({ message: err.message }); }
    });
};

// Site Settings (Singleton)
router.get('/settings', auth, async (req, res) => {
    let settings = await Setting.findOne();
    if (!settings) settings = new Setting();
    res.json(settings);
});

router.put('/settings', auth, async (req, res) => {
    let settings = await Setting.findOne();
    if (!settings) settings = new Setting(req.body);
    else Object.assign(settings, req.body);
    await settings.save();
    res.json(settings);
});

// Hero (Singleton-ish)
router.get('/hero', auth, async (req, res) => {
    const hero = await Hero.findOne();
    res.json(hero);
});

router.put('/hero', auth, async (req, res) => {
    let hero = await Hero.findOne();
    if (!hero) hero = new Hero(req.body);
    else Object.assign(hero, req.body);
    await hero.save();
    res.json(hero);
});

// Newsletter Submissions
router.get('/newsletter', auth, async (req, res) => {
    const subs = await Newsletter.find().sort('-createdAt');
    res.json(subs);
});

// Others with CRUD
createCrud(MenuItem, 'menu');
createCrud(Highlight, 'highlights');
createCrud(Category, 'categories');
createCrud(Service, 'services');
createCrud(Testimonial, 'testimonials');
createCrud(CTAButton, 'cta-buttons');

module.exports = router;
