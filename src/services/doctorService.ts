import { Doctor } from "@/types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("API did not return an array of doctors");
      return [];
    }

    const processedDoctors: Doctor[] = data.map((doctor: any) => {
      const specialties: string[] = Array.isArray(doctor.specialities)
        ? doctor.specialities.map((s: any) => s?.name || "").filter(Boolean)
        : [];

      const address = doctor?.clinic?.address || {};
      const locality = typeof address?.locality === "string" ? address.locality : "";
      const city = typeof address?.city === "string" ? address.city : "";
      const addressLine = typeof address?.address_line1 === "string" ? address.address_line1 : "";

      const location =
        [locality, city].filter(Boolean).join(", ") ||
        addressLine ||
        doctor?.clinic?.name ||
        "Location not specified";

      const hospital = doctor?.clinic?.name || "Hospital not specified";
      const fee = parseInt(String(doctor?.fees)?.replace(/[^\d]/g, ""), 10) || 0;

      // Safely extract numeric experience
      const expMatch = String(doctor?.experience || "").match(/\d+/);
      const experience = expMatch && expMatch[0] ? parseInt(expMatch[0], 10) : 0;

      return {
        id: doctor?.id || String(Math.random()),
        name: doctor?.name || "Unknown",
        specialty: specialties,
        experience,
        fee,
        consultationMode: [
          doctor?.video_consult ? "Video Consult" : "",
          doctor?.in_clinic ? "In Clinic" : "",
        ].filter(Boolean),
        availability: doctor?.availability || "",
        degree: doctor?.degree || "",
        rating: parseFloat(doctor?.rating || "0"),
        ratingCount: parseInt(String(doctor?.ratingCount || "0"), 10),
        image: doctor?.photo || "/placeholder.svg",
        hospital,
        location,
      };
    });

    return processedDoctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

export function getUniqueSpecialties(doctors: Doctor[]): string[] {
  if (!Array.isArray(doctors)) return [];

  const allSpecialties = doctors
    .flatMap((doctor) => doctor.specialty || [])
    .filter(Boolean);

  return [...new Set(allSpecialties)].sort();
}
