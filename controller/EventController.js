const Event = require("../model/Event");

//Create
async function createEvent(req, res) {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occured while creating the event" });
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

//Delete Event By Id
async function deleteEventById(req, res) {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
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
    const { name, date, location, eventType, guestCount } = req.body;

      const event = await Event.findByIdAndUpdate(req.params.id, { name, date, location, eventType, guestCount }, {new:true});

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
