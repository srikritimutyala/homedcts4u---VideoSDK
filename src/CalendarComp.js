import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';

const localizer = momentLocalizer(moment);

const CalendarComp = ({ nurseUpcomingPat, selectedPatient, onCreateE, appointments }) => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventColor, setEventColor] = useState('#4285f4'); // Default color
  const [eventEndTime, setEventEndTime] = useState('');
  const [isCheckedTitle1, setIsCheckedTitle1] = useState(false);
  const [isCheckedTitle2, setIsCheckedTitle2] = useState(false);
  const [isCheckedTitle3, setIsCheckedTitle3] = useState(false);
  let patient = selectedPatient;
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

  const closeModal = () => {
    setModalIsOpen(false);
    setEventTitle('');
    setEventStartTime('');
    setEventEndTime('');
    setEventColor('#4285f4'); // Reset to default color
    setIsCheckedTitle1(false);
    setIsCheckedTitle2(false);
    setIsCheckedTitle3(false);
  };

  const handleAddEvent = () => {
    if ( eventStartTime.trim() !== '' && eventEndTime.trim() !== '') {
      const selectedTitles = [];

      if (isCheckedTitle1) selectedTitles.push('Vitals  ');
      if (isCheckedTitle2) selectedTitles.push('Post discharge care  ');
      if (isCheckedTitle3) selectedTitles.push('Check up   ');

      const concatenatedTitle = selectedTitles.join(', ');
      console.log("patient"+patient)
      const newEvent = {
        start: moment(selectedDate).set('hour', eventStartTime.split(':')[0]).set('minute', eventStartTime.split(':')[1]),
        end: moment(selectedDate).set('hour', eventEndTime.split(':')[0]).set('minute', eventEndTime.split(':')[1]),
        title: patient+"- "+concatenatedTitle,
        color: eventColor,
      };

      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));

      onCreateE({
        date: moment(selectedDate).format('YYYY-MM-DD'),
        startTime: eventStartTime,
        endTime: eventEndTime,
        title: patient+"- "+concatenatedTitle,
      });

      closeModal();
    } else {
      console.error('Please fill in all fields for the event.');
    }
  };

  return (
    <div style={{ height: '500px',backgroundColor: '#edf2fb' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '20px' }}
        selectable
        onSelectSlot={handleSelectSlot}
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
        <h2>New Appointment</h2>
        <p>Selected Date: {selectedDate && moment(selectedDate).format('MMMM DD, YYYY')}</p>
        <div>
        <label>
          <input
            type="checkbox"
            checked={isCheckedTitle1}
            onChange={(e) => setIsCheckedTitle1(e.target.checked)}
          />
          <span>Vitals  </span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={isCheckedTitle2}
            onChange={(e) => setIsCheckedTitle2(e.target.checked)}
          />
          <span>Post discharge care  </span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={isCheckedTitle3}
            onChange={(e) => setIsCheckedTitle3(e.target.checked)}
          />
          <span>Check up  </span>
        </label>
      </div>
      <div>
        <label>
          Event Title:
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </label>
        </div>
        <div>
        <label>
          Start Time:
          <input
            type="time"
            value={eventStartTime}
            onChange={(e) => setEventStartTime(e.target.value)}
          />
        </label>
        </div>
        <div>
        <label>
          End Time:
          <input
            type="time"
            value={eventEndTime}
            onChange={(e) => setEventEndTime(e.target.value)}
          />
        </label>
        </div>
        <div>
        <label>
          Event Color:
          <input
            type="color"
            value={eventColor}
            onChange={(e) => setEventColor(e.target.value)}
          />
        </label>
        </div>
        <button onClick={handleAddEvent}>Add Appointment</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default CalendarComp;
