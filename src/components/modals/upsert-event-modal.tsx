/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { useEvent } from "@/stores/event-store";
import { useModal } from "@/stores/modal-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "../ui/use-toast";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const eventTypes = [
  { label: "Personal", value: "personal" },
  { label: "Work", value: "work" },
];

const UpsertEventModal = () => {
  const { modals, closeModal } = useModal();
  const { addEvent, getEvent, updateEvent } = useEvent();

  const { toast } = useToast();

  const modal = modals.find((modal) => modal.type == "upsert-event");
  const event = modal?.data?.eventId ? getEvent(modal?.data?.eventId) : null;

  const [title, setTitle] = useState<string>(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [category, setCategory] = useState<string>(event?.category ?? "work");

  const date = event?.date ?? modal?.data?.date;

  const handleAdd = () => {
    if (!title)
      toast({
        title: "Invalid Data",
        description: "title is required",
        variant: "destructive",
      });

    const iEvent = {
      id: event?.id ?? uuidv4(),
      title,
      description,
      category,
      date: date!,
    };
    try {
      if (event) {
        updateEvent(event?.id, iEvent);
      } else {
        addEvent(iEvent);
      }
      toast({
        title: "Request Success",
        description: `event has been ${
          event ? "updated" : "added"
        } successfully`,
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
        <DialogTitle className="font-semibold text-xl">
          {event ? "Update" : "Add"} Event
        </DialogTitle>

        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label>Title</label>
            <Input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2 items-start">
            <label>Type</label>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {eventTypes.find((type) => type.value == category)?.label ??
                    "Select a category"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {eventTypes.map((type) => (
                  <DropdownMenuItem
                    className="flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100 w-full"
                    onClick={() => setCategory(type.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        type.value == category ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {type.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col gap-y-2">
            <label>Description</label>
            <Textarea
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAdd}>{event ? "Update" : "Add"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertEventModal;
