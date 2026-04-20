import { useLayoutEffect, useRef } from "react";

/**
 * Testo modificabile: textarea controllata così a capi e spazi coincidono con il valore salvato
 * (contentEditable altera il DOM e non è fedele a \n / spazi).
 * Altezza si adatta al contenuto; stessi stili tipografici della vista pubblica.
 */
const EditablePageText = ({ value, onChange, className = "", "aria-label": ariaLabel }) => {
  const ref = useRef(null);

  const adjustHeight = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useLayoutEffect(() => {
    adjustHeight();
  }, [value]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.focus();
      const len = (value ?? "").length;
      el.setSelectionRange(len, len);
    });
  }, []);

  return (
    <textarea
      ref={ref}
      value={value ?? ""}
      onChange={(e) => {
        onChange(e.target.value);
        requestAnimationFrame(adjustHeight);
      }}
      aria-label={ariaLabel}
      rows={1}
      spellCheck={false}
      className={`editable-page-text-inner w-full max-w-full min-h-[1.35em] min-w-0 resize-none overflow-hidden border-0 bg-transparent p-0 outline-none whitespace-pre-wrap [overflow-wrap:anywhere] ${className}`}
    />
  );
};

export default EditablePageText;
