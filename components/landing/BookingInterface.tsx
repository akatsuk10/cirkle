import { Star, MapPin, Globe } from "lucide-react";
import Calendar from "./Calendar";

export default function BookingInterface() {
  return (
    <div className="bg-gray-50 p-8 lg:p-12 flex flex-col justify-center">
      {/* Doctor Profile Card */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold">DS</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Dr. Sarah Smith</p>
            <h3 className="font-semibold text-gray-900">Medical Appointment</h3>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Welcome to Sacred Heart Hospital. Please pick a time for your appointment.
        </p>
        
        {/* Time slots */}
        <div className="flex space-x-2 mb-4">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">15m</button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">30m</button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">45m</button>
          <button className="px-3 py-1 text-sm bg-gray-900 text-white rounded">1h</button>
        </div>
        
        {/* Location info */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>22 Street, Chicago</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Asia/Singapore →</span>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <Calendar />

      {/* Review Stars */}
      <div className="flex justify-center space-x-8 mt-8">
        <div className="flex items-center space-x-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
            ))}
          </div>
          <span className="text-sm font-medium">Trustpilot</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">G</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="flex">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
            ))}
            <Star className="w-4 h-4 fill-red-200 text-red-200" />
          </div>
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">G</span>
          </div>
        </div>
      </div>
    </div>
  );
}
