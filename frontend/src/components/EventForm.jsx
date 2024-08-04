import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import axios from 'axios'

// Modal.setAppElement('#root');
Modal.setAppElement('*');

const EventForm = ({
  onSubmit,
  initialStart,
  initialEnd,
  setOpenModel,
  openModel,
}) => {
  console.log(initialStart)
  const [start, setStart] = useState (initialStart ? initialStart.toISOString().substring(0, 10) : "");
  
  const [showError, setShowError] = useState("");

  const [end, setEnd] = useState (initialEnd ? initialEnd.toISOString().substring(0, 10) : "");
  const [title, setTitle] = useState ("");
  const [description, setDescription] = useState ("");
  const [priority, setPriority] = useState ("");

  useEffect(() => {
    if (initialStart && initialEnd) {
      setStart(initialStart.toISOString().substring(0, 16));
      setEnd(initialEnd.toISOString().substring(0, 16));
    }
  }, [initialStart, initialEnd]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    setOpenModel(false);
     
    let startDate = new Date(start);
    // startDate = startDate.toISOString().substring(0,10);
    let endDate = new Date(end);
    // endDate = endDate.toISOString().substring(0,10);
   

    const newEvents = {
        start : startDate,
        end: endDate,
        title,
        description,
        priority,
        color: priority=== "high" ? "green" : priority==="low" ? "blue" : "orange"
    }
    
    axios.post('http://localhost:5000/api/createEvent', newEvents)
    .then(res => {
		if (res.status === 201)
		alert('event successfully created')
		else
		Promise.reject()
	})

	.catch(err => alert('Something went wrong'))
    console.log(newEvents);
    onSubmit(newEvents);
    setStart("");
    setEnd("");
    setTitle("");
    setDescription("");
    setPriority("");
  }
  
  

  return (
    <Modal
      isOpen={openModel}
      contentLabel="Event Form Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
      onRequestClose={() => setOpenModel(false)}
    >
    <div className="max-w-md mx-auto p-4 ">
        <h2 className="text-xl font-bold mb-4">Event Scheduler</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="start"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <input
              type="datetime-local"
              id="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="mt-1 cursor-pointer block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="end"
              className="block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <input
              type="datetime-local"
              id="end"
              value={end}
              onChange={(e) => {
                if (e.target.value > start) {
                  setEnd(e.target.value);
                  setShowError("");
                } else {
                  setShowError("End Date Should be greater than start date");
                }
              }}
              className="mt-1 cursor-pointer block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <p className="text-red-500">{showError !== "" && showError}</p>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 "
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-5 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              id="priority"
              required
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          <button
            // type="submit"
            onClick={() => {
              setOpenModel(false);
            }}
            className="ml-20 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </form>
      </div>
    </Modal>
  );
};


export default EventForm;
