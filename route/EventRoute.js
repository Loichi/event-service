const express = require('express');
const router = express.Router();
const EventController = require('../controller/EventController');


//GET
router.get('/', EventController.getAllEvents);
router.get('/:id', EventController.getEventById);

//CREATE
router.post('/', EventController.createEvent);

//DELETE
router.delete('/:id', EventController.deleteEventById);
router.delete('/', EventController.deleteAllEvents);

//UPDATE
router.put('/:id', EventController.updateEventById);


module.exports = router;