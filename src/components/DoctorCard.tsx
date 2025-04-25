
import { Button } from "@/components/ui/button";
import { Building2, MapPin } from "lucide-react";
import { Doctor } from "@/types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const name = doctor.name || "Unknown Doctor";
  const specialty = doctor.specialty || [];
  const experience = doctor.experience || 0;
  const fee = doctor.fee || 0;
  const consultationMode = doctor.consultationMode || [];
  const image = doctor.image || "/placeholder.svg";
  const degree = doctor.degree || "";
  const hospital = doctor.hospital || "Hospital not specified";
  const location = doctor.location || "Location not specified";

  const handleBookAppointment = () => {
    console.log(`Booking appointment with ${name}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-card p-4 hover:shadow-lg transition-shadow" 
      data-testid="doctor-card"
    >
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1" data-testid="doctor-name">
            {name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-1">
            {degree}
          </p>
          
          <div className="mb-2 flex flex-wrap gap-1" data-testid="doctor-specialty">
            {specialty.map((spec, index) => (
              <span 
                key={index} 
                className="inline-block bg-brand-lightBlue text-brand-blue text-xs px-2 py-1 rounded"
              >
                {spec}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <Building2 className="w-4 h-4" />
            <span>{hospital}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-3">
        <div>
          <span className="text-sm font-medium" data-testid="doctor-experience">
            {experience} years exp
          </span>
        </div>
        
        <div className="text-right">
          <p className="font-semibold text-brand-blue" data-testid="doctor-fee">
            ₹{fee}
          </p>
          <p className="text-xs text-gray-500">
            {consultationMode.join(" / ")}
          </p>
        </div>
        
        <Button 
          onClick={handleBookAppointment}
          className="ml-4"
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default DoctorCard;
