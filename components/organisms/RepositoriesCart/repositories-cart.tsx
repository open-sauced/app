import { Children } from "react";
import clsx from "clsx";

import { BiPlus } from "react-icons/bi";

import Title from "components/atoms/Typography/title";
import Avatar from "components/atoms/Avatar/avatar";
import CartIllustration from "components/atoms/CartIllustration/cart-illustration";
import Text from "components/atoms/Typography/text";

import { RepositoryCartItemProps } from "components/molecules/ReposoitoryCartItem/repository-cart-item";
import Button from "components/shared/Button/button";

interface RepositoriesCartProps {
  edit?: boolean;
  children?: React.ReactNode;
  hasItems?: boolean;
  history?: RepositoryCartItemProps[];
  handleCreatePage?: Function;
  handleUpdatePage?: Function;
  handleAddToCart?: (fullRepoName: string) => void;
  createPageButtonDisabled?: boolean;
  loading?: boolean;
}

const RepositoriesCart = ({
  edit,
  children,
  hasItems,
  history,
  handleCreatePage,
  handleUpdatePage,
  handleAddToCart,
  createPageButtonDisabled,
  loading,
}: RepositoriesCartProps): JSX.Element => {
  const cartItems = Children.toArray(children);

  const onHandleCreatePage = () => {
    if (handleCreatePage) {
      handleCreatePage();
    }
  };

  const onHandleUpdatePage = () => {
    if (handleUpdatePage) {
      handleUpdatePage();
    }
  };

  const onAddToCart = (fullRepoName: string) => {
    if (handleAddToCart) {
      handleAddToCart(fullRepoName);
    }
  };

  return (
    <>
      <Title className="!text-1xl !leading-none mb-4 xl:mt-10" level={4}>
        Repositories Added
      </Title>
      <div className="flex flex-col w-full gap-2 p-6 border rounded-lg">
        {/* Empty state of Cart */}
        <div className="max-h-80 overflow-scroll flex flex-col gap-2">
          {cartItems.length > 0 && hasItems ? (
            cartItems.map((item, index) => (
              <div className="flex flex-col w-full" key={`${index}/${Math.random()}`}>
                {item}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center w-full gap-2 py-4">
              <CartIllustration classNames="-translate-x-2" />
              <CartIllustration classNames="-translate-x-10" />
              <CartIllustration classNames="translate-x-4" />
              <Text className="mt-3 !text-base">You haven’t added repositories yet.</Text>
            </div>
          )}
        </div>
        {!!history && (
          <div className={`${history.length > 0 && "border-1"} mt-2 p-2`}>
            {history.length > 0 ? <Text>Add again:</Text> : ""}
            {history.length > 0 &&
              history.slice(0, 5).map(({ orgName, repoName, avatar }, index) => (
                <div key={`${index}/${orgName}/${repoName}`} className="flex items-start justify-between mt-2">
                  <div className="flex items-start gap-3 ">
                    <Avatar avatarURL={avatar} initials="" size="sm" />
                    <Text className="!text-sm !text-light-slate-11 w-xs">
                      {orgName} / <span className="text-light-slate-12">{repoName}</span>
                    </Text>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-light-slate-10">
                    <button
                      onClick={() => onAddToCart(`${orgName}/${repoName}`)}
                      className="border text-xs flex items-center p-0.5 rounded-md"
                    >
                      <BiPlus className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {hasItems && (
          <div className="w-full mt-1">
            <Button
              variant="primary"
              disabled={createPageButtonDisabled}
              loading={loading}
              onClick={() => (edit ? onHandleUpdatePage() : onHandleCreatePage())}
              className={clsx(
                "w-full text-sm flex justify-center items-center py-3 px-5 rounded-lg",
                "text-white bg-light-orange-9"
              )}
            >
              {edit ? "Update" : "Create"} Page
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default RepositoriesCart;
