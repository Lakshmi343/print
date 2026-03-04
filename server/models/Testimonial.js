const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String, required: true },
    date: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
