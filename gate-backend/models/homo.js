const household = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 150
    },
    phone: {
	    	type: String,
        maxlength: 500
    },
		email: {
	    	type: String,
        maxlength: 500
    },
    status: {
    	type: ObjectId,
      ref: "Users"
    },
  
}, {timestamps: true});

module.exports = mongoose.model("Household", checkListSchema);