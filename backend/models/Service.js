const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a service name'],
    trim: true
  },
  price: {
    type: String,
    required: [true, 'Please add a price']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Maintenance', 'Repair', 'Cleaning', 'Inspection', 'Performance', 'Electrical', 'Body Repair', 'Tires', 'Engine', 'Transmission']
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  icon: {
    type: String,
    default: '🔧'
  },
  description: {
    type: String,
    default: ''
  },
  features: {
    type: [String],
    default: []
  },
  duration: {
    type: String,
    default: '1-2 hours'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
serviceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Service', serviceSchema);