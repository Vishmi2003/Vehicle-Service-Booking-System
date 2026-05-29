import React, { useState, useEffect } from 'react';

const styles = `
  .services-container {
    padding: 20px;
  }
  
  .add-service-btn {
    background: #10b981;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
    transition: all 0.3s;
  }
  
  .add-service-btn:hover {
    background: #059669;
    transform: translateY(-2px);
  }
  
  .service-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .service-info h4 {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 5px;
  }
  
  .service-info p {
    color: #6b7280;
    font-size: 14px;
  }
  
  .service-price {
    font-size: 20px;
    font-weight: bold;
    color: #2563eb;
  }
  
  .service-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  select {
    padding: 6px;
    border-radius: 6px;
    border: 1px solid #d1d5db;
  }
  
  .edit-btn {
    background: #f59e0b;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s;
  }
  
  .edit-btn:hover {
    background: #d97706;
  }
  
  .delete-btn {
    background: #ef4444;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s;
  }
  
  .delete-btn:hover {
    background: #dc2626;
  }
  
  .section-title {
    font-size: 24px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 20px;
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    border-radius: 16px;
    padding: 30px;
    width: 90%;
    max-width: 500px;
    max-height: 85vh;
    overflow-y: auto;
  }
  
  .modal-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #1f2937;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #374151;
  }
  
  .form-group input, .form-group select, .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
  }
  
  .form-group input:focus, .form-group select:focus {
    outline: none;
    border-color: #2563eb;
  }
  
  .modal-buttons {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .modal-btn {
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
  }
  
  .modal-btn-primary {
    background: #2563eb;
    color: white;
    border: none;
  }
  
  .modal-btn-secondary {
    background: #e5e7eb;
    color: #374151;
    border: none;
  }
`;

const AdminServicesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    features: '',
    duration: '',
    icon: ''
  });

  const categories = ['Maintenance', 'Repair', 'Cleaning', 'Inspection', 'Performance', 'Electrical', 'Body Repair', 'Tires', 'Engine', 'Transmission'];
  const iconOptions = ['🛢️', '🔧', '🔋', '⚙️', '🌡️', '⚡', '🛑', '🚗', '❄️', '🔌', '🔊', '🚙', '🧼', '✨', '🧽', '🔍', '📋', '🔬', '🏎️', '💨', '🔄', '🛞', '🔨', '📱', '💡', '🪫', '⛽', '🔧', '🛡️', '📊', '🎨', '🪣', '🧴', '🔩', '⏱️'];

  // 53+ Default Services
  const getDefaultServices = () => {
    return [
      // Maintenance Services (1-12)
      { id: 1, name: 'Oil Change', price: 'Rs 4,500', category: 'Maintenance', status: 'Active', icon: '🛢️', description: 'Complete engine oil and filter replacement', features: ['Premium quality oil', 'Oil filter replacement', 'Engine inspection', 'Fluid top-up'], duration: '30-45 min' },
      { id: 2, name: 'General Service', price: 'Rs 9,500', category: 'Maintenance', status: 'Active', icon: '🔧', description: 'Full vehicle inspection and maintenance', features: ['Engine tuning', 'Brake inspection', 'Tire pressure check', 'Fluid levels check'], duration: '2-3 hours' },
      { id: 3, name: 'Battery Check & Replacement', price: 'Rs 3,500', category: 'Maintenance', status: 'Active', icon: '🔋', description: 'Complete battery health check and replacement', features: ['Battery testing', 'Terminal cleaning', 'Charge system check', 'Replacement service'], duration: '20-30 min' },
      { id: 4, name: 'Wheel Alignment', price: 'Rs 4,000', category: 'Maintenance', status: 'Active', icon: '⚙️', description: 'Professional steering and wheel alignment', features: ['Computerized alignment', 'Camber adjustment', 'Toe adjustment', 'Test drive'], duration: '45-60 min' },
      { id: 5, name: 'Coolant Flush', price: 'Rs 5,500', category: 'Maintenance', status: 'Active', icon: '🌡️', description: 'Engine coolant system service', features: ['Coolant drain', 'System flush', 'New coolant fill', 'Leak inspection'], duration: '1 hour' },
      { id: 6, name: 'Transmission Service', price: 'Rs 12,000', category: 'Maintenance', status: 'Active', icon: '⚡', description: 'Automatic transmission fluid change', features: ['Fluid drain & fill', 'Filter replacement', 'Gasket check', 'Performance test'], duration: '2-3 hours' },
      { id: 7, name: 'Fuel System Cleaning', price: 'Rs 6,500', category: 'Maintenance', status: 'Active', icon: '⛽', description: 'Complete fuel system cleaning service', features: ['Fuel injector cleaning', 'Throttle body cleaning', 'Fuel filter replacement', 'Performance test'], duration: '1-2 hours' },
      { id: 8, name: 'Radiator Flush', price: 'Rs 4,500', category: 'Maintenance', status: 'Active', icon: '🌊', description: 'Complete radiator flush and coolant replacement', features: ['Coolant drain', 'System flush', 'New coolant fill', 'Pressure test'], duration: '1 hour' },
      { id: 9, name: 'Power Steering Service', price: 'Rs 3,500', category: 'Maintenance', status: 'Active', icon: '🔄', description: 'Power steering fluid change and inspection', features: ['Fluid drain', 'System flush', 'New fluid fill', 'Leak check'], duration: '45 min' },
      { id: 10, name: 'Differential Service', price: 'Rs 8,500', category: 'Maintenance', status: 'Active', icon: '⚙️', description: 'Differential fluid change and inspection', features: ['Fluid drain', 'Gasket inspection', 'New fluid fill', 'Performance test'], duration: '1-2 hours' },
      { id: 11, name: 'Brake Fluid Flush', price: 'Rs 3,000', category: 'Maintenance', status: 'Active', icon: '🛑', description: 'Complete brake fluid replacement', features: ['Fluid drain', 'System flush', 'New fluid fill', 'Air bleed'], duration: '1 hour' },
      { id: 12, name: 'Air Filter Replacement', price: 'Rs 1,500', category: 'Maintenance', status: 'Active', icon: '🌬️', description: 'Engine and cabin air filter replacement', features: ['Engine air filter', 'Cabin air filter', 'Inspection', 'Performance check'], duration: '20-30 min' },

      // Repair Services (13-25)
      { id: 13, name: 'Brake Service', price: 'Rs 7,500', category: 'Repair', status: 'Active', icon: '🛑', description: 'Complete brake inspection and repair', features: ['Brake pad replacement', 'Brake disc inspection', 'Brake fluid check', 'Performance test'], duration: '1-2 hours' },
      { id: 14, name: 'Tyre Replacement', price: 'Rs 8,500', category: 'Repair', status: 'Active', icon: '🚗', description: 'Professional tyre check and replacement', features: ['New tyre fitting', 'Wheel balancing', 'Tyre alignment check', 'Pressure setting'], duration: '45-60 min' },
      { id: 15, name: 'A/C Service', price: 'Rs 6,500', category: 'Repair', status: 'Active', icon: '❄️', description: 'Air conditioning inspection and gas refill', features: ['AC performance check', 'Gas refill', 'Filter cleaning', 'Leak detection'], duration: '1-2 hours' },
      { id: 16, name: 'Electrical Repair', price: 'Rs 4,500', category: 'Repair', status: 'Active', icon: '🔌', description: 'Complete wiring, lights, and fuse repairs', features: ['Wiring diagnosis', 'Light replacement', 'Fuse check', 'Electrical testing'], duration: '1-3 hours' },
      { id: 17, name: 'AC & Heating Repair', price: 'Rs 8,000', category: 'Repair', status: 'Active', icon: '🔊', description: 'Complete AC and heating system repair', features: ['Full diagnosis', 'Component repair', 'Gas refill', 'Performance test'], duration: '2-3 hours' },
      { id: 18, name: 'Suspension Repair', price: 'Rs 15,000', category: 'Repair', status: 'Active', icon: '🚙', description: 'Shock absorbers and struts replacement', features: ['Shock absorber check', 'Strut replacement', 'Bushing inspection', 'Test drive'], duration: '3-4 hours' },
      { id: 19, name: 'Engine Tuning', price: 'Rs 6,000', category: 'Repair', status: 'Active', icon: '🔧', description: 'Engine performance optimization', features: ['Spark plug replacement', 'Fuel system cleaning', 'Air filter change', 'ECU reset'], duration: '2 hours' },
      { id: 20, name: 'Clutch Repair', price: 'Rs 18,000', category: 'Repair', status: 'Active', icon: '🚗', description: 'Clutch plate and bearing replacement', features: ['Clutch inspection', 'Pressure plate check', 'Release bearing replacement', 'Test drive'], duration: '4-5 hours' },
      { id: 21, name: 'Timing Belt Replacement', price: 'Rs 12,000', category: 'Repair', status: 'Active', icon: '⏱️', description: 'Timing belt inspection and replacement', features: ['Belt inspection', 'Tensioner check', 'Water pump check', 'Full replacement'], duration: '3-4 hours' },
      { id: 22, name: 'Hybrid Battery Service', price: 'Rs 22,000', category: 'Repair', status: 'Active', icon: '🔋', description: 'Hybrid battery inspection and service', features: ['Battery health check', 'Cell balancing', 'Cooling fan cleaning', 'Performance test'], duration: '2-3 hours' },
      { id: 23, name: 'Alternator Repair', price: 'Rs 8,000', category: 'Repair', status: 'Active', icon: '⚡', description: 'Alternator inspection and repair', features: ['Charging test', 'Bearing check', 'Voltage regulation', 'Full repair'], duration: '2-3 hours' },
      { id: 24, name: 'Starter Motor Repair', price: 'Rs 7,000', category: 'Repair', status: 'Active', icon: '🔌', description: 'Starter motor inspection and repair', features: ['Starting test', 'Solenoid check', 'Motor inspection', 'Full repair'], duration: '2-3 hours' },
      { id: 25, name: 'Radiator Repair', price: 'Rs 6,000', category: 'Repair', status: 'Active', icon: '🌊', description: 'Radiator inspection and repair', features: ['Leak test', 'Core cleaning', 'Hose replacement', 'Pressure test'], duration: '2-3 hours' },

      // Cleaning Services (26-33)
      { id: 26, name: 'Car Wash', price: 'Rs 2,500', category: 'Cleaning', status: 'Active', icon: '🧼', description: 'Complete interior and exterior cleaning', features: ['Exterior wash', 'Interior vacuum', 'Window cleaning', 'Dashboard polish'], duration: '30-45 min' },
      { id: 27, name: 'Premium Detailing', price: 'Rs 15,000', category: 'Cleaning', status: 'Active', icon: '✨', description: 'Complete car detailing service', features: ['Paint correction', 'Interior deep clean', 'Engine bay cleaning', 'Ceramic coating'], duration: '4-6 hours' },
      { id: 28, name: 'Engine Degreasing', price: 'Rs 3,000', category: 'Cleaning', status: 'Active', icon: '🧽', description: 'Complete engine bay cleaning', features: ['Engine degreasing', 'Component cleaning', 'Wire protection', 'Finish polish'], duration: '1-2 hours' },
      { id: 29, name: 'Headlight Restoration', price: 'Rs 2,000', category: 'Cleaning', status: 'Active', icon: '💡', description: 'Professional headlight restoration', features: ['Sanding', 'Polishing', 'UV protection coating', 'Brightness test'], duration: '45-60 min' },
      { id: 30, name: 'AC Disinfection', price: 'Rs 3,500', category: 'Cleaning', status: 'Active', icon: '🦠', description: 'Complete AC system disinfection', features: ['Filter cleaning', 'Duct disinfection', 'Odor removal', 'Bacteria elimination'], duration: '1 hour' },
      { id: 31, name: 'Ceramic Coating', price: 'Rs 35,000', category: 'Cleaning', status: 'Active', icon: '💎', description: 'Premium ceramic coating protection', features: ['Paint correction', 'Ceramic application', 'Hydrophobic coating', 'UV protection'], duration: '2-3 days' },
      { id: 32, name: 'Upholstery Cleaning', price: 'Rs 4,000', category: 'Cleaning', status: 'Active', icon: '🪑', description: 'Professional seat and carpet cleaning', features: ['Stain removal', 'Deep cleaning', 'Sanitizing', 'Protection coating'], duration: '2-3 hours' },
      { id: 33, name: 'Paint Protection Film', price: 'Rs 25,000', category: 'Cleaning', status: 'Active', icon: '🛡️', description: 'Premium paint protection film installation', features: ['Surface prep', 'Film application', 'Edge sealing', 'UV protection'], duration: '1-2 days' },

      // Inspection Services (34-39)
      { id: 34, name: 'Pre-Purchase Inspection', price: 'Rs 5,000', category: 'Inspection', status: 'Active', icon: '🔍', description: 'Complete vehicle inspection before buying', features: ['Engine check', 'Transmission test', 'Body inspection', 'Test drive report'], duration: '2 hours' },
      { id: 35, name: 'Diagnostic Scan', price: 'Rs 2,500', category: 'Inspection', status: 'Active', icon: '📋', description: 'Computerized diagnostic check', features: ['ECU scan', 'Error code reading', 'Sensor check', 'Detailed report'], duration: '30-45 min' },
      { id: 36, name: 'Comprehensive Vehicle Check', price: 'Rs 7,500', category: 'Inspection', status: 'Active', icon: '🔬', description: '72-point vehicle inspection', features: ['Full system check', 'Safety inspection', 'Component testing', 'Maintenance report'], duration: '3 hours' },
      { id: 37, name: 'Emissions Test', price: 'Rs 2,000', category: 'Inspection', status: 'Active', icon: '🌿', description: 'Vehicle emissions testing', features: ['Exhaust analysis', 'CO2 measurement', 'HC check', 'Compliance report'], duration: '30 min' },
      { id: 38, name: 'Tyre Health Check', price: 'Rs 1,000', category: 'Inspection', status: 'Active', icon: '🛞', description: 'Complete tyre inspection', features: ['Tread depth', 'Pressure check', 'Sidewall inspection', 'Balance test'], duration: '20-30 min' },
      { id: 39, name: 'Suspension Check', price: 'Rs 2,500', category: 'Inspection', status: 'Active', icon: '🚙', description: 'Full suspension system inspection', features: ['Shock check', 'Spring inspection', 'Bushing test', 'Alignment check'], duration: '1 hour' },

      // Performance Services (40-46)
      { id: 40, name: 'Performance Tuning', price: 'Rs 25,000', category: 'Performance', status: 'Active', icon: '🏎️', description: 'ECU remapping for better performance', features: ['ECU remapping', 'Power optimization', 'Torque increase', 'Fuel efficiency tune'], duration: '4-5 hours' },
      { id: 41, name: 'Exhaust System Upgrade', price: 'Rs 20,000', category: 'Performance', status: 'Active', icon: '💨', description: 'Performance exhaust installation', features: ['Muffler replacement', 'Pipe upgrade', 'Sound tuning', 'Performance gain'], duration: '3-4 hours' },
      { id: 42, name: 'Turbo Installation', price: 'Rs 50,000', category: 'Performance', status: 'Active', icon: '🔄', description: 'Turbocharger installation and tuning', features: ['Turbo fitting', 'Intercooler setup', 'Boost control', 'Dyno tuning'], duration: '8-10 hours' },
      { id: 43, name: 'Chip Tuning', price: 'Rs 30,000', category: 'Performance', status: 'Active', icon: '💻', description: 'ECU chip tuning for power boost', features: ['Custom mapping', 'Dyno testing', 'Power curve optimization', 'Fuel efficiency tuning'], duration: '3-4 hours' },
      { id: 44, name: 'Cold Air Intake', price: 'Rs 12,000', category: 'Performance', status: 'Active', icon: '🌬️', description: 'Performance cold air intake installation', features: ['Intake removal', 'New intake fitting', 'Airflow test', 'Performance check'], duration: '2-3 hours' },
      { id: 45, name: 'Suspension Upgrade', price: 'Rs 35,000', category: 'Performance', status: 'Active', icon: '🔧', description: 'Performance suspension installation', features: ['Coilover fitting', 'Spring replacement', 'Stabilizer bar', 'Corner balancing'], duration: '5-6 hours' },
      { id: 46, name: 'Brake Upgrade', price: 'Rs 25,000', category: 'Performance', status: 'Active', icon: '🛑', description: 'High-performance brake system', features: ['Big brake kit', 'Performance pads', 'Steel lines', 'Fluid flush'], duration: '4-5 hours' },

      // Body Repair Services (47-53)
      { id: 47, name: 'Dent Repair', price: 'Rs 3,500', category: 'Repair', status: 'Active', icon: '🔨', description: 'Paintless dent repair', features: ['Dent assessment', 'Paintless removal', 'Surface finishing', 'Polish'], duration: '1-2 hours' },
      { id: 48, name: 'Scratch Removal', price: 'Rs 2,500', category: 'Cleaning', status: 'Active', icon: '✨', description: 'Professional scratch removal', features: ['Scratch assessment', 'Buffing', 'Polishing', 'Touch-up paint'], duration: '1 hour' },
      { id: 49, name: 'Windshield Repair', price: 'Rs 3,000', category: 'Repair', status: 'Active', icon: '🪟', description: 'Chip and crack repair', features: ['Damage assessment', 'Resin injection', 'Curing', 'Polishing'], duration: '30-45 min' },
      { id: 50, name: 'Paint Touch Up', price: 'Rs 2,000', category: 'Cleaning', status: 'Active', icon: '🎨', description: 'Professional paint touch-up', features: ['Color matching', 'Paint application', 'Blending', 'Clear coat'], duration: '1-2 hours' },
      { id: 51, name: 'Bumper Repair', price: 'Rs 8,000', category: 'Repair', status: 'Active', icon: '🚗', description: 'Bumper repair and painting', features: ['Damage assessment', 'Plastic repair', 'Priming', 'Painting'], duration: '3-4 hours' },
      { id: 52, name: 'Full Body Paint', price: 'Rs 60,000', category: 'Cleaning', status: 'Active', icon: '🎨', description: 'Complete vehicle repaint', features: ['Sanding', 'Primer', 'Base coat', 'Clear coat'], duration: '5-7 days' },
      { id: 53, name: 'Rust Treatment', price: 'Rs 5,000', category: 'Repair', status: 'Active', icon: '🛡️', description: 'Rust removal and prevention', features: ['Rust assessment', 'Removal', 'Treatment', 'Protection coating'], duration: '2-3 hours' }
    ];
  };

  // Load services from localStorage
  const loadServices = () => {
    setLoading(true);
    try {
      let savedServices = localStorage.getItem('allServices');
      if (savedServices) {
        const parsedServices = JSON.parse(savedServices);
        if (parsedServices.length > 0) {
          setServices(parsedServices);
          setLoading(false);
          return;
        }
      }
      // If no services found, load default services
      const defaultServices = getDefaultServices();
      setServices(defaultServices);
      localStorage.setItem('allServices', JSON.stringify(defaultServices));
    } catch (error) {
      console.error('Error loading services:', error);
      const defaultServices = getDefaultServices();
      setServices(defaultServices);
      localStorage.setItem('allServices', JSON.stringify(defaultServices));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  // Save services to localStorage whenever they change
  const saveServices = (updatedServices) => {
    setServices(updatedServices);
    localStorage.setItem('allServices', JSON.stringify(updatedServices));
    // Trigger storage event for user services page
    window.dispatchEvent(new StorageEvent('storage', { 
      key: 'allServices', 
      newValue: JSON.stringify(updatedServices) 
    }));
  };

  const handleOpenAddModal = () => {
    setEditingService(null);
    setFormData({
      name: '',
      category: 'Maintenance',
      price: '',
      description: '',
      features: '',
      duration: '',
      icon: '🔧'
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category,
      price: service.price.replace('Rs ', ''),
      description: service.description || '',
      features: service.features ? service.features.join(', ') : '',
      duration: service.duration || '',
      icon: service.icon || '🔧'
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.price) {
      alert('Please fill all required fields');
      return;
    }

    const serviceData = {
      id: editingService ? editingService.id : Date.now(),
      name: formData.name,
      category: formData.category,
      price: `Rs ${formData.price}`,
      description: formData.description,
      features: formData.features.split(',').map(f => f.trim()),
      duration: formData.duration,
      icon: formData.icon,
      status: editingService ? editingService.status : 'Active'
    };

    let updatedServices;
    if (editingService) {
      updatedServices = services.map(service =>
        service.id === editingService.id ? serviceData : service
      );
      alert('Service updated successfully!');
    } else {
      updatedServices = [...services, serviceData];
      alert('Service added successfully!');
    }
    
    saveServices(updatedServices);
    setShowModal(false);
  };

  const handleDelete = (serviceId, serviceName) => {
    if (window.confirm(`Are you sure you want to delete "${serviceName}"? This action cannot be undone.`)) {
      const updatedServices = services.filter(service => service.id !== serviceId);
      saveServices(updatedServices);
      alert('Service deleted successfully!');
    }
  };

  const handleStatusChange = (serviceId, newStatus) => {
    const updatedServices = services.map(service =>
      service.id === serviceId ? { ...service, status: newStatus } : service
    );
    saveServices(updatedServices);
    alert(`Service ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully`);
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="services-container">
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading services...</div>
        </div>
      </>
    );
  }

  const activeCount = services.filter(s => s.status === 'Active').length;
  const inactiveCount = services.filter(s => s.status === 'Inactive').length;

  return (
    <>
      <style>{styles}</style>
      <div className="services-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="section-title">Manage Services ({services.length} Services)</h2>
          <button className="add-service-btn" onClick={handleOpenAddModal}>
            + Add New Service
          </button>
        </div>
        
        <div style={{ marginBottom: '20px', padding: '10px', background: '#f3f4f6', borderRadius: '8px' }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            📊 Total Services: <strong>{services.length}</strong> | 
            Active: <strong>{activeCount}</strong> | 
            Inactive: <strong>{inactiveCount}</strong>
          </p>
        </div>
        
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-info">
              <h4>{service.icon || '🔧'} {service.name}</h4>
              <p>{service.category}</p>
            </div>
            <div className="service-price">{service.price}</div>
            <div className="service-actions">
              <select onChange={(e) => handleStatusChange(service.id, e.target.value)} value={service.status}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button className="edit-btn" onClick={() => handleOpenEditModal(service)}>✏️ Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(service.id, service.name)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{editingService ? 'Edit Service' : 'Add New Service'}</h3>
            
            <div className="form-group">
              <label>Service Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g., Oil Change" />
            </div>
            
            <div className="form-group">
              <label>Category *</label>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            
            <div className="form-group">
              <label>Price (Rs) *</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="e.g., 4500" />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea rows="2" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Service description" />
            </div>
            
            <div className="form-group">
              <label>Features (comma separated)</label>
              <input type="text" value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} placeholder="e.g., Premium quality oil, Oil filter replacement" />
            </div>
            
            <div className="form-group">
              <label>Duration</label>
              <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} placeholder="e.g., 30-45 min" />
            </div>
            
            <div className="form-group">
              <label>Icon</label>
              <select value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})}>
                {iconOptions.map(icon => <option key={icon} value={icon}>{icon} {icon}</option>)}
              </select>
            </div>
            
            <div className="modal-buttons">
              <button className="modal-btn modal-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="modal-btn modal-btn-primary" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminServicesPage;