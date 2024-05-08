import { Tabs, TabsList, TabsTrigger } from "components/atoms/Tabs/tabs";

interface SquareTabsProps {
  items: string[];
}

export const SquareTabsList = ({ items }: SquareTabsProps) => {
  return (
    <Tabs defaultValue="account" className="w-max">
      <TabsList className="grid w-full grid-cols-2">
        {items.map((item) => (
          <TabsTrigger value="account" asChild>
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
