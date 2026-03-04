const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    logo: { type: String, default: '' },
    footer: {
        address: String,
        phone: String,
        email: String,
        socialLinks: {
            facebook: String,
            twitter: String,
            instagram: String,
            linkedin: String
        },
        privacyPolicyLink: { type: String, default: '/privacy-policy' },
        termsConditionsLink: { type: String, default: '/terms' }
    }
}, { timestamps: true });

module.exports = mongoose.model('Setting', SettingSchema);
