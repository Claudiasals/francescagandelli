import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Card = ({ title, description, link }) => {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed(true);

    // shrink
    setTimeout(() => {
      setPressed(false); // torna grande
    }, 120);

    // navigate dopo l'animazione completa
    setTimeout(() => {
      navigate(link);
    }, 260);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        card cursor-pointer
        transform transition-transform duration-100 ease-in-out
        ${pressed ? "scale-95" : "scale-100"}
      `}
    >
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-600">
        {title}
      </div>
      <div className="p-4 bg-white">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>
      </div>
    </div>
  );
};

export default Card;
