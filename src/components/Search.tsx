import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { PlaceSuggestionType } from "@/types";

interface Props {
  value: any | null;
  onChange: (value: any) => void;
  suggestions: [PlaceSuggestionType];
  onSuggestionClick: (param1: any, param2: any) => void;
}

export default function Search({
  value,
  onChange,
  suggestions,
  onSuggestionClick,
}: Props) {
  const [isSuggestionVisible, setIsSuggestionVisible] = useState(false);

  //   Handler
  const handleSuggestionClick = (
    place_id: string,
    userLocation: PlaceSuggestionType
  ) => {
    onSuggestionClick(place_id, userLocation);
    setIsSuggestionVisible(false);
  };

  useEffect(() => {
    if (suggestions?.length > 0) setIsSuggestionVisible(true);
    else setIsSuggestionVisible(false);
  }, [suggestions]);

  return (
    <>
      {" "}
      <div className="flex items-center gap-2">
        {/* Search Bar */}
        <section className="relative">
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <SearchIcon className="w-4 h-4" />
          </div>
          <Input
            value={value}
            onChange={({ target: { value } }) => onChange(value)}
            placeholder="Search for places..."
            className="w-xs ps-8"
          />
        </section>
      </div>
      {/* Search Suggestions */}
      {isSuggestionVisible && (
        <div className="absolute flex flex-col gap-3 bg-white font-semibold rounded-lg shadow-lg p-4 max-h-96 overflow-auto w-full">
          {suggestions.map((item, index) => (
            <span
              onClick={() => handleSuggestionClick(item.place_id, item)}
              key={index}
              className="hover:bg-gray-100 p-2 rounded"
            >{`${item.name}, ${item.adm_area1}, ${item.country}`}</span>
          ))}
        </div>
      )}
    </>
  );
}
