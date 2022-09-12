import Avatar from "components/atoms/Avatar/avatar";
import { StaticImageData } from "next/image";
import React from "react";

interface TableRepositoryNameProps {
  avatarURL?: string | StaticImageData;
  name?: string;
  handle?: string;
}

const TableRepositoryName = ({ avatarURL, name, handle }: TableRepositoryNameProps): JSX.Element => {
  return (
  );
};

export default TableRepositoryName;