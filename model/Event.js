const mongoose = require('mongoose');
const muv = require('mongoose-unique-validator');

mongoose.plugin(muv);

const EventSchema = mongoose.Schema({
    
    name: {type: String, required: true},
    location : {type:String , required: false},
    eventType : {type: String , required: true},
    clientName: {type: String, required: true},
    guestCount : {type: Number, required : false},
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' , required: false}],
    totalPrice : {type: Number, required : false},
    date: {type: Date, required: true},
    eventDone: {type: Boolean, required:true}

});

module.exports = mongoose.model('Event', EventSchema);