import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function SearchInput({
  setSearch
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [value, setValue] = useState<string>("");

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(value);
    }
  };

  return (
    <div className="bg-[#F5F5F5] rounded-lg px-3 py-2 flex gap-1">
      <SearchOutlinedIcon className="text-primary" />
      <input
        className="outline-none bg-[#F5F5F5] text-primary text-sm"
        placeholder="Search for food..."
        value={value}
        onKeyUp={handleInputKeyUp}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    </div>
  );
}
