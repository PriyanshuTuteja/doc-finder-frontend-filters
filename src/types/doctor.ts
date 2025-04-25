export interface Doctor {
  name: string;
  specialty: string[];
  experience: number;
  fee: number;
  consultationMode: string[];
  id: string;
  availability: string;
  degree: string;
  rating: number;
  ratingCount: number;
  image: string;
  hospital: string;
  location: string;
}

export interface FilterState {
  consultationType?: string;
  specialties: string[];
  sortBy?: string;
  searchQuery?: string;
}
