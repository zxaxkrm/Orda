import { Star } from 'lucide-react';
import React from 'react'

const StarRating = ({ rating }: { rating: number }) => {
   return (
    <div className="flex items-center gap-1 my-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4.5 h-4.5 ${
            star <= rating
              ? "fill-[#5d00d6] text-[#5d00d6]"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      
    </div>
  );
}

export default StarRating