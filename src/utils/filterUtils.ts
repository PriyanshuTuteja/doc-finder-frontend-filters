
import { Doctor, FilterState } from "@/types/doctor";

export function filterDoctors(doctors: Doctor[], filters: FilterState): Doctor[] {
  // Ensure we have an array of doctors to work with
  if (!Array.isArray(doctors)) {
    return [];
  }
  
  let filteredDoctors = [...doctors];
  
  // Filter by search query
  if (filters.searchQuery && filters.searchQuery.trim() !== "") {
    const searchQuery = filters.searchQuery.toLowerCase();
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.name && doctor.name.toLowerCase().includes(searchQuery)
    );
  }
  
  // Filter by consultation type
  if (filters.consultationType) {
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.consultationMode && doctor.consultationMode.includes(filters.consultationType || "")
    );
  }
  
  // Filter by specialties (if any are selected)
  if (filters.specialties && filters.specialties.length > 0) {
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.specialty && filters.specialties.some(specialty => 
        doctor.specialty.includes(specialty)
      )
    );
  }
  
  // Sort by selected criterion
  if (filters.sortBy === "fees") {
    filteredDoctors.sort((a, b) => (a.fee || 0) - (b.fee || 0));
  } else if (filters.sortBy === "experience") {
    filteredDoctors.sort((a, b) => (b.experience || 0) - (a.experience || 0));
  }
  
  return filteredDoctors;
}

export function getSearchSuggestions(doctors: Doctor[], query: string): Doctor[] {
  if (!query || query.trim() === "" || !Array.isArray(doctors)) return [];
  
  const searchQuery = query.toLowerCase();
  const matchingDoctors = doctors.filter(doctor => 
    doctor.name && doctor.name.toLowerCase().includes(searchQuery)
  );
  
  // Return top 3 matching doctors
  return matchingDoctors.slice(0, 3);
}

export function buildQueryString(filters: FilterState): string {
  const params = new URLSearchParams();
  
  if (filters.consultationType) {
    params.set("consultationType", filters.consultationType);
  }
  
  if (filters.specialties && filters.specialties.length > 0) {
    params.set("specialties", filters.specialties.join(","));
  }
  
  if (filters.sortBy) {
    params.set("sortBy", filters.sortBy);
  }
  
  if (filters.searchQuery && filters.searchQuery.trim() !== "") {
    params.set("searchQuery", filters.searchQuery);
  }
  
  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

export function parseQueryString(queryString: string): FilterState {
  const params = new URLSearchParams(queryString);
  
  const consultationType = params.get("consultationType") || undefined;
  const specialtiesParam = params.get("specialties");
  const specialties = specialtiesParam ? specialtiesParam.split(",") : [];
  const sortBy = params.get("sortBy") || undefined;
  const searchQuery = params.get("searchQuery") || undefined;
  
  return {
    consultationType,
    specialties,
    sortBy,
    searchQuery
  };
}
