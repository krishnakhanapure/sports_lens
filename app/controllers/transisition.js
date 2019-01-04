
var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var pool = require('../../config/database.js');
var Q = require('q');
var query = require('../../config/queries.js');
var transistion = require('../models/transistion.js');


exports.showScreen = function(req, res) {

		pool.getConnection((err, connection) => {
			  function queryConfig(){
		      var defered = Q.defer();
		      connection.query(transistion.selectVendorDetails(),defered.makeNodeResolver());
		      return defered.promise;
		    }
			
			function queryMAPPING(){
		      var defered = Q.defer();
		      connection.query(transistion.selectMAPPING(),defered.makeNodeResolver());
		      return defered.promise;
		    }

			
		    Q.all([queryConfig(),queryMAPPING()]).then((results) => {
		      connection.release();
		      if(err) {

		        res.end();
		      }
		      else {
						console.log(JSON.stringify(results[1][0]))
		        res.render('transisition.ejs', {
		            error : req.flash("error"),
		            success: req.flash("success"),
		         		vendor: results[0][0],
								application:results[1][0]
		         });
		      }
		    });
		});
	
}


exports.transistionMap = function(req, res) {
 	pool.getConnection((err, connection) => {
 		connection.query(transistion.buildQuery(req.body), (err, rows, fields) => {
 			connection.release();
 			if(err) {
 				console.log(err);
 				res.render('redirectAfterSave.ejs', {
 					error : req.flash("error"),
 					success: req.flash("success"),
 					session:req.session,
 					actionNeeded: "/tt/transisition",
 					statusMessage: "There was error while mapping, Please try again.",
 				 });
 			} else {
 				console.log('data entered successfully');
 				res.render('redirectAfterSave.ejs', {
 						error : req.flash("error"),
 						success: req.flash("success"),
						session:req.session,
 						actionNeeded: "/tt/transisition",
 						statusMessage: "Mapped Successfully!!!",
						
 				 });
 			}
 		});		
 	});
}

exports.sendTransistionDetails = function(req, res) {
 	pool.getConnection((err, connection) => {
		 var queryData =transistion.exposeQueryData(req.body);
 		connection.query('INSERT INTO transistionDetails (nyVp, vendor, project, application, name, classroomSession, Shadowing,reverseShadowing,Evaluation,qaReview,Documentation,ktSignOff) VALUES ?',[queryData],(err, rows, fields) => {
 			connection.release();
 			if(err) {
 				console.log(err);
 				res.render('redirectAfterSave.ejs', {
 					error : req.flash("error"),
 					success: req.flash("success"),
 					session:req.session,
 					actionNeeded: "/tt/transisition",
 					statusMessage: "There was error while mapping, Please try again.",
 				 });
 			} else {
 				console.log('data entered successfully');
 				res.render('redirectAfterSave.ejs', {
 						error : req.flash("error"),
 						success: req.flash("success"),
						session:req.session,
 						actionNeeded: "/tt/transisition",
 						statusMessage: "Mapped Successfully!!!",
						
 				 });
 			}
 		});		
 	});
}

