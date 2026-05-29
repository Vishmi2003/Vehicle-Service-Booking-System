const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Service prices mapping
const servicePrices = {
  'Oil Change': 4500,
  'General Service': 9500,
  'Brake Service': 7500,
  'Tyre Replacement': 8500,
  'Battery Check': 3500,
  'Car Wash': 2500,
  'A/C Service': 6500,
  'Wheel Alignment': 4000,
  'Electrical Repair': 4500
};

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post(
  '/',
  protect,
  [
    body('serviceType').notEmpty().withMessage('Service type is required'),
    body('vehicleModel').notEmpty().withMessage('Vehicle model is required'),
    body('vehicleNumber').notEmpty().withMessage('Vehicle number is required'),
    body('bookingDate').notEmpty().withMessage('Booking date is required'),
    body('bookingTime').notEmpty().withMessage('Booking time is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { serviceType, vehicleModel, vehicleNumber, bookingDate, bookingTime, notes } = req.body;
      
      // Get price for the service
      const price = servicePrices[serviceType] || 0;
      
      const booking = await Booking.create({
        user: req.user.id,
        serviceType,
        vehicleModel,
        vehicleNumber,
        bookingDate,
        bookingTime,
        price,
        notes: notes || ''
      });

      res.status(201).json({
        success: true,
        booking
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// @route   GET /api/bookings
// @desc    Get all bookings for logged in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if booking belongs to user
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if booking belongs to user
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Only allow updating if booking is pending
    if (booking.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot update booking that is already confirmed or completed' });
    }
    
    const { vehicleModel, vehicleNumber, bookingDate, bookingTime, notes } = req.body;
    
    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { vehicleModel, vehicleNumber, bookingDate, bookingTime, notes },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Cancel booking
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if booking belongs to user
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Update status to cancelled instead of deleting
    booking.status = 'cancelled';
    await booking.save();
    
    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings/admin/all
// @desc    Get all bookings (Admin only)
// @access  Private/Admin
router.get('/admin/all', protect, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ message: 'Not authorized as admin' });
  }
  
  try {
    const bookings = await Booking.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;