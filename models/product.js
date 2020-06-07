var mongoose = require('mongoose');
var moment = require('moment'); // For date handling.

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  code: { type: String, required: true, max: 50 },
  description: { type: String, required: true, max: 500 },
  price_supply_only: { type: Number, required: true, min: 0 } //,
  // update_date: { type: Date }
});

// ProductSchema.virtual('name').get(function() {
//   var fullname = '';

//   if (this.first_name && this.family_name) {
//     fullname = this.family_name + ', ' + this.first_name;
//   }

//   if (!this.first_name && !this.family_name) {
//     fullname = '';
//   }
//   return fullname;
// });

// Virtual for this author instance URL.
ProductSchema.virtual('url').get(function() {
  return '/bis/product/' + this.code;
});

// ProductSchema.virtual('lifespan').get(function() {
//   var lifetime_string = '';
//   if (this.date_of_birth) {
//     lifetime_string = moment(this.date_of_birth).format('MMMM Do, YYYY');
//   }
//   lifetime_string += ' - ';
//   if (this.date_of_death) {
//     lifetime_string += moment(this.date_of_death).format('MMMM Do, YYYY');
//   }
//   return lifetime_string;
// });

// AuthorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
//   return moment(this.date_of_birth).format('YYYY-MM-DD');
// });

// AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function() {
//   return moment(this.date_of_death).format('YYYY-MM-DD');
// });

// Export model.
module.exports = mongoose.model('Product', ProductSchema);