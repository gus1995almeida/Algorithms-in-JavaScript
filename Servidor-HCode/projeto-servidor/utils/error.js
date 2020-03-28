module.exports = {

	send: (req,res,error,code=400)=>{
		res.status(code).json({
			error
		});
		console.log(error);
	}
};