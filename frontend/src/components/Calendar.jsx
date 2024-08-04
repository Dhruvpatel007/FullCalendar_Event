import React, { useState , useEffect} from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventForm from './EventForm';
import axios from 'axios'
const Calendar = () => {

    const [eventsData, setEventsData] = useState([
        { title: 'event 1', date: '2024-08-02' },
        { title: 'event 2', date: '2024-08-05' }
    ]);
   const [openModel, setOpenModel] = useState(false);
   const [selectedSlot, setSelectedSlot] = useState({
    start: null,
    end: null
  })

  const fetchAllEvents = async() =>{
     const events = axios.get('http://localhost:5000/api/createEvent')
     .then((res) => {
        setEventsData(res.data);
        console.log(res.data);
	})
	.catch((error) => {
		console.log(error);
	});
     
    // 

  }

  useEffect(()=>{
   fetchAllEvents();
  },[])

    const handleEventDrop = async(info) =>{
        console.log(info)
    }
    const handleEventResize = async(info) =>{
        console.log(info.event.id , info.event.startstr)
    }

    const handleDateSelect = async(info)=>{
        console.log(info)
        
        setOpenModel(true);
        setSelectedSlot({start: info.start})
        

    }

    const handleAddEvent = async (newEvent) =>{
      setEventsData([...eventsData, newEvent])

    }
  return (
    <div>
        <button
        className="absolute top-4 right-4 p-2  bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        onClick={() => {
          setOpenModel(true);
        }}
      >
        Add New Event
      </button>

      <EventForm
        onSubmit={handleAddEvent}
        initialStart={selectedSlot?.start}
        initialEnd={selectedSlot?.end}
        setOpenModel={setOpenModel}
        openModel={openModel}
      />
        <div className="mt-20">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          selectable={true}
          eventDurationEditable={true}
          editable={true}
          select={handleDateSelect}
          eventResize={handleEventResize}
          droppable={true}
          events={eventsData}
          eventDrop={handleEventDrop}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </div>
    </div>
  )
}

export default Calendar