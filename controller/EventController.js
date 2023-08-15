const Event = require("../model/Event");
const axios = require('axios');

//Crée un evenement et calcul le prix total de l'evenement pour le client
async function createEvent(req, res) {
  try {
    const newEvent = await Event.create(req.body);

    const response = await axios.get(`http://localhost:3010/menus/${newEvent.menu}`);

    const menu = response.data; // Utilisez response.data pour accéder aux données renvoyées

    if (!menu.menu_price) {
      return res.status(404).json({ message: 'Menu not found, cannot calculate totalPrice' });
    }

    const totalPrice = menu.menu_price * newEvent.guestCount;
    newEvent.totalPrice = totalPrice;

    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while creating the event' });
  }
}

//GetAll

async function getAllEvents(req, res) {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the events." });
  }
}

//Get One By Id
async function getEventById(req, res) {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the event." });
  }
}

//Supprime un event par son Id et le menu qui lui est lié
async function deleteEventById(req, res) {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    console.log("event menu : ",event.menu);
    if(event.menu){
      await axios.delete(`http://localhost:3010/menus/${event.menu}`);
    }
    res.json({ message: "Event deleted successfully." });
} catch (err) {
    res
    .status(500)
    .json({ error: "An error occurred while deleting the event." });
}
}

//Delete All Events
async function deleteAllEvents(req, res) {
    try {
        const events = await Event.find();

        if (events.length === 0) {
            return res.status(404).json({ message: "Events not found." });
        }

        const deletePromises = events.map(async (event) => {
            await Event.findByIdAndDelete(event.id);
        });

        await Promise.all(deletePromises);

        res.json({ message: "Events deleted successfully." });
    } catch (err) {
        res
            .status(500)
            .json({ error: "An error occurred while deleting the events." });
    }
}

//Update Event By Id
async function updateEventById(req, res) {
    try {
    
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, {new:true});

      if(!event){
        return res.status(404).json({ message: 'Event not found.' });
      }

      res.json(event);
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the Event.' });
    }
  }

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEventById,
  deleteAllEvents,
  updateEventById
};
