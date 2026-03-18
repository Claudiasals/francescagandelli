import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Card = ({ title, description, link, imageUrl }) => {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState(false);

  return (
    <div
      // Eventi per shrink visibile al click / touch
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={() => {
        setPressed(true); // piccolo shrink al click
        setTimeout(() => navigate(link), 150); // navigate dopo animazione
      }}
      className={`
        card cursor-pointer
        transform transition-transform duration-200 ease-in-out
        ${pressed ? "scale-95" : "hover:scale-105 scale-100"}
      `}
    >
      {/* Immagine della card */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-600">{title}</span>
        )}
      </div>

      {/* Contenuto della card */}
      <div className="p-4 bg-white">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>
      </div>
    </div>
  );
};

export default Card;