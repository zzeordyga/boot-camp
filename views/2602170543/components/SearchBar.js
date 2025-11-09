"use client";
import { forwardRef } from "react";

const SearchBar = forwardRef(({ value, onChange, resultCount }, ref) => {
  return (
    <div className="mb-8">
      <input
        ref={ref}
        type="text"
        placeholder="Search Pokémon..."
        value={value}
        onChange={onChange}
        className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      {value && (
        <p className="mt-2 text-sm text-gray-600">
          Found {resultCount} Pokémon
        </p>
      )}
    </div>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
