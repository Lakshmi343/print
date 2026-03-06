const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');
const Service = require('../models/Service');
const Highlight = require('../models/Highlight');
const Testimonial = require('../models/Testimonial');
const CTAButton = require('../models/CTAButton');
const Settings = require('../models/Setting');
const Hero = require('../models/Hero');
const Newsletter = require('../models/Newsletter');

const models = {
    'menu': MenuItem,
    'categories': Category,
    'services': Service,
    'highlights': Highlight,
    'testimonials': Testimonial,
    'cta-buttons': CTAButton
};

exports.uploadImage = (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
};

exports.getEntity = async (req, res) => {
    const Model = models[req.params.entity];
    if (!Model) return res.status(404).json({ message: 'Entity not found' });
    try {
        const docs = await Model.find().sort({ order: 1, createdAt: -1 });
        res.json(docs.map(d => ({ ...d.toObject(), id: d._id })));
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createEntity = async (req, res) => {
    const Model = models[req.params.entity];
    if (!Model) return res.status(404).json({ message: 'Entity not found' });
    try {
        const newDoc = new Model(req.body);
        await newDoc.save();
        res.status(201).json({ ...newDoc.toObject(), id: newDoc._id });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateEntity = async (req, res) => {
    const Model = models[req.params.entity];
    if (!Model) return res.status(404).json({ message: 'Entity not found' });
    try {
        const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ ...updated.toObject(), id: updated._id });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteEntity = async (req, res) => {
    const Model = models[req.params.entity];
    if (!Model) return res.status(404).json({ message: 'Entity not found' });
    try {
        await Model.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getSettings = async (req, res) => {
    res.json(await Settings.findOne() || {});
};

exports.updateSettings = async (req, res) => {
    const updated = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(updated);
};

exports.getHero = async (req, res) => {
    res.json(await Hero.findOne() || {});
};

exports.updateHero = async (req, res) => {
    const updated = await Hero.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(updated);
};

exports.getNewsletter = async (req, res) => {
    const subs = await Newsletter.find().sort({ created_at: -1 });
    res.json(subs.map(s => ({ ...s.toObject(), id: s._id })));
};
