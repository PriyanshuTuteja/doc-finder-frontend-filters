
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Doctor } from "@/types/doctor";

interface SearchBarProps {
  doctors: Doctor[];
  onSearch: (query: string) => void;
  onSelectSuggestion: (doctorName: string) => void;
  suggestions: Doctor[];
}

const SearchBar = ({ doctors, onSearch, onSelectSuggestion, suggestions }: SearchBarProps) => {
  const [query, setQuery] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (doctorName: string) => {
    setQuery(doctorName);
    onSelectSuggestion(doctorName);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search doctor by name..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-4 py-2 w-full border rounded-md"
          data-testid="autocomplete-input"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
        >
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              className="px-4 py-2 hover:bg-brand-lightBlue cursor-pointer"
              onClick={() => handleSuggestionClick(doctor.name)}
              data-testid="suggestion-item"
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
