import { create } from 'zustand';
import { CalendarEvent } from '../types/calendar';

interface CalendarStore {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: number, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: number) => void;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  events: [],
  
  addEvent: (newEvent) => set((state) => ({
    events: [...state.events, { ...newEvent, id: Date.now() }]
  })),
  
  updateEvent: (id, updatedEvent) => set((state) => ({
    events: state.events.map(event =>
      event.id === id ? { ...event, ...updatedEvent } : event
    )
  })),
  
  deleteEvent: (id) => set((state) => ({
    events: state.events.filter(event => event.id !== id)
  }))
}));