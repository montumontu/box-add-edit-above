const mongoose = require('mongoose');
const boxSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    boxId: {type:Number, required: true},
    boxTag: {type:String, required: true}
});

module.exports = mongoose.model('Box', boxSchema);