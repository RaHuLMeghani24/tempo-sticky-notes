export interface RectLike {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/**
 * Checks whether two rectangles overlap.
 * This is used for detecting when a dragged note intersects the trash zone.
 */
export const doRectsOverlap = (a: RectLike, b: RectLike): boolean => {
  return (
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top
  );
};

/**
 * Keeps a value inside a fixed range.
 * Useful for preventing notes from being resized too small or too large.
 */

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value));
};