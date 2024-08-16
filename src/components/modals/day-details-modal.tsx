import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEvent } from "@/stores/event-store";
import { useModal } from "@/stores/modal-store";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Pencil, Trash2 } from "lucide-react";

// const weeks = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thrusday",
//   "Friday",
//   "Saturday",
// ];

const DayDetailsModal = () => {
  const { modals, closeModal, openModal } = useModal();
  const { events } = useEvent();
  const modal = modals.find((modal) => modal.type == "day-details");

  const date = modal?.data?.date ? dayjs(modal.data.date) : null;
  const day = date?.date();
  const month = date?.format("MMMM");
  const year = date?.year();
  // const weekday = weeks[date?.day() as number];

  const eventsForDay = events.filter((event) =>
    dayjs(event.date).isSame(date, "day")
  );

  if (!open) return null;

  return (
    <Dialog open={!!modal} onOpenChange={closeModal}>
      <DialogContent>
        <div className="p-4">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex flex-col gap-y-1">
              <div className="text-xl font-semibold">
                {day ? `${day}, ${month} ${year}` : "No date selected"}
              </div>
            </div>

            <div>
              <Button
                onClick={() =>
                  openModal("add-event", { date: modal?.data?.date })
                }
              >
                Add Event
              </Button>
            </div>
          </div>
          <Separator className="my-4 bg-primary" />
          <div className="flex flex-col">
            <span className="font-medium text-xl mb-4">Events</span>
            {eventsForDay.length > 0 ? (
              <div className="flex flex-col gap-y-3">
                {eventsForDay.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-md px-4 py-2 bg-primary text-white flex justify-between items-center"
                  >
                    <span className="cursor-pointer text-sm hover:underline hover:underline-offset-2 transition">
                      {event.title}
                    </span>
                    <div className="flex gap-x-4">
                      <Trash2
                        onClick={() =>
                          openModal("confirm", { eventId: event.id })
                        }
                        className="size-4 cursor-pointer"
                      />
                      <Pencil className="size-4 cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No events for this day.</div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DayDetailsModal;
