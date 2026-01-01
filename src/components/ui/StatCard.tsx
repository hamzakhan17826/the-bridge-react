import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  number: string;
  label: string;
}

export default function StatCard({ icon: Icon, number, label }: StatCardProps) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Icon className="w-5 h-5 text-primary-600" />
        <span className="font-playfair text-4xl md:text-5xl font-bold text-gray-900">
          {number}
        </span>
      </div>
      <p className="text-sm text-gray-600 font-lato">{label}</p>
    </div>
  );
}
