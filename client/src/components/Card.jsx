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
        card h-full min-w-0 cursor-default
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
          className={`h-48 w-full shrink-0 bg-gray-200 flex items-center justify-center cursor-pointer relative ${
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

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 bg-white p-4">
          <input
            type="text"
            value={title}
            onChange={(e) => onDraftChange?.(category._id, { title: e.target.value })}
            className="card-title min-h-0 w-full min-w-0 shrink-0 border-0 bg-transparent p-0 text-center text-lg outline-none break-words [overflow-wrap:anywhere]"
            placeholder="Titolo"
          />
          <textarea
            value={description}
            onChange={(e) => onDraftChange?.(category._id, { description: e.target.value })}
            className="card-desc min-h-[4rem] min-w-0 w-full flex-1 resize-none border-0 bg-transparent p-0 text-center text-sm outline-none break-words [overflow-wrap:anywhere]"
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
        card h-full min-w-0 cursor-pointer
        transition-shadow duration-200 ease-in-out
        relative
        ${pressed ? "scale-95" : ""}
        ${reorderMode ? "cursor-grab active:cursor-grabbing" : ""}
        ${reorderDropTarget ? "card--drop-target reorder-photo-glow" : ""}
      `}
    >
      <div
        className={`h-48 w-full shrink-0 bg-gray-200 flex items-center justify-center ${
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

      <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-start gap-2 bg-white p-4">
        <h3 className="card-title shrink-0">{category.title}</h3>
        <p className="card-desc min-h-0 flex-1">{category.description}</p>
      </div>
    </div>
  );
};

export default Card;
