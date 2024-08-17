import { Dayjs } from "dayjs";
import { create } from "zustand";

export interface Event {
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
  getEvent: (id: string) => Event | undefined;
}

const saveEventsToLocalStorage = (events: Event[]) => {
  localStorage.setItem("events", JSON.stringify(events));
};

const loadEventsFromLocalStorage = (): Event[] => {
  const events = localStorage.getItem("events");
  return events ? JSON.parse(events) : [];
};

export const useEvent = create<Store>((set, get) => ({
  events: loadEventsFromLocalStorage(),
  addEvent: (event) => {
    const updatedEvents = [...get().events, event];
    saveEventsToLocalStorage(updatedEvents);
    set({ events: updatedEvents });
  },
  updateEvent: (id, updatedEvent) => {
    const updatedEvents = get().events.map((event) =>
      event.id === id ? { ...event, ...updatedEvent } : event
    );
    saveEventsToLocalStorage(updatedEvents);
    set({ events: updatedEvents });
  },
  deleteEvent: (id) => {
    const updatedEvents = get().events.filter((event) => event.id !== id);
    saveEventsToLocalStorage(updatedEvents);
    set({ events: updatedEvents });
  },
  setEvents: (events) => {
    saveEventsToLocalStorage(events);
    set({ events });
  },
  getEvent: (id) => {
    return get().events.find((event) => event.id === id);
  },
}));
