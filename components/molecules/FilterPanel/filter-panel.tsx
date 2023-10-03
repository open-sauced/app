import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";

import { Dialog, DialogOverlay, DialogTrigger } from "../Dialog/dialog";

const PanelWrapper = ({ children, ...props }: DialogPrimitive.DialogProps) => {
  return (
    <Dialog modal={false} {...props}>
      {children}
    </Dialog>
  );
};

interface IPanelContentProps extends DialogPrimitive.DialogPortalProps {
  children: React.ReactNode;
  position?: "left" | "right";
}
const PanelContent = ({ children, position = "right", ...props }: IPanelContentProps) => {
  return (
    <DialogPrimitive.Portal {...props}>
      <div
        className={clsx("fixed inset-0 z-50 flex items-center", position === "right" ? "justify-end" : "justify-start")}
      >
        <DialogOverlay className="bg-black/5" />
        <DialogPrimitive.Content className="fixed bottom-0 z-50 transition-all bg-white w-96 top-[3.25rem] shadow-xl animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-right-20   sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0">
          {children}
        </DialogPrimitive.Content>
      </div>
    </DialogPrimitive.Portal>
  );
};

interface IPanelTriggerProps {
  children: React.ReactNode;
}
const PanelTrigger = ({ children }: IPanelTriggerProps) => {
  return <DialogTrigger>{children}</DialogTrigger>;
};

export { PanelTrigger, PanelContent, PanelWrapper };
