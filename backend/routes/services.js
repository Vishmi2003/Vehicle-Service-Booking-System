const express = require('express');
const Service = require('../models/Service');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/services
// @desc    Get all active services (for users)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ status: 'Active' }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/services/all
// @desc    Get all services (for admin)
// @access  Private/Admin
router.get('/all', protect, admin, async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/services/:id
// @desc    Get single service by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json({
      success: true,
      service
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/services
// @desc    Create a new service (admin only)
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, price, category, icon, description, features, duration } = req.body;
    
    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Please provide name, price and category' });
    }
    
    const service = new Service({
      name,
      price,
      category,
      icon: icon || '🔧',
      description: description || '',
      features: features || [],
      duration: duration || '1-2 hours'
    });
    
    await service.save();
    
    res.status(201).json({
      success: true,
      service
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/services/:id
// @desc    Update a service (admin only)
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { name, price, category, status, icon, description, features, duration } = req.body;
    
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Update fields
    if (name) service.name = name;
    if (price) service.price = price;
    if (category) service.category = category;
    if (status) service.status = status;
    if (icon) service.icon = icon;
    if (description) service.description = description;
    if (features) service.features = features;
    if (duration) service.duration = duration;
    service.updatedAt = Date.now();
    
    await service.save();
    
    res.json({
      success: true,
      service
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete a service (admin only)
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    await service.deleteOne();
    
    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/services/:id/status
// @desc    Update service status (admin only)
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ message: 'Please provide valid status (Active/Inactive)' });
    }
    
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    service.status = status;
    service.updatedAt = Date.now();
    await service.save();
    
    res.json({
      success: true,
      service
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/services/bulk
// @desc    Add multiple services at once (admin only)
// @access  Private/Admin
router.post('/bulk', protect, admin, async (req, res) => {
  try {
    const { services } = req.body;
    
    if (!services || !Array.isArray(services)) {
      return res.status(400).json({ message: 'Please provide an array of services' });
    }
    
    const savedServices = [];
    for (const serviceData of services) {
      const service = new Service(serviceData);
      await service.save();
      savedServices.push(service);
    }
    
    res.status(201).json({
      success: true,
      count: savedServices.length,
      services: savedServices
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;