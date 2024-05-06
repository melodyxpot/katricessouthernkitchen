import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function SearchInput() {
  return (
    <div className="bg-[#F5F5F5] rounded-lg px-3 py-2 flex gap-1">
      <SearchOutlinedIcon className="text-primary" />
      <input
        className="outline-none bg-[#F5F5F5] text-primary text-sm"
        placeholder="Search for food..."
      />
    </div>
  );
}
