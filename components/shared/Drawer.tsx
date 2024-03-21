import Button from "components/atoms/Button/button";
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
  closeSlot?: React.ReactNode;
}

export const Drawer = ({ title, description, children, closeSlot, trigger }: DrawerProps) => {
  return (
    <InternalDrawer>
      <DrawerTrigger>{trigger ?? <Button variant="primary">Open</Button>}</DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="">
          {children}
          <DrawerClose asChild>
            <div className="flex place-content-center">{closeSlot}</div>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </InternalDrawer>
  );
};
