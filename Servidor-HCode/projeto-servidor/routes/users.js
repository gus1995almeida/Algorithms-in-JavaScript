const { check, validationResult } = require('express-validator');

const NeDb = require('nedb');
let db = new NeDb({
	filename: 'users.db',
	autoload:true
});

module.exports = app=>{

	let route = app.route('/users');
	route.get((req,res)=>{

		db.find({}).sort({name:1}).exec((err,users)=>{
			if(err){
				app.utils.error.send(req,res,err);
			}else{
				res.setHeader('Content-Type','application/json');
				res.status(200).json({
					users
				});
			}
		});
	});

	route.post([
		  check('_name').not().isEmpty(),
		  check('_email').isEmail()
		],(req,res)=>{

			let errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() })
			}

			db.insert(req.body,(err,user)=>{
				if(err){
					app.utils.error.send(req,res,err);
				}else{
					res.status(200).json(user);
				}
			});

		}
	);

	let routeId = app.route('/users/:id');

	routeId.get((req,res)=>{
		db.findOne({_id:req.params.id}).exec((err,user)=>{
			if(err){
				app.utils.error.send(req,res,err);
			}else{
				res.status(200).json(user);
			}
		});
	});

	routeId.put([
			check('_name').not().isEmpty(),
		  	check('_email').isEmail()
		],(req,res)=>{

		let errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() })
		}
		
		db.update({_id:req.params.id}, req.body, err=>{
			if(err){
				app.utils.error.send(req,res,err);
			}else{
				res.status(200).json(Object.assign(req.params,req.body));
			}
		});
	});

	routeId.delete((req,res)=>{
		db.remove({_id:req.params.id},{},err=>{
			if(err){
				app.utils.error.send(req,res,err);
			}else{
				res.status(200).json(req.params);
			}
		});
	});
};