/** Evita che più overlay (menu, lightbox, …) lascino `body` con overflow sbagliato. */
let lockCount = 0;

export function lockBodyScroll() {
  if (lockCount === 0) {
    document.body.style.overflow = "hidden";
  }
  lockCount += 1;
}

export function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
  }
}
