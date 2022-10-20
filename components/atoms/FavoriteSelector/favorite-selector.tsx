import React from "react";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

interface FavoriteSelectorProps {
  isFavorite: boolean;
}

const FavoriteSelector = ({ isFavorite = true }: FavoriteSelectorProps): JSX.Element => {
  return (
    <div
      className="inline-flex px-1 items-center gap-2 transition
    "
    >
      {isFavorite ? (
        <AiFillStar className="text-light-slate-11 text-lg" />
      ) : (
        <AiOutlineStar className="text-light-slate-9 text-lg" />
      )}
      <span className={`${isFavorite ? "text-light-slate-12" : "text-light-slate-11"} text-sm font-semibold`}>
        Favorite
      </span>
    </div>
  );
};
export default FavoriteSelector;
