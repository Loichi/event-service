const Event = require('../model/Event');


async function createEvent(req,res){

    try{
        const {name , date , location, eventType , guestCount} = req.body;

        const newEvent = await Event.create({name , date , location, eventType , guestCount});
        res.status(201).json(newEvent);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "An error occured white creating the event"});
    }
}