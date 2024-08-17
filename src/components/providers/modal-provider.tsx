import { useModal } from "@/stores/modal-store";
import UpsertEventModal from "../modals/upsert-event-modal";
import DayDetailsModal from "../modals/day-details-modal";
import ConfirmModal from "../modals/confirm-modal";
import EventDetailsModal from "../modals/event-details-modal";

const ModalProvider = () => {
  const { modals } = useModal();

  return (
    <>
      {modals.map((modal, index) => {
        switch (modal.type) {
          case "day-details":
            return <DayDetailsModal key={index} />;
          case "upsert-event":
            return <UpsertEventModal key={index} />;
          case "confirm":
            return <ConfirmModal key={index} />;
          case "event-details":
            return <EventDetailsModal key={index} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default ModalProvider;
