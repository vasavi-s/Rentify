const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  place: { type: String, required: true },
  area: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  nearbyHospitals: { type: Number, required: true },
  nearbyColleges: { type: Number, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  interestCount: { type: Number, default: 0 },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
