const mongoose = require("mongoose")

const EventSchema= new mongoose.Schema({
    start :{
      type : Date,
      require: true
    },
    end: { 
        type : Date,
        require: true
    },
    title: {
        type: String

    },
    description: {
        type: String
    },
    priority:{
        type: String,
        required: ["high", "low", "medium"],
    },
    color: {
        type: String
    }
},
{
    timestamps: true,
})

const Event = mongoose.model('event', EventSchema);
module.exports = Event;