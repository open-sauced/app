import React from "react";

interface RepositoriesTableProps {
  title: string;
  tableType: "participants";
  rows: DBRepo[];
}

const RepositoriesTable: React.FC<RepositoriesTableProps> = ({ title, tableType, rows }) => {
  return (
    <div>
    </div>
  );
};

export default RepositoriesTable;