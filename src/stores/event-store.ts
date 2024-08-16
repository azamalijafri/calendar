import { Dayjs } from "dayjs";
import { create } from "zustand";

interface Event {
  id: string;
  title: string;
  date: Dayjs;
  category: string;
  description?: string;
}

interface Store {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updatedEvent: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  setEvents: (events: Event[]) => void;
}

const saveEventsToLocalStorage = (events: Event[]) => {
  localStorage.setItem("events", JSON.stringify(events));
};

const loadEventsFromLocalStorage = (): Event[] => {
  const events = localStorage.getItem("events");
  return events ? JSON.parse(events) : [];
};

export const useEvent = create<Store>((set) => ({
  events: loadEventsFromLocalStorage(),
  addEvent: (event) =>
    set((state) => {
      const updatedEvents = [...state.events, event];
      saveEventsToLocalStorage(updatedEvents);
      return { events: updatedEvents };
    }),
  updateEvent: (id, updatedEvent) =>
    set((state) => {
      const updatedEvents = state.events.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      );
      saveEventsToLocalStorage(updatedEvents);
      return { events: updatedEvents };
    }),
  deleteEvent: (id) =>
    set((state) => {
      const updatedEvents = state.events.filter((event) => event.id !== id);
      saveEventsToLocalStorage(updatedEvents);
      return { events: updatedEvents };
    }),
  setEvents: (events) => {
    saveEventsToLocalStorage(events);
    return { events };
  },
}));
