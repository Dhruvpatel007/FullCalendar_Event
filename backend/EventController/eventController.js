const Event = require('../models/Event')
let mongoose = require("mongoose")
const express = require('express')
router = express.Router();

router.post('/api/createEvent', async(req, res)=>{
  try {
    console.log(req.body);
    const {start ,
        end,
        title,
        description,
        priority,
        color} = req.body;
        
    const event = new Event(req.body);
    await event.save()
    res.status(201).json(req.body);
  } catch (error) {
    console.log(error.message)
  }
});

router.get('/api/createEvent', async(req,res) => {
    try {
        const event = await Event.find();
        res.status(200).json(event);
      } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ error: "Failed to get event" });
      }

});

router.put('/api/createEvent/:id', async(req, res)=>{
    const { startDate, endDate } = req.body;
    try {
        const event = await Event.findByIdAndUpdate(req.param.id, {startDate,endDate});
        res.status(200).json(event);
      } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ error: "Failed to get event" });
      }
})

module.exports = router;