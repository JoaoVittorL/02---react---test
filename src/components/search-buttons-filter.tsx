import { Search, X } from "lucide-react";
import { Button } from "./ui/button";

interface SearchButtonsFilterProps {
  activeButtonInteraction: boolean;
  handleClearFilters: () => void;
}

export const SearchButtonsFilter: React.FC<SearchButtonsFilterProps> = ({ activeButtonInteraction, handleClearFilters }) => {
  return (
    <div className="flex gap-2 w-full">
      <Button type="submit" disabled={!activeButtonInteraction} size="xs" className="flex-1 min-w-[160px]">
        <Search className="mr-2 h-4 w-4" />
        Filtrar
      </Button>
      {activeButtonInteraction && (
        <Button onClick={handleClearFilters} type="button" variant="outline" size="xs" className="flex-1 min-w-[160px]">
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      )}
    </div>
  );
};
