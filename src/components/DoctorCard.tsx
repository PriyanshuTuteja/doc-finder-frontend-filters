
import { Doctor } from "@/types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-card p-4 hover:shadow-lg transition-shadow" 
      data-testid="doctor-card"
    >
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <img 
            src={doctor.image || "/placeholder.svg"} 
            alt={doctor.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1" data-testid="doctor-name">
            {doctor.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-1">
            {doctor.degree}
          </p>
          
          <div className="mb-2 flex flex-wrap gap-1" data-testid="doctor-specialty">
            {doctor.specialty.map((spec, index) => (
              <span 
                key={index} 
                className="inline-block bg-brand-lightBlue text-brand-blue text-xs px-2 py-1 rounded"
              >
                {spec}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div>
              <span className="text-sm font-medium" data-testid="doctor-experience">
                {doctor.experience} years exp
              </span>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-brand-blue" data-testid="doctor-fee">
                ₹{doctor.fee}
              </p>
              <p className="text-xs text-gray-500">
                {doctor.consultationMode.join(" / ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
