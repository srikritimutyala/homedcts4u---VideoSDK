import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';

const localizer = momentLocalizer(moment);

const CalendarCompPatient = ({ appointments, onCreateE }) => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventColor, setEventColor] = useState('#4285f4'); // Default color
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (appointments && appointments.length > 0) {
      // Map appointments to events for the calendar
      const formattedEvents = appointments.map(appointment => ({
        start: moment(appointment.date + ' ' + appointment.startTime).toDate(),
        end: moment(appointment.date + ' ' + appointment.endTime).toDate(),
        title: appointment.title,
        color: '#4285f4', // Default color
      }));
      setEvents(formattedEvents);
    }
  }, [appointments]);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setModalIsOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEventTitle('');
    setEventStartTime('');
    setEventEndTime('');
    setEventColor('#4285f4'); // Reset to default color
    setSelectedEvent(null);
  };

  const handleAddEvent = () => {
    if (eventTitle.trim() !== '' && eventStartTime.trim() !== '' && eventEndTime.trim() !== '') {
      const newEvent = {
        start: moment(selectedDate).set('hour', eventStartTime.split(':')[0]).set('minute', eventStartTime.split(':')[1]),
        end: moment(selectedDate).set('hour', eventEndTime.split(':')[0]).set('minute', eventEndTime.split(':')[1]),
        title: eventTitle,
        color: eventColor,
      };

      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);

      onCreateE({
        date: moment(selectedDate).format('YYYY-MM-DD'),
        startTime: eventStartTime,
        endTime: eventEndTime,
        title: eventTitle,
      });

      closeModal();
    } else {
      console.error('Please fill in all fields for the event.');
    }
  };

  return (
    <div style={{ height: '500px', backgroundColor: '#edf2fb' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '20px' }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent} // Call handleSelectEvent when an event is clicked
        eventPropGetter={(event, start, end, isSelected) => ({
          style: {
            backgroundColor: event.color,
            border: isSelected ? '2px solid #000' : 'none',
          },
        })}
      />
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Event"
        style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Grey overlay color with 50% opacity
      zIndex: 9999, // Set a high zIndex value to position the overlay above other elements
    },
    content: {
      backgroundColor: '#fff', // White background for the modal content
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  }}
      >
        <h2>{selectedEvent ? '' : 'Add New Event'}</h2>
        {selectedEvent && (
          <p>
            Event: {selectedEvent.title}<br/>
            Start Time: {moment(selectedEvent.start).format('LT')}<br/>
            End Time: {moment(selectedEvent.end).format('LT')}
          </p>
        )}

        

        <button onClick={handleAddEvent}>{selectedEvent ? '' : 'Add'} Event</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default CalendarCompPatient;
