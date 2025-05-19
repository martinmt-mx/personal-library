import React from "react";
import { useState } from "react";
import "./Rating.css";

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({ value, onChange }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onChange(ratingValue)}
            />
            <span
              className={`star ${
                ratingValue <= (hover || value) ? "filled" : ""
              }`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            >
              ★
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
