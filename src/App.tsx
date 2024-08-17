import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import NotFound from "./pages/not-found";
import RootProvider from "./components/providers/root-provider";

const App: React.FC = () => {
  return (
    <RootProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/event/:eventId" element={<EventDetails />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RootProvider>
  );
};

export default App;
