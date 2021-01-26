import React, { useState, useEffect } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventClearActiveEvent, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment); 


export const CalendarScreen = () => {

    const {events, activeEvent} = useSelector(state => state.calendar);
    const {uid} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
        
      dispatch(eventStartLoading());

    }, [dispatch])

    const onDloubleClick = (e) => {
        dispatch(uiOpenModal(e))
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }


    const onSelectSlot = () => {
        dispatch(eventClearActiveEvent());
    }


    const eventStyleGetter = (e, start, end, isSelected) => {
        
        const style = {
            backgroundColor: (uid === e.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDloubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab/>
            {
                (activeEvent) && <DeleteEventFab/> 
            }
            <CalendarModal/>
        </div>
    )
}
