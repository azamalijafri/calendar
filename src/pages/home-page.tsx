import Calendar from "@/components/calendar";
import Events from "@/components/events";

const HomePage = () => {
  return (
    <div className="grid grid-cols-10 h-screen">
      <div className="col-span-10 md:col-span-6 border-r-2 border-primary">
        <Calendar />
      </div>
      <div className="col-span-10 md:col-span-4 p-4">
        <Events />
      </div>
    </div>
  );
};

export default HomePage;
