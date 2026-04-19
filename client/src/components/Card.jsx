import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Trash } from "phosphor-react";

/**
 * @param {object} props
 * @param {{ _id: string, title: string, description: string, imageUrl?: string, link: string }} props.category
 * @param {{ title: string, description: string, imageFile?: File | null, localPreview?: string | null } | undefined} props.draft
 */
const Card = ({
  category,
  draft,
  imageUrl,
  isAdmin = false,
  editMode = false,
  reorderMode = false,
  onDelete,
  onDraftChange,
  onImageFile,
  /** In riordino (home): bordo 4px sull’intera card bersaglio dello scambio */
  reorderDropTarget = false,
}) => {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState(false);

  const title = draft?.title ?? category.title;
  const description = draft?.description ?? category.description;
  const imgSrc = draft?.localPreview || imageUrl || category.imageUrl;

  const blockNavigation = reorderMode || editMode;

  if (isAdmin && editMode) {
    return (
      <div
        className={`
        card cursor-default
        transition-shadow duration-200 ease-in-out
        relative
        ${reorderMode ? "cursor-grab active:cursor-grabbing" : ""}
        ${reorderDropTarget ? "card--drop-target reorder-photo-glow" : ""}
      `}
      >
        {isAdmin && (
          <div className="absolute top-2 right-2 z-20 flex gap-1">
            <button
              type="button"
              className="btn-edit-gallery"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              title="Elimina categoria"
            >
              <Trash size={18} weight="duotone" className="text-white" />
            </button>
          </div>
        )}

        <label
          className={`w-full h-48 bg-gray-200 flex items-center justify-center cursor-pointer relative ${
            reorderDropTarget ? "overflow-hidden rounded-none" : "overflow-hidden rounded-sm"
          }`}
        >
          {imgSrc ? (
            <img src={imgSrc} alt={title} className="w-full h-full object-cover" draggable={false} />
          ) : (
            <span className="text-gray-600 text-sm px-2 text-center">{title || "Immagine"}</span>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageFile?.(category._id, file);
              e.target.value = "";
            }}
          />
        </label>

        <div className="p-4 bg-white flex flex-col gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => onDraftChange?.(category._id, { title: e.target.value })}
            className="outline-none text-lg text-center w-full card-title border-0 p-0 bg-transparent"
            placeholder="Titolo"
          />
          <textarea
            value={description}
            onChange={(e) => onDraftChange?.(category._id, { description: e.target.value })}
            className="outline-none text-sm text-center w-full resize-none min-h-[4rem] card-desc border-0 p-0 bg-transparent"
            placeholder="Sottotitolo / descrizione"
          />
        </div>
      </div>
    );
  }

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
        setTimeout(() => navigate(category.link), 150);
      }}
      className={`
        card cursor-pointer
        transition-shadow duration-200 ease-in-out
        relative
        ${pressed ? "scale-95" : ""}
        ${reorderMode ? "cursor-grab active:cursor-grabbing" : ""}
        ${reorderDropTarget ? "card--drop-target reorder-photo-glow" : ""}
      `}
    >
      <div
        className={`w-full h-48 bg-gray-200 flex items-center justify-center ${
          reorderDropTarget ? "overflow-hidden rounded-none" : "overflow-hidden"
        }`}
      >
        {imageUrl || category.imageUrl ? (
          <img
            src={imageUrl || category.imageUrl}
            alt={category.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <span className="text-gray-600 text-sm px-2 text-center">{category.title}</span>
        )}
      </div>

      <div className="p-4 bg-white">
        <h3 className="card-title">{category.title}</h3>
        <p className="card-desc">{category.description}</p>
      </div>
    </div>
  );
};

export default Card;
