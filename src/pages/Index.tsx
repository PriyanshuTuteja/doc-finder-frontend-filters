
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDoctors, getUniqueSpecialties } from "@/services/doctorService";
import { filterDoctors, getSearchSuggestions, buildQueryString, parseQueryString } from "@/utils/filterUtils";
import { Doctor, FilterState } from "@/types/doctor";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import DoctorCard from "@/components/DoctorCard";

const Index = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  
  // Filter state with default values to prevent undefined errors
  const [filters, setFilters] = useState<FilterState>({
    consultationType: undefined,
    specialties: [],
    sortBy: undefined,
    searchQuery: undefined,
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Load doctors data
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDoctors();
        
        if (Array.isArray(data)) {
          setDoctors(data);
          setFilteredDoctors(data);
          
          // Extract unique specialties
          const uniqueSpecialties = getUniqueSpecialties(data);
          setSpecialties(uniqueSpecialties);
        } else {
          // Handle case where data is not an array
          console.error("Invalid data format received from API");
          setError("Failed to load doctor data: invalid format");
          setDoctors([]);
          setFilteredDoctors([]);
          setSpecialties([]);
        }
        
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load doctor data");
        setIsLoading(false);
        console.error(err);
        setDoctors([]);
        setFilteredDoctors([]);
        setSpecialties([]);
      }
    };
    
    loadDoctors();
  }, []);
  
  // Parse URL query params when page loads or URL changes
  useEffect(() => {
    if (doctors.length > 0) {
      const queryFilters = parseQueryString(location.search);
      setFilters(queryFilters);
      
      // Apply filters from URL
      const newFilteredDoctors = filterDoctors(doctors, queryFilters);
      setFilteredDoctors(newFilteredDoctors);
    }
  }, [location.search, doctors]);
  
  // Update URL when filters change
  const updateFilters = (newFilters: FilterState) => {
    const queryString = buildQueryString(newFilters);
    navigate(`/${queryString}`);
  };
  
  // Handle search input
  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    
    // Get search suggestions
    const newSuggestions = getSearchSuggestions(doctors, query);
    setSuggestions(newSuggestions);
    
    // Update search query in filters
    const newFilters = {
      ...filters,
      searchQuery: query,
    };
    
    setFilters(newFilters);
  };
  
  // Handle selecting a suggestion
  const handleSelectSuggestion = (doctorName: string) => {
    const newFilters = {
      ...filters,
      searchQuery: doctorName,
    };
    
    updateFilters(newFilters);
    setSuggestions([]);
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    updateFilters(newFilters);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-center">
          <SearchBar
            doctors={doctors}
            onSearch={handleSearch}
            onSelectSuggestion={handleSelectSuggestion}
            suggestions={suggestions}
          />
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Panel - Left Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <FilterPanel
              specialties={specialties}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </aside>
          
          {/* Doctor Listing - Main Content */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading doctors...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                <p>{error}</p>
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <h3 className="text-xl font-medium mb-2">No doctors found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {filteredDoctors.length} Doctor{filteredDoctors.length !== 1 ? 's' : ''} Found
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
