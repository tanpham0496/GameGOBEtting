const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema ({
	data: {type: Array, trim : true}
});
module.exports = mongoose.model('Match', matchSchema);