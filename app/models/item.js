/*jslint node:true*/
var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: String,
    banner: String,
    skills: String,
    images: String,
    description: String,
    slug: String,
    created_at: Date,
    updated_at: Date
});

itemSchema.pre('save', function (next) {

    // Slugify the title
    this.slug = this.title.toLowerCase().replace(/ /g, '_');

    // Get current date
    var currentDate = new Date();

    // Update updated_at field
    this.updated_at = currentDate;

    // If there isn't a created_at field then add one
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

module.exports = mongoose.model('Item', itemSchema);
