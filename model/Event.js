const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    
    name: {type: String, required: true},
    date: {type: Date, required: true},
    location : {type:String , required: false},
    eventType : {type: String , required: false},
    guestCount : {type: Number, required : false}
});

module.exports = mongoose.model('Event', EventSchema);