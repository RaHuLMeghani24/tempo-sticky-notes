export interface RectLike {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export const doRectsOverlap = (a: RectLike, b: RectLike): boolean => {
  return (
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top
  );
};