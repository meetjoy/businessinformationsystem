// var Book = require('../models/book');
// var Author = require('../models/author');
// var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');
var Product = require('../models/product');
var Client = require('../models/client');
var Quote = require('../models/quote');
const { body,validationResult } = require('express-validator');

var async = require('async');

exports.index = function(req, res) {   
    async.parallel({
      product_count: function(callback) {
          Product.countDocuments({}, callback); // Pass an empty object as match condition to find all documents
      },
      client_count: function(callback) {
          Client.countDocuments({}, callback);
      },
    }, function(err, results) {
    res.render('index', { title: 'Safemaster: Business Information System Home', error: err, data: results}); });
  };
  
  // Display list of all Products.
exports.product_list = function(req, res, next) {
  Product.find({}, 'code description price_supply_only comment') //  
    // .populate('author')
    .exec(function (err, list_products) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('product_list', { title: 'Product List', product_list: list_products });
    });
};

 // Display list of all Clients.
 exports.client_list = function(req, res, next) {
  Client.find({}, 'company_name address person_name email mobile phone fax active update_date_Aus update_date') //  
    .exec(function (err, list_clients) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('client_list', { title: 'Client List', client_list: list_clients });
    });
};

// Display list of all quotes.
exports.quote_list = function(req, res, next) {
  Quote.find({}, 'pro_no quote_no name address value prepared_by reviewed_by sent_date_Aus status due_date_Aus note') //  
    .exec(function (err, list_quotes) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('quote_list', { title: 'Quote List', quote_list: list_quotes });
    });
};




// // Display detail page for a specific book.
// exports.book_detail = function(req, res, next) {

//     async.parallel({
//         book: function(callback) {

//             Book.findById(req.params.id)
//               .populate('author')
//               .populate('genre')
//               .exec(callback);
//         },
//         book_instance: function(callback) {

//           BookInstance.find({ 'book': req.params.id })
//           .exec(callback);
//         },
//     }, function(err, results) {
//         if (err) { return next(err); }
//         if (results.book==null) { // No results.
//             var err = new Error('Book not found');
//             err.status = 404;
//             return next(err);
//         }
//         // Successful, so render.
//         res.render('book_detail', { title: results.book.title, book: results.book, book_instances: results.book_instance } );
//     });

// };

// // Display book create form on GET.
// exports.book_create_get = function(req, res, next) { 
      
//     // Get all authors and genres, which we can use for adding to our book.
//     async.parallel({
//         authors: function(callback) {
//             Author.find(callback);
//         },
//         genres: function(callback) {
//             Genre.find(callback);
//         },
//     }, function(err, results) {
//         if (err) { return next(err); }
//         res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres });
//     });
    
// };

// // Handle book create on POST.
// exports.book_create_post = [
//     // Convert the genre to an array.
//     (req, res, next) => {
//         if(!(req.body.genre instanceof Array)){
//             if(typeof req.body.genre==='undefined')
//             req.body.genre=[];
//             else
//             req.body.genre=new Array(req.body.genre);
//         }
//         next();
//     },

//     // Validate fields.
//     body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
//     body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
//     body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
//     body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),
  
//     // Sanitize fields (using wildcard).
//     body('*').trim().escape(),
//     body('genre.*').escape(),
//     // Process request after validation and sanitization.
//     (req, res, next) => {
        
//         // Extract the validation errors from a request.
//         const errors = validationResult(req);

//         // Create a Book object with escaped and trimmed data.
//         var book = new Book(
//           { title: req.body.title,
//             author: req.body.author,
//             summary: req.body.summary,
//             isbn: req.body.isbn,
//             genre: req.body.genre
//            });

//         if (!errors.isEmpty()) {
//             // There are errors. Render form again with sanitized values/error messages.

//             // Get all authors and genres for form.
//             async.parallel({
//                 authors: function(callback) {
//                     Author.find(callback);
//                 },
//                 genres: function(callback) {
//                     Genre.find(callback);
//                 },
//             }, function(err, results) {
//                 if (err) { return next(err); }

