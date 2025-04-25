
import { Radio } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FilterState } from "@/types/doctor";

interface FilterPanelProps {
  specialties: string[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

const FilterPanel = ({ specialties, filters, onFilterChange }: FilterPanelProps) => {
  const handleConsultationTypeChange = (value: string) => {
    onFilterChange({
      ...filters,
      consultationType: value === filters.consultationType ? undefined : value,
    });
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    let newSpecialties = [...filters.specialties];
    
    if (checked) {
      newSpecialties.push(specialty);
    } else {
      newSpecialties = newSpecialties.filter((s) => s !== specialty);
    }
    
    onFilterChange({
      ...filters,
      specialties: newSpecialties,
    });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({
      ...filters,
      sortBy: value === filters.sortBy ? undefined : value,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-card">
      {/* Consultation Mode Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3" data-testid="filter-header-moc">
          Consultation Mode
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="videoConsult"
              name="consultationType"
              checked={filters.consultationType === "Video Consult"}
              onChange={() => handleConsultationTypeChange("Video Consult")}
              className="h-4 w-4 text-brand-blue"
              data-testid="filter-video-consult"
            />
            <Label htmlFor="videoConsult">Video Consult</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="inClinic"
              name="consultationType"
              checked={filters.consultationType === "In Clinic"}
              onChange={() => handleConsultationTypeChange("In Clinic")}
              className="h-4 w-4 text-brand-blue"
              data-testid="filter-in-clinic"
            />
            <Label htmlFor="inClinic">In Clinic</Label>
          </div>
        </div>
      </div>

      {/* Specialties Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3" data-testid="filter-header-speciality">
          Specialty
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`specialty-${specialty}`}
                checked={filters.specialties.includes(specialty)}
                onChange={(e) => handleSpecialtyChange(specialty, e.target.checked)}
                className="h-4 w-4 text-brand-blue rounded"
                data-testid={`filter-specialty-${specialty.replace("/", "-")}`}
              />
              <Label htmlFor={`specialty-${specialty}`}>{specialty}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 className="text-lg font-medium mb-3" data-testid="filter-header-sort">
          Sort By
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="sortFees"
              name="sortBy"
              checked={filters.sortBy === "fees"}
              onChange={() => handleSortChange("fees")}
              className="h-4 w-4 text-brand-blue"
              data-testid="sort-fees"
            />
            <Label htmlFor="sortFees">Fees (Low to High)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="sortExperience"
              name="sortBy"
              checked={filters.sortBy === "experience"}
              onChange={() => handleSortChange("experience")}
              className="h-4 w-4 text-brand-blue"
              data-testid="sort-experience"
            />
            <Label htmlFor="sortExperience">Experience (High to Low)</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
