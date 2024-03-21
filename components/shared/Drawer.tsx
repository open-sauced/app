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
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
  trigger: React.ReactNode;
  showCloseButton?: boolean;
}

export const Drawer = ({ title, description, children, showCloseButton = true, trigger }: DrawerProps) => {
  return (
    <InternalDrawer>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="">{children}</DrawerFooter>
        {showCloseButton ? (
          <div className="border-t flex items-center justify-center">
            <DrawerClose className="p-2 text-light-orange-11 w-full outline-none">Close</DrawerClose>
          </div>
        ) : null}
      </DrawerContent>
    </InternalDrawer>
  );
};
