const mongoose = require('mongoose');

const CTAButtonSchema = new mongoose.Schema({
    label: { type: String, required: true },
    link: { type: String, required: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('CTAButton', CTAButtonSchema);
