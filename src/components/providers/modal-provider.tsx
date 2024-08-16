import { useModal } from "@/stores/modal-store";
import UpsertEventModal from "../modals/add-event-modal";
import DayDetailsModal from "../modals/day-details-modal";
import ConfirmModal from "../modals/confirm-modal";

const ModalProvider = () => {
  const { modals } = useModal();

  return (
    <>
      {modals.map((modal, index) => {
        switch (modal.type) {
          case "day-details":
            return <DayDetailsModal key={index} />;
          case "add-event":
            return <UpsertEventModal key={index} />;
          case "confirm":
            return <ConfirmModal key={index} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default ModalProvider;
