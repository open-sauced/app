import {
  Drawer as InternalDrawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "components/primitives/drawer-primitives";

interface DrawerProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  trigger: React.ReactNode;
  showCloseButton?: boolean;
  asChild?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  inheritBackground?: boolean;
}

export const Drawer = ({
  title,
  description,
  children,
  showCloseButton = true,
  trigger,
  asChild = true,
  isOpen,
  onClose,
  inheritBackground = false,
}: DrawerProps) => {
  return (
    <InternalDrawer open={isOpen} onClose={onClose}>
      <DrawerTrigger asChild={asChild}>{trigger}</DrawerTrigger>
      <DrawerContent className={inheritBackground ? "bg-inherit" : "bg-white"}>
        {title || description ? (
          <DrawerHeader>
            {title ? <DrawerTitle>{title}</DrawerTitle> : null}
            {description ? <DrawerDescription>{description}</DrawerDescription> : null}
          </DrawerHeader>
        ) : null}
        <DrawerFooter className="">{children}</DrawerFooter>
        {showCloseButton ? (
          <div className="border-t flex items-center justify-center">
            <DrawerClose className="p-2 text-light-orange-11 w-full outline-none" onClick={onClose}>
              Close
            </DrawerClose>
          </div>
        ) : null}
      </DrawerContent>
    </InternalDrawer>
  );
};
