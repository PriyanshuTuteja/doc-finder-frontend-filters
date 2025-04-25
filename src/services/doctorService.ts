
import { Doctor } from "@/types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Make sure we're getting an array of doctors
    if (!Array.isArray(data)) {
      console.error("API did not return an array of doctors");
      return [];
    }
    
    // Process the data to ensure it matches our Doctor type
    const processedDoctors: Doctor[] = data.map((doctor: any) => {
      // Extract specialty from specialities array
      let specialty: string[] = [];
      
      if (Array.isArray(doctor.specialities)) {
        specialty = doctor.specialities.map((s: any) => s?.name || "").filter(Boolean);
      }

      // Map to our Doctor type with fallbacks for missing fields
      return {
        id: doctor.id || String(Math.random()),
        name: doctor.name || "Unknown",
        specialty: specialty,
        experience: parseInt(String(doctor.experience), 10) || 0,
        fee: parseInt(String(doctor.fees)?.replace(/[^\d]/g, ''), 10) || 0,
        consultationMode: [
          doctor.video_consult ? "Video Consult" : "",
          doctor.in_clinic ? "In Clinic" : ""
        ].filter(Boolean),
        availability: doctor.availability || "",
        degree: doctor.degree || "",
        rating: doctor.rating || 0,
        ratingCount: doctor.ratingCount || 0,
        image: doctor.photo || ""
      };
    });
    
    return processedDoctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

export function getUniqueSpecialties(doctors: Doctor[]): string[] {
  if (!Array.isArray(doctors)) {
    return [];
  }
  
  // Extract all specialties from all doctors
  const allSpecialties = doctors.flatMap(doctor => doctor.specialty || []).filter(Boolean);
  
  // Create a Set to remove duplicates and convert back to array
  const uniqueSpecialties = [...new Set(allSpecialties)];
  
  return uniqueSpecialties.sort();
}
