const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
    headline: { type: String, required: true },
    subtext: { type: String, required: true },
    cta_text: { type: String, default: 'Request a Quote' },
    cta_link: { type: String, default: '/quote' },
    bg_image: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Hero', HeroSchema);
