import { useEffect, useLayoutEffect, useRef } from "react";

function placeCaretAtEnd(el) {
  if (!el) return;
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  if (!sel) return;
  sel.removeAllRanges();
  sel.addRange(range);
}

/**
 * Testo modificabile con lo stesso aspetto della vista pubblica (niente box textarea).
 * Cursore di inserimento (caret) in verde del sito, con leggera pulsazione per evidenziare l’editing.
 */
const EditablePageText = ({ value, onChange, className = "", "aria-label": ariaLabel }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.activeElement === el) return;
    const next = value ?? "";
    if (el.textContent !== next) {
      el.textContent = next;
    }
  }, [value]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = value ?? "";
    requestAnimationFrame(() => {
      el.focus();
      placeCaretAtEnd(el);
    });
  }, []);

  const handleInput = () => {
    const el = ref.current;
    if (!el) return;
    onChange(el.textContent ?? "");
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const t = e.clipboardData.getData("text/plain");
    if (document.queryCommandSupported?.("insertText")) {
      document.execCommand("insertText", false, t);
    } else {
      const el = ref.current;
      if (!el) return;
      const sel = window.getSelection();
      if (!sel?.rangeCount) return;
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(t));
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      handleInput();
    }
  };

  return (
    <div
      ref={ref}
      role="textbox"
      tabIndex={0}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      aria-label={ariaLabel}
      className={`editable-page-text-inner w-full max-w-full min-w-0 border-0 bg-transparent p-0 outline-none ${className}`}
      onInput={handleInput}
      onPaste={handlePaste}
    />
  );
};

export default EditablePageText;
