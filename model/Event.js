const mongoose = require('mongoose');
const muv = require('mongoose-unique-validator');

mongoose.plugin(muv);

const EventSchema = mongoose.Schema({
    
    name: {type: String, required: true},
    date: {type: Date, required: true},
    location : {type:String , required: false},
    eventType : {type: String , required: true},
    guestCount : {type: Number, required : false},
    menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' , required: false}]
});

module.exports = mongoose.model('Event', EventSchema);