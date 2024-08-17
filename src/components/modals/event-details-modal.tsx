import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useEvent } from "@/stores/event-store";
import { useModal } from "@/stores/modal-store";
import dayjs from "dayjs";

const EventDetailsModal = () => {
  const { modals, closeModal } = useModal();
  const { getEvent } = useEvent();
  const modal = modals.find((modal) => modal.type == "event-details");
  const event = modal?.data?.eventId ? getEvent(modal?.data?.eventId) : null;

  const date = event?.date ? dayjs(event?.date) : null;
  const day = date?.date();
  const month = date?.format("MMMM");
  const year = date?.year();

  if (!open) return null;

  return (
    <Dialog open={!!modal} onOpenChange={closeModal}>
      <DialogContent>
        <DialogTitle className="underline underline-offset-4 font-bold text-xl">
          {event?.title}
        </DialogTitle>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-1">
            <label className="font-semibold">Type: </label>
            <span>{event?.category}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <label className="font-semibold">Date: </label>
            <span>
              {day}, {month} {year}
            </span>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="font-semibold">Description</label>
            {event?.description ? (
              <span className="p-3 rounded-md border border-primary text-sm">
                {event?.description}
              </span>
            ) : (
              <span className="text-sm">No Description</span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
