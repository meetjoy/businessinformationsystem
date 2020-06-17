var mongoose = require('mongoose');
var moment = require('moment'); // For date handling.

var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  company_name: { type: String, required: true, max: 100 },
  address: { type: String, max: 500 },
  person_name: { type: String, required: true, max: 50 },
  email: { type: String, max: 50 },
  mobile: { type: String, max: 13 },
  phone: { type: String, max: 12 },
  fax: { type: String, max: 13 },
  active: { type: String, max: 20 },
  update_date: { type: Date }
});

// ProductSchema.virtual('url').get(function() {
//   return '/bis/product/' + this.code;
// });

ClientSchema.virtual('update_date_Aus').get(function() {
  return moment(this.update_date).format('ll'); 
});

// Export model.
module.exports = mongoose.model('Client', ClientSchema);