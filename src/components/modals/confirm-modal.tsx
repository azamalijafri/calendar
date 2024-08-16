/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEvent } from "@/stores/event-store";
import { useModal } from "../../stores/modal-store";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";

const ConfirmModal = () => {
  const { deleteEvent } = useEvent();
  const { modals, closeModal } = useModal();
  const modal = modals.find((modal) => modal.type == "confirm");
  const { toast } = useToast();

  const handleDelete = () => {
    try {
      deleteEvent(modal?.data?.eventId as string);
      toast({
        title: "Request Success",
        description: "event has been deleted successfully",
      });
      closeModal();
    } catch (error: any) {
      toast({
        title: "Request Error",
        description: error?.message,
        variant: "destructive",
      });
    }
  };

  if (!open) return null;

  return (
    <Dialog open={!!modal} onOpenChange={closeModal}>
      <DialogContent>
        <DialogDescription className="text-lg font-medium text-primary mt-4">
          Are you sure you want to perform this action?
        </DialogDescription>
        <DialogFooter className="mx-auto flex gap-x-4">
          <Button onClick={handleDelete}>Confirm</Button>
          <Button variant={"outline"} onClick={closeModal}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
