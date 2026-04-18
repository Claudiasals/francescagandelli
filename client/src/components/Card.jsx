import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Pencil, Trash } from "phosphor-react";

const Card = ({
  title,
  description,
  link,
  imageUrl,
  isAdmin = false,
  editMode = false,
  reorderMode = false,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState(false);

  const blockNavigation = reorderMode || editMode;

  return (
    <div
      onMouseDown={() => !blockNavigation && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => !blockNavigation && setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={() => {
        if (blockNavigation) return;
        setPressed(true);
        setTimeout(() => navigate(link), 150);
      }}
      className={`
        card cursor-pointer
        transition-shadow duration-200 ease-in-out
        relative
        ${pressed ? "scale-95" : ""}
        ${reorderMode ? "cursor-grab active:cursor-grabbing" : ""}
      `}
    >
      {isAdmin && editMode && (
        <div className="absolute top-2 right-2 z-20 flex gap-1">
          <button
            type="button"
            className="btn-edit-gallery"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            title="Modifica"
          >
            <Pencil size={18} className="text-white" />
          </button>
          <button
            type="button"
            className="btn-edit-gallery"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            title="Elimina categoria"
          >
            <Trash size={18} className="text-white" />
          </button>
        </div>
      )}

      {/* Immagine della card */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" draggable={false} />
        ) : (
          <span className="text-gray-600 text-sm px-2 text-center">{title}</span>
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
