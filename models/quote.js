var mongoose = require('mongoose');
var moment = require('moment'); // For date handling.

var Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  pro_no: { type: Number, required: true, max: 20 },
  quote_no: { type: String, required: true, max: 20 },
  name: { type: String, required: true, max: 200 },
  address: { type: String, max: 500 },
  value: { type: Number, max: 50 },
  prepared_by: { type: String, max: 20 },
  reviewed_by: { type: String, max: 20 },
  sent_date: { type: Date },
  status: { type: String, max: 20 },
  due_date: { type: Date },
  receive_date: { type: Date },
  follow_date: { type: Date },
  builder1: { type: String, max: 200 }
});

// ProductSchema.virtual('url').get(function() {
//   return '/bis/product/' + this.code;
// });

QuoteSchema.virtual('follow_date_Aus').get(function() {
  return moment(this.follow_date).format('ll'); 
});
QuoteSchema.virtual('sent_date_Aus').get(function() {
  return moment(this.sent_date).format('ll'); 
});
QuoteSchema.virtual('due_date_Aus').get(function() {
  return moment(this.due_date).format('ll'); 
});
QuoteSchema.virtual('receive_date_Aus').get(function() {
  return moment(this.receive_date).format('ll'); 
});

// Export model.
module.exports = mongoose.model('Quote', QuoteSchema);