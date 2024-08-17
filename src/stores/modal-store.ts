import { Dayjs } from "dayjs";
import { create } from "zustand";

type ModalType =
  | "day-details"
  | "confirm"
  | "upsert-event"
  | "event-details"
  | null;
type ModalData = {
  date?: Dayjs;
  eventId?: string;
} | null;

interface Modal {
  type: ModalType;
  data?: ModalData;
}

interface ModalStore {
  modals: Modal[];
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  modals: [],
  openModal: (type, data) =>
    set((state) => ({
      modals: [...state.modals, { type, data }],
    })),
  closeModal: () =>
    set((state) => ({
      modals: state.modals.slice(0, -1),
    })),
}));