//                 // Mark our selected genres as checked.
//                 for (let i = 0; i < results.genres.length; i++) {
//                     if (book.genre.indexOf(results.genres[i]._id) > -1) {
//                         results.genres[i].checked='true';
//                     }
//                 }
//                 res.render('book_form', { title: 'Create Book',authors:results.authors, genres:results.genres, book: book, errors: errors.array() });
//             });
//             return;
//         }
//         else {
//             // Data from form is valid. Save book.
//             book.save(function (err) {
//                 if (err) { return next(err); }
//                    //successful - redirect to new book record.
//                    res.redirect(book.url);
//                 });
//         }
//     }
// ];
// exports.book_delete_get = (req, res) => {res.send('Not implemented: Delete book GET');};

// exports.book_delete_post = (req, res) => {res.send('Not implemented: Delete book POST');};

// // Display book update form on GET.
// exports.book_update_get = function(req, res, next) {

//     // Get book, authors and genres for form.
//     async.parallel({
//         book: function(callback) {
//             Book.findById(req.params.id).populate('author').populate('genre').exec(callback);
//         },
//         authors: function(callback) {
//             Author.find(callback);
//         },
//         genres: function(callback) {
//             Genre.find(callback);
//         },
//         }, function(err, results) {
//             if (err) { return next(err); }
//             if (results.book==null) { // No results.
//                 var err = new Error('Book not found');
//                 err.status = 404;
//                 return next(err);
//             }
//             // Success.
//             // Mark our selected genres as checked.
//             for (var all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++) {
//                 for (var book_g_iter = 0; book_g_iter < results.book.genre.length; book_g_iter++) {
//                     if (results.genres[all_g_iter]._id.toString()==results.book.genre[book_g_iter]._id.toString()) {
//                         results.genres[all_g_iter].checked='true';
//                     }
//                 }
//             }
//             res.render('book_form', { title: 'Update Book', authors:results.authors, genres:results.genres, book: results.book });
//         });

// };

// // Handle book update on POST.
// exports.book_update_post = [

//     // Convert the genre to an array
//     (req, res, next) => {
//         if(!(req.body.genre instanceof Array)){
//             if(typeof req.body.genre==='undefined')
//             req.body.genre=[];
//             else
//             req.body.genre=new Array(req.body.genre);
//         }
//         next();
//     },
   
//     // Validate fields.
//     body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
//     body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
//     body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
//     body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),

//     // Sanitize fields.
//     body('title').trim().escape(),
//     body('author').trim().escape(),
//     body('summary').trim().escape(),
//     body('isbn').trim().escape(),
//     body('genre.*').trim().escape(),

//     // Process request after validation and sanitization.
//     (req, res, next) => {

//         // Extract the validation errors from a request.
//         const errors = validationResult(req);

//         // Create a Book object with escaped/trimmed data and old id.
//         var book = new Book(
//           { title: req.body.title,
//             author: req.body.author,
//             summary: req.body.summary,
//             isbn: req.body.isbn,
//             genre: (typeof req.body.genre==='undefined') ? [] : req.body.genre,
//             _id:req.params.id //This is required, or a new ID will be assigned!
//            });

//         if (!errors.isEmpty()) {
//             // There are errors. Render form again with sanitized values/error messages.

//             // Get all authors and genres for form.
//             async.parallel({
//                 authors: function(callback) {
//                     Author.find(callback);
//                 },
//                 genres: function(callback) {
//                     Genre.find(callback);
//                 },
//             }, function(err, results) {
//                 if (err) { return next(err); }

//                 // Mark our selected genres as checked.
//                 for (let i = 0; i < results.genres.length; i++) {
//                     if (book.genre.indexOf(results.genres[i]._id) > -1) {
//                         results.genres[i].checked='true';
//                     }
//                 }
//                 res.render('book_form', { title: 'Update Book',authors:results.authors, genres:results.genres, book: book, errors: errors.array() });
//             });
//             return;
//         }
//         else {
//             // Data from form is valid. Update the record.
//             Book.findByIdAndUpdate(req.params.id, book, {}, function (err,thebook) {
//                 if (err) { return next(err); }
//                    // Successful - redirect to book detail page.
//                    res.redirect(thebook.url);
//                 });
//         }
//     }
// ];