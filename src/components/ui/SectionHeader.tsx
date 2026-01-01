import type { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  badgeIcon: LucideIcon;
  badgeText: string;
  title: string;
  subtitle: string;
  titleHighlight?: string; // Word to highlight with gradient
}

export default function SectionHeader({
  badgeIcon: Icon,
  badgeText,
  title,
  subtitle,
  titleHighlight,
}: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-100 to-blue-100 text-purple-700 font-poppins font-medium text-sm mb-6">
        <Icon className="w-4 h-4" />
        {badgeText}
      </div>
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-poppins leading-tight mb-4">
        {titleHighlight
          ? title.split(titleHighlight).map((part, index, arr) => (
              <span key={index}>
                {part}
                {index < arr.length - 1 && (
                  <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {titleHighlight}
                  </span>
                )}
              </span>
            ))
          : title}
      </h2>
      <p className="text-lg md:text-xl text-gray-600 font-lato max-w-3xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
