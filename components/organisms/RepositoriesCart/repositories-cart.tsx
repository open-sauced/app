import { Children } from "react";

import { BiPlus } from "react-icons/bi";

import Avatar from "components/atoms/Avatar/avatar";
import CartIllustration from "components/atoms/CartIllustration/cart-illustration";
import Text from "components/atoms/Typography/text";

import { RepositoryCartItemProps } from "components/molecules/ReposoitoryCartItem/repository-cart-item";

interface RepositoriesCartProps {
  children?: React.ReactNode;
  hasItems?: boolean;
  history?: RepositoryCartItemProps[];
  handleCreatePage?: Function;
  handleAddToCart?: (fullRepoName: string) => void
  createPageButtonDisabled?: boolean;
}

const RepositoriesCart = ({
  children,
  hasItems,
  history,
  handleCreatePage,
  handleAddToCart,
  createPageButtonDisabled
}: RepositoriesCartProps): JSX.Element => {
  const cartItems = Children.toArray(children);

  const onHandleCreatePage = () => {
    if (handleCreatePage) {
      handleCreatePage();
    }
  };
  const onAddToCart = (fullRepoName: string) => {
    if (handleAddToCart) {
      handleAddToCart(fullRepoName);
    }
  };

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
      {!!history && (
        <div className="border-t mt-2 py-1">
          {history.length > 0 ? <Text>Add again:</Text> : ""}
          {history.length > 0 &&
            history.map(({ orgName, repoName, totalPrs, avatar }, index) => (
              <div key={`${index}/${orgName}/${repoName}`} className="flex items-center mt-2 justify-between">
                <div className="flex gap-3 items-center ">
                  <Avatar avatarURL={avatar} initials="" size="sm" className="" />
                  <Text className="!text-sm !text-light-slate-11">
                    {orgName} / <span className="text-light-slate-12">{repoName}</span>
                  </Text>
                </div>
                <div className="flex items-center gap-2 text-sm text-light-slate-10">
                  <button
                    onClick={() => onAddToCart(`${orgName}/${repoName}`)}
                    className="border text-xs flex items-center px-[6px] p-[3px] rounded-md"
                  >
                    Add <BiPlus className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {hasItems && (
        <div className="w-full mt-1 ">
          <button
            disabled={createPageButtonDisabled}
            onClick={() => onHandleCreatePage()}
            className="w-full text-sm text-white flex justify-center items-center py-3 px-5 bg-light-orange-9 rounded-lg"
          >
            Create Page
          </button>
        </div>
      )}
    </div>
  );
};

export default RepositoriesCart;
