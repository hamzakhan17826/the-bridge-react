interface Decoration {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: string;
  height: string;
  color: string;
  delay?: string;
  transform?: string;
  blur?: string;
  opacity?: string;
}

interface BackgroundDecorationsProps {
  decorations: Decoration[];
}

export default function BackgroundDecorations({
  decorations,
}: BackgroundDecorationsProps) {
  return (
    <>
      {decorations.map((decoration, index) => (
        <div
          key={index}
          className={`absolute ${decoration.color} rounded-full mix-blend-multiply filter ${decoration.blur || 'blur-xl'} ${decoration.opacity || 'opacity-30'} animate-pulse ${decoration.transform || ''}`}
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
