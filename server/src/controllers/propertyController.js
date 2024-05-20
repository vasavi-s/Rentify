// src/controllers/propertyController.js

const Property = require('../models/property');
const User = require('../models/user');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'password',
  },
});

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('seller', 'email firstName lastName');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.createProperty = async (req, res) => {
//   try {
//     const property = new Property({ ...req.body, seller: req.userId });
//     await property.save();
//     res.status(201).json(property);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


exports.createProperty = async (req, res) => {
  try {
    const { place, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } = req.body;

    // Validate required fields
    if (!place || !area || !bedrooms || !bathrooms || nearbyHospitals === undefined || nearbyColleges === undefined) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Extract user ID from the request
    const userId = req.userId;

    // Create a new property with the provided details and the associated seller ID
    const property = new Property({
      place,
      area,
      bedrooms,
      bathrooms,
      nearbyHospitals,
      nearbyColleges,
      seller: userId, // Associate the seller ID with the property
    });

    // Save the property to the database
    await property.save();

    // Return the created property as a response
    res.status(201).json(property);
  } catch (error) {
    // Handle any errors that occur during property creation
    console.error('Error creating property:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.interestProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('seller', 'email');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.interestCount += 1;
    await property.save();

    // Send email to the seller
    const mailOptions = {
      from: 'your-email@gmail.com ',
      to: property.seller.email,
      subject: 'New Interest in Your Property',
      text: `Someone is interested in your property located at ${property.place}.`,
    };
    await transporter.sendMail(mailOptions);

    // Send email to the interested buyer
    const buyer = await User.findById(req.userId);
    const buyerMailOptions = {
      from: 'your-email@gmail.com ',
      to: buyer.email,
      subject: 'Interest Registered',
      text: `You have shown interest in the property located at ${property.place}. Contact details: ${property.seller.email}`,
    };
    await transporter.sendMail(buyerMailOptions);

    res.json({ message: 'Interest registered successfully', property });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
