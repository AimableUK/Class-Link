import React from "react";

const Pagination = () => {
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex flex-nowrap gap-1 text-sm items-center">
        <div className="px-2 rounded-sm bg-classSky">1</div>
        <div className="px-2 rounded-sm">2</div>
        <div className="px-2 rounded-sm">3</div>
        ...
        <div className="px-2 rounded-sm">10</div>
      </div>

      <button
        disabled
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
