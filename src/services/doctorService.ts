
import { Doctor } from "@/types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
}

export function getUniqueSpecialties(doctors: Doctor[]): string[] {
  // Extract all specialties from all doctors
  const allSpecialties = doctors.flatMap(doctor => doctor.specialty);
  
  // Create a Set to remove duplicates and convert back to array
  const uniqueSpecialties = [...new Set(allSpecialties)];
  
  return uniqueSpecialties.sort();
}
