const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceType: {
    type: String,
    required: [true, 'Please select a service type'],
    enum: [
      'Oil Change',
      'General Service',
      'Brake Service',
      'Tyre Replacement',
      'Battery Check',
      'Car Wash',
      'A/C Service',
      'Wheel Alignment',
      'Electrical Repair'
    ]
  },
  vehicleModel: {
    type: String,
    required: [true, 'Please enter vehicle model']
  },
  vehicleNumber: {
    type: String,
    required: [true, 'Please enter vehicle number']
  },
  bookingDate: {
    type: Date,
    required: [true, 'Please select booking date']
  },
  bookingTime: {
    type: String,
    required: [true, 'Please select booking time']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  price: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);