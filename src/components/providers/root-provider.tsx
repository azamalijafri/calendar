import { ReactNode } from "react";
import ModalProvider from "./modal-provider";
import { Toaster } from "../ui/toaster";

const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <ModalProvider />
      {children}
      <Toaster />
    </div>
  );
};

export default RootProvider;
