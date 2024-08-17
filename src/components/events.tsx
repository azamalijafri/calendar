import React, { useState } from "react";
import { Event, useEvent } from "@/stores/event-store";
import { useDebounce } from "@/hooks/use-debounce";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModal } from "@/stores/modal-store";
import { Check, Pencil, Trash2 } from "lucide-react";

const filterOptions = [
  { label: "All", value: "" },
  { label: "Work", value: "work" },
  { label: "Personal", value: "personal" },
];

const EventItem: React.FC<{
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ event, onEdit, onDelete }) => {
  return (
    <div className="border-b border-gray-300 py-2 flex justify-between px-1 lg:px-4 items-center">
      <div>
        <span
          onClick={onEdit}
          className="text-sm lg:text-base font-medium cursor-pointer hover:underline hover:underline-offset-4"
        >
          {event.title}
        </span>
        <div className="text-xs text-gray-600">
          {dayjs(event.date).format("MMMM D, YYYY")}
        </div>
      </div>
      <div className="flex gap-x-4">
        <Trash2
          onClick={onDelete}
          className="size-4 cursor-pointer text-primary"
        />
        <Pencil
          onClick={onEdit}
          className="size-4 cursor-pointer text-primary"
        />
      </div>
    </div>
  );
};

const Events: React.FC = () => {
  const { events } = useEvent();
  const { openModal } = useModal();

  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredEvents = events.filter(
    (event) =>
      (categoryFilter ? event.category === categoryFilter : true) &&
      (debouncedSearchQuery
        ? event.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        : true)
  );

  const sortedEvents = filteredEvents.sort((a, b) =>
    dayjs(a.date).isBefore(b.date) ? -1 : 1
  );

  const today = dayjs().startOf("day");
  const upcomingOrTodayEvents = sortedEvents.filter(
    (event) =>
      dayjs(event.date).isSame(today, "day") || dayjs(event.date).isAfter(today)
  );
  const expiredEvents = sortedEvents.filter((event) =>
    dayjs(event.date).isBefore(today)
  );

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-3 w-full">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title"
          className="p-2 border rounded w-full"
        />
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-24">
              <Button variant={"outline"} className="w-full flex">
                {
                  filterOptions.find(
                    (option) => option.value === categoryFilter
                  )?.label
                }
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {filterOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setCategoryFilter(option.value)}
                  className="flex justify-between px-4"
                >
                  {option.label}
                  <Check
                    className={`size-4 ${
                      option.value == categoryFilter
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl lg:text-2xl font-bold">
          Today or Upcoming Events
        </h2>
        <div className="mt-2">
          {upcomingOrTodayEvents.length > 0 ? (
            <ul>
              {upcomingOrTodayEvents.map((event) => (
                <EventItem
                  key={event.id}
                  event={event}
                  onEdit={() =>
                    openModal("upsert-event", { eventId: event.id })
                  }
                  onDelete={() => openModal("confirm", { eventId: event.id })}
                />
              ))}
            </ul>
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl lg:text-2xl font-bold">Expired Events</h2>
        <div className="mt-2">
          {expiredEvents.length > 0 ? (
            <ul>
              {expiredEvents.map((event) => (
                <EventItem
                  key={event.id}
                  event={event}
                  onEdit={() =>
                    openModal("upsert-event", { eventId: event.id })
                  }
                  onDelete={() => openModal("confirm", { eventId: event.id })}
                />
              ))}
            </ul>
          ) : (
            <p>No expired events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
