import { useNavigate } from "react-router-dom";

const Card = ({ title, description, link }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card cursor-pointer"
      onClick={() => navigate(link)}
    >
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-600">
        {/* Placeholder per l'immagine */}
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
