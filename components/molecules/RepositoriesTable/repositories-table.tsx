import TableTitle from "components/atoms/TableTitle/table-title";
import React from "react";

interface RepositoriesTableProps {
}

const RepositoriesTable: React.FC<RepositoriesTableProps> = ({  }) => {
  return (
    <div className="">

      {/* Table Header */}
      <header className="flex py-4 px-6 bg-light-slate-3 gap-2">
        <div className=""><TableTitle text="Repository"></TableTitle></div>
        <div className=""><TableTitle text="Activity"></TableTitle></div>
        <div className=""><TableTitle text="PR Overview"></TableTitle></div>
        <div className=""><TableTitle text="PR Velocity"></TableTitle></div>
        <div className=""><TableTitle text="SPAM"></TableTitle></div>
        <div className=""><TableTitle text="Contributors"></TableTitle></div>
        <div className=""><TableTitle text="Last 30 Days"></TableTitle></div>
      </header>

      {/* Table Rows */}
      <section className="flex flex-col">
      </section>

      {/* Table Footer */}
      <footer>

      </footer>
    </div>
  );
};

export default RepositoriesTable;