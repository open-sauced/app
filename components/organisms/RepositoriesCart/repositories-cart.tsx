import Avatar from "components/atoms/Avatar/avatar";
import Button from "components/atoms/Button/button";
import CartIllustration from "components/atoms/CartIllustration/cart-illustration";
import Text from "components/atoms/Typography/text";
import { Children } from "react";
import { BiPlus } from "react-icons/bi";

interface RepositoriesCartProps {
  children?: React.ReactNode;
  hasItems?: boolean;
  hasHistory?: boolean;
}
const RepositoriesCart = ({ children, hasItems, hasHistory }: RepositoriesCartProps): JSX.Element => {
  const cartItems = Children.toArray(children);
  return (
    <div className="w-[364px] border flex flex-col gap-2 rounded-lg p-6">
      {/* Empty state of Cart */}
      {cartItems.length > 0 && hasItems ? (
        cartItems.map((item, index) => (
          <div className="w-full flex flex-col" key={`${index}/${Math.random()}`}>
            {item}
          </div>
        ))
      ) : (
        <div className="w-full py-4 gap-2 items-center flex-col flex">
          <CartIllustration classNames="-translate-x-2" />
          <CartIllustration classNames="-translate-x-10" />
          <CartIllustration classNames="translate-x-4" />
          <Text className="mt-3 !text-base">You haven’t added repositories yet.</Text>
        </div>
      )}
      {hasHistory && (
        <div className="border-t mt-2 py-1">
          <Text>Add again:</Text>
          <div className="flex items-center mt-2 justify-between">
            <div className="flex gap-3 items-center ">
              <Avatar initials="" size="sm" className="" />
              <Text className="!text-sm !text-light-slate-11">
                open sauced / <span className="text-light-slate-12">insight</span>
              </Text>
            </div>
            <div className="flex items-center gap-2 text-sm text-light-slate-10">
              <button className="border text-xs flex items-center px-[6px] p-[3px] rounded-md">
                Add <BiPlus className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}

      {hasItems && (
        <div className="w-full mt-1 ">
          <button className="w-full text-sm text-white flex justify-center items-center py-3 px-5 bg-light-orange-9 rounded-lg">
            Create Page
          </button>
        </div>
      )}
    </div>
  );
};

export default RepositoriesCart;
