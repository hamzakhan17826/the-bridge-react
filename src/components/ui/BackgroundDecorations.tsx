import type { Decoration } from '../../types/ui';

export default function BackgroundDecorations({
  decorations,
}: {
  decorations: Decoration[];
}) {
  return (
    <>
      {decorations.map((decoration, index) => (
        <div
          key={index}
          className={`absolute ${decoration.top} ${decoration.right} ${decoration.bottom} ${decoration.left} ${decoration.width} ${decoration.height} ${decoration.color} rounded-full mix-blend-multiply filter ${decoration.blur || 'blur-xl'} ${decoration.opacity || 'opacity-30'} animate-pulse ${decoration.transform || ''}`}
          style={{
            top: decoration.top,
            left: decoration.left,
            right: decoration.right,
            bottom: decoration.bottom,
            width: decoration.width,
            height: decoration.height,
            animationDelay: decoration.delay || '0s',
          }}
        />
      ))}
    </>
  );
}
